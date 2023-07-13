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
    const newUser = await userCreateInDB(userInfo);
    res.cookie('authToken', 'your-auth-token', { maxAge: 86400000 });
    res.json(newUser);
  } catch (err) {
    console.error('error from user create ', err);
    if (err.message === 'Username already exists') {
      res.status(409).json({ message: 'Username already exists' });
    } else if (err.message === 'User with the same ID already exists') {
      res.status(406).json({ message: 'User with the same ID already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = {
  userGet, userCreate
};
