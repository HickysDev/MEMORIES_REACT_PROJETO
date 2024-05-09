const multer = require("multer");

const path = require("path");
const {db} = require("../models/Memory");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filterFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || "image/png" || "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  filterFilter,
});

module.exports = upload;
