require("dotenv").config();

const mongoose = require("mongoose");

//connect to mongoose

mongoose.connect(
    process.env.MONGODBLIVE,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => { if(err) throw err;
        console.log(`mongodb connected! ${process.env.MONGODBLIVE}`);
    }
)

module.exports = mongoose;