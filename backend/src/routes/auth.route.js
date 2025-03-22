const express = require("express")
const { signup, login, logout, setting, checkAuth, about } = require("../controllers/auth.controller")
const protectRoute = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.put("/about", protectRoute, about); // User must be authenticated
router.post("/logout", logout)
router.put("/setting", protectRoute, setting) //put to update , protectRoute-for only valid user
router.get("/check", protectRoute, checkAuth)


//todo--- create meeting model and routes

module.exports = router