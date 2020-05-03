var express = require('express');
var router = express.Router();
var render = require('../view_system/view_system');
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

router.post('/', ensureAuthenticated, function (req, res) {
    req.logout();
    res.redirect('/');
    req.user = null;
 })

 module.exports = router;