const express = require("express")
const protectRoute = require("../middleware/auth.middleware");
const { getMeetings, addEvent } = require("../controllers/meeting.controller");
const router = express.Router()

router.post("/addEvent", protectRoute, addEvent)
router.get("/getMeetings", protectRoute, getMeetings);

module.exports = router