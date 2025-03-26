const mongoose = require("mongoose")

const meetingSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true // ✅ Ensure uniqueness
    },
    eventTopic: { type: String, required: true },
    description: { type: String },
    hostName: { type: String, required: true }, // Meeting owner
    participants: [
        {
            email: { type: String, required: true },
            status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
        },
    ],// Attendees
    date: { type: Date, required: true }, // Proper Date format
    startTime: { type: String, required: true }, // "14:00"
    endTime: { type: String, }, // "14:30"
    duration: { type: Number, required: true }, // Store as number (e.g., 1 for 1 hour, 0.5 for 30 mins)
    addLink: { type: String, }, // Meeting URL
    addEmails: [{ type: String }], // Store invited emails
    status: { type: String, enum: ["active", "pending", "rejected"], default: "pending" },
    meetingPassword: { type: String }, // Will be hashed before saving
    customization: {
        banner: { type: String }, // Banner image URL
        backgroundColor: { type: String } // Hex color
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meeting", meetingSchema)