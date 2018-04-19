require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const pg = require('pg');


const app = express();
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/v1/things', async (req, res) => {
    
    client.query('SELECT * FROM things;')
        .then(results => res.send(results.rows))
        .catch(err => res.status(500).send('ruh roh'));

});

app.get('/api/v1/things/:id', async (req, res) => {
    
    client.query(`SELECT * FROM things WHERE id=${req.params.id};`)
        .then(results => res.send(results.rows[0]))
        .catch(err => res.status(500).send('ruh roh'));

});

app.post('/api/v1/things', (req, res) => {

    client.query(`
        INSERT INTO things (name) 
        VALUES ('${req.body.name}');
    `)
    .then(results => res.send(results.rows[0]))
    .catch(err => res.status(500).send('ruh roh'));
});

app.put('/api/v1/things/:id', (req, res) => {

    client.query(`
        UPDATE things 
        SET name='${req.body.name}' 
        WHERE id=${req.params.id};
    `)
    .then(results => res.sendStatus(200))
    .catch(err => res.status(500).send('ruh roh'));
});

app.delete('/api/v1/things/:id', (req, res) => {
    client.query(`
    
        DELETE FROM things WHERE id=${req.params.id};
    `)
    .then(results => res.sendStatus(200))
    .catch(err => res.status(500).send('ruh roh'));
});

app.listen(PORT, () => console.log('Listening on PORT', PORT));