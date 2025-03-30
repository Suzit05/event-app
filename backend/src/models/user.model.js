const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,

    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    confirmPassword: {
        type: String,

        minLength: 6,
    },

    availability: [
        {
            day: { type: String, required: true }, // e.g., "Monday"
            startTime: { type: String, required: true }, // e.g., "09:00 AM"
            endTime: { type: String, required: true }, // e.g., "05:00 PM"
        }
    ],
    createdAt: { type: Date, default: Date.now }
},

    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)