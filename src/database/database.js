var oracledb = require('oracledb');
var connect = require('../Connection.js');

class Database{
    constructor(onError){
        this.connection = oracledb.getConnection(connect);
        this.connection.catch(onError);
    }

    runQuerry(querry,bind,meta, callback) {
       
        this.connection.then(
            function (connection) {
                try {
                    connection.execute(querry, {}, meta,
                        function (err, result) {
                            if (err) {
                                callback(null, err);
                            } else {
                                callback(result, null);
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        )
    }
}

module.exports = Database;