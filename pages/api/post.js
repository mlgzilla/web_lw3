// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const postQuery = `INSERT INTO coords(id, x, y) VALUES($1, $2, $3)`;
export default async function handler(req, res) {
    const data = req.body; // Ваши данные для сохранения
    const {Client} = require('pg');
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '1234',
        port: 5432,
        idleTimeoutMillis: 20000,
        connectionTimeoutMillis: 20000,
    });
    client.connect();
    console.log(data.length + 1, data.x, data.y);
    await client.query(postQuery, [data.length + 1, data.x, data.y]);
    console.log("end");
}
