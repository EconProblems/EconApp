import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function Login(props) {
  const [doc, setDoc] = useState(null);

  const responseGoogle = (response) => {
    const userObject = jwtDecode(response.credential);
    localStorage.setItem('user', JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const newDoc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    setDoc(newDoc);
    if (!newDoc.userName) {
      alert('User information incorrect. Please try logging in again.')
    }
  };

  useEffect(() => {
    if (doc) {
      props.setUser(doc);
      props.setLoggedIn(true);
      console.log('here is doc ', doc);
      // check DB to see if user exists
      const checkUser = async () => {
        try {
          const response = await axios.get(`/user/${doc._id}`);
          const data = response.data;
          console.log('client says ', response.data);
          props.setUserProfileData(response.data);
          if(response.data._id){
            console.log('cleint is in!')
            props.setIsUser(true);
            props.setNoUserName(false);
          } else {
            console.log('hello')
            props.setNoUserName(true);
            props.setLoggedIn(false);
            alert('No user attached to this account yet.')
          }

        } catch (error) {
          console.error(error);
          props.setNoUserName(true);

        }
      };
      checkUser();
    }
  }, [doc]);

  return (
    <div className="">
      <GoogleOAuthProvider clientId={`${process.env.CLIENT_ID}`}>
        <GoogleLogin
          render={(renderProps) => (
            <button
              type="button"
              className=""
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </GoogleOAuthProvider>
    </div>
  );
}