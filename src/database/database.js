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
                connection.execute(querry, {}, meta /*{outFormat: oracledb.OBJECT}*/,
                    function (err, result) {
                        if (err) {
                            callback(null, err);
                        } else {
                            callback(result, null);
                        }
                        // Release the connection
                        /*
                        connection.release(
                            function (err) {
                                if (err) {
                                    console.error(err.message);
                                } else {
                                    console.log("Connection released");
                                }
                            }
                        );
                        */
                    }
                );
            }
        )
        
    }

    
}

module.exports = Database;
/*
function createConnection(runOnConnect, onError) {

    oracledb.getConnection(connect, function (err, connection) {
        if (err) {
            // Error connecting to DB
            //send_error(500,"Error connecting to DB",err.message);
            onError(err);
            return;
        }
        runOnConnect(connection);
    });

}


function runQuerry(querry, onResult, onError) {

    createConnection(
        function (connection) {
            connection.execute(querry, {}, {outFormat: oracledb.OBJECT},
                function (err, result) {
                    if (err) {
                        onError(err);
                    } else {
                        onResult(result);
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("Connection released");
                            }
                        }
                    );
                }
            );
        }
    )
}

*/