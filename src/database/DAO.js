var Database = require('./database.js');
var oracledb = require('oracledb');

class DAO{

    constructor(onError){
        this.db = new Database(onError);
    }    

    searchTrains(params,
        onResult, onError) {
        this.db.runQuerry(
            "SELECT toString(TIME) FROM MEGALLO",
            {},
            {
                outFormat: oracledb.OBJECT
            },
            onResult,
            onError
        )
    };

    getAllUsers(onResult, onError){

    }

    getUserByID(id, onResult, onError){
        
    }

}

module.exports = DAO;