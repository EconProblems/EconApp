import React, { useState, useEffect } from 'react';
import close from "../../dist/images/close_icon.png";
import Login from "./Login.jsx";
import axios from "axios";
import { createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material'; // Import Typography directly from '@mui/material'
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import theme from '../themes/default.jsx';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'fffff',
  width: '90%',
  height: '90%',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};


export default function NewUser(props) {
  const [username, setUsername] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [isNewUserPage, setIsNewUserPage] = useState(false);
  const [isInappropriate, setIsInappropriate] = useState(false);
  const [notLongEnough, setNotLongEnough] = useState(false);

  const handleChange = async(e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;

    if (target.name === "username") {
        setUsername(value);
      }
    }


  const onSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 3) {
      setNotLongEnough(true);
      return;
    } else {
      setNotLongEnough(false);
    };

    const options = {
      method: 'GET',
      url: 'https://www.purgomalum.com/service/plain',
      params: {
        text: username
      },
    };

    axios.request(options)
    .then(async (response) => {
      console.log('purgoresponse', response);
      if (response.data === username) {
        console.log('not a curse word');
        try {
          const userReqInfo = {
            user: props.user,
            formData: username,
          };

          axios.post('/user', {
            userReqInfo
          })
          .then(function (response) {
            props.setLoggedIn(true);
            alert('user created');
            props.setDisplayNewUser(false);
            props.setIsUser(true);
            console.log(response.data)
            props.setUserProfileData(response.data);
            props.setNoUserName(false);
            // console.log('user profile data', props.userProfileData);
            // const response = await axios.get(`/user/${doc._id}`);
            // const data = response.data;
            // console.log('client says ', response.data);
            // if(response.data._id){
            //   props.setIsUser(true);
            //   //set userdata
            //   props.setUserProfileData(response.data)
            // } else {
            //   props.setNoUserName(true);
            // }
          })
          .catch(function (error) {
            console.log(error)
            if (error.response.status === 406) {
              alert("account already exists. Please login");
            }
            if (error.response.status === 500) {
              alert("Internal Server Error. Please try again.");
            }
            else {
              alert("Username already exists. Please choose a different handle to go by");
            }
            props.setLoggedIn(false);
            props.setDisplayNewUser(false);
            props.setIsUser(false);
            props.setLoggedIn(false);
          });

        } catch (error) {
          console.error('error in user post', error);
        }
      }
      if (response.data.includes('*')) {
        console.log('inappropriate');
        setIsInappropriate(true);
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleClose = () => {
    props.setDisplayNewUser(false);
    props.setLoggedIn(false);
  };

  const theme = useTheme();

  if (!props.loggedIn) {
    return (
      <Modal
        open={props.displayNewUser}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '90%',
            height: '90%',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <img src="/images/Econ3.png" alt="logo" width="200px" />
          <span style={{ marginBottom: '1rem' }}>Create a new account by signing into Google</span>
          <Login
            isNewUserPage={isNewUserPage}
            setNoUserName={props.setNoUserName}
            setUser={props.setUser}
            setLoggedIn={props.setLoggedIn}
            loggedIn={props.loggedIn}
            setDisplayNewUser={props.setDisplayNewUser}
            setIsUser={props.setIsUser}
            setDisplayNewUser={props.setDisplayNewUser}
            setUserProfileData={props.setUserProfileData}
          />
        </Box>
      </Modal>
    );
  }


  if (props.loggedIn) {
    return (
      <Modal
        open={props.displayNewUser}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '90%',
            height: '90%',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            position: 'relative',
            display: 'flex', // Add this line to enable vertical stacking
            flexDirection: 'column', // Add this line to enable vertical stacking
            justifyContent: 'center', // Add this line to vertically center the content
            alignItems: 'center', // Add this line to horizontally center the content
          }}
        >
          <img
            src={close}
            alt="close"
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              cursor: 'pointer',
            }}
          />
          <img src="/images/Econ3.png" alt="logo" width="200px" />

          <Typography variant="h2">
            Are you ready to set up your new account? Let's do it!
          </Typography>
          <br /><br />
          <form>
            <div>
              <label htmlFor="username">
                <Typography
                  variant="bodyText"
                  sx={{
                    color: theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    marginBottom: theme.spacing(3),
                  }}
                >
                  Username:&nbsp;
                </Typography>
                <input
                  type="text"
                  name="username"
                  data-testid="username"
                  onChange={(e) => handleChange(e)}
                  placeholder="minimum 3 characters"
                  style={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    marginBottom: theme.spacing(2),
                  }}
                />
                {isInappropriate && <span style={{ color: 'red', fontFamily: theme.typography.fontFamily }}>Please choose a different username</span>}
                {notLongEnough && <span style={{ color: 'red', fontFamily: theme.typography.fontFamily }}>Username not long enough. Please try again.</span>}
              </label>
            </div>
          </form>
          <Button
            variant="contained"
            component="label"
            onClick={(e) => onSubmit(e)}
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
            sx={{
              marginTop: theme.spacing(2), // Add spacing to the top of the button
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    );
  }
};