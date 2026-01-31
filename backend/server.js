const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
//database
const dbConnection = require("./config/db.js");
dotenv.config();

const port = process.env.PORT || 5000;
const api_url = "/api/v1"

// routes
const PaymentRouter = require("./routes/payments.routes.js");


//cors options
const corsOptions = {
    origin: "http://localhost:3000",
    methods: 'GET,POST,PUT,DELETE',
}
app.use(cors(corsOptions)); // to allow frontend access
app.use(express.json()); // to accept json requests


// using routes in app
app.use(api_url + "/payments", PaymentRouter);

// app health
app.get("/health", (_, res) => {
    return res.status(200).json({status: "ok"});
})


// Start app
dbConnection();
app.listen(port, () => {
    console.log(`Server started on port: http://localhost:${port}`)
})