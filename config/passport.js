const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../model/user.model");
require("dotenv").config();

//JWT
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(
            jwt_payload.user.id,
            function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
    }));


//Google Auth
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});



passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: "/api/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                //if we already have a record with the given profile ID
                console.log("GOOGLE USER", currentUser)
                done(null, currentUser);
            } else {
                //if not, create a new user 

                let {
                    name,
                    emails,
                    id
                } = profile;

                new User({
                    googleId: id,
                    firstname: name.givenName,
                    lastname: name.familyName,
                    email: emails[0].value,
                    username: emails[0].value.split('@')[0]
                }).save().then((newUser) => {
                    done(null, newUser);
                }).catch((err) => console.log(err));
            }
        }).catch((err) => console.log(err))
    })
);




module.exports = passport;

