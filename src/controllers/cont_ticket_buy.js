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

    console.log(req.body);

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

    if(req.body.category <= 3){

        dao.buyTicket(data, (result, err)=>{
            if(!err){
                res.redirect('/');
            }
            else{
                res.send(err);
            }
        })
    }
    else if (req.body.category == 4){

        var army = createGroupArray(req.body);

        army.forEach(element => {
            data.passenger_name = element.name;
            data.passenger_email = element.email;

            dao.buyTicket(data, (result, err)=>{
                if(!err){
                    
                }
                else{
                    res.send(err);
                }
            })
        });
        res.redirect('/');
    }

});

function createGroupArray(data){

    var res = [];

    var person = {}

    if (data.travellerName1 != "" && data.travellerMail1 != "") {
        res[0]={ name: data.travellerName1, email: data.travellerMail1};
    }

    if (data.travellerMail2 != "" && data.travellerMail2 != "") {
        res[1]={ name: data.travellerName2, email: data.travellerMail2};
    }
    
    if (data.travellerMail3 != "" && data.travellerMail3 != "") {
        res[2]={ name: data.travellerName3, email: data.travellerMail3};
    }

    if (data.travellerMail4 != "" && data.travellerMail4 != "") {
        res[3]={ name: data.travellerName4, email: data.travellerMail4};
    }

    if (data.travellerMail5 != "" && data.travellerMail5 != "") {
        res[4]={ name: data.travellerName5, email: data.travellerMail5};
    }

    if (data.travellerMail6 != "" && data.travellerMail6 != "") {
        res[5]={ name: data.travellerName6, email: data.travellerMail6};
    }

    if (data.travellerMail7 != "" && data.travellerMail7 != "") {
        res[6]={ name: data.travellerName7, email: data.travellerMail7};
    }

    if (data.travellerMail8 != "" && data.travellerMail8 != "") {
        res[7]={ name: data.travellerName8, email: data.travellerMail8};
    }

    if (data.travellerMail9 != "" && data.travellerMail9 != "") {
        res[8]={ name: data.travellerName9, email: data.travellerMail9};
    }

    if (data.travellerMail10 != "" && data.travellerMail10 != "") {
        res[9]={ name: data.travellerName10, email: data.travellerMail10};
    }

    return res;

}

module.exports = router;