const newsRouter = require('./news')
const sitrRouter = require('./site')
const coursesRouter = require('./courses')
function route(app){
    app.use('/news', newsRouter)
    app.use('/courses', coursesRouter)
    app.use('/', sitrRouter)
}
module.exports = route