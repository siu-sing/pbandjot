const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hasToken = require("../config/config.js");


router.post('/register', async (req, res) => {
    let {
        firstname,
        lastname,
        username,
        email,
        password,
        gender,
        user_details
    } = req.body;

    try {
        let hashPassword = await bcrypt.hash(password, 10);

        let user = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashPassword,
            gender,
            user_details
        })

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };
        //Generate web token upon registration
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 360000000
        }, (err, token) => {
            if (err) throw err //if error, go to catch

            res.status(201).json({
                message: "User registered successfully",
                token: token
            })
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to register."
        })
    }
});

router.post("/login", async (req, res) => {
    let {
        username,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            username
        });

        if (!user) {
            return res.status(400).json({
                message: "User and password not found."
            });
        }

        //Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "User and password not found."
            });
        }

        const payload = {
            user: {
                id: user._id
            }
        };

        //Generate web token upon login
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 360000000
        }, (err, token) => {
            if (err) throw err //if error, go to catch
            res.status(200).json({
                token: token
            })
        })

    } catch (error) {
        res.status(500).json({
            message: "Error on login."
        })
    }
});

module.exports = router;