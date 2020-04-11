
var express = require('express');
const Trip = require('./data/Trip.js');
var oracledb = require('oracledb');


var connect = {
   "user": "TRAINUSER",
   "password": "mavlogin",
   "connectString": "localhost:1521/XEPDB1"
}

var app = express();

var trips = [new Trip(), new Trip()];
trips[1].name = "notBela";

app.use(express.static('site'));

app.get('/trains', function (req, res) {
   //res.send('Hello World!');
   res.json(trips);
})

// Http Method: GET
// URI        : /user_profiles
// Read all the user profiles
app.get('/trips', function (req, res) {
   "use strict";

   oracledb.getConnection(connect, function (err, connection) {
      if (err) {
         // Error connecting to DB
         res.set('Content-Type', 'application/json');
         res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
         }));
         return;
      }

      // Release the connection
      connection.release(
         function (err) {
            if (err) {
               console.error(err.message);
            } else {
               console.log("GET /user_profiles : Connection released");
            }
         });
   });
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})