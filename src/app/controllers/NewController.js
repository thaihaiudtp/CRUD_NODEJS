class NewController{
    //[GET] /news
    index(req, res){
        res.render('news')
    }
    slug(req, res){
        res.send('Hi!!!')
    }
}
module.exports = new NewController