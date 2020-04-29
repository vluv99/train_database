var Database = require('./database.js');
var oracledb = require('oracledb');

var User = require('../model/user')

class DAO{

    constructor(onError){
        this.db = new Database(onError);
    }    

    searchTrains(params, callback) {
        this.db.runQuerry(
            "SELECT toString(TIME) FROM MEGALLO",
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            callback
        )
    };

    findUserByNicName(name, callback){
        this.db.runQuerry(
            `SELECT * FROM FELHASZNALO WHERE FELHASZNALONEV = '${name}'`,
            {},
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT
            },
            (res, err)=>{
                if(res != null){
                    //console.log(res);
                    let data = User.load( res.rows[0]);
                    res = data;
                    
                }
                
                callback(res,err)
            }
            
        )
    };

}

module.exports = DAO;