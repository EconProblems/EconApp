import React, { useState } from 'react';
import styles from './GamePath.module.css';

const GamePath = () => {
  const [currentStop, setCurrentStop] = useState(0);
  const totalStops = 10;

  const advance = () => {
    if (currentStop < totalStops) {
      setCurrentStop(currentStop + 1);
    } else {
      alert("Congratulations! You've reached the end of the path.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game Path</h1>
      <p>You are currently on stop {currentStop} of {totalStops}.</p>
      <button className={styles.advanceButton} onClick={advance}>Advance</button>
      <div className={styles.path}>
        {[...Array(totalStops)].map((_, i) => (
          <div key={i} className={`${styles.stop} ${i < currentStop ? styles.stopReached : styles.stopNotReached}`}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};


export default GamePath;