const express = require('express')
const path = require('path')
const app = express()
const hbs = require('express-handlebars')

const route = require('./routes')
const dbConnect = require('./config/db/dbConnect')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
// template engine
app.engine('hbs', hbs.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs');
app.set('views', './src/resource/view')
//db
dbConnect.connect()
const port = 3004
route(app)
app.listen(port, ()=>{
    console.log(`Web is running in port ${port}`)
})