var express = require('express');
var router = express.Router();


var render = require('../view_system/view_system');
var dateFormat = require('../util/dateConverter')[0];

var DAO = require("../database/DAO.js");
var dao = new DAO((err) => { console.error(err) });

router.get('/', function (req, res) {

    dao.getTrip(req.query.from,req.query.to,dateFormat(req.query.day),req.query.id,(result,err)=>{
        result.day = req.query.day;
        result.price = req.query.price;
        render('ticket_buy', req, res, result);

    });

});

router.post('/', function(req,res){

    

});

module.exports = router;