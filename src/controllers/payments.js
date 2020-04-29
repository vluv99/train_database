module.exports = function(req, res) {
    res.render('index', {content:"payments", cache: false});
}