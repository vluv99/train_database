
var render = require('../view_system/view_system');

module.exports = function(req, res) {
    //res.render('index', {content:"worker_data", cache: false});
    render('worker_data', req, res);
}