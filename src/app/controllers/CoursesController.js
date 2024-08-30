const course = require('../models/coures')
class CoursesController{
    create(req, res){
        res.render('course/create')
    }
    async store(req, res) {
        
        const newCourse = new course(req.body)
        newCourse.image = newCourse.video
        try {
            const creatCourse = await newCourse.save()
            res.render('course/create')
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
    async show(req, res){
        try {
            const oneCourse = await course.findOne({slug: req.params.slug}).lean()
            res.render('course/show', {
                oneCourse
            })
        } catch (error) {
            res.status(404).json({error: 'ERROR!!!'})
        }
    }
}
module.exports = new CoursesController