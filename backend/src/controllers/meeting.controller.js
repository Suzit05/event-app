const User = require("../models/user.model")
const Meeting = require("../models/meeting.model")
const generateToken = require("../lib/util")
const bcrypt = require("bcryptjs")

const addEvent = async (req, res) => {
    try {
        const { eventTopic, meetingPassword, description, startTime, endTime, duration, addLink, addEmails, date } = req.body;

        // Check if all required fields are present
        if (!eventTopic || !startTime || !date || !addEmails || !addLink) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // ✅ Generate unique eventId
        const eventId = `EVT-${Date.now()}`;

        // Fetch user details to get hostName
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hostName = `${user.firstName} ${user.lastName}`;

        // Create new meeting/event
        const newMeeting = new Meeting({
            eventId, // ✅ Store eventId
            eventTopic,
            meetingPassword,
            date,
            hostName,
            addEmails,
            addLink, //t
            startTime, //t
            duration,

            user: req.user._id // Assuming user is authenticated and stored in req.user
        });

        // Save to database
        await newMeeting.save();

        res.status(201).json({
            eventId: newMeeting.eventId,
            eventTopic: newMeeting.eventTopic,
            hostName: newMeeting.hostName,
            date: newMeeting.date,
            meetingPassword: newMeeting.meetingPassword,
            description: newMeeting.description,
            startTime: newMeeting.startTime,
            addEmails: newMeeting.addEmails,
            addLink: newMeeting.addLink,
            duration: newMeeting.duration,

        });

    } catch (error) {
        console.error("Error in addEvent in meetingController:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getMeetings = async (req, res) => { //api/meeting/getmeetings
    //get all meetings with their details
    try {

        // Fetch all meetings from the database
        const meetings = await Meeting.find({}, "eventTopic  hostName startTime endTime duration date addLink addEmails status"); //fetch all with the selected fields

        res.status(200).json(meetings);
    } catch (error) {
        console.error("Error fetching meetings in getMeetings controller,", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }


}

const updateMeeting = async (req, res) => {
    const { id } = req.params;
    const { eventTopic, startTime } = req.body;

    try {
        const updatedMeeting = await Meeting.findByIdAndUpdate(id, { eventTopic, startTime }, { new: true });
        if (!updatedMeeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }
        res.json(updatedMeeting);
    } catch (error) {
        res.status(500).json({ message: "Error updating meeting", error });
        console.log("error in updateMeeting in authController")
    }
}

const deleteMeeting = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the meeting
        const deletedMeeting = await Meeting.findByIdAndDelete(id);

        if (!deletedMeeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        res.status(200).json({ message: "Meeting deleted successfully", deletedMeeting });
    } catch (error) {
        console.error("Error deleting meeting, in meeting controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//added to change status
const updateMeetingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        if (!["active", "pending", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const meeting = await Meeting.findByIdAndUpdate(id, { status }, { new: true });

        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        res.status(200).json({ message: "Status updated successfully", meeting });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};






//todo--- add availabilty model as well


module.exports = { getMeetings, addEvent, updateMeeting, deleteMeeting, updateMeetingStatus }