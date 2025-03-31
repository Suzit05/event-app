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

const getAvail = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("availability");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.availability);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


const postAvail = async (req, res) => {
    console.log("Received availability data:", req.body); // Add this line
    const { availability } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.availability = availability; // Update availability
        await user.save();

        res.json({ message: "Availability updated successfully", availability: user.availability });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const updateProfile = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { getProfile, getUsersByEmails, getAvail, postAvail, updateProfile }