var express = require('express');
var render = require('../view_system/view_system');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js')

router.get('/', ensureAuthenticated, function (req, res) {
        if(req.user)
        render('profile', req, res);
        else
        res.send('index');
    }
)

module.exports = router;
//req.user 