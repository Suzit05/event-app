const mongoose = require("mongoose")

const meetingSchema = new mongoose.Schema({
    eventTopic: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    hostName: { type: String, required: true }, // Changed to string // Meeting owner
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }], // Attendees
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    }, // "14:00"
    endTime: {
        type: String,
        required: true
    }, // "14:00"

    duration: {
        type: Number,
        required: true
    }, // hour , dropdown bna dena
    addLink: {
        type: String,
        required: true
    }, // Meeting link (Google Meet, Zoom, etc.)
    addEmails: [{ type: String }], // Change from String to Array of Strings
    status: {
        type: String,
        enum: ["active", "pending", "canceled"],
        default: "pending"
    },
    meetingPassword: {
        type: String
    }, // Encrypted password (optional)
    customization: {
        banner: { type: String }, // Banner image URL
        backgroundColor: { type: String } // Hex color
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Meeting", meetingSchema)