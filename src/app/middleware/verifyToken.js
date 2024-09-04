const jwt = require('jsonwebtoken')

class VerifyToken {
    async verifyAccessToken(req, res, next){
        if(req?.headers?.authorization?.startsWith('Bearer')){
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, "secretkey", function(err, decode){
                if(err){
                    return res.status(401).json({message: "Invalid Token"})
                }
                console.log(decode)
                req.user = decode
                next()
            })
        } else {
            return res.status(401).json({message: "Access Token is missing"})
        }
    }
}

module.exports = new VerifyToken