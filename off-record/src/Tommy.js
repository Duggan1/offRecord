import React, { useState } from "react";
import './App.css';
import * as yup from 'yup';

import { useNavigate } from 'react-router-dom';
import Dnd from './Dnd';

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
  const mainEvent = ufcCard[0].fighters.join(' vs ');
  const location = 'Singapore'
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



  const validationSchema = yup.object().shape({
    // userName: yup.string().required('Username is required'),
    // password: yup.string().required('Password is required'),
    predictions: yup.array().of(
      yup.object().shape({
        winner: yup.number().oneOf([0, 1], 'Invalid winner selection'),
        method: yup.string().required('Method of victory is required'),
      })
    ).required('At least one prediction is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data using Yup
        await validationSchema.validate({ predictions });

        const predictionData = ufcCard.map((fight, index) => ({
            fighters: fight.fighters,
            winner: predictions[index]?.winner || null,
            method: predictions[index]?.method || null,
        }));

        const dataToSend = {
            owner: user.username || user.userName,
            location: location,
            mainEvent: mainEvent,
            predictions: predictionData,
            user_id: user.id || 99,
        };

        fetch('https://off-therecordpicks.onrender.com/submit-predictions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Predictions submitted successfully:', data);
            // Perform any further actions here
            setPredictions([]);
        })
        .catch(error => {
            console.error('Error submitting predictions:', error);
            // Handle error as needed
        });
    } catch (error) {
        console.error('Validation error:', error.message);
        // Handle validation error messages, setErrors, etc.
    }
};

  
  

  return  (
    <div>
      {user ? (
    <div className="tommy">
      <h1 >UFC Fight Predictions</h1>
      <h3>{location}</h3>
      <h2 className="color-white" >{mainEvent}</h2>
      
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
    </div> ) : (
      <Dnd />
    )}
  </div>
);
    }
export default Tommy;

