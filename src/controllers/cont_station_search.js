var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../authenticate/auth.js') 

var multer = require('multer');
var upload = multer();

const Station = require('../model/station');
var DAO = require("../database/DAO.js");

var dao = new DAO((err) => { console.error(err) });

router.get('/', upload.none(), function (req, res) {

    if (req.query.search) {

        dao.getStationByName(req.query.search, (result, error) => {
            if (error) {
                res.status(500).send("Database Error with stations");
                console.error(error);
            } else {
                res.send(JSON.stringify(result));
            }
        },
            (err) => {
                console.error(err);
                res.status(500).send("Database Error with stations");
            })
    }else{
        res.send("[]");
    }
})

router.get('/all', upload.none(), function (req, res) {

    dao.getAllStations((result, error) => {
        if (error) {
            res.status(500).send("Database Error with stations all");
            console.error(error);
        } else {
            res.send(JSON.stringify(result));
        }
    },
        (err) => {
            console.error(err);
            res.status(500).send("Database Error with stations all");
        })
})

module.exports = router;

