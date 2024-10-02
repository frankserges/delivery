const express = require('express');
const path = require("path");
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const whitelist = ['http://localhost:4200']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
// app.use(
//     cors({
//         origin: '*',
//         credentials: true,
//         transports: ['websocket', 'polling'],
//     })
// )
// For Parse Response Body when files has not been send
app.use(bodyParser.json());
// routes inportation
const pack = require('./routes/package');
const del = require('./routes/delivery');
const { error } = require('console');

// console.log(pack);
app.use('/api', pack);
app.use('/api', del);

module.exports = app;