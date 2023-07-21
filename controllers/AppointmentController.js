const mongoose = require("mongoose");
const AppointmentModel = require("../models/AppointmentModel");
const UserModel = require("../models/UserModel");
const { getDayByIndex } = require("../utils/Helpers");

const BookAppointment = async (req, res) => {
    const { patientId, doctorId, bookingDate, message } = req.body;
    const date = new Date(bookingDate);
    const requestedDay = getDayByIndex(date.getDay());

    try {
        // check appointment slot is available of that specific doctor 
        //  maximum number of appoints a doctor can have
        // check is this a off day of the doctor

        // check if selected day is off day or not
        const doctor = await UserModel.findOne({ off_days: requestedDay });

        if (doctor) {
            return res.status(200).json({
                status: false,
                message: "Doctor is not available on  selected day"
            });
        }

        // TODO -> check how many appoints a doctor can accept?

        // create new appointment
        const newAppointment = await AppointmentModel.create({
            patientId, doctorId, bookingDate: date, message: message
        });

        return res.status(200).json({
            status: true,
            appointment: newAppointment
        })
    } catch (error) {
        return res.status(201).json({
            status: false,
            error: error.message
        })
    }

}

// update appointment status
const updateAppointment = async (req, res) => {
    const appointmentId = req.params.id;
   const  {doctorId, status, rejectedReason} = req.body;
    // console.log(appointmentId, doctorId);
    // return;
   try {
        const appointment = await AppointmentModel.findOne({
            _id: new mongoose.Types.ObjectId("64b8ff930e048e38f3858107")
        });

        // check sender doctor is the owner of this appointment
        if(appointment === null) {
            return res.status(200).json({
                status: false,
                error: "You are not allowed to perform this operation"
            });
        } else {
            appointment.status = status;
            appointment.rejectedReason = rejectedReason;
            await appointment.save();
            return res.status(200).json({
                status: true
            });
        }

   } catch (error) {
        return res.status(404).json({
            status: false,
            error: error.message
        })
   }
}



module.exports = {
    BookAppointment,
    updateAppointment
}