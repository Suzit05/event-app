const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, // User reference
    timeZone: {
        type: String,
        required: true,
        default: "Indian Time Standard"
    }, // Store time zone
    availability: {
        type: Map,
        of: [
            {
                startTime: { type: String, required: true }, // e.g., "10:00 AM"
                endTime: { type: String, required: true } // e.g., "12:00 PM"
            }
        ]
    }, // Map with day names as keys and time slots as values
}, { timestamps: true });

module.exports = mongoose.model("Availability", availabilitySchema);
