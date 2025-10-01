const { rateLimit } = require("express-rate-limit")

const createRateLimiter = ({ windowMs, limit, message }) => {
    return rateLimit({
        windowMs,
        limit,
        handler: (req, res, next, options) => {
            const retrysecs = Math.ceil((req.rateLimit.resetTime - new Date()) / 1000)
            const minutes = Math.floor(retrysecs / 60)
            const seconds = minutes % 60
            return res.status(429).json({ success: false, message: `${message} ${minutes}m ${seconds}s` || `Too many request, Please try again after ${message} ${minutes}m ${seconds}s` })
        }
    })
}
module.exports = createRateLimiter   