module.exports = function(req, res) {
    res.render('index', {content:"stations", cache: false});
}