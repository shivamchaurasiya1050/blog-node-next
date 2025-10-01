const { User } = require('../models')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const { generateToken } = require('../utils/generateToken')
const catchAsyncError = require('../middlewares/catchAsyncError')


exports.register = catchAsyncError(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let err = new Error("Validation failed");
        err.status = 422;
        err.errors = errors.array();
        throw err;
    }
    const body = req.body
    const existingUser = await User.findOne({ where: { email: body.email } })
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already registered"
        })
    }
    const hashPassword = await bcrypt.hash(body.password, 10)
    const newUser = await User.create({ ...body, password: hashPassword })
    return res.status(201).json({
        success: true,
        message: "Registeration successfully",
        data: newUser
    })
})

// login--
exports.login = catchAsyncError(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let err = new Error("Validation failed");
        err.status = 422;
        err.errors = errors.array();
        throw err;
    }
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
        const err = new Error("Invalid credentials")
        err.status = 401
        throw err
    }
    const isMatchedPassword = await bcrypt.compare(password, user.password)
    if (!isMatchedPassword) {
        const err = new Error("Invalid credentials")
        err.status = 401
        throw err
    }
    const token = generateToken({ id: user.id, email: user.email })

    const { password: pwd, ...userData } = user.toJSON()
    return res.status(200).json({
        message: "Login successfully!",
        data: userData,
        token
    })
})


// get all users

exports.getAllUsers = catchAsyncError(async (req, res) => {
    let { page, limit, search } = req.query
    page = parseInt(page || 1)
    limit = parseInt(limit || 10)
    if (limit > 5) limit = 5
    const offset = (page - 1) * limit

    let whereCondition = {}
    if (search) {
        whereCondition = {
            [Op.or]: [
                { firstName: { [Op.like]: `%${search}%` } },
                { lastName: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        }
    }
    const { count, rows } = await User.findAndCountAll({
        where: whereCondition,
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]]
    })

    if (!rows || rows.length == 0) {
        const err = new Error('User not found!')
        err.status = 404
        throw err
    }
    const totalPage = Math.ceil(count / limit)
    return res.status(200).json({
        success: true,
        message: "Users find successfully!",
        data: rows,
        pagination: {
            totalItems: count,
            currentPage: page,
            totalPage: totalPage,
            pageSize: limit
        }
    })
}
)

exports.getProfile = catchAsyncError(async (req, res) => {
    const { id } = req?.user;
    const userData = await User.findByPk(id, {
        attributes: { exclude: ['password', "createdAt", 'updatedAt'] }
    })
    if (!userData) {
        const err = new Error("User not found!")
        err.status = 404
        return err
    }
    return res.status(200).json({
        success: true,
        message: "Fetch data successfully!",
        data: userData
    })

})

exports.updateProfile = catchAsyncError(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = new Error("Validation error!")
        err.status = 422
        err.errors = errors.array()
        throw err
    }
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
        const err = new Error('User not found!')
        err.status = 404
        return err
    }
    const allowedFields = ['firstName', 'lastName', 'email', 'password']
    let updates = {}
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field]
        }
    })
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10)
    }
    await user.update(updates)
    const { password: password, ...updatedData } = user.toJSON()
    return res.status(200).json({
        success: true,
        message: "Profile updated successfully!",
        data: updatedData
    })

})
