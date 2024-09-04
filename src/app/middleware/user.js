const jwt = require('jsonwebtoken')

const genAccessToken = (id, admin) => jwt.sign({
    _id: id,
    admin
}, 
"secretkey",
{
    expiresIn: "2d"
}
)
const genRefreshToken = (id) => jwt.sign({
    _id: id
},
"secretkey",
{
    expiresIn: "7d"
}
)

module.exports = {
    genAccessToken, 
    genRefreshToken
}
