var Database = require('./database.js');
var oracledb = require('oracledb');

var User = require('../model/user');
var Station = require('../model/station');
var Worker = require('../model/worker');
var Trip = require('../model/trip');

class DAO {

    constructor(onError) {
        this.db = new Database(onError);
    }

    searchTrains(from, to, day, callback) {
        this.db.runQuerry(
            `SELECT * FROM TRAINDB.RES_TEST('${from}', '${to}', '${day}')`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null) {
                    //console.log(res);
                    //let data = Station.load( res.rows[0]);
                    //res = data;
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return Trip.load(value);
                    })
                    res = map;
                }

                callback(res, err)
            }
        )
    };

    getTrip(from, to, day, id, callback) {
        this.db.runQuerry(
            `SELECT * FROM TRAINDB.RES_TEST('${from}', '${to}', '${day}') res WHERE res.ID = ${id}`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    //console.log(res);
                    let data = Trip.load( res.rows[0]);
                    res = data;
                    //var map = res.rows.map(function mappingFunction(value, index, array) {
                    //    return Trip.load(value);
                    //})
                    //res = map;
                }
                else{
                    res = null;
                }

                callback(res, err)
            }
        )
    };

    getStationByName(name, callback) {
        this.db.runQuerry(
            `SELECT * FROM ALLOMAS WHERE ALLOMAS.NEVE = '${name}'`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null) {
                    //console.log(res);
                    let data = Station.load(res.rows[0]);
                    res = data;

                }

                callback(res, err)
            })
    }

    getAllStations(callback) {
        this.db.runQuerry(
            `SELECT * FROM ALLOMAS`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null) {
                    //console.log(res);
                    //let data = Station.load( res.rows[0]);
                    //res = data;
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return Station.load(value);
                    })
                    res = map;
                }

                callback(res, err)
            })
    }


    //select * from felhasznalo, dolgozo
    //where felhasznalo.felhasznalonev = DOLGOZO.FELHASZNALONEV
    //and dolgozo.beosztas = 'Admin';
    findUserByNicName(name, callback) {
        this.db.runQuerry(
            `SELECT * FROM FELHASZNALO WHERE FELHASZNALONEV = '${name}'`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    console.log(res);
                    let data = User.load(res.rows[0]);
                    res = data;

                }
                else{
                    res = null;
                }

                callback(res, err)
            }

        )
    };

    changePassword(username, newPassword, callback) {
        //console.log("in the DAO now!");
        this.db.runQuerry(
            `UPDATE FELHASZNALO SET JELSZO = '${newPassword}' WHERE FELHASZNALONEV = '${username}'`,
            {},
            {
                autoCommit: true
                //outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null) {
                    console.log("user password changed: ");
                    console.log(res);
                    //let data = User.load( res.rows[0]);
                    //res = data;

                }

                callback(res, err)
            }
        );
    }

    getAllWorkers(callback) {
        this.db.runQuerry(
            `SELECT FELHASZNALO.TELJES_NEV, FELHASZNALO.SZULETESI_DATUM, DOLGOZO.* 
            FROM DOLGOZO,FELHASZNALO
            WHERE DOLGOZO.FELHASZNALONEV = FELHASZNALO.FELHASZNALONEV`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                //console.log("in the DAO err now!");
                if (res != null) {
                    console.log(res);
                    //let data = Worker.load( res.rows[0]);
                    //res = data;
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return Worker.load(value);
                    })
                    res = map;

                }

                callback(res, err)
            });
    }

    editWorkerWage(wage, id, callback) {
        this.db.runQuerry(
            `UPDATE DOLGOZO
            SET DOLGOZO.ORABER = ${wage}
            WHERE DOLGOZO.Id = ${id}`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                //console.log("in the DAO err now!");
                if (res != null) {
                    console.log(res);
                    //let data = Worker.load( res.rows[0]);
                    //res = data;
                }

                callback(res, err)
            });
    }
    
    //insert into felhasznalo(felhasznalonev, jelszo, szuletesi_datum, email, teljes_nev, bankkartya)
    //values ('testy', 'bambam', '12/FEB/1980', 'emamm@hmail.hu', 'Kis Pista', 87234432634);
    register(username, password, birthDate, mail, name, bankCardNumber, callback) {
        this.db.runQuerry(
            `INSERT INTO FELHASZNALO(FELHASZNALONEV, JELSZO, SZULETESI_DATUM, EMAIL, TELJES_NEV, BANKKARTYA)
             VALUES ('${username}', '${password}', '${birthDate}', '${mail}', '${name}', '${bankCardNumber}' )`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                //console.log("in the DAO err now!");
                if (res != null) {
                    console.log(res);
                    //let data = Worker.load( res.rows[0]);
                    //res = data;
                }

                callback(res, err)
            });
    }

    addWorker(username, password, birthDate, mail, name, bankCardNumber, tax, field, address, hourlyWage, callback) {
        this.db.runQuerry(
            `INSERT INTO FELHASZNALO (FELHASZNALO, JELSZO, EMAIL, TELJES_NEV, SZULETESI_DATUM, BANKKARTYA)
            VALUES ('${username}', '${password}', '${mail}', '${name}', '${birthDate}', ${bankCardNumber});
            COMMIT;
            INSERT INTO DOLGOZO (ADOSZAM, BEOSZTAS, LAKCIM, ORABER, FELHASZNALONEV)
            VALUES (${tax}, '${field}', '${address}', ${hourlyWage}, '${username}');
            COMMIT;`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                //console.log("in the DAO err now!");
                if (res != null) {
                    console.log(res);
                    //let data = Worker.load( res.rows[0]);
                    //res = data;
                }

                callback(res, err)
            });
    }

    //INSERT INTO DOLGOZOTT_ORAK(dolgozo, datum, orak_szama)
    //VALUES(0, '01/APR/2020', 8)
    addWorkedHours(workerId, date, hours, callback){
        this.db.runQuerry(
            `INSERT INTO DOLGOZOTT_ORAK(dolgozo, datum, orak_szama)
            VALUES(${workerId}, '${date}', ${hours})`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                //console.log("in the DAO err now!");
                if (res != null) {
                    console.log(res);
                    //let data = Worker.load( res.rows[0]);
                    //res = data;
                }

                callback(res, err)
            });
    }
    /*SELECT FELHASZNALO.TELJES_NEV, FELHASZNALO.SZULETESI_DATUM, DOLGOZO.* 
    FROM DOLGOZO, FELHASZNALO
    WHERE DOLGOZO.ID = 0
    AND FELHASZNALO.FELHASZNALONEV = DOLGOZO.FELHASZNALONEV;*/
    GetWorkerData(id, callback){
        this.db.runQuerry(
            `SELECT FELHASZNALO.TELJES_NEV, FELHASZNALO.SZULETESI_DATUM, DOLGOZO.* 
            FROM DOLGOZO, FELHASZNALO
            WHERE DOLGOZO.ID = ${id}
            AND FELHASZNALO.FELHASZNALONEV = DOLGOZO.FELHASZNALONEV;`,
            {},
            {
                //autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                //console.log("in the DAO err now!");
                if (res != null) {
                    console.log(res);
                    //let data = Worker.load( res.rows[0]);
                    //res = data;
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return Worker.load(value);
                    })
                    res = map;
                }

                callback(res, err)
            });
    }

}

module.exports = DAO;