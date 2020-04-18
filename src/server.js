
var express = require('express');
var squirrelly = require('squirrelly');
//const transformMiddleware = require('express-transform-bare-module-specifiers').default;

const bodyParser = require('body-parser');

const Trip = require('./data/Trip.js');
var oracledb = require('oracledb');
var connect = require('./Connection.js');

var app = express();
app.set('view engine', 'ejs')

app.use(express.static('site'));
//app.use('/node_modules/*',express.static('node_modules'));
//app.use('*', transformMiddleware());
app.use(bodyParser.urlencoded({ extended: true }));
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



      connection.execute(
         `SELECT
               traindb.menetrend.nev,
               traindb.menetrend.indulasi_ido,
               startstation.neve         AS "From",
               traindb.allomas.neve      AS "To"
         FROM
                  traindb.menetrend
               INNER JOIN traindb.megallo    "START" ON "START".menetrend_id = traindb.menetrend.id
               INNER JOIN traindb.allomas    startstation ON "START".allomas = startstation.id
               INNER JOIN traindb.megallo ON traindb.menetrend.id = traindb.megallo.menetrend_id
               INNER JOIN traindb.allomas ON traindb.megallo.allomas = traindb.allomas.id
         WHERE
                  startstation.neve = '${req.query.from}'
               AND "START".erkezik_ido = '00:00'
               AND traindb.allomas.neve = '${req.query.to}'`
         , {}, {
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

app.get('/', function (req, res) {
   //squirrelly.definePartial('content',"asdasd1256");
   //var text = squirrelly.renderFile('./views/index.squirrelly',{});
   //res.send(text);
   res.render('index', {content:"trip_planner", cache: false})
})

app.get('/sign-up', function (req, res) {
   //squirrelly.definePartial('content',"asdasd1256");
   //var text = squirrelly.renderFile('./views/index.squirrelly',{});
   //res.send(text);
   res.render('index', {content:"sign-up", cache: false})
})

app.get('*', function (req, res) {
   res.send("asdasd");
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})