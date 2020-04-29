const LocalStrategy = require('passport-local').Strategy;

var DAO = require("../database/DAO.js");

var dao = new DAO((err)=> {console.error(err)});

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            dao.findUserByNicName(username, function (user, err) {
                if (err) { return done(err); }
                if (!user) {n
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.checkPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (id, done) {
        dao.findUserByNicName(id, function (user, err) {
            done(err, user);
        });
    });
};
