var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();

const Station = require('../model/station');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.post('/', upload.none(), function (req, res) {

    if(req.body.oldPassword == req.user.password){
        //console.log("Passwords are matching!");

        dao.changePassword(req.user.username, req.body.newPassword, (result, error) => {
            //console.log("in the dao now!");
            if (error) {
                res.status(500).send("Database Error with password change");
                console.error(error);
            } else {
                //res.send(JSON.stringify(result));
                res.send("success");
                console.log(req.body);
                console.log(req.query);
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