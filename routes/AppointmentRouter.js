const express = require("express");
const { BookAppointment, updateAppointment, getAppointments } = require("../controllers/AppointmentController");

const router = express.Router();


// register new appointment
router.get("/:role/:id", getAppointments);
router.post("/book", BookAppointment);
router.put("/update/:id", updateAppointment);


module.exports = router;
