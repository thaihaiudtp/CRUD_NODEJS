const express = require('express')
const methodOverride = require('method-override');
const path = require('path')
const app = express()
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const route = require('./routes')
const dbConnect = require('./config/db/dbConnect')
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}))
require('dotenv').config()
// Sử dụng method-override
app.use(methodOverride('_method'));
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))  
// template engine
app.engine('hbs', hbs.engine({ 
    extname: '.hbs', 
    helpers: {
       sum: function(a,b) {return a + b}
    }
}))
app.set('view engine', 'hbs');
app.set('views', './src/resource/view')
//db
dbConnect.connect()
const port = 3004
route(app)
app.listen(port, ()=>{
    console.log(`Web is running in port ${port}`)
})