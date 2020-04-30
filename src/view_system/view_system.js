module.exports = function renderView(view , req, res){
    res.render('index', {content:view, cache: false, user:req.user});

}