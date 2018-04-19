require('dotenv').config();

const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.get('/ping', (req, res) => res.send('pong'));

app.listen(PORT, () => console.log('Listening on PORT', PORT));