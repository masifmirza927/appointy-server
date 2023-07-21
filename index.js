const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

// Routes imports
const UserRouter = require("./routes/UserRouter");
const AppoitmentRoutes = require("./routes/AppointmentRouter");

// models imports
const UserModel = require("./models/UserModel");


// Middlewares
app.use(express.json());

// Routes
app.use("/api/user", UserRouter);
app.use("/api/appointment", AppoitmentRoutes);


app.get("/", (req, res) => {
    res.send("working");
})

mongoose.connect('mongodb://127.0.0.1:27017/docAppointy').then(() => {
    app.listen(process.env.PORT, () => console.log("server and db running"))
})