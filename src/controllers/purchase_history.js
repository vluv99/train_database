
var render = require('../view_system/view_system');

module.exports = function(req, res) {
    //res.render('index', {content:"purchase_history", cache: false});
    render('purchase_history', req, res);
}