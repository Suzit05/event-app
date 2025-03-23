const express = require("express")
const protectRoute = require("../middleware/auth.middleware");
const { getMeetings, addEvent, addEvent2 } = require("../controllers/meeting.controller");
const router = express.Router()

router.post("/addEvent", protectRoute, addEvent)
// router.post("/addEvent2", protectRoute, addEvent2)
router.get("/getMeetings", protectRoute, getMeetings);

module.exports = router