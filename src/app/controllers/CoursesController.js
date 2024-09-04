const course = require('../models/coures')
class CoursesController{
    create(req, res){
        res.render('course/create')
    }
    async createAdd(req, res) {
        
        const newCourse = new course(req.body)
        newCourse.image = newCourse.video
        try {
            await newCourse.save()
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
    //[GET] courses/:id/edit
    async edit(req, res){
        try {
            const oneUpdateCourse = await course.findById(req.params.id).lean()
            res.render('course/updateOne', {oneUpdateCourse})
            //res.json(oneUpdateCourse)
        } catch (error) {
            res.status(404).json({error: 'ERROR!!!'})
            console.log(error)
        }
        //res.render('course/updateOne')
    }
    async update(req, res){
        try {
            await course.updateOne({_id: req.params.id}, req.body)
            res.redirect('/me/stored/courses')
        } catch (error) {
            res.status(404).json({error: 'ERROR!!!'})
            console.log(error)
        }
        
    }
    async delete(req, res){
        try {
            await course.delete({_id: req.params.id})
            res.redirect('back')
        } catch (error) {
            res.status(404).json({error: 'ERROR!!!'})
            console.log(error)           
        }
    }
    //post
    async formAction(req, res){
        switch (req.body.action) {
            case 'delete':
                try {
                    await course.delete({_id: {$in: req.body.courseIds}})
                    res.redirect('back')
                } catch (error) {
                    res.status(404).json({error: 'ERROR!!!'})
                    console.log(error)
                }
                break;
        
            default:
                res.json({message: 'action is invalid'})
        }
    }

}
module.exports = new CoursesController