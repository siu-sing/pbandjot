const router = require("express").Router();
const User = require("../model/user.model");
const Workout = require("../model/workout.model");
const Record = require("../model/record.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hasToken = require("../config/config.js");
const mongoose = require("mongoose");


//ALL ROUTES ARE PRIVATE, REQUIRES USER TOKEN
//CREATE ONE RECORD
router.post('/', hasToken, async (req, res) => {
    let {
        pb_date,
        pb_weight,
        pb_time_min,
        pb_time_sec,
        workout_id
    } = req.body;
    let user_id = req.user.id;
    console.log("TRYING TO CREATE RECORD")
    try {

        //Set prescribed flag
        //Get given gender of user
        let {
            gender
        } = await User.findById(user_id, "gender -_id");

        //Set the field to which to obtained the prescribed weight
        let prescribed_field = gender == "M" ? "prescribed_male" : "prescribed_female";

        //Get workout_type and prescribed weight
        let qRes = await Workout.findById(workout_id, `workout_type ${prescribed_field} -_id`);
        console.log(qRes);
        let prescribed = false;
        let prescribed_weight = qRes[prescribed_field]

        //If is a non weightlifting workout then there will be prescribed weight
        if (qRes.workout_type != "weightlifting") {
            prescribed = pb_weight >= prescribed_weight
        }

        let record = new Record({
            pb_date,
            pb_weight,
            pb_time_min,
            pb_time_sec,
            workout_id,
            prescribed,
            user_id
        });
        console.log(`SAVING THIS:`)
        console.log(record)
        await record.save();
        res.status(201).json({
            message: "Record added successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to create record."
        })
    }
});

//VIEW ALL RECORDS BY USER
router.get('/', hasToken, async (req, res) => {
    try {
        let records = await Record.find({
            user_id: req.user.id
        }).populate('workout_id')
        res.status(200).json({
            count: records.length,
            records,
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to get records."
        })
    }
});

//VIEW RECORD BY WORKOUT - needs token
router.get('/workouts/:workout_id', hasToken, async (req, res) => {
    try {
        let records = await Record.find({
            user_id: req.user.id,
            workout_id: req.params.workout_id
        })
        res.status(200).json({
            count: records.length,
            records,
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to get records."
        })
    }
});

//GET USER RECORDS FOR EACH WORKOUT
router.get('/allworkouts', hasToken, async (req, res) => {

    //GET ALL WORKOUTS
    //FOR EACH WORKOUT, GET USER RECORDS AND ADD INTO WORKOUT OBJ
    try {
        let workouts = await Workout.aggregate([
            {
                $lookup: {
                    from: "records",
                    localField: "_id",
                    foreignField: "workout_id",
                    as: "records"
                    }
                }
            ])
        res.status(200).json({
            workouts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to get records for all workouts."
        })
    }
});


//VIEW ONE RECORD
//DELETE ONE RECORD
router.delete("/:id", hasToken, async (req, res) => {
    try {
        let recordDelete = await Record.findByIdAndDelete(req.params.id);
        if (recordDelete) {
            res.status(200).json({
                message: "Record deleted."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Unable to delete record.",
            statuscode: "EB500"
        })
    }
});


module.exports = router;