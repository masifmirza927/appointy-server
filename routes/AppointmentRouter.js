const express = require("express");
const { BookAppointment, updateAppointment } = require("../controllers/AppointmentController");

const router = express.Router();


// register new appointment
router.post("/book", BookAppointment);
router.put("/update/:id", updateAppointment);

module.exports = router;
