var express = require('express');
var router = express.Router();
var render = require('../view_system/view_system');
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

router.get('/', ensureAuthenticated, function (req, res) {

    //res.render('index', {content:"purchase_history", cache: false});
    render('purchase_history', req, res);
})

module.exports = router;