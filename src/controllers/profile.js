var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js')

router.get('/',
    
    function (req, res) {
        console.log(req.user);
        if(req.user)
        res.render('index', {content:"profile", cache: false, user:req.user});
        else
        res.send('index');
    }
)


module.exports = router;
//req.user 