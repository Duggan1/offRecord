import React, { useState, useEffect } from "react";
import './App.css';
import {useNavigate} from 'react-router-dom';
import logo from './logo.png';

import Dnd from './Dnd';

function Results({ user, ufcCard, ufcResults }) {
  const [results, setResults] = useState([]);
  const [updatedResults, setUpdatedResults] = useState(ufcResults)

  const [adminKevPicks, setAdminKevPicks] = useState({});

  const [selectedEvent, setSelectedEvent] = useState(""); // Step 1: Add state for selected event
//   const [mainEventFilter, setMainEventFilter] = useState("");
  const navigate = useNavigate()
  const handleOptionClick = (option) => {
      navigate(`${option}`);
    };
  
  
//   const handleUpdate = e => updateSort(e.target.value)

  const byMainEvent = (results) => {
    return !selectedEvent || results.main_event === selectedEvent;
  }

  const filteredByMainEvent = selectedEvent ? results.filter(byMainEvent) : [...results];

    const getAdminKevPicksForEvent = (event) => {
    return adminKevPicks[event] || ufcResults; // Use ufcResults if AdminKev's picks are not available
  };
////////put in app soon 
console.log(results) 
console.log(ufcResults)
console.log(updatedResults)
console.log(filteredByMainEvent)
console.log(user.username)


 
function calculatePoints(pick, result) {
  let points = 0;

  // Check if both pick and result are valid objects
  if (pick && result) {
    // Check if the winner matches
    if (pick.winner !== null && result.winner !== null && pick.winner === result.winner) {
      points += 1;

      // Check if the method also matches, only if the winner is correct
      if (pick.method !== null && result.method !== null && pick.method === result.method) {
        points += 1;
      }
    }
  }

  return points;
}


function calculateTotalPoints(result, mainEvent) {
  let totalPoints = 0;

  result.predictions.forEach((prediction, predIndex) => {
    const adminKevPicksForEvent = getAdminKevPicksForEvent(mainEvent);
    const adminKevPick = adminKevPicksForEvent[predIndex];
    const ufcResult = ufcResults[predIndex];

    const points = calculatePoints(prediction, adminKevPick || ufcResult);
    totalPoints += points;
  });

  return totalPoints;
}


  
  

  // Fetch results when the component mounts
  useEffect(() => {
    // Fetch results from the API
    fetch('https://off-therecordpicks.onrender.com/picks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data received from the API
        if (Array.isArray(data.picks)) {
            
          setResults(data.picks);
          const filteredResults = data.picks.filter(result => result.owner !== 'AdminKev');
          setResults(filteredResults);
          console.log(filteredResults)
          data.picks.forEach(result => {
            if (result.owner === 'AdminKev' && result.predictions.length > 0) {
              setAdminKevPicks(picks => ({
                ...picks,
                [result.main_event]: result.predictions
              }));
            }
          });
        } else {
          console.error('API response does not have an array in the "picks" property:', data);
        }
      
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        // Handle error as needed
      });
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
<div>
  (
    <div className="results">
    <h1 style={{
            textAlign: 'center',
            marginTop: '0%',
            color: 'black',
            textShadow: '0 0 5px yellow',
            fontSize:'35px',
            maxWidth: '100%'
            // Adjust this value as needed
            }}>
            Results
            </h1>
            <center>
            <button style={{border:'gold 5px solid', backgroundColor:'purple', color:'gold',cursor:'pointer'}}>Only {user.username} Picks</button></center>
            {/* ///////I want to filter the cards and only show the results if the main_event matches these  */}
            <center><label>Filter Results</label>
      <select className="filterbutton" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
        <option value="">All</option>
        <option value="Israel Adesanya vs Sean Strickland">Israel Adesanya vs Sean Strickland</option>
        <option value="Valentina Shevchenko vs Alexa Grasso">Grasso vs Shevchenko 2</option>
        <option value="Fiziev vs Gamrot">Fiziev vs Gamrot</option>
        <option value="Makhachev vs Oliveira">Makhachev vs Oliveira 2</option>
        <option value="Blaydes vs Almeida">Blaydes vs Almeida</option>
        <option value="Jones vs Miocic">Jones vs Miocic</option>

      </select></center>
      <table>
        <thead>
          <tr>
            <th>Picks</th>
            
            <th> Fight Results</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
        {filteredByMainEvent.map((result, index) => (
  <tr key={index}>
    <td>
      <div className="ownpicksdiv">
        <center>
          <strong><span className="small">{result.owner}'s</span> picks</strong>
          <br />
          <strong>{result.main_event}</strong>
          <h2>{calculateTotalPoints(result, result.main_event, adminKevPicks)} Points</h2>
        </center>
      </div>
      <div>
        {result.predictions.map((prediction, predIndex) => {
          // Check if adminKevPicks contains the main event as a key
          const adminKevPicksForEvent = adminKevPicks[result.main_event] || {};

          return (
            <p
              className={calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex]) > 0 ? "winnerCircle" : "results-container"}
              key={predIndex}
            >
              <strong>{prediction.fighters.join(' vs ')}</strong>
              <br />
              <strong>Winner:</strong>{" "}
              {prediction.winner === 0
                ? prediction.fighters[0]
                : prediction.winner === 1
                ? prediction.fighters[1]
                : "None"}
              <br />
              <strong>Method:</strong> {prediction.method}
              <br />
              <center>
                {/* Your additional code */}
              
              <strong className={calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex]) > 1 ? "rightgreen" : ""}>
                {calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex]) > 1
                  ? ` + ${calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex])} `
                  : null}
              </strong></center>
              <br />
            </p>
          );
        })}
        </div>
      </td>
      
    
      <td>  <div className="pickresultsdiv">
          <center>
            <strong>{result.main_event}</strong>
            <br />
            <strong>Ufc Results</strong>
            <h2>{ufcCard.length * 2} Possible </h2>
          </center>
        </div>
        <div className="">
        {getAdminKevPicksForEvent(result.main_event).map((adminKevMatch, matchIndex) => (
  <div className="real-results-container" key={matchIndex}>
    <strong>{adminKevMatch.fighters.join(' vs ')}</strong>
    <br />
    <strong>Winner:</strong>{" "}
    {adminKevMatch.winner !== null ? `${adminKevMatch.fighters[adminKevMatch.winner]}` : "Results Pending"}
    <br />
    <strong>Method:</strong> {adminKevMatch.method !== null ? adminKevMatch.method : "Results Pending"}
    <br />
    {adminKevMatch.winner !== null ? (
      <div className="flag-image">
        {/* ... Flag image code ... */}
      </div>
    ) : (
      <div className="loading" style={{ height: '30px', marginLeft: '40%' }}></div>
    )}
  </div>
))}

</div>

      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  )<img src={logo} alt='fighting logo' onClick={() => handleOptionClick('/')} className='resultsimg' style={{cursor:'pointer'}}/> <p style={{color:'purple',fontWeight:'Bold',textAlign:'center'}}>Click Logo to go to Home Page</p>
       
            
</div>

  );
}

export default Results;
