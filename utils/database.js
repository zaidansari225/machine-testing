const mysql=require('mysql')
const config=require('../config/config.json')
const connection = mysql.createConnection({
    host:config.host,
    user:config.user, 
    password:config.password,
    database:config.database
});
// const conn = mysql.createConnection(config);
const util = require( 'util' );
function makeDb() {
    return {
        query( sql, args ) {
        return util.promisify( connection.query )
            .call( connection, sql, args );
        },
        close() {
        return util.promisify( connection.end ).call( connection );
        }
    };
}
const db = makeDb();
module.exports = db;