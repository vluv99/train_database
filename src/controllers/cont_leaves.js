var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

var dateFormat = require('../util/dateConverter')[0];

const Worker = require('../model/worker');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.get('/all', ensureAuthenticated, function (req, res) {

    dao.getWorkerLeaves(req.user.worker.id,(result, error) => {
        if (error) {
            res.status(500).send("Database Error with leaves listing");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
        }
    },
    (err) => {
        console.error(err);
        res.status(500).send("Database Error withe");
    })
})

router.post('/add_leave', function (req, res) {
    console.log(req.query);
    dao.addWorkerLeaves(req.user.worker.id, dateFormat(req.body.start), dateFormat(req.body.end), req.body.reason,(result, error) => {
        if (error) {
            res.status(500).send("Database Error with add leave");
            console.error(error);
        } else {
            res.redirect('/leaves');
            console.log(req.body);
            console.log(req.query);
        }
    });

})

module.exports = router;