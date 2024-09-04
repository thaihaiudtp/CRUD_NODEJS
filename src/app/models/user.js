const mongoose = require('mongoose')
const  Schema  = mongoose.Schema
const crypto = require('crypto-js')
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    role:{type: String, default: "user"},
    telephone: {type: String, default: null},
    passwordChangeAy: {type: String},
    passwordResetToken: {type: String},
    passwordResetExpires: {type: String},
    refreshToken: {type: String}
}, {
    timestamps: true
})
userSchema.methods.createPasswordChangedToken = function(){
    console.log('Method createPasswordChangedToken is called');
        const resetToken = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex)

        this.passwordResetToken = crypto.SHA256(resetToken).toString(crypto.enc.Hex)
       
        this.passwordResetExpires = Date.now() + 15*60*1000
        return resetToken
        
    }

module.exports = mongoose.model('user', userSchema)