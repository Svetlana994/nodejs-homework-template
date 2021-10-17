const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9]+[.]+[a-zA-Z0-9]+$/;

const UserSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: String,
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const userJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const User = model("user", UserSchema);

module.exports = {
  userJoiSchema,
  User,
};
