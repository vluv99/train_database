module.exports = function(req, res) {
    res.render('index', {content:"profile", cache: false});
}