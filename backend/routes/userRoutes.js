const express = require("express")
const router = express.Router()
const { registerValidations, loginValidations, updateProfileValidations } = require("../validators/userValidator")
const { register, getAllUsers, login, getProfile, updateProfile } = require("../contollers/userController")
const { protect } = require("../middlewares/authMiddleware")

router.post('/register', registerValidations, register)
router.post('/login', loginValidations, login)
router.get('/profile', protect, getProfile);
router.put('/update-profile/:id', protect, updateProfileValidations, updateProfile)
router.get("/users", getAllUsers)


module.exports = router
