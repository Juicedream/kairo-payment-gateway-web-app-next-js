const express = require("express");
const http = require("http");   
const {Server} = require("socket.io");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const server = http.createServer(app);

//database
const dbConnection = require("./config/db.js");
dotenv.config();

const port = process.env.PORT || 5000;
const api_url = "/api/v1"

// routes
const PaymentRouter = require("./routes/payments.routes.js");
const { connect } = require("http2");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
})
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
    return res.status(200).json({status: "ok" });
});

// web socket connection
io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // send welcome message to client
    socket.emit('message', 'Welcome to the WebSocket server!');

    //listen for messages from client
    socket.on('message', (message) => {
        console.log('Received message from client:', message);
        // Broadcast the message to all connected clients
        io.emit('message', message);
    });
    socket.on('pay-with-card', (data) => {
        console.log('Received payment data from client:', data);
        // Broadcast the payment data to all connected clients
        io.emit('payment-processed', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
})


// Start app
dbConnection();
app.listen(port, () => {
    console.log(`Server started on port: http://localhost:${port}`);
})
server.listen(4000, () => {
    console.log(`WebSocket server started on port: http://localhost:${4000}`);
})