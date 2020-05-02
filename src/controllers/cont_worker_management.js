var express = require('express');
var router = express.Router();

const Worker = require('../model/worker');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.get('/all', function (req, res) {

    dao.getAllWorkers((result, error) => {
        if (error) {
            res.status(500).send("Database Error with workers all");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
            console.log(req.body);
            console.log(req.query);
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


module.exports = router;