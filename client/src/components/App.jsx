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

export default function App() {
  // const [view, setView] = useState({ name: "theme" });
  const [view, setView] = useState({ name: "App" });


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
            <Typography variant='h1'>Welcome to EconProblems</Typography>
            <Typography variant='bodytext'>Here we go</Typography>
            <GamePath />
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

  return <ThemeProvider theme={theme}>{renderView()}</ThemeProvider>;
}
