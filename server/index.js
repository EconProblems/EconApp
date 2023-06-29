const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
// const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require('dotenv').config();
const fs = require('fs');
const {userGet} = require("./routes/userRoutes.js");
const {userCreate} = require("./routes/userRoutes.js");

const app = express()
app.use(express.json());

const port = 3000;

mongoose.connect('mongodb://localhost/EconApp');

const db = mongoose.connection;
db.on('error', (error)=>console.error(error));
db.once('open', () => console.log('connected to Database'));

const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));


//ROUTES
app.get('/user/:userId', userGet);
app.post('/user/', userCreate);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});