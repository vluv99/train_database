module.exports = function(req, res) {
    res.render('index', {content:"trains", cache: false});
}