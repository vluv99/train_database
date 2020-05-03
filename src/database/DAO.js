var Database = require('./database.js');
var oracledb = require('oracledb');

var User = require('../model/user');
var Station = require('../model/station');
var Worker = require('../model/worker');
var Trip = require('../model/trip');
var WorkHours = require('../model/workHours');
var Leaves = require('..//model/leaves');

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
                    let data = Trip.load(res.rows[0]);
                    res = data;
                }
                else {
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
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return Station.load(value);
                    })
                    res = map;
                }
                callback(res, err)
            })
    }

    findUserByNicName(name, callback) {
        this.db.runQuerry(
            `SELECT * FROM FELHASZNALO WHERE FELHASZNALONEV = '${name}'`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    let data = User.load(res.rows[0]);
                    this.GetWorkerDataByUserName(data.username, (res, err) => {
                        if (res != null) {
                            data.worker = res;
                        }
                        callback(data, err);
                    })
                    res = data;
                }
                else {
                    res = null;
                    callback(res, err);
                }
            }
        )
    };

    changePassword(username, newPassword, callback) {
        this.db.runQuerry(
            `UPDATE FELHASZNALO SET JELSZO = '${newPassword}' WHERE FELHASZNALONEV = '${username}'`,
            {},
            {
                autoCommit: true
            },
            (res, err) => {
                if (res != null) {
                    console.log("user password changed: ");
                    console.log(res);
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
                if (res != null) {
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
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null) {
                    console.log(res);
                }
                callback(res, err)
            });
    }

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
                if (res != null) {
                    console.log(res);
                }
                callback(res, err)
            });
    }

    addWorker(username, tax, field, address, hourlyWage, callback) {
        this.db.runQuerry(
            `INSERT INTO DOLGOZO (ADOSZAM, BEOSZTAS, LAKCIM, ORABER, FELHASZNALONEV)
            VALUES ('${tax}', '${field}', '${address}', '${hourlyWage}', '${username}')`,
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

    GetWorkerDataByUserName(username, callback) {
        this.db.runQuerry(
            `SELECT FELHASZNALO.TELJES_NEV, FELHASZNALO.SZULETESI_DATUM, DOLGOZO.* 
            FROM DOLGOZO, FELHASZNALO
            WHERE DOLGOZO.FELHASZNALONEV = '${username}'    
            AND FELHASZNALO.FELHASZNALONEV = DOLGOZO.FELHASZNALONEV`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    let data = Worker.load(res.rows[0]);
                    res = data;
                } else {
                    res = null
                }
                callback(res, err)
            });
    }

    GetWorkerData(workerID, callback) {
        this.db.runQuerry(
            `SELECT FELHASZNALO.TELJES_NEV, FELHASZNALO.SZULETESI_DATUM, DOLGOZO.* 
            FROM DOLGOZO, FELHASZNALO
            WHERE DOLGOZO.ID = '${workerID}'
            AND FELHASZNALO.FELHASZNALONEV = DOLGOZO.FELHASZNALONEV`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    let data = Worker.load(res.rows[0]);
                    res = data;
                } else {
                    res = null
                }
                callback(res, err)
            });
    }

    addWorkedHoursToWorker(workerID, date, hours, callback) {
        this.db.runQuerry(
            `INSERT INTO DOLGOZOTT_ORAK (DOLGOZO, DATUM, ORAK_SZAMA)
            VALUES ('${workerID}', '${date}', '${hours}')`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                //console.log("in the DAO err now!");
                if (res != null) {
                    
                }
                callback(res, err)
            });
    }

    listAllWorkedHoursByUser(workerID, callback){
        this.db.runQuerry(
            `SELECT DOLGOZOTT_ORAK.* FROM DOLGOZOTT_ORAK
            WHERE DOLGOZOTT_ORAK.DOLGOZO = '${workerID}'`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return WorkHours.load(value);
                    })
                    res = map;
                }
                callback(res, err)
            });
    }

    deleteWorkersHours(id, callback){
        this.db.runQuerry(
            `DELETE FROM DOLGOZOTT_ORAK 
            WHERE DOLGOZOTT_ORAK.ID = '${id}'`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null) {
                    console.log(res);
                }
                callback(res, err)
            });
    }

    getWorkerLeaves(id, callback){
        this.db.runQuerry(
            `select * from szabadsag
            where szabadsag.dolgozo = '${id}'`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    console.log(res);
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return Leaves.load(value);
                    })
                    res = map;
                }
                callback(res, err)
            });
    }

    addWorkerLeaves(workerId, start, end, reason, callback){ //always sets the approval to false
        this.db.runQuerry(
            `INSERT INTO SZABADSAG(DOLGOZO, KEZDETE, VEGE, OK, JOVAHAGYOTT)
            VALUES ('${workerId}', '${start}', '${end}', '${reason}', '0')`,
            {},
            {
                autoCommit: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null) {
                    console.log(res);
                }
                callback(res, err)
            });
    }

    getTicketData(username){ //always sets the approval to false
        this.db.runQuerry(
            `SELECT * FROM JEGY
            WHERE JEGY.FELHASZNALO = '${username}';`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err) => {
                if (res != null && res.rows.length > 0) {
                    console.log(res);
                    var map = res.rows.map(function mappingFunction(value, index, array) {
                        return Ticket.load(value);
                    })
                    res = map;
                }
                callback(res, err)
            });
    }
}

module.exports = DAO;