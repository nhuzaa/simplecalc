// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [calculation, setCalculation] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setCalculation(e.target.value);
  };

  const calculate = async () => {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ calculation }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={calculation} onChange={handleInputChange} />
        <button onClick={calculate}>Calculate</button>
        <p>Result: {result}</p>
      </header>
    </div>
  );
}

export default App;
