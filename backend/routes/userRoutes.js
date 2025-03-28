const express = require('express');
const { registerUser, authUser, allUsers } = require('../contollers/userControlllers')
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");


router.route('/').post(registerUser).get(protect, allUsers)
router.route('/login').post(authUser)



module.exports = router;