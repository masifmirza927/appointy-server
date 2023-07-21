const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({ 
    patientId: {
        type: String,
        required: [true, "Patient id is required"]
    },
    doctorId: {
        type: String,
        required: [true, "Doctor id is required"]
    },
    bookingDate: {
        type: String,
        required: [true, "Date time is required"]
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    rejectedReason: {
        type: String,
    }
}, { timestamps: true });
const AppointmentModel = mongoose.model('Appointment', AppointmentSchema);
module.exports = AppointmentModel