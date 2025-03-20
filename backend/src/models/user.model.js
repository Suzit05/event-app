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
    // meetingsHosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }], // Meetings user created
    // meetingsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }], // Meetings user is attending
    availability: [
        {
            day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
            startTime: { type: String }, // "09:00"
            endTime: { type: String } // "17:00"
        }
    ],
    createdAt: { type: Date, default: Date.now }
},

    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)