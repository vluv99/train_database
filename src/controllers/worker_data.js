module.exports = function(req, res) {
    res.render('index', {content:"worker_data", cache: false});
}