const jwt = require("jsonwebtoken")
const { catchAsync } = require("./catchAsync")
exports.generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}