const jwt = require("jsonwebtoken");

//Middleware to check if request has token
let hasToken = (req, res, next) => {
    const token = req.header("x-auth-token");
    // console.log(token)

    if (!token) {
        return res.status(401).json({
            message: "Not authorised.",
        }) //not authorized to view this
    }

    //if there is a token
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token is not valid.",
        }) //not authorized to view this
    }
}


module.exports = {
    hasToken
}