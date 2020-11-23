const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('../config/passport')
const {
    hasToken,
} = require("../config/config.js");

//LOCAL AUTH
//Register - add user details and returns a token
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

//Login - sends a valid token to the user
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
                message: "User and/or password not found."
            });
        }

        //Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "User and/or password not found."
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

//To get user details with token
router.get("/user", hasToken, async (req, res) => {
    try {
        let user = await User.findById(req.user.id, "-password")
        //Return user object
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to find user."
        })
    }
});

//Check if username exists
router.get("/usercheck/:username", async (req, res) => {
    try {
        let user = await User.findOne({
            username: req.params.username
        })
        let message = user ? "User exists" : "User does not exist";
        res.status(200).json({
            message: message
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to check if user exists."
        })
    }
});

//Check if email exists
router.get("/emailcheck/:email", async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.params.email
        })
        let message = user ? "Email exists" : "Email does not exist";
        res.status(200).json({
            message: message
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to check if email exists."
        })
    }
});

//GOOGLE AUTH
//Register with google and return a token
//Login with google 
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

//Google redirect
router.get("/google/redirect", passport.authenticate('google', {
    failureRedirect: '/api/auth/error',
}), (req, res) => {
    //GENERATE NEW TOKEN
    let payload = {
        user: {
            id: req.user._id,
        },
    };

    jwt.sign(
        payload,
        process.env.SECRET, {
            expiresIn: 3600000
        },
        async (err, token) => {
            if (err) throw err;
            res.status(201).json({
                message: "successfully registered!",
                token
            })
        });
});

//Error page
router.get("/error", (req, res) => {
    res.send("error")
})

module.exports = router;