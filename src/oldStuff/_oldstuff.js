function send_error(status,text,message) {
    // Error connecting to DB
    res.set('Content-Type', 'application/json');
    res.status(status).send(JSON.stringify({
       status: status,
       message: text,
       detailed_message: message
    }));
 }

// Http Method: GET
// URI        : /user_profiles
// Read all the user profiles
app.get('/trips',upload.none(), function (req, res) {
   "use strict";

   var search = {};
   search.from = req.query.from != undefined ? req.query.from : req.body.from
   search.to = req.query.to != undefined ? req.query.to : req.body.to
   

   oracledb.getConnection(connect, function (err, connection) {
      if (err) {
         // Error connecting to DB
         send_error(500,"Error connecting to DB",err.message);
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
                  startstation.neve = '${search.from}'
               AND "START".erkezik_ido = '00:00'
               AND traindb.allomas.neve = '${search.to}'`
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
            console.log(req.body);
            console.log(req.query);
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
   res.render('index', {content:"sign-up", cache: false})
})

app.get('/profile', function (req, res) {
   res.render('index', {content:"profile", cache: false})
})

app.get('*', function (req, res) {
   res.send("asdasd");
})
