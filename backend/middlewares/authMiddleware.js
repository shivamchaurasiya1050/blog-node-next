const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { catchAsync } = require("../utils/catchAsync");
const catchAsyncError = require("./catchAsyncError");


exports.protect = catchAsyncError(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        const err = new Error('No authorize, no token provided!')
        err.status = 401
        return next(err)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id)
    if (!user) {
        const err = new Error("Please login again!")
        err.status = 401
        return next(err)
    }
    req.user = user
    next()
})