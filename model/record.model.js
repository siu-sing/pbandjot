const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    //Date when workout was done
    pb_date: {
        type: Date,
        required: true,
    },
    //Amount of weight used for workout, in lb
    pb_weight: {
        type: Number,
    },
    //Min portion of workout time
    pb_time_min: {
        type: Number,
    },
    //Seconds portion of workout time
    pb_time_sec: {
        type: Number,
    },
    //Reference to workout
    workout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
        required: true,
    },
    notes:String,
    prescribed:Boolean,
    //User who created the record
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    //List of users who liked the record
    liked_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
    
}, {
    timestamps: true
});

const Record = mongoose.model("Record", recordSchema)
module.exports = Record;