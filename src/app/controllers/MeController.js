const course = require('../models/coures')
class meController {
    async listStoredCourses(req, res){
        var countcheck
        try {
            const countDeletedCourse = await course.countDocumentsDeleted()
            const listCourses = await course.find({}).lean()
            
            console.log(countDeletedCourse)
            if (countDeletedCourse>0) {countcheck = true}
            else {countcheck = false }
            res.render('me/storedCourses', {listCourses, countcheck,countDeletedCourse})
            //res.json(listCourses)
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
    async listStoredDeletedCourses(req, res){
        try {
       // Truy xuất các khóa học đã bị xóa (soft delete)
       const listDeletedCourses = await course.findDeleted({}).lean()

    
            res.render('me/deletedCourses', {listDeletedCourses})
            console.log(listDeletedCourses)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async destroyCourse(req, res){
        try {
            await course.deleteOne({_id: req.params.id})
            res.redirect('back')
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
        async restoreCourse(req, res){
            try {
                await course.restore({_id: req.params.id})
                await course.updateOne({ _id: req.params.id }, { $set: { deleted: false } });
                res.redirect('back')
                
            } catch (error) {
                res.status(500).json(error)
                console.log(error)            
            }
        }
}
module.exports = new meController