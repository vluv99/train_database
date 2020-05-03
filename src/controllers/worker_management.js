var express = require('express');
var router = express.Router();
var render = require('../view_system/view_system');
var { ensureAuthenticated } = require('../authenticate/auth.js') //authenticate user example

router.get('/', ensureAuthenticated, function (req, res) {
    //res.render('index', {content:"worker_data", cache: false});
    render('worker_management', req, res);
})

module.exports = router;