var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../authenticate/auth.js')
//authenticate user 
var dateFormat = require('../util/dateConverter')[0];

var render = require('../view_system/view_system');
var dateFormat = require('../util/dateConverter')[0];

var DAO = require("../database/DAO.js");
var dao = new DAO((err) => { console.error(err) });

router.get('/', ensureAuthenticated, function (req, res) {

    dao.getTrip(req.query.from, req.query.to, dateFormat(req.query.day), req.query.id, (result, err) => {
        result.day = req.query.day;
        result.price = req.query.price;
        render('ticket_buy', req, res, result);

    });

});

router.post('/', function (req, res) {

    //USERNAME, UT, --, --, KATEGORIA, AR,UTAS_NEV, UTAS_EMAIL, HONNA, HOVA
    let data = {};
    data.username = req.user.username;
    data.ut = req.body.id;
    data.category = req.body.category;
    data.price = req.body.finalPrice;
    data.passenger_name = req.body.travellerName;
    data.passenger_email = req.body.travellerMail;
    data.from = req.body.from;
    data.to = req.body.to;
    data.depart = req.body.depart.trim();

    dao.buyTicket(data, (result, err)=>{
        if(!err){
            res.redirect('/');
        }
        else{
            res.send(err);
        }
    })

});

module.exports = router;