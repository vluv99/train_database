module.exports = function(req, res) {
    res.render('index', {content:"leaves", cache: false});
}