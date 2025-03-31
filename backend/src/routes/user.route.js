const express = require("express")
const router = express.Router()
const protectRoute = require("../middleware/auth.middleware");
const { getProfile, getUsersByEmails, getAvail, postAvail, updateProfile, } = require("../controllers/user.controller");



router.get("/profile", protectRoute, getProfile)  //api/user/profile
router.post("/getusersbyemails", protectRoute, getUsersByEmails)

router.get("/get-avail", protectRoute, getAvail)
router.post("/post-avail", protectRoute, postAvail)
router.put("/update-profile", protectRoute, updateProfile) //FOR SETTING PAGE



module.exports = router