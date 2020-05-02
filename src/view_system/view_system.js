module.exports = function renderView(view , req, res, data){
    res.render('index', {content:view, cache: false, user:req.user, data:data});

}