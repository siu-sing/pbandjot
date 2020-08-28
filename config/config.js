const jwt = require("jsonwebtoken");




module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log(token)

    if (!token) {
        return res.status(401).json({
            message: "not authorised to view",
        }) //not authorized to view this
    }

    //if there is a token
    try {
        const decoded = jwt.verify(token, "seifewdaystogo");
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "token is not valid!",
        }) //not authorized to view this
    }
}