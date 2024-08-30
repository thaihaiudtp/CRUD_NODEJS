const mongoose = require('mongoose')

async function connect() {
    try{
        await mongoose.connect('mongodb://localhost:27017/CRUD_LEARN')
        console.log('Connection')
    } catch(error) {
        console.log('That bai')
    }

}
module.exports = {connect}