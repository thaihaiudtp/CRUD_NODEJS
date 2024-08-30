const course = require('../models/coures')
class CoursesController{
    create(req, res){
        res.render('course/create')
    }

    async listToupdate(req, res){
        try {
            const courses = await course.find({}).lean()
            res.render('course/update', {courses})  
        } catch (error) {
            res.status(400).json({error: 'ERROR!!!'})
        }

    }
    async createAdd(req, res) {
        
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
    async toUpdate(req, res){
        try {
            const oneUpdateCourse = await course.findById(req.params.id).lean()
            res.render('course/updateOne', {oneUpdateCourse})
        } catch (error) {
            res.status(500).send('Server Error')
        }
    }
    async updateCourse(req, res){
        try {
            const Course = await course.findById(req.params.id);

            const updateData = {
                name: req.body.name || Course.name,
                description: req.body.description || Course.description,
                video: req.body.video || Course.video,
                price: req.body.price || Course.price,
                level: req.body.level || Course.level
            };
    
            const updatedCourse = await course.findByIdAndUpdate(
                req.params.id,
                { $set: updateData },
                { new: true, runValidators: true }
            )
            res.redirect('/courses/update')
            //res.status(200).json({updatedCourse})
        } catch (error) {
            res.status(500).send('Server Error')
            console.log(error)
        }
    }
}
module.exports = new CoursesController