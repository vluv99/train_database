var render = require('../view_system/view_system');

module.exports = function(req, res) {
    //res.render('index', {content:"leaves", cache: false});
    render('leaves', req, res);
}