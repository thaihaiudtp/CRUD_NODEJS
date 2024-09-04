const express = require('express')
const router = express.Router()
const coursesController = require('../app/controllers/CoursesController')
//[POST]
router.post('/actionForm', coursesController.formAction)
//[GET]
router.get('/create', coursesController.create)
router.post('/create', coursesController.createAdd)
//[UPDATE]
router.get('/:id/edit', coursesController.edit)
router.put('/:id', coursesController.update)
//[DELETE]
router.delete('/:id', coursesController.delete)
//[SHOW]
router.get('/:slug', coursesController.show)
module.exports = router;