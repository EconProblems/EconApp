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
  try {
    const user = await Users.findOne({ id: userId }).exec();
    if (!user) {
      console.log('User not found');
      return user;
    }

    // Update the skills object with the new key-value pair
    user.skills = { ...userInfo.data.skills };

    // Update the last lesson completion date to the current date
    user.lastLessonCompletion = new Date();

    // Save the updated user document
    await user.save();

    console.log('User skills and last lesson completion updated:', user);
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

const searchFriends = async (query) => {
  try {
    // Perform a case-insensitive search by name or username
    const friendResults = await Users.find({
      userName: { $regex: new RegExp(query, 'i') },
    }).exec();

    return friendResults;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const sendFriendRequest = async (friendId, friendUserName, userId) => {
  try {
    const user = await Users.findOne({ id: userId }).exec();
    if (user) {
      const existingFriend = user.friends.find((friend) => friend.id === friendId);
      if (!existingFriend) {
        user.friends.push({
          id: friendId,
          userName: friendUserName,
          sentRequest: true,
          receivedRequest: false,
          isFriend: false,
        });
        await user.save();

        const requestedFriend = await Users.findOne({ id: friendId }).exec();
        const existingRequestedFriend = requestedFriend.friends.find((friend) => friend.id === userId);

        if (!existingRequestedFriend) {
          requestedFriend.friends.push({
            id: userId,
            userName: user.userName,
            sentRequest: false,
            receivedRequest: true,
            isFriend: false,
          });
          await requestedFriend.save();
        }
      }
    }
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
};

const sendAcceptFriendRequest = async (friendId, userId) => {
  try {
    const user = await Users.findOne({ id: userId }).exec();
    const friend = await Users.findOne({ id: friendId }).exec();

    if (user && friend) {
      // Check if the friend request exists in the user's friend list
      const userFriendRequest = user.friends.find(
        (friend) => friend.id === friendId && friend.receivedRequest === true
      );

      if (!userFriendRequest) {
        console.log("Friend request not found in user's friend list");
        throw new Error('Friend request not found');
      }

      // Delete the friend object from the user's friend array
      const indexInUserFriendList = user.friends.findIndex(
        (friend) => friend.id === friendId
      );
      if (indexInUserFriendList !== -1) {
        user.friends.splice(indexInUserFriendList, 1);
      }

      // Add the friend request object to the user's friend array with isFriend set to true
      user.friends.push({
        id: userFriendRequest.id,
        userName: userFriendRequest.userName,
        sentRequest: false,
        receivedRequest: false,
        isFriend: true,
      });

      // Find the user in the friend's friend list
      const friendInFriendList = friend.friends.find(
        (friend) => friend.id === userId
      );


      // Delete the friend object from the requesting Friend's friend array
      const indexInFriendFriendList = friend.friends.findIndex(
        (requestedFriend) => requestedFriend.id === userId
      );
      if (indexInFriendFriendList !== -1) {
        friend.friends.splice(indexInUserFriendList, 1);
      }


      friend.friends.push({
        id: userId,
        userName: user.userName,
        sentRequest: false,
        receivedRequest: false,
        isFriend: true,
      });


      // Save the updated documents for both user and friend
      await Promise.all([user.save(), friend.save()]);
    }
  } catch (error) {
    console.error('Error accepting friend request:', error);
    throw error;
  }
};


const sendRejectFriendRequest = async (friendId, userId) => {
  try {
    const user = await Users.findOne({ id: userId }).exec();
    const friend = await Users.findOne({ id: friendId }).exec();

    if (user && friend) {
      // Check if the friend request exists in the user's friend list
      const userFriendRequest = user.friends.find(
        (friend) => friend.id === friendId && friend.receivedRequest === true
      );

      if (!userFriendRequest) {
        console.log("Friend request not found in user's friend list");
        throw new Error('Friend request not found');
      }

      // Delete the friend object from the user's friend array
      const indexInUserFriendList = user.friends.findIndex(
        (friend) => friend.id === friendId
      );
      if (indexInUserFriendList !== -1) {
        user.friends.splice(indexInUserFriendList, 1);
      }

      // Save the updated user document
      await user.save();
    }
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    throw error;
  }
};

const findFriend = async (friendId) => {
  try {
    // Use the Mongoose model to find the friend by their ID
    const friend = await Users.findOne({ id: friendId }).exec();
    if (friend) {
      return friend;
    } else {
      console.log('Friend not found');
      return null;
    }
  } catch (error) {
    console.error('Error finding friend:', error);
    throw error;
  }
};


module.exports = {
  userCheck,
  userCreateInDB,
  updateUserSkills,
  deleteUserAccount,
  searchFriends,
  sendFriendRequest,
  sendAcceptFriendRequest,
  sendRejectFriendRequest,
  findFriend
};
