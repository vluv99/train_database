module.exports = function(req, res) {
    res.render('index', {content:"purchase_history", cache: false});
}