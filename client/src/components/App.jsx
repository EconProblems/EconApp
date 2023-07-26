import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, Button, CssBaseline, Box, Container } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import axios from "axios";

import theme from "../themes/default.jsx";
import ThemeExample from "./ThemeExample.jsx";
import SupplyCurve from "./SupplyCurve.jsx";
import SupplyCurve2 from "./SupplyCurve2.jsx";
import SupplyCurve3 from "./SupplyCurve3.jsx";
import PermanentDrawerLeft from "./Drawer.jsx";
import FourOhFour from "./404.jsx";
import GamePath from "./GamePath/GamePath.jsx";
import Login from "./Login.jsx";
import NewUser from "./NewUser.jsx";


export default function App() {
  const [view, setView] = useState({ name: "App" });
  const [user, setUser] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayNewUser, setDisplayNewUser] = useState(false);
  const [noUserName, setNoUserName] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickable, setIsClickable] = useState({
    supply1: true,
    supply2: false,
    supply3: false,
  });

  useEffect(() => {
    const skills = userProfileData?.skills || {};

    const isClickableValues = {
      supply1: true,
      supply2: skills.supply2,
      supply3: skills.supply3,
    };
    setIsClickable(isClickableValues);
    console.log(isClickable);
  }, [userProfileData]);

  const AppButton = ({ onClick, label, isClickable, disabled }) => {
    // Determine the color based on the isClickable prop
    const buttonColor = isClickable
      ? theme.palette.secondary.main
      : theme.palette.secondary.dark;

      const handleClick = (e) => {
        if (!e.target.disabled) {
          alert("This button is disabled and cannot be clicked.");
        } else {
          onClick();
        }
      };

    return (
      <div style={{ justifyContent: "center", textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "30px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            width: "200px",
            height: "60px",
            marginBottom: "40px",
            textTransform: "none",
            fontSize: "1em",
            fontWeight: "bold",
            color: "#363636",
            backgroundColor: buttonColor, // Use the dynamic color here
          }}
          onClick={onClick}
          disabled={!isClickable}
        >
          {label}
        </Button>
      </div>
    );
  };


  useEffect(() => {
    // Check if the values are stored in localStorage and update state accordingly
    const storedIsUser = localStorage.getItem("isUser");
    const storedLoggedIn = localStorage.getItem("loggedIn");
    const storedUserProfileData = localStorage.getItem("userProfileData");
    const storedProfilePic = localStorage.getItem("profilePic");

    if (storedIsUser) {
      setIsUser(JSON.parse(storedIsUser));
    }

    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }

    if (storedUserProfileData) {
      setUserProfileData(JSON.parse(storedUserProfileData));
    }

    if (storedProfilePic) {
      setProfilePic(JSON.parse(storedProfilePic));
    }
  }, []);

  useEffect(() => {
    // Store the values in localStorage whenever they change
    localStorage.setItem("isUser", JSON.stringify(isUser));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    localStorage.setItem("userProfileData", JSON.stringify(userProfileData));
    localStorage.setItem("profilePic", JSON.stringify(profilePic));
  }, [isUser, loggedIn, userProfileData, profilePic]);

  const changeView = (name) => {
    setView({ name });
      setIsModalOpen(true);
  };

  const renderView = () => {
    switch (view.name) {
      case "SupplyCurve":
        return <SupplyCurve changeView={changeView} setUserProfileData={setUserProfileData} userProfileData={userProfileData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>;
      case "SupplyCurve2":
        return <SupplyCurve2 changeView={changeView} setUserProfileData={setUserProfileData} userProfileData={userProfileData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>;
      case "SupplyCurve3":
        return <SupplyCurve3 changeView={changeView} setUserProfileData={setUserProfileData} userProfileData={userProfileData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />;
      case "theme":
        return <ThemeExample />;
      case "App":
        return (
          <div>
            <div>
              <span>Complete the lessons in <span style={{ color: theme.palette.secondary.main }}>green</span> to progress</span>
              <br />
            </div>
            <br />
          <form onSubmit={handleSupplyCurveSubmit}>
            <AppButton
              label="Supply 1"
              isClickable={isClickable.supply1}
            />
          </form>
          <form onSubmit={handleSupplyCurveSubmit2}>
            <AppButton
              label="Supply 2"
              isClickable={isClickable.supply2}
            />
          </form>
          <form onSubmit={handleSupplyCurveSubmit3}>
            <AppButton
              label="Supply 3"
              isClickable={isClickable.supply3}
            />
          </form>
        </div>
        );
      default:
        return <FourOhFour />;
    }
  };

  const handleSupplyCurveSubmit = (e) => {
    e.preventDefault();
    if (isClickable.supply1) {
      changeView("SupplyCurve");
    }
  };

  const handleSupplyCurveSubmit2 = (e) => {
    e.preventDefault();
    if (isClickable.supply2) {
      changeView("SupplyCurve2");
    }
  };

  const handleSupplyCurveSubmit3 = (e) => {
    e.preventDefault();
    if (isClickable.supply3) {
      changeView("SupplyCurve3");
    }
  };


  const handleNewUserSubmit = () => {
    console.log("clicked button");
    setDisplayNewUser(true);
  };

  const handleLogout = () => {
    // Clear user-related state
    setUser([]);
    setUserProfileData([]);
    setIsUser(false);
    setLoggedIn(false);

    // Clear localStorage values
    localStorage.removeItem("isUser");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userProfileData");


    // Clear session data (assuming you're using express-session)
    axios.get("/logout").then((response) => {
      console.log(response);
    });
  };

  const handleThemeExample = (e) => {
    e.preventDefault();
    changeView("theme");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          py={4}
          sx={{
            textAlign: 'center' // Add this property to center the buttons
          }}
        >
          <span style={{color: "red"}}>Currently in development</span>
          <Typography variant="h1" align="center" gutterBottom color="primary.main">
            {!isUser && <span>Welcome to EconProblems</span>}
          </Typography>
          {!isUser && <img src="/images/Econ3.png" alt="logo" width="200px" />}
          {!loggedIn && (
            <>
              <Box my={4}>
                <Typography variant="bodyText" align="center" gutterBottom>
                  Log in to your account
                </Typography>
                <Login
                  setIsUser={setIsUser}
                  setNoUserName={setNoUserName}
                  user={user}
                  setUser={setUser}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  setUserProfileData={setUserProfileData}
                  setDisplayNewUser={setDisplayNewUser}
                  setProfilePic={setProfilePic}
                />
              </Box>
              {noUserName && (
                <Typography variant="bodyText" align="center" color="red">
                  No user attached to this account yet.
                </Typography>
              )}
            </>
          )}
          <Typography variant="h1" align="center" gutterBottom color="primary.dark">
            {isUser && loggedIn && <span>Hello {userProfileData.userName}!</span>}
          </Typography>
          {displayNewUser && (
            <Box my={4}>
              <Typography variant="bodyText" align="center" gutterBottom>
                Create an account
              </Typography>
              <NewUser
                setUserProfileData={setUserProfileData}
                setIsUser={setIsUser}
                setNoUserName={setNoUserName}
                setUser={setUser}
                user={user}
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setDisplayNewUser={setDisplayNewUser}
                displayNewUser={displayNewUser}
                setIsUser={setIsUser}
                loggedIn={loggedIn}
                userProfileData={userProfileData}
                setDisplayNewUser={setDisplayNewUser}
                setUserProfileData={setUserProfileData}
                setNoUserName={setNoUserName}
                setProfilePic={setProfilePic}
              />
            </Box>
          )}
          {!isUser && !displayNewUser && (
            <Button onClick={handleNewUserSubmit}>Create Account</Button>
          )}
          {isUser && loggedIn && (
            <>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleThemeExample}>Theme Example</button>
              <div style={{ height: '75vh' }}>
              <br />
              <div style={{ overflowY: 'auto', position: 'center' }}>
                  {renderView()}
              </div>
                <PermanentDrawerLeft userProfileData={userProfileData} handleLogout={handleLogout} profilePic={profilePic} setProfilePic={setProfilePic} setUserProfileData={setUserProfileData}/>
              </div>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}