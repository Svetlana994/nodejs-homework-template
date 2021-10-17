const express = require("express");
const router = express.Router();

const { authenticate, validation, upload } = require("../../middlewares");
const { userJoiSchema } = require("../../model/user");
const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(userJoiSchema), ctrl.signup);

router.post("/login", validation(userJoiSchema), ctrl.login);

router.get("/logout", authenticate, validation(userJoiSchema), ctrl.logout);

router.post("/current", authenticate, ctrl.current);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  ctrl.updateAvatar
);

module.exports = router;
