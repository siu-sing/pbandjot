const router = require("express").Router();
const Workout = require("../model/workout.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hasToken = require("../config/config.js");

//CREATE WORKOUT - private access
router.post('/', hasToken, async (req, res) => {
    let {
        workout_name,
        workout_type,
        description,
        prescribed_male,
        prescribed_female,
    } = req.body
    let owner = req.user.id;
    console.log(req.body);
    console.log(req.user.id);

    try {

        let workout = new Workout({
            workout_name,
            workout_type,
            description,
            prescribed_male,
            prescribed_female,
            owner,
        });

        await workout.save();

        res.status(201).json({
            message: "Workout added successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to create workout."
        })
    }
});

//GET ALL WORKOUTS - workouts "/" public access
router.get("/", async (req, res) => {
    try {
        let workouts = await Workout.find()
        res.status(200).json({
            count: workouts.length,
            workouts,
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to get workouts."
        })
    }
});

//GET ONE WORKOUT - workouts "/:id" public access
router.get("/:id", async (req, res) => {
    try {
        let workout = await Workout.findById(req.params.id)
        res.status(200).json({
            workout
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to get workout."
        })
    }
});


module.exports = router;