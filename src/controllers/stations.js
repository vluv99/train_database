var render = require('../view_system/view_system');

module.exports = function(req, res) {
    //res.render('index', {content:"stations", cache: false});
    render('stations', req, res);
}