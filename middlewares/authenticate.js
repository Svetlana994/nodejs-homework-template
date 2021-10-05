const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

async function authenticate(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error();
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Error();
    }

    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }
}

module.exports = authenticate;
