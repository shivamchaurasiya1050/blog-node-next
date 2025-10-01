module.exports = (err, req, res, next) => {
    console.log(err.name, "jsgjsgfjsg")
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Errer'

    if (err.name === 'TokenExpiredError') {
        err, statusCode = 401
        err.message = "Token expired,Please login again!"
    }
    return res.status(err.statusCode).json({ success: false, message: err.message });
}