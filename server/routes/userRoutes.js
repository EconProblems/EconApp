const express = require('express');
const {userCheck} = require('../../db/index.js');
const {userCreateInDB} = require('../../db/index.js');

const userGet = async (req, res) => {
  const { userId } = req.params;
  console.log('userGet triggered with userId:', userId);
  try {
    const userData = await userCheck(userId);
    console.log('Data received from userCheck:', userData);
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to find user' });
  }
};

const userCreate = async (req, res) => {
  const userInfo = req.body;
  try {
    await userCreateInDB(userInfo);
    res.cookie('authToken', 'your-auth-token', { maxAge: 86400000 }); // Set the cookie with a 24-hour expiration time (86400000 milliseconds)
    res.sendStatus(204);
  } catch (err) {
    console.error('error from user create ', err);
    res.status(500).json({ message: 'Failed to find user' });
  }
};

module.exports = {
  userGet, userCreate
};
