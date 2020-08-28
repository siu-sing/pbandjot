const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["M", "F"]
    },
    user_details: {
        height: Number,
        weight: Number,
        home_gym: String,
        date_of_birth: Date,
        profile_image_path: String
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema)
module.exports = User;