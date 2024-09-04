const newsRouter = require('./news')
const sitrRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')
const user = require('./user')
function route(app){
    app.use('/user', user)
    app.use('/news', newsRouter)
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)
    app.use('/', sitrRouter)

}
module.exports = route