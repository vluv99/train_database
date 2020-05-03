var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 

var multer = require('multer');
var upload = multer();

const Station = require('../model/station');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.post('/', ensureAuthenticated, upload.none(), function (req, res) {

    if(req.body.oldPassword == req.user.password){

        dao.changePassword(req.user.username, req.body.newPassword, (result, error) => {

            if (error) {
                res.status(500).send("Database Error with password change");
                console.error(error);
            } else {
                //res.send(JSON.stringify(result));
                res.send("success");
            }
        },
            (err) => {
                console.error(err);
                res.status(500).send("Database Error with password change");
            })
    }else{
        res.send("old password is incorrect");
    }
})

module.exports = router;