const user = require('../models/user')
const bcrypt = require('bcrypt')
const {genAccessToken, genRefreshToken} = require('../middleware/user')
const jwt = require('jsonwebtoken')
const sendmail = require('../ultils/sendMail')
const crypto = require('crypto-js')
const { PassThrough } = require('nodemailer/lib/xoauth2')
class UserProcess {
    //[POST] /user/register
    async register(req, res){
        try {
            const checkedUser = await user.findOne({email: req.body.email})
            if(!checkedUser){
                const saltRounds = 10
                const userResgister = new user(req.body)
                console.log(userResgister)
                const hashedPassword = await bcrypt.hash(userResgister.password, saltRounds)
                userResgister.password = hashedPassword
                await userResgister.save()
                res.redirect('/')
            } else {
                res.redirect('/user/homeregister?error= Email đã tồn tại')
            }   
            } catch (e) {
                console.error('Error creating course:', e);
                res.status(500).json({ message: 'Internal Server Error', error: e.message });           
            }
    }
    //[GET]
    homeRegister(req, res){
        res.render('user/homeRegister')
    }
    //[GET]
    homeLogin(req, res){
        res.render('user/homeLogin')
    }
    //[POST]
    async login(req, res){
        try {
            const email = req.body.email.trim().toLowerCase()
            const checkEmail = await user.findOne({email: email})
            //console.log(checkEmail)
            if(!checkEmail){
                res.send('user not found')
            } else {
                const isPassword = await bcrypt.compare(req.body.password, checkEmail.password)
                if(isPassword){
                    const accessToken = genAccessToken(checkEmail._id, checkEmail.admin)
                    const refreshToken = genRefreshToken(checkEmail._id)
                    await user.findByIdAndUpdate(checkEmail._id, {refreshToken: refreshToken}, {new: true})
                    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
                    res.json({checkEmail, accessToken})
                } else {
                    res.send('wrong password')
                }
            }

        } catch (error) {
            res.status(404).json({error: 'ERROR!!!'})
            console.log(error)
        }
    }
    async getOne(req, res){
        const {_id} = req.user
        const User = await user.findById(_id).select('-refreshToken -password -role')
        return res.status(200).json({
            success: false,
            rs: User ? User: 'user not found'
        })
    }
    async refreshAccessToken(req, res, next){
        const cookie = req.cookies //lấy từ cookie
        if(!cookie && !cookie.refreshToken){
            throw new Error("no fresh");
        } else {
            const result = jwt.verify(cookie.refreshToken, "secretkey")
            const response = await user.findOne({_id: result._id, refreshToken: cookie.refreshToken})
                console.log(response)
                
                return res.status(200).json({
                    success: response ? true : false,
                    rs: response ? genAccessToken(response._id, response.role) : "refreshToken invalids"
                })
            
        }
    }
    async logout(req, res){
        const cookie = req.cookies
        if (!cookie || !cookie.refreshToken) throw new Error("no refresh token")
        await user.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
        res.clearCookie('refreshToken', {httpOnly: true, security: true})
        return res.status(200).json({
            success: true,
            menubar: "logout!!!"
        })        
    }
    async forgotPassword(req, res){
        const{email} = req.query
        if(!email) throw new Error("missing mail")
        const User = await user.findOne({email})
        if(!User) throw new Error("user not found")
        const resetToken = User.createPasswordChangedToken()
        await User.save()
        const html = `Click vào link để đổi mật khẩu. Link sẽ hết hạn sau 15 phút. <a href=${process.env.URL_SERVER}/user/resetpass/${resetToken}>Click</a>`
        const data = {
            email,
            html
        }
        const rs = await sendmail(data)
        return res.status(200).json({
            rs
        })    
    }
    async resetPassword(req, res){
        const{token, password} = req.body
        const saltRounds = 10
        if(!password || !token) throw new Error("error")
        const passwordResetToken = crypto.SHA256(token).toString(crypto.enc.Hex)
        const User = await user.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}})
        if(!User) throw new Error("error")
        
        User.passwordResetToken = undefined
        User.passwordChangedAt = Date.now()
        const hashPassword = await bcrypt.hash(password, saltRounds)
        User.password = hashPassword
        User.passwordResetExpires = undefined
        await User.save()
        return res.status(200).json({
            success: User ? true:false,
            menubar: "OK!!!"})
    }
}


module.exports = new UserProcess