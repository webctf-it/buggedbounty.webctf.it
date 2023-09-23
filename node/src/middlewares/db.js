//connection to db
const {Pool}=require('pg')
exports.pool=new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'webapp',
    password: 'postgres',
    port: 5432
});
