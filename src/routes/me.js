const express = require('express')
const router = express.Router()
const meController = require('../app/controllers/MeController')
//[UPDATE]
router.get('/stored/courses', meController.listStoredCourses)
router.get('/trash/courses', meController.listStoredDeletedCourses)
router.delete('/trash/courses/:id', meController.destroyCourse)
router.patch('/restored/:id', meController.restoreCourse)
module.exports = router