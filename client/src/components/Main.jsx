import React, { useState } from 'react';


export default function Main (props) {

  const handleSupplyCurveSubmit = (e) => {
    e.preventDefault();
    props.changeView('SupplyCurve');
  };

  return (
    <div>
      <h1>Welcome to EconProblems</h1>
      <p>Here we go</p>
      <div>
      <form onSubmit={handleSupplyCurveSubmit}>
        <button type="submit">Supply!</button>
      </form>
      </div>
    </div>
  );
}





