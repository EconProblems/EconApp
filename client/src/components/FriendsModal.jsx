import React, { useState, useEffect } from "react";
import theme from "../themes/default.jsx";
import { useTheme, styled } from '@mui/material/styles';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from 'axios';

export default function FriendsModal (props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requestingFriends, setRequestingFriends] = useState([]);
  // const [acceptingFriend, setAcceptingFriend] = useState({});

  useEffect(()=> {
    let friendsArr = props.userProfileData.friends;
    const filteredFriendsArr = friendsArr.filter((friend) => friend.isFriend);
    setFriends(filteredFriendsArr);

    let filteredRequestingFriendsArr = props.userProfileData.friends.filter((friend) => friend.receivedRequest);
    setRequestingFriends(filteredRequestingFriendsArr);
  }, [props.userProfileData])

  let searchTimer = null;

  const handleSearch = () => {
    axios.get(`/searchFriends?query=${searchQuery}`)
      .then((response) => {
        setFriendRequests(response.data);
      })
      .catch((error) => {
        console.error("Error searching for friends:", error);
      });
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    // Clear any previously set timer
    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    // Set a new timer to execute the search after 500ms
    searchTimer = setTimeout(() => {
      if (inputValue.length >= 3) {
        handleSearch();
      }
    }, 500);
  };

  const handleAccecptRequest = (friend) => {
    axios
      .put('/acceptFriendRequest', { friendId: friend.id, userId: props.userProfileData.id })
      .then(() => {


        const friendIndex = props.userProfileData.friends.findIndex((f) => f.id === friend.id);


        // Create a copy of the friends array and remove the friend
        const updatedFriends = [...props.userProfileData.friends];
        updatedFriends.splice(friendIndex, 1);

        // Update the userProfileData state with the updated friends array
        props.setUserProfileData((prevData) => ({
          ...prevData,
          friends: updatedFriends,
        }));


        // Update the userProfileData state with the new friend data
        const newFriend = {
          id: friend.id,
          userName: friend.userName,
          sentRequest: false,
          receivedRequest: false,
          isFriend: true,
        };
        props.setUserProfileData((prevData) => ({
          ...prevData,
          friends: [...prevData.friends, newFriend],
        }));

        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== friend.id)
        );
        alert(`Accepted ${friend.userName} as a friend`);
      })
      .catch((error) => {
        console.error('Error accepting friend request:', error);
      });
  };



  const handleSendRequest = (friend) => {
    // Send a friend request to the selected friend
    // Check if the user is already a friend or a request has been sent or received
    for (const friendObj of props.userProfileData.friends) {
      if (friendObj.id === friend.id) {
        if (friendObj.isFriend) {
          alert(`${friend.userName} is already a friend`);
        } else if (friendObj.sentRequest) {
          alert(`You have already requested ${friend.userName} to be your friend`);
        } else if (friendObj.receivedRequest) {
          alert(`${friend.userName} is waiting for you to accept their request`);
        }
        return;
      }
    }

    axios
      .post('/sendFriendRequest', { friendId: friend.id, friendUserName: friend.userName, userId: props.userProfileData.id })
      .then(() => {
        // Update the friendRequests state to remove the friend from the list
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== friend.id)
        );

        // Update the userProfileData state with the new friend data
        const newFriend = {
          id: friend.id,
          userName: friend.userName, // Fixed the typo here
          sentRequest: true,
          receivedRequest: false,
          isFriend: false,
        };
        props.setUserProfileData((prevData) => ({
          ...prevData,
          friends: [...prevData.friends, newFriend],
        }));
        alert(`Request sent to ${friend.userName}`)
      })
      .catch((error) => {
        console.error('Error sending friend request:', error);
      });
  };

  const handleClose = () => {
    props.setIsFriendsModalOpen(false);
  };

  return (
    <Modal
      open={props.isFriendsModalOpen}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '70%', height: '70%', bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Friends
        </Typography>
        <TextField
          label="Search Friends"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchInputChange}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Box mt={2}>
          {friendRequests.length === 0 ? (
            ""
          ) : (
            friendRequests.map((friend) => (
              <Box key={friend.id} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Typography>{friend.userName}</Typography>
                <Button variant="contained" onClick={() => handleSendRequest(friend)}>
                  Send Request
                </Button>
              </Box>
            ))
          )}
        </Box>
        <Box mt={2}>
          {requestingFriends.length === 0 ? (
            <Typography>No current friend requests from other users</Typography>
          ) : (
            <>
              <Typography>Friend Requests</Typography>
              {requestingFriends.map((friend) => (
                <Box key={friend.id} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                  <Typography>{friend.userName}</Typography>
                  <Button variant="contained" onClick={() => handleAccecptRequest(friend)}>
                    Accept Request
                  </Button>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box>
          {friends.length === 0 ? (
            <Typography>You haven't connected with any friends.</Typography>
          ) : (
            <>
              <Typography>Your Friends</Typography>
              {friends.map((friend) => (
                <Box key={friend.id} display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                  <Typography>{friend.userName}</Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Button onClick={handleClose}>Close Friends</Button>
      </Box>
    </Modal>
  );
};