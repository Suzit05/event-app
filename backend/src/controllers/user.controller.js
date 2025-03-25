const User = require("../models/user.model")
const Meeting = require("../models/meeting.model")
const generateToken = require("../lib/util")
const bcrypt = require("bcryptjs")

// Get User Profile
const getProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.user._id);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = getProfile