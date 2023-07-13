import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import theme from "../themes/default.jsx";
import ThemeExample from "./ThemeExample.jsx";
import { CssBaseline, Box, Container } from "@mui/material/";
import SupplyCurve from "./SupplyCurve.jsx";
import SupplyCurve2 from "./SupplyCurve2.jsx";
import SupplyCurve3 from "./SupplyCurve3.jsx";
import PermanentDrawerLeft from "./Drawer.jsx";

import FourOhFour from "./404.jsx";
import GamePath from "./GamePath/GamePath.jsx";
import Login from "./Login.jsx";
import NewUser from "./NewUser.jsx";
import axios from "axios";


export default function App() {
  const [view, setView] = useState({ name: "App" });
  const [user, setUser] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayNewUser, setDisplayNewUser] = useState(false);
  const [noUserName, setNoUserName] = useState(false);

  useEffect(() => {
    // Check if the values are stored in localStorage and update state accordingly
    const storedIsUser = localStorage.getItem("isUser");
    const storedLoggedIn = localStorage.getItem("loggedIn");

    if (storedIsUser) {
      setIsUser(JSON.parse(storedIsUser));
    }

    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }
  }, []);

  useEffect(() => {
    // Store the values in localStorage whenever they change
    localStorage.setItem("isUser", JSON.stringify(isUser));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [isUser, loggedIn]);

  const changeView = (name) => {
    setView({ name });
  };

  const renderView = () => {
    switch (view.name) {
      case "SupplyCurve":
        return <SupplyCurve changeView={changeView} />;
      case "SupplyCurve2":
        return <SupplyCurve2 changeView={changeView} />;
      case "SupplyCurve3":
        return <SupplyCurve3 changeView={changeView} />;
      case "theme":
        return <ThemeExample />;
      case "App":
        return (
          <div>
            {/* <GamePath /> */}
            <div>
              <form onSubmit={handleSupplyCurveSubmit}>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '20px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  Supply!
                </Button>
              </form>
            </div>
            <div>
              <form onSubmit={handleSupplyCurveSubmit2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '20px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  Supply2!
                </Button>
              </form>
            </div>
            <div>
              <form onSubmit={handleSupplyCurveSubmit3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '20px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  Supply3!
                </Button>
              </form>
            </div>
          </div>
        );
      default:
        return <FourOhFour />;
    }
  };

  const handleSupplyCurveSubmit = (e) => {
    e.preventDefault();
    changeView("SupplyCurve");
  };

  const handleSupplyCurveSubmit2 = (e) => {
    e.preventDefault();
    changeView("SupplyCurve2");
  };

  const handleSupplyCurveSubmit3 = (e) => {
    e.preventDefault();
    changeView("SupplyCurve3");
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

    // Clear session data (assuming you're using express-session)
    axios.get("/logout").then((response) => {
      console.log(response);
    });
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
          >
            <span>Currently in development</span>
<Typography variant="h1" align="center" gutterBottom color="primary.main">
             {!isUser && <span>Welcome to EconProblems</span>}
            </Typography>
            {!isUser && <img src="/images/Econ3.png" alt="logo" width="200px" />}
      {!loggedIn && (
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
  />
</Box>
    )}
{noUserName && (
  <Typography variant="bodyText" align="center" color="red">
    No user attached to this account yet.
  </Typography>
)}
      {displayNewUser && (
        <>
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
        />
</Box>
        </>
      )}
      {!isUser && !displayNewUser && (
        <>
        <Button onClick={handleNewUserSubmit}>Create Account</Button>
        </>
      )}
      {/* commented out below for dev */}
      {isUser && loggedIn && (
        <div>
          <PermanentDrawerLeft />
          {renderView()}
          <span>hello {userProfileData.userName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      </Box>
    </Container>
  </ThemeProvider>
  );
}