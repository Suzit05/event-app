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


const getUsersByEmails = async (req, res) => {
    try {
        const { emails } = req.body;

        if (!emails || emails.length === 0) {
            return res.status(400).json({ message: "No emails provided" });
        }

        // Fetch users based on emails
        const users = await User.find({ email: { $in: emails } }).select("firstName lastName email");

        res.json(users);
    } catch (error) {
        console.error("Error fetching users by emails:", error);
        res.status(500).json({ message: "Server error" });
    }
}




module.exports = { getProfile, getUsersByEmails }