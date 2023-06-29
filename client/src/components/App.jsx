import React, { useState, useEffect, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from '@mui/material';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import { CssBaseline, Box, Container } from "@mui/material/";
import SupplyCurve from "./SupplyCurve.jsx";
import SupplyCurve2 from "./SupplyCurve2.jsx";
import SupplyCurve3 from "./SupplyCurve3.jsx";
import FourOhFour from "./404.jsx";
import GamePath from "./GamePath/GamePath.jsx";
import Login from "./Login.jsx"
import NewUser from "./NewUser.jsx"


export default function App() {
  const [view, setView] = useState({ name: "App" });
  const [user, setUser] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayNewUser, setDisplayNewUser] = useState(false);
  const [noUserName, setNoUserName] =useState(false);

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
                <button type="submit">Supply!</button>
              </form>
            </div>
            <div>
              <form onSubmit={handleSupplyCurveSubmit2}>
                <button type="submit">Supply2!</button>
              </form>
            </div>
            <div>
              <form onSubmit={handleSupplyCurveSubmit3}>
                <button type="submit">Supply3!</button>
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
    console.log('clicked button');
    setDisplayNewUser(true);
  };


  return (
    <ThemeProvider theme={theme}>
      <Typography variant='h1'>Welcome to EconProblems</Typography>
      <img src="/images/Econ3.png" alt="logo" width="200px"/>
      {!loggedIn && <Login setIsUser={setIsUser} setNoUserName={setNoUserName} user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {noUserName && <span style={{color: "red"}}>No user attached to this account yet.</span>}
      {displayNewUser && <NewUser setUserProfileData={setUserProfileData} setIsUser={setIsUser} setNoUserName={setNoUserName} setUser={setUser} user={user} setLoggedIn={setLoggedIn} loggedIn={loggedIn} setDisplayNewUser={setDisplayNewUser}/>}
      {!isUser && !displayNewUser && <button onClick={handleNewUserSubmit}>Create Account</button>}
      {isUser && loggedIn && renderView()}
    </ThemeProvider>
  );
}
