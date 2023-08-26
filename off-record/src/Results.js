import React, { useState, useEffect } from "react";
import './App.css';

import Dnd from './Dnd';

function Results({ user }) {
  const [results, setResults] = useState([]);

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
          setResults(data.picks); // Extract the array from the 'picks' property
        } else {
          console.error('API response does not have an array in the "picks" property:', data);
          // Handle the unexpected response as needed
        }
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        // Handle error as needed
      });
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div>
      {user ? (
        <div className="results">
          <h1 className="color-white">Results</h1>
          <table>
            <thead>
              <tr>
                <th>Owner</th>
                <th>Location</th>
                <th>Main Event</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.owner}</td>
                  <td>{result.location}</td>
                  <td>{result.main_event}</td>
                  {/* Add more table cells for other result properties */}
                  <ul>
                      {result.predictions.map((prediction, predIndex) => (
                        <li key={predIndex}>
                          Fight: {prediction.fighters.join(' vs ')}<br />
                          Method: {prediction.method}<br />
                          Winner: {prediction.winner === 0 ? prediction.fighters[0] : prediction.winner === 1 ? prediction.fighters[1] : 'None'}
                        </li>
                      ))}
                    </ul></tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Dnd />
      )}
    </div>
  );
}

export default Results;
