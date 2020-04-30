var render = require('../view_system/view_system');

module.exports = function(req, res) {
    //res.render('index', {content:"trains", cache: false});
    render('trains', req, res);
}