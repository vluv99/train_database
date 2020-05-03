var express = require('express');
var router = express.Router();
var render = require('../view_system/view_system');
var {ensureAuthenticated} = require('../authenticate/auth.js') 
//authenticate user 

var DAO = require("../database/DAO.js");
var dao = new DAO((err) => { console.error(err) });

router.get('/', ensureAuthenticated, function (req, res) {
    
    dao.GetWorkerData(req.query.id, (result, err) => {

        render('salary_management', req, res, result);
        //console.log(req.query);
    });
    
})

module.exports = router;