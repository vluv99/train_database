
var express = require('express');

const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var cookieParser = require('cookie-parser');
var session = require('express-session')

var app = express();
app.set('view engine', 'ejs')

var passport = require('passport')
require('./authenticate/passport')(passport);

/*
var LocalStrategy = require('passport-local').Strategy;

var DAO = require("./database/DAO.js");

var dao = new DAO((err)=> {console.error(err)});

passport.use(new LocalStrategy(
    function(username, password, done) {
      dao.findUserByNicName(username, function (user, err) {
       if (err) { return done(err); }
       if (!user) {
         return done(null, false, { message: 'Incorrect username.' });
       }
       if (!user.checkPassword(password)) {
         return done(null, false, { message: 'Incorrect password.' });
       }
       return done(null, user);
     }, );
   }
));

passport.serializeUser(function(user, done) {
   done(null, user.username);
 });
 
 passport.deserializeUser(function(id, done) {
  dao.findUserByNicName(id, function(user, err) {
     done(err, user);
   });
 });
*/

app.use(express.static('site'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
   secret: 'keyboard cat',
   resave: true,
   saveUninitialized: false,
   cookie: { secure: false }
 }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(upload.array());



app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/profile/' + req.user.username);
  });

app.use('/', require('./routes/'))

//Start the webserver
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})