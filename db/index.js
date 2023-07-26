const {Users} = require("./models.js");
const mongoose = require("mongoose");


let userCheck = async (user) => {
  try {
    console.log('here is user in userCheck', user)
    const foundUser = await Users.findOne({ id: user }).exec();
    if (foundUser) {
      // User exists
      console.log('User found:', foundUser);
      return foundUser;
    } else {
      // User does not exist
      console.log('User not found');
      return null;
    }
  } catch (err) {
    console.error(err);
    // Rethrow the error to be caught in the calling function
    throw err;
  }
};

let userCreateInDB = async (user) => {
  console.log("userCreateInDB triggered", user);
  const userObj = user.userReqInfo;
  console.log("here is userObj ", userObj);

  try {
    const existingUserByUsername = await Users.findOne({ userName: userObj.formData }).exec();
    if (existingUserByUsername) {
      console.log('Username already exists');
      throw new Error('Username already exists');
    }

    const existingUserById = await Users.findOne({ id: userObj.user._id }).exec();
    if (existingUserById) {
      console.log('User with the same ID already exists');
      throw new Error('User with the same ID already exists');
    }

    const newUser = new Users({
      name: userObj.user.userName,
      userName: userObj.formData,
      id: userObj.user._id,
      skills: {},
      friends: [],
      streak: 0,
    });

    await newUser.save();
    console.log('User created:', newUser);
    return newUser;
  } catch (err) {
    console.error(err);
    // Send an error message back to the caller
    throw err;
  }
};


async function updateUserSkills(userId, userInfo) {
  console.log('here is db with user info', userInfo)
  try {
    // Find the user by userId
    const user = await Users.findOne({ id: userId }).exec();

    console.log('FOUND USER', user)
    if (!user) {
      console.log('User not found');
      return user;
    }

    // Update the skills object with the new key-value pair
    user.skills = { ...userInfo.data.skills };

    // Save the updated user document
    await user.save();

    console.log('User skills updated:', user);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const deleteUserAccount = async (req, res) => {
  const { userId } = req.params;
  try {
    await Users.deleteOne({ id: userId }).exec();
    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user account' });
  }
};

module.exports = {
  userCheck,
  userCreateInDB,
  updateUserSkills,
  deleteUserAccount
};
