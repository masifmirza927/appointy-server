const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({ 
    name: {
        type: String,
        required: [true, "Please provide valid name"]
    },
    email: {
        type: String,
        required: [true, "Please provide valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide valid password"],
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: "patient",
        required: [true, "role is required"],
        enum: ["patient", "doctor"]
    },
    speciality: {
        type: String,
        enum: ["cardiologist", "dentist", "dermatologist", "neurologist", "gynecologist", "pediatrician", "physiatrist", "urologist", "orthopaedic"]
    },
    off_days: {
        type: [String]
    },
    daily_patients_count: {
        type: Number,
        default: 5
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

},  { toJSON: { getters: true } }, { timestamps: true });


const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel