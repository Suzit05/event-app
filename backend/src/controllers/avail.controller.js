const User = require("../models/user.model")
const Meeting = require("../models/meeting.model")
const Availability = require("../models/avail.model")

const postAvail = async (req, res) => {
    try {
        const { availability, timeZone } = req.body;
        const userId = req.user._id;

        // Update or create availability for the user
        const updatedAvailability = await Availability.findOneAndUpdate(
            { user: userId },
            { availability, timeZone },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Availability updated", data: updatedAvailability });
    } catch (error) {
        res.status(500).json({ message: "Error updating availability", error: error.message });
        console.log("error in postAvail in controller")
    }
}

module.exports = postAvail;