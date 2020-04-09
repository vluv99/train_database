/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var oracledb = require('oracledb');

app.use(bodyParser.json());
*/
/*
var connect = {
    "user": "asd",
    "password": "asd",
    "connectString": "130.35.54.34/XE"
}
*/
/*
void getConnection(Object connect, function(Error error, Connection conn){});

void execute(String sql, [Object bindParams, [Object options,]] function(Error error, [Object result]){});
*/


var express = require('express');
const Trip = require('./data/Trip.js');

var app = express();

var trips = [new Trip(), new Trip()];
trips[1].name = "notBela";

app.use(express.static('site'));

app.get('/trains', function (req, res) {
   //res.send('Hello World!');
   res.json(trips);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})