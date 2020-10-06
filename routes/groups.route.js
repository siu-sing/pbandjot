const router = require("express").Router();
const User = require("../model/user.model");
const Workout = require("../model/workout.model");
const Record = require("../model/record.model");
const Group = require("../model/group.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hasToken = require("../config/config.js");
const mongoose = require("mongoose");
const { findByIdAndUpdate } = require("../model/user.model");


//ALL ROUTES PRIVATE, MUST BE VIA A USER ACCOUNT
//CREATE NEW GROUP
router.post('/', hasToken, async (req, res) => {
    let {
        group_name,
        group_description,
        group_members,
    } = req.body
    //Get user ID
    let group_admin = req.user.id;
    try {
        let group = new Group({
            group_name,
            group_description,
            group_members,
            group_admin
        })
        await group.save();

        res.status(201).json({
            message: "Group created successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to create group."
        })
    }
});

//DELETE GROUP - ONLY ADMIN USER

//GET GROUPS THAT USER BELONGS TO
router.get('/', hasToken, async (req, res) => {
    try {
        let groups = await Group.find({
            group_members: req.user.id
        }).populate("group_workouts group_members group_admin")
        res.status(201).json({
            counts: groups.length,
            groups
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to get user's groups."
        })
    }
});

//CREATE GROUP WORKOUT
//ONLY FOR USERS WITHIN GROUP
//Adds the workout to the group workout array
router.post('/workouts', hasToken, async (req, res) => {
    //Creates a new workout
    let {
        workout_name,
        workout_type,
        description,
        prescribed_male,
        prescribed_female,
    } = req.body
    let owner = req.user.id;
    let groupId = req.body.group_id;

    try {

        let workout = new Workout({
            workout_name,
            workout_type,
            description,
            prescribed_male,
            prescribed_female,
            owner,
        });

        let workoutRes = await workout.save();
        let workoutId = workoutRes._id;

        let group = await Group.findByIdAndUpdate(groupId,{
            $push: {group_workouts: workoutId}
        })

        res.status(201).json({
            message: "Group workout created successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to create workout."
        })
    }

});


//ADMIN POWERS
//ADD USERS TO GROUP
//DELETE GROUP
//DELETE WORKOUTS
module.exports = router;