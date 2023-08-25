import React, { useState } from "react";
import './App.css';
import { useNavigate } from 'react-router-dom';

function Tommy({ user }) {
  const navigate = useNavigate();

  // UFC card information
  const ufcCard = [
    { match: "Featherweight", fighters: ["Max Holloway", "Jung Chan-sung"] },
    { match: "Light Heavyweight", fighters: ["Anthony Smith", "Ryan Spann"] },
    { match: "Featherweight", fighters: ["Giga Chikadze", "Alex Caceres"] },
    { match: "Bantamweight", fighters: ["Rinya Nakamura", "Fernie Garcia"] },
    { match: "Women's Flyweight", fighters: ["Erin Blanchfield", "Taila Santos"] },
    { match: "Heavyweight", fighters: ["Junior Tafa", "Parker Porter"] },
    { match: "Heavyweight", fighters: ["Waldo Cortes-Acosta", "Łukasz Brzeski"] },
    { match: "Bantamweight", fighters: ["Toshiomi Kazama", "Garrett Armfield"] },
    { match: "Middleweight", fighters: ["Chidi Njokuani", "Michał Oleksiejczuk"] },
    { match: "Welterweight", fighters: ["Song Kenan", "Rolando Bedoya"] },
    { match: "Welterweight", fighters: ["Billy Goff", "Yusaku Kinoshita"] },
    { match: "Women's Flyweight", fighters: ["Liang Na", "JJ Aldrich"] },
    { match: "Featherweight", fighters: ["Choi Seung-woo", "Jarno Errens"] },
  ];
  
  const [predictions, setPredictions] = useState([]);

  const handlePredictionChange = (index, winnerIndex) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = { ...updatedPredictions[index], winner: winnerIndex };
    setPredictions(updatedPredictions);
  };
  const handleMethodChange = (index, method) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = { ...updatedPredictions[index], method };
    setPredictions(updatedPredictions);
  };

  const handleSubmit = (e, username) => {
    e.preventDefault();
    // Handle submission of predictions
    const predictionData = ufcCard.map((fight, index) => ({
      fighters: fight.fighters,
      winner: predictions[index]?.winner,
      method: predictions[index]?.method,
    }));
    
    // Create an object that includes the prediction data and the user's username
    const dataToSend = {
      owner: user.username,
      predictions: predictionData,
    };
  
    // Now you can send the dataToSend to your backend using fetch or any other method
    // For example:
    console.log(dataToSend)
    fetch('/submit-predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Predictions submitted successfully:', data);
      // You can perform any further actions here
    })
    .catch(error => {
      console.error('Error submitting predictions:', error);
      // Handle error as needed
    });
  };
  

  return (
    <div className="tommy">
      <h1>UFC Fight Predictions</h1>
      <form onSubmit={handleSubmit}>
        {ufcCard.map((fight, index) => (
          <div key={index} className="fight">
            <p>{fight.fighters[0]} vs. {fight.fighters[1]}</p>
            <div className="prediction">
              <button
                className={`fighter-button ${predictions[index]?.winner === 0 ? 'selected' : ''}`}
                onClick={() => handlePredictionChange(index, 0)}
              >
                {fight.fighters[0]}
              </button>
              <button
                className={`fighter-button ${predictions[index]?.winner === 1 ? 'selected' : ''}`}
                onClick={() => handlePredictionChange(index, 1)}
              >
                {fight.fighters[1]}
              </button>
            </div>
            <div className="prediction">
              <label>Method of Victory:</label>
              <select onChange={(e) => handleMethodChange(index, e.target.value)}>
                <option value="">Select Method</option>
                <option value="TKO/KO">TKO/KO</option>
                <option value="Submission">Submission</option>
                <option value="Decision">Decision</option>
                <option value="Draw/No-Contest">Draw/No-Contest</option>
              </select>
            </div>
          </div>
        ))}
        <button type="submit">Submit Predictions</button>
      </form>
    </div>
  );
}

export default Tommy;

