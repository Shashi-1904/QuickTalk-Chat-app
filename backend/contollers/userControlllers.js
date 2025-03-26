const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, imageUrl } = req.body;  // Correct field name

    if (!name || !email || !password || !imageUrl) {
        res.status(400);
        throw new Error("Please Enter all the details");
    }


    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic: imageUrl
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)

        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});

const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {   // ✅ Correct comparison
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});


module.exports = { registerUser, authUser }