var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();

const Trip = require('../model/Trip.js');
var DAO = require("../database/DAO.js");

var dao = new DAO((err)=> {console.error(err)});

router.get('/',upload.none(), function (req, res) {
    
    dao.searchTrains(null, (result)=>{
        res.contentType('application/json').status(200);
             res.send(JSON.stringify(result));
             console.log(req.body);
             console.log(req.query);
    },
    (err)=>{
        console.error(err);
        res.status(500).send("Database Error with trip search");
    })
    
})

 module.exports = router;