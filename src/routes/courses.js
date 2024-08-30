const express = require('express')
const router = express.Router()
const coursesController = require('../app/controllers/CoursesController')
router.get('/create', coursesController.create)
router.get('/update', coursesController.listToupdate)
router.get('/update/:id', coursesController.toUpdate)
router.post('/update/:id', coursesController.updateCourse)
router.post('/create', coursesController.createAdd)
router.get('/:slug', coursesController.show)

module.exports = router;