import React, { useState } from 'react';
import SupplyCurve from './SupplyCurve.jsx';
import FourOhFour from './404.jsx';
import Main from './Main.jsx';

export default function App() {
  const [view, setView] = useState({ name: "App" });

  const changeView = (name) => {
    setView({ name });
  };

  const renderView = () => {
    switch (view.name) {
      case "SupplyCurve":
        return <SupplyCurve changeView={changeView} />;
      default:
        return <Main changeView={changeView} />;
    }
  };

  return (
    <div>
      {renderView()}
    </div>
  );
}









