require('dotenv').config();

const express = require('express');

const PORT = process.env.PORT;
const pg = require('pg');


const app = express();
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.get('/api/v1/things', async (req, res) => {
    
    client.query('SELECT * FROM things')
        .then(results => res.send(results.rows))
        .catch(err => res.status(500).send('ruh roh'));

})

app.listen(PORT, () => console.log('Listening on PORT', PORT));