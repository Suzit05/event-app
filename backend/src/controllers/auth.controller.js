//so that , in routes we dont have to write too many code
const User = require("../models/user.model")
const generateToken = require("../lib/util")
const bcrypt = require("bcryptjs")

const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be 6 characters atleast" })
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exist" });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt) //password hash ho gya 10 rounds

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            //generate jwt token here ,(utils folder) 
            generateToken(newUser._id, res) //newUser bnaye hai upr, _id = mongodb default bnata hai
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,

            })
        }


        else {
            res.status(400).json({ message: "Invalid User Data" })
        }
    }

    catch (error) {
        console.log("Error in sign up controller", error.message)
        res.status(500).json({ message: "Internal Server error" })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password) //password that entered and password thats in the db
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,

        })

    }
    catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(400).json({ message: "Internal server error" })
    }
}

const logout = (req, res) => {
    //logout m cookie clear kr do
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" })
    }
    catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(400).json({ message: "Internal server error" })
    }
}

const setting = async (req, res) => {
    const userId = req.user._id; // Extract user ID from JWT token
    const { firstName, lastName, email, password } = req.body;

    try {
        // Find user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email is being updated and ensure it's unique
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" });
            }
            user.email = email;
        }

        // Update other fields if provided
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;

        // If password is provided, hash it before updating
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save updated user
        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });

    } catch (error) {
        console.error("Error in settings controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    }
    catch (error) {
        console.log("Error in checkAuth", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}



module.exports = { signup, login, logout, setting, checkAuth }