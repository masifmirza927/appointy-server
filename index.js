const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");


// Middlewares
app.use(cors());
app.use(express.json());


// Routes imports
const UserRouter = require("./routes/UserRouter");
const AppoitmentRoutes = require("./routes/AppointmentRouter");


// Routes
app.use("/api/user", UserRouter);
app.use("/api/appointment", AppoitmentRoutes);


app.get("/", (req, res) => {
    res.send("working");
})

mongoose.connect('mongodb://127.0.0.1:27017/docAppointy').then(() => {
    app.listen(process.env.PORT, () => console.log("server and db running"))
})