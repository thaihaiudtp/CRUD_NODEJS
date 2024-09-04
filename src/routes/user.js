const express = require('express')
const router = express.Router()
const userProcess = require('../app/controllers/UserProcess')
const controllJWT = require('../app/middleware/verifyToken')
//[POST]
router.post('/register', userProcess.register)
router.post('/login', userProcess.login)
//[GET]
router.get('/homeregister', userProcess.homeRegister)
router.get('/login', userProcess.homeLogin)
router.get('/forgetpass', userProcess.forgotPassword)
router.get('/current', controllJWT.verifyAccessToken, userProcess.getOne)
router.post('/refreshToken', userProcess.refreshAccessToken)
router.post('/logout', userProcess.logout)
router.put('/resetpass', userProcess.resetPassword)
module.exports = router