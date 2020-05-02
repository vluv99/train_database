var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();

const Salary = require('../model/salary');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.post('/', upload.none(), function (req, res) {

    dao.addSalaryToWorker(/*missing statements*/(result, error) => {
        //console.log("in the dao now!");
        if (error) {
            res.status(500).send("Database Error with add salary");
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
            res.status(500).send("Database Error with add salary");
        })
})

module.exports = router;