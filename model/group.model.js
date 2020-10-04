const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    group_name: {
        type: String,
        required: true,
        unique: true,
    },
    group_description: {
        type: String,
        required: true,
    },
    group_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    group_members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    group_workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout"
        }
    ],
    group_display_image_path: String,
}, {
    timestamps: true
});

const Group = mongoose.model("Group", groupSchema)
module.exports = Group;