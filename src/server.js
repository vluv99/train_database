
var express = require('express');
const transformMiddleware = require('express-transform-bare-module-specifiers').default;

const bodyParser = require('body-parser');

const Trip = require('./data/Trip.js');
var oracledb = require('oracledb');


var connect = {
   "user": "TRAINUSER",
   "password": "mavlogin",
   "connectString": "192.168.56.1:1521/XEPDB1"
}

var app = express();

app.use(express.static('site'));
app.use('/node_modules/*',express.static('node_modules'));
app.use('*', transformMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

      connection.execute("SELECT * FROM JEGY", {}, {
         outFormat: oracledb.OBJECT // Return the result as Object
      }, function (err, result) {
         if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
               status: 500,
               message: "Error getting the jegyek",
               detailed_message: err.message
            }));
         } else {
            res.contentType('application/json').status(200);
            res.send(JSON.stringify(result.rows));
            console.log(req);
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
});




var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})