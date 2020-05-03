var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

const Worker = require('../model/worker');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.get('/all', ensureAuthenticated, function (req, res) {

    dao.getAllTicketData(req.user.username, (result, error) => {
        if (error) {
            res.status(500).send("Database Error with tickets all");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
        }
    },
        (err) => {
            console.error(err);
            res.status(500).send("Database Error with tickets all");
        })
})

router.get('/', function (req, res) {

    dao.getTicketData(req.user.username, req.query.name, (result, error) => {
        if (error) {
            res.status(500).send("Database Error with tickets all");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
        }
    },
        (err) => {
            console.error(err);
            res.status(500).send("Database Error with tickets all");
        })
})

module.exports = router;
