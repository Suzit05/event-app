const express = require("express")
const router = express.Router()
const protectRoute = require("../middleware/auth.middleware");
const getProfile = require("../controllers/user.controller");

router.get("/profile", protectRoute, getProfile)  //api/user/profile


module.exports = router