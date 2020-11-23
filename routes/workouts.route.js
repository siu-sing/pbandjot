const router = require("express").Router();
const Workout = require("../model/workout.model")
const {
    hasToken
} = require("../config/config.js");
const passport = require("../config/passport")

//CREATE WORKOUT - private access
router.post('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let {
        workout_name,
        workout_type,
        description,
        prescribed_male,
        prescribed_female,
    } = req.body
    let owner = req.user.id;

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

//For logged in users - show public, and owned workouts
router.get("/", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    console.log("DISPLAY ALL TEST", req.user)
    try {
        let workouts = await Workout.find({
            $or: [{
                owner: req.user._id
            }, {
                privacy: "public"
            }]
        })
        res.status(200).json({
            count: workouts.length,
            workouts,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Unable to get workouts."
        })
    }
});

//GET ALL WORKOUTS - workouts "/" - only public workouts 
router.get("/all", async (req, res) => {
    try {
        let workouts = await Workout.find({
            privacy: "public"
        })
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
router.get("/:id", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
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

//MODIFY ONE WORKOUT - only owner can modify
router.put("/:id", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {

    let {
        workout_name,
        workout_type,
        description,
        prescribed_male,
        prescribed_female,
    } = req.body

    try {
        let workout = await Workout.findById(req.params.id);
        if (workout.owner.equals(req.user.id)) {
            workout.workout_name = workout_name;
            workout.workout_type = workout_type;
            workout.description = description;
            workout.prescribed_male = prescribed_male;
            workout.prescribed_female = prescribed_female;
            workout.save();
            res.status(200).json({
                message: "Workout updated"
            })
        } else {
            res.status(200).json({
                message: "Unable to modify workout."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Unable to modify workout."
        })
    }
});

//DELETE WORKOUT - only owner can delete
router.delete("/:id", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        let delRes = await Workout.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        })
        if (delRes) {
            res.status(200).json({
                message: "Delete workout successful."
            })
        } else {
            res.status(500).json({
                message: "Unable to delete workout."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Unable to delete workout."
        })
    }
});



module.exports = router;