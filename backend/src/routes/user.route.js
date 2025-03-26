const express = require("express")
const router = express.Router()
const protectRoute = require("../middleware/auth.middleware");
const { getProfile, getUsersByEmails } = require("../controllers/user.controller");



router.get("/profile", protectRoute, getProfile)  //api/user/profile
router.post("/getusersbyemails", protectRoute, getUsersByEmails)



module.exports = router