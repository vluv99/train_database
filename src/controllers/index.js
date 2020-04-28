module.exports.index = function(req, res) {
    res.render('index', {content:"trip_planner", cache: false});
}   