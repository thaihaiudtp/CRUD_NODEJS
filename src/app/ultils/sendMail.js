const nodemailer = require("nodemailer");
require('dotenv').config()
const sendMail = async ({email, html}) => {
  console.log('Email Name:', process.env.EMAIL_NAME); // Kiểm tra giá trị của biến EMAIL_NAME
console.log('App Password:', process.env.APP_PASSWORD); // Kiểm tra giá trị của biến APP_PASSWORD

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.APP_PASSWORD,
        },
      })

        let info = await transporter.sendMail({
        from: '"Anh Hà đẹp trai" <toilaha@toilaha.com>', // sender address
        to: email, // list of receivers
        subject: "CHANGE PASSWORD", // Subject line
        html: html, // html body
        })
        return info
}

module.exports = sendMail