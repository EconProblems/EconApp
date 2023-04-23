const express = require('express');
const path = require('path');
const app = express()

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/EconApp');

const db = mongoose.connection;
db.on('error', (error)=>console.error(error));
db.once('open', () => console.log('connected to Database'));

const port = 3000;

const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});