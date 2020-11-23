const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    workout_name: {
        type: String,
        required: true,
        unique: true,
    },
    workout_type: {
        type: String,
        required: true,
        enum: ["weightlifting", "benchmark", "benchmark_special", "custom", "hero"]
    },
    description: String,
    prescribed_male: Number,
    prescribed_female: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    privacy: {
        type: String,
        enum:["public", "group", "personal"],
        default: "personal"
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    workout_image_path:String,
}, {
    timestamps: true
});

const Workout = mongoose.model("Workout", workoutSchema)
module.exports = Workout;