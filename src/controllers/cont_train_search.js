var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

var multer = require('multer');
var upload = multer();

const Trip = require('../model/Trip.js');
var DAO = require("../database/DAO.js");

var dao = new DAO((err)=> {console.error(err)});

router.get('/', upload.none(), function (req, res) {
    
    let d = Date.parse(req.query.day)
    var date = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    date += "/" + new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    date += "/" + new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)

    //res.send(date);
//"20/MAY/2020"

    dao.searchTrains(req.query.from, req.query.to, date, (result)=>{
        res.contentType('application/json').status(200);
             res.send(JSON.stringify(result));
    },
    (err)=>{
        console.error(err);
        res.status(500).send("Database Error with trip search");
    })
    
})

 module.exports = router;