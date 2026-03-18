const multer = require("multer");
const path = require("path");
const fs = require("fs");
fs.mkdirSync("public/images", { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // saves to /public/images/
  },
  filename: function (req, file, cb) {
    // e.g. "image-1710000000000.png" — unique name to avoid collisions
    const uniqueName = `image-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type"), false);
};

module.exports = multer({ storage, fileFilter });
