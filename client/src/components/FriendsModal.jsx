import React, { useState, useEffect } from "react";
import { useTheme, styled } from '@mui/material/styles';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from 'axios';

const FriendItem = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export default function FriendsModal(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requestingFriends, setRequestingFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null); // New state to store the selected friend's data

  useEffect(() => {
    const friendsArr = props.userProfileData.friends;
    const filteredFriendsArr = friendsArr.filter((friend) => friend.isFriend);
    setFriends(filteredFriendsArr);

    const filteredRequestingFriendsArr = friendsArr.filter((friend) => friend.receivedRequest);
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


  const handleRejectRequest = (friend) => {
    axios
      .put('/rejectFriendRequest', { friendId: friend.id, userId: props.userProfileData.id })
      .then(() => {
        // Remove the friend request from friendRequests state
        setFriendRequests((prevRequests) => prevRequests.filter((request) => request.id !== friend.id));

        // Perform updates to props.userProfileData.friends state to reject the friend request
        const friendIndex = props.userProfileData.friends.findIndex((f) => f.id === friend.id);
        const updatedFriends = [...props.userProfileData.friends];
        updatedFriends.splice(friendIndex, 1);

        props.setUserProfileData((prevData) => ({
          ...prevData,
          friends: updatedFriends,
        }));

        alert(`Rejected friend request from ${friend.userName}`);
      })
      .catch((error) => {
        console.error('Error rejecting friend request:', error);
      });
  };


  const handleFriendClick = (friendId) => {
    console.log("here is friendId", friendId)
    axios.get(`/selectFriend/${friendId}`)
      .then((response) => {
        setSelectedFriend(response.data);
        console.log("handle friend get",response)
      })
      .catch((error) => {
        console.error("Error fetching friend data:", error);
      });
  };

  const handleAcceptRequest = (friend) => {
    axios.put('/acceptFriendRequest', { friendId: friend.id, userId: props.userProfileData.id })
      .then(() => {
        const friendIndex = props.userProfileData.friends.findIndex((f) => f.id === friend.id);
        const updatedFriends = [...props.userProfileData.friends];
        updatedFriends.splice(friendIndex, 1);
        props.setUserProfileData((prevData) => ({
          ...prevData,
          friends: updatedFriends,
        }));

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

    axios.post('/sendFriendRequest', { friendId: friend.id, friendUserName: friend.userName, userId: props.userProfileData.id })
      .then(() => {
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== friend.id)
        );

        const newFriend = {
          id: friend.id,
          userName: friend.userName,
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

  const handleCloseSelectedFriendModal = () => {
    setSelectedFriend(null);
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
    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '70%', height: '70%', bgcolor: "background.paper", boxShadow: 24, p: 4, zIndex: 9999 }}>
        {selectedFriend ? ( // Check if a friend is selected, then display the modal content
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255, 255, 255, 0.9)", // Add a background color to the selected friend box
              zIndex: 9999,
            }}
          >
            <Typography variant="h3" gutterBottom>
              {selectedFriend.userName}'s Profile
            </Typography>
            {/* Display the friend's data here */}
            <Typography variant="h4">Awards: {selectedFriend.awards}</Typography>
            <Typography variant="h4">Daily Streak: {selectedFriend.streak}</Typography>
            {/* You can display other details like skills, etc. as per your data model */}
            <Button onClick={handleCloseSelectedFriendModal}>Close</Button>
          </Box>
        ) : null}
        <Typography variant="h3" gutterBottom>
          Friends
        </Typography>
        <TextField
          label="Search Friends"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchInputChange}
          sx={{ marginBottom: 2 }}
        />
          <Button
            variant="contained"
            onClick={handleSearch}
            style={{ margin: '10px' }}
          >
            Search
          </Button>

        <Box mt={2}>
          {friendRequests.length === 0 ? (
            ""
          ) : (
            friendRequests.map((friend) => (
              <FriendItem key={friend.id}>
                <Typography>{friend.userName}</Typography>
                <Button variant="contained" onClick={() => handleSendRequest(friend)}>
                  Send Request
                </Button>
              </FriendItem>
            ))
          )}
        </Box>

        <Box mt={2}>
          {requestingFriends.length === 0 ? (
            <Typography variant="h4" >No current friend requests from other users</Typography>
          ) : (
            <>
              <Typography>Friend Requests</Typography>
              {requestingFriends.map((friend) => (
                <FriendItem key={friend.id}>
                  <Typography>{friend.userName}</Typography>
                  <Button variant="contained" onClick={() => handleAcceptRequest(friend)}>
                    Accept Request
                  </Button>
                  <Button variant="contained" style={{margin: "10px"}} onClick={() => handleRejectRequest(friend)}>
                    Reject Request
                  </Button>
                </FriendItem>
              ))}
            </>
          )}
        </Box>

        <Box mt={2}>
          {friends.length === 0 ? (
            <Typography>You haven't connected with any friends.</Typography>
          ) : (
            <>
              <Typography variant="h4">Your Friends</Typography>
              {friends.map((friend) => (
                <FriendItem key={friend.id} onClick={() => handleFriendClick(friend.id)}>
                  <Typography>{friend.userName}</Typography>
                </FriendItem>
              ))}
            </>
          )}
        </Box>

        <Button mt={2} onClick={handleClose}>
          Close Friends
        </Button>
        <span style={{ color: 'red', fontStyle: 'italic' }}>
  Planned future friends functionality will include the ability to send app-generated congratulations when friends earn awards and new skills
</span>      </Box>
    </Modal>
  );
};