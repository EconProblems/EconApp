const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const mongoose = require("mongoose");
require('dotenv').config();
const { userGet, userCreate, updateSkills, deleteUserAccountRoute, searchFriendsRoute, sendFriendRequestRoute, sendAcceptFriendRequestRoute } = require("./routes/userRoutes.js");
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

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/EconApp');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to Database'));

const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));

// ROUTES
app.get('/user/:userId', userGet);
app.post('/user/', userCreate);
app.put('/user/:userId', updateSkills);
app.delete('/user/:userId', deleteUserAccountRoute);

app.get('/searchFriends', searchFriendsRoute);
app.post('/sendFriendRequest', sendFriendRequestRoute);
app.put('/acceptFriendRequest', sendAcceptFriendRequestRoute);



app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.sendStatus(200);
  });
});


if (process.env.NO_NV === 'production') {

  // const privateKey = fs.readFileSync("./server/server.key",'utf8')
  // const certificate = fs.readFileSync("./server/156ce794f5e68c57.crt",'utf8');
  // const caBundle = fs.readFileSync('./server/gd_bundle-g2-g1.crt','utf8');

  const privateKey = process.env.PRIVATE_KEY
  const certificate = process.env.CERTIFICATE
  const caBundle = process.env.BUNDLE

  var credentials = { key: privateKey, cert: certificate, ca: caBundle };

  // const credentials = {
  //   key: process.env.DEV_KEY,
  //   cert: process.env.DEV_CERT
  // };


  const httpsServer = https.createServer(credentials, app);
  httpsServer.on('error', (error) => {
    console.error('HTTPS server error:', error);
  });
  httpsServer.listen(port, () => {
    console.log("HTTPS: listening on port 3000");
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log("server in development mode");
  });
}