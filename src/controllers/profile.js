var express = require('express');
var render = require('../view_system/view_system');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js')

router.get('/',
    
    function (req, res) {
        console.log(req.user);
        if(req.user)
        //res.render('index', {content:"profile", cache: false, user:req.user});
        render('profile', req, res);
        else
        res.send('index');
    }
)


module.exports = router;
//req.user 