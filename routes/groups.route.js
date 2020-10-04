const router = require("express").Router();
const User = require("../model/user.model");
const Workout = require("../model/workout.model");
const Record = require("../model/record.model");
const Group = require("../model/group.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hasToken = require("../config/config.js");
const mongoose = require("mongoose");


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
            group_name, group_description, group_members, group_admin
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
            
        })
    } catch (error) {
        
    }
});





