import React from "react";
import { useState } from "react";

export const WeightTracker = () => {
  const [weightLogs, setWeightLogs] = useState([
    { date: new Date().toLocaleString(), weight: 190.3 },
  ]);
  const [newWeightLog, setNewWeightLog] = useState(null);

  const updateNewWeightLog = (e) => {
    const value = e.target.value;
    setNewWeightLog(value);
  };

  const handleAddWeightLog = (e) => {
    const log = { date: new Date().toLocaleString(), weight: newWeightLog };
    setWeightLogs((weightLogs) => [...weightLogs, log]);
  };
  return (
    <div>
      <h2>Weight Tracker</h2>
      <div>
        <label>Log Weight</label>
        <input type="number" onChange={(e) => updateNewWeightLog(e)} />
        <span>Lbs</span>
        <button onClick={(e) => handleAddWeightLog(e)}>Add</button>
      </div>
      <div>
        <ul>
          {weightLogs.map((item) => (
            <li>
              <span>{item.date}</span> | <span>{item.weight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
