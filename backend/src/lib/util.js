const jwt = require("jsonwebtoken")

const generateToken = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    res.cookie('jwt', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //ms , 10 days
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", //cross site attack
        secure: process.env.NODE_ENV !== "development"
    }) //token cookie m dala gya

    return token;
}


module.exports = generateToken