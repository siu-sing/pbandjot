require("dotenv").config();

const mongoose = require("mongoose");

//connect to mongoose

mongoose.connect(
    // process.env.MONGODBLIVE,
    process.env.MONGODB,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => { if(err) throw err;
        // console.log(`mongodb connected! ${process.env.MONGODBLIVE}`);
        console.log(`mongodb connected! ${process.env.MONGODB}`);
    }
)

module.exports = mongoose;