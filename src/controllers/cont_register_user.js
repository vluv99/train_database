var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 

var multer = require('multer');
var upload = multer();

const User = require('../model/user.js');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.post('/', upload.none(), function (req, res) {

    dao.findUserByNicName(req.body.user, (found, err) => {
        if (found == null) {

            let d = Date.parse(req.body.birth)
            var date = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
            date += "/" + new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
            date += "/" + new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)

            dao.register(req.body.user, req.body.pass, date, req.body.mail, req.body.name, req.body.card, (result, error) => {
                if (error) {
                    res.status(500).send("Database Error with register");
                    console.error(error);
                } else {


                    res.redirect('/');
                }
            });
        }
    });
})

module.exports = router;