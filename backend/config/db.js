const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConn = async() => {
    try {
        console.log("Db connecting....")
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn) {
            console.log("🟢 Database connected");
        }
    } catch (error) {
        console.log("❌ Database couldn't connect, " + error);
    }
}

module.exports = dbConn;