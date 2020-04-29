module.exports = function(req, res) {
    res.render('index', {content:"sign-up", cache: false});
}