var express = require('express');
var router = express.Router();
var render = require('../view_system/view_system');
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

router.get('/', function (req, res) {

    //res.render('index', {content:"trip_planner", cache: false});
    render('trip_planner', req, res);
})

module.exports = router;  