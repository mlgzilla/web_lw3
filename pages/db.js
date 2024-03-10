const {Client} = require('pg');

module.exports.getClient = async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '1234',
        port: 5432,
    });
    await client.connect();
    return client;
}