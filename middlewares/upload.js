const path = require("path");
const multer = require("multer");

const tempDir = path.join(__dirname, "../", "tmp");

const multerSetting = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({ storage: multerSetting });

module.exports = upload;
