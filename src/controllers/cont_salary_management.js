var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

var dateFormat = require('../util/dateConverter')[0];

const WorkHours = require('../model/workHours');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.get('/all', ensureAuthenticated, function (req, res) {
    console.log(req.query);
    dao.listAllWorkedHoursByUser(req.query.id, (result, error) => {
        if (error) {
            res.status(500).send("Database Error with salary listing");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
        }
    },
        (err) => {
            console.error(err);
            res.status(500).send("Database Error with salary listing");
        })
})

router.post('/add_hours', function (req, res) {
    console.log(req.query);     //worker id? or username from url?
    dao.addWorkedHoursToWorker(req.body.id, dateFormat(req.body.date), req.body.hours, (result, error) => {
        if (error) {
            res.status(500).send("Database Error with add hours");
            console.error(error);
        } else {
            res.redirect('/salary_management?id=' + req.body.id);
            console.log(req.body);
            console.log(req.query);
        }
    });

})

router.delete('/delete_hours', function (req, res) {
    console.log(req.query);
    dao.deleteWorkersHours(req.query.id, (result, error) => {
        if (error) {
            res.status(500).send("Database Error with delete hours");
            console.error(error);
        } else {
            res.redirect('/salary_management?username=' + req.body.user);
            console.log(req.body);
            console.log(req.query);
        }
    });

})

module.exports = router;
