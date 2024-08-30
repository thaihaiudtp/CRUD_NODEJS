const course = require('../models/coures')
class SiteController{
    async home(req, res){
        try {
            const courses = await course.find({}).lean()
            res.render('home', {
                courses
            })
            //res.json(course)
        } catch (error) {
            res.status(400).json({error: 'ERROR!!!'})
        }
    }
    search(req, res){
        res.render('search')
    }
}
module.exports = new SiteController