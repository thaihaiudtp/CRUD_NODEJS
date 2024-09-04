const course = require('../models/coures')
class SiteController{
    async home(req, res){
        try {
            let courses = await course.find({}).lean()
            courses = courses.sort(() => Math.random() - 0.5);
            res.render('home', {
                courses
            })
            //res.json(course)
        } catch (error) {
            res.status(400).json({error: 'ERROR!!!'})
            console.log(error)
        }
    }
    search(req, res){
        res.render('search')
    }
}
module.exports = new SiteController