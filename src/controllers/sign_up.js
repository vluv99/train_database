var render = require('../view_system/view_system');

module.exports = function(req, res) {
    //res.render('index', {content:"sign-up", cache: false});
    render('sign_up', req, res);
}