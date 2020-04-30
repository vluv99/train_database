var render = require('../view_system/view_system');

module.exports.index = function(req, res) {
    //res.render('index', {content:"trip_planner", cache: false});
    render('trip_planner', req, res);
}   