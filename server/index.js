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
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express()
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  })
);

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
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});