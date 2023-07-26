const express = require('express');
const {userCheck} = require('../../db/index.js');
const {userCreateInDB} = require('../../db/index.js');
const {updateUserSkills} = require('../../db/index.js');
const {deleteUserAccount} = require('../../db/index.js');

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

const updateSkills = async (req, res) => {
  const { userId } = req.params;
  const userInfo = req.body;

  console.log("passed to update skills: userId", req.params,"userInfo", req.body)
  try {
    // Pass userId as an argument to updateUserSkills function
    const skillsUpdate = await updateUserSkills(userId, userInfo);
    res.json(skillsUpdate);
  } catch (err) {
    console.error('error from user updateSkills ', err);
    if (err.message) {
      console.log(err.message)
      res.status(409).json({ err });
    }
  }
};

const deleteUserAccountRoute = async (req, res) => {
  const { userId } = req.params;
  try {
    await deleteUserAccount(req, res); // Calling the deleteUserAccount function from the db module
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user account' });
  }
};

module.exports = {
  userGet, userCreate, updateSkills, deleteUserAccountRoute

};
