var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

const Worker = require('../model/worker');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.get('/all', ensureAuthenticated, function (req, res) {

    dao.getAllWorkers((result, error) => {
        if (error) {
            res.status(500).send("Database Error with workers all");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
        }
    },
        (err) => {
            console.error(err);
            res.status(500).send("Database Error with workers all");
        })
})

//'/edit_wage?id=0&wage=10'
router.post('/edit_wage', function (req, res) {
    console.log(req.query);
    dao.editWorkerWage(req.query.wage,req.query.id,(result, error) => {
        if (error) {
            res.status(500).send("Database Error with workers wage edit");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
            console.log(req.body);
            console.log(req.query);
        }
    });

})

router.post('/add_worker', function (req, res) {
    console.log(req.query);
    dao.addWorker(req.body.user, req.body.tax, req.body.work, req.body.address, req.body.hourly,(result, error) => {
        if (error) {
            res.status(500).send("Database Error with add worker");
            console.error(error);
        } else {
            res.redirect('/salary_management?username=' + req.body.user);
            console.log(req.body);
            console.log(req.query);
        }
    });

})


module.exports = router;