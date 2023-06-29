import React, { useState, useEffect } from 'react';
import close from "../../dist/images/close_icon.png";
import Login from "./Login.jsx";
import axios from "axios";

export default function NewUser(props) {
  const [username, setUsername] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [isNewUserPage, setIsNewUserPage] = useState(false);
  const [isInappropriate, setIsInappropriate] = useState(false);


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

          // console.log('here is userReqInfo ', userReqInfo)
          axios.post('/user', {
            userReqInfo
          })
          .then(function (response) {
            console.log('here is response ', response.data)
            const data = response.data
            props.setUserProfileData(data)
            props.setLoggedIn(true);
            alert('user created');
            props.setDisplayNewUser(false);
            props.setIsUser(true);
          })
          .catch(function (error) {
            alert("account already exists. Please login");
            props.setLoggedIn(false);
            props.setDisplayNewUser(false);
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

  if (!props.loggedIn) {
    return <Login isNewUserPage={isNewUserPage} setNoUserName={props.setNoUserName} setUser={props.setUser} setLoggedIn={props.setLoggedIn} loggedIn={props.loggedIn} setDisplayNewUser={props.setDisplayNewUser}/>;
  }

  if (props.loggedIn) {
    return (
      <div>
        <img src={close} alt="close" onClick={handleClose} />
            Are you ready to set up your new account? Let's do it!
            <br /><br />
            <form>
              <div>
                <label htmlFor="username">
                  Username:
                  <input type="text" name="username" data-testid="username" onChange={(e) => handleChange(e)} />
                  {isInappropriate && <span style={{color: "red"}}>Please choose a different username</span>}
                </label>
              </div>
            </form>
            <button variant="contained" component="label" onClick={(e) => onSubmit(e)}>
              Submit
            </button>
      </div>
    )
  }
};
