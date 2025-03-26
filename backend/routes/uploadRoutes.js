const express = require("express");
const { upload, uploadImage } = require("../contollers/uploadController");

const router = express.Router();

// Image upload route
router.post("/", upload.single("image"), uploadImage);

module.exports = router;
