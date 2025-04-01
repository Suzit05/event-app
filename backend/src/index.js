const express = require("express");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const meetingRoutes = require("./routes/meeting.route")

const userRoutes = require("./routes/user.route")
const connectDB = require("./lib/db");


dotenv.config()
const app = express();
const cors = require("cors");



app.use(cors({
    origin: ["http://localhost:5173", "https://event-app-pearl-iota.vercel.app", "https://event-app-git-main-suzit05s-projects.vercel.app"], // Allow both local and deployed frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

app.options("*", cors());  // Handle preflight requests

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT


app.use("/api/auth", authRoutes)
app.use("/api/meeting", meetingRoutes)

app.use("/api/user", userRoutes)


app.get("/", (req, res) => {
    res.send("welcome to event management")
})

app.listen(PORT, () => {
    console.log(`listening to ${PORT}⚡`)
    connectDB()
})