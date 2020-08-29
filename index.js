// Require all dependencies
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

// Add middleware
require("./config/db"); //calls my mongoose connection to clean up this file
app.use(express.json()) //allows me to recieve JSON files from header of request
//REQUEST
app.use(cors()); //Allow cross origin requests
//Set up routes
// app.use("/api/items", require("./routes/item.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/workouts", require("./routes/workouts.route"));


//Catch 404 Errors
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Not found.",
        code: "SS404"
    });
});


//Set up the server port
app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}`));