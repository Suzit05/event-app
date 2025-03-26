const express = require("express")
const protectRoute = require("../middleware/auth.middleware");
const { getMeetings, addEvent, updateMeeting, deleteMeeting, updateMeetingStatus, getUsersByEmails, getMeetingRespond, getMeetingstatus } = require("../controllers/meeting.controller");
const router = express.Router()

router.post("/addEvent", protectRoute, addEvent)

router.get("/getMeetings", protectRoute, getMeetings);
router.put("/update/:id", protectRoute, updateMeeting)  //api/meeting/update/:id
router.delete("/delete/:id", protectRoute, deleteMeeting)
router.put("/updatestatus/:id", protectRoute, updateMeetingStatus);


module.exports = router