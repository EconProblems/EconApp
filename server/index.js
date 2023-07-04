const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const mongoose = require("mongoose");
require('dotenv').config();
const { userGet, userCreate } = require("./routes/userRoutes.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  })
);

const port = process.env.PORT || 3000; // Use the environment variable for port or default to 3000

mongoose.connect('mongodb://localhost/EconApp');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to Database'));

const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));

// ROUTES
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

if (process.env.NODE_ENV === 'production') {
  // HTTPS server configuration
  const options = {
    key: process.env.PRIVATE_KEY ? Buffer.from(process.env.PRIVATE_KEY, 'base64') : fs.readFileSync('./538c290a9dc1db2b.pem'),
    cert: process.env.CERTIFICATE ? Buffer.from(process.env.CERTIFICATE, 'base64') : fs.readFileSync('./538c290a9dc1db2b.crt'),
  };

  // Create the HTTPS server
  https.createServer(options, app).listen(port, () => {
    console.log(`Server listening on port ${port} (HTTPS) in production mode`);
  });
} else {
  // Start the HTTP server in development mode
  http.createServer(app).listen(port, () => {
    console.log(`Server listening on port ${port} (HTTP) in development mode`);
  });
}