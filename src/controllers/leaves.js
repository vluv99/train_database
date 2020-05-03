var express = require('express');
var router = express.Router();
var render = require('../view_system/view_system');
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user

router.get('/', ensureAuthenticated, function (req, res) {
    //res.render('index', {content:"leaves", cache: false});
    render('leaves', req, res);
})

module.exports = router;