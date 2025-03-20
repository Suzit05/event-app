const express = require("express")
const protectRoute = require("../middleware/auth.middleware")
const postAvail = require("../controllers/avail.controller")

const router = express.Router()

router.post("/post-avail", protectRoute, postAvail)


module.exports = router