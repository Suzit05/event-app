const express = require("express");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const meetingRoutes = require("./routes/meeting.route")
const availRoutes = require("./routes/avail.route")
const connectDB = require("./lib/db");


dotenv.config()
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true
}));


app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT


app.use("/api/auth", authRoutes)
app.use("/api/meeting", meetingRoutes)
app.use("/api/avail", availRoutes) //ye avail wala pr dhyn dena


app.get("/", (req, res) => {
    res.send("welcome to event management")
})

app.listen(PORT, () => {
    console.log(`listening to ${PORT}⚡`)
    connectDB()
})