import React, { useState } from 'react';
import SupplyCurve from './SupplyCurve.jsx';
import FourOhFour from './404.jsx';
import GamePath from './GamePath/GamePath.jsx'

export default function App() {
  const [view, setView] = useState({ name: "App" });

  const changeView = (name) => {
    setView({ name });
  };

  const renderView = () => {
    switch (view.name) {
      case "SupplyCurve":
        return <SupplyCurve changeView={changeView} />;
      case "App":
        return (
          <div>
            <h1>Welcome to EconProblems</h1>
            <p>Here we go</p>
            <GamePath />
            <div>
            <form onSubmit={handleSupplyCurveSubmit}>
              <button type="submit">Supply!</button>
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
    changeView('SupplyCurve');
  };

  return (
    <div>
      {renderView()}
    </div>
  );
}









