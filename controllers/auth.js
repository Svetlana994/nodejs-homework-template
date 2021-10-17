const { Conflict, NotFound, BadRequest, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

const { User } = require("../model/user");

const { SECRET_KEY } = process.env;

const tempDir = path.join(__dirname, "tmp");
const uploadDir = path.join(__dirname, "../", "public/avatars");

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Already exist");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    const userAvatar = gravatar.url(email, { s: "200", r: "pg", d: "retro" });
    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL: userAvatar,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success created",
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "_id email password");
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequest("Invalid password");
    }

    const payload = {
      _id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.json({
      status: "success",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id, "_id email subscription");
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateAvatar(req, res, next) {
  try {
    const { path: tempStorage, originalname } = req.file;
    const { id } = req.user;

    const user = await User.findOne({ id });

    const [extention] = originalname.split(".").reverse();
    const newFileName = `user_new-ava_${user.id}.${extention}`;

    Jimp.read(tempStorage, (err, image) => {
      if (err) throw err;
      image
        .resize(250, 250) // resize
        .write(newFileName); // save
    });

    const resultStorage = path.join(uploadDir, newFileName);
    await fs.rename(tempStorage, resultStorage);

    const photo = path.join("/avatars", newFileName);

    await User.findByIdAndUpdate(
      user.id,
      {
        avatarURL: photo,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "success",
      code: 200,
      avatarURL: photo,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
};
