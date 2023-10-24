import React, { useState, useEffect } from "react";
import './App.css';
import {useNavigate} from 'react-router-dom';
import logo from './logo.png';
import Chart from "chart.js/auto";

import Dnd from './Dnd';

function Results({ user, ufcCard, ufcResults }) {
  const [results, setResults] = useState([]);
  const [updatedResults, setUpdatedResults] = useState(ufcResults)
  const [showOnlyUserPicks, setShowOnlyUserPicks] = useState(false);
  const [adminKevPicks, setAdminKevPicks] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(""); 
  const [explainPoints, setExplainPointst] = useState(false); 
  const [showLeaderBoard, setshowLeaderBoard] = useState(false); 
  const [showCardWins, setShowCardWins] = useState(false); 
  console.log(updatedResults)
  const navigate = useNavigate()
  const handleOptionClick = (option) => {
      navigate(`${option}`);
    };








  const byMainEvent = (results) => {
    return !selectedEvent || results.main_event === selectedEvent;
  }
 
  const filteredByMainEvent = results.filter((result) => {
    return (
      (!selectedEvent || result.main_event === selectedEvent) &&
      (!showOnlyUserPicks || result.owner === user.username)
    );
  });



  const dreamCardResults = results.filter((result) => result.main_event === 'Jon Jones vs Fedor Emelianenko');

  // Initialize an array to store prediction details
  const predictions = [];
  
  dreamCardResults.forEach((result) => {
    result.predictions.forEach((prediction) => {
      const winner = prediction.winner;
      const method = prediction.method;
      const fighters = prediction.fighters;
  
      // Create an object for the current prediction
      const currentPrediction = {
        winner0C: winner === 0 ? 1 : 0,
        winner1C: winner === 1 ? 1 : 0,
        methodCounts: {
          [method]: 1
        },
        fighters: fighters
      };
  
      // Check if the prediction already exists in the array
      const existingPrediction = predictions.find((p) => p.fighters[0] === fighters[0] && p.fighters[1] === fighters[1]);
  
      if (existingPrediction) {
        // If the prediction already exists, update the counts
        existingPrediction.winner0C += currentPrediction.winner0C;
        existingPrediction.winner1C += currentPrediction.winner1C;
        existingPrediction.methodCounts[method] = (existingPrediction.methodCounts[method] || 0) + 1;
      } else {
        // If the prediction is new, add it to the array
        predictions.push(currentPrediction);
      }
    });
  });
  
  // Display the array of prediction details
  console.log("Predictions:", predictions);
  
  console.log( ufcResults)
  
  
  
  
  

  

  

  const getAdminKevPicksForEvent = (event) => {
    if (event === 'Jon Jones vs Fedor Emelianenko') {
      // Return a separate array for the dream card event
      return  predictions;
    } else {
      // For other events, return adminKevPicks or ufcResults as before
      return adminKevPicks[event] || ufcResults;
    }
  };
  
console.log(results) 
console.log(ufcResults)
console.log(updatedResults)
console.log(filteredByMainEvent)
// console.log(user.username)

const [leaderboard, setLeaderboard] = useState([]);
const [leaderboardwinners, setLeaderboardwinners] = useState([]);



  // Other state variables...

  useEffect(() => {
    // Fetch and set results data as you are currently doing...

    // Calculate and set the leaderboard based on results and user data
    calculateLeaderboard(results, ufcResults);
  }, [results, ufcResults]);

  const calculateLeaderboard = (results, ufcResults) => {
    const userPointsMap = new Map();
    const eventWinners = {};
  
    results.filter(result => result.main_event !== 'Jon Jones vs Fedor Emelianenko').forEach((result) => {
      // Calculate total points for each result
      const totalPoints = calculateTotalPoints(result, result.main_event, ufcResults);
  
      // Update the user's total points in the map
      if (!userPointsMap.has(result.owner)) {
        userPointsMap.set(result.owner, 0);
      }
      userPointsMap.set(result.owner, userPointsMap.get(result.owner) + totalPoints);
  
      const userPoints = calculateTotalPoints(result, result.main_event);
  
      if (!eventWinners.hasOwnProperty(result.main_event)) {
        eventWinners[result.main_event] = { winner: null, points: -1 };
      }
  
      if (userPoints > eventWinners[result.main_event].points) {
        eventWinners[result.main_event] = { winner: result.owner, points: userPoints };
      }
      else if (userPoints === eventWinners[result.main_event].points) {
        // Check if there's already an array to store tied winners; if not, create one
        if (!eventWinners[result.main_event].winners) {
          eventWinners[result.main_event].winners = [eventWinners[result.main_event].winner];
        }
        // Add the current user to the array of tied winners
        eventWinners[result.main_event].winners.push(result.owner);
      }
      
      // if (userPoints === eventWinners[result.main_event].points) {
      //   if (eventWinners[result.main_event].winner === null) {
      //     // If the current winner is null, initialize an array to keep track of tied users
      //     eventWinners[result.main_event].winners = [result.owner];
      //     eventWinners[result.main_event].points = [userPoints]; // Initialize points to 1
      //   } else if (eventWinners[result.main_event].winners) {
      //     // If there are already tied users, add the current user to the list
      //     eventWinners[result.main_event].winners.append(result.owner);
      //   }
      // }
      
    });
  
    // Set the winner to "Pending" for events with no points
    for (const event in eventWinners) {
      if (eventWinners[event].points === 0) {
        eventWinners[event].winner = "Pending";
      }
    }
  
    // Convert the map to an array of objects for easier sorting
    const leaderboardArray = Array.from(userPointsMap, ([username, totalPoints]) => ({ username, totalPoints }));
  
    // Sort the leaderboard by totalPoints in descending order
    leaderboardArray.sort((a, b) => b.totalPoints - a.totalPoints);
  
    // Sort eventWinners, putting "Pending" winners first
    const sortedEventWinners = {};
    Object.keys(eventWinners)
      .sort((eventA, eventB) => {
        const winnerA = eventWinners[eventA].winner;
        const winnerB = eventWinners[eventB].winner;
  
        if (winnerA === "Pending" && winnerB !== "Pending") {
          return -1;
        } else if (winnerA !== "Pending" && winnerB === "Pending") {
          return 1;
        } else {
          return 0;
        }
      })
      .forEach((event) => {
        sortedEventWinners[event] = eventWinners[event];
      });
  
    // Set the leaderboard state
    setLeaderboard(leaderboardArray);
    setLeaderboardwinners(sortedEventWinners);
  };
  
  

console.log(leaderboardwinners)









 
function calculatePoints(pick, result) {
  let points = 0;
  // console.log(pick)
  // console.log(result)

  
  if (pick && result) {
    
    // Check if the winner matches
    if (pick.method !== null && result.method !== null && pick.method === "Draw/No-Contest" && result.method === "Draw/No-Contest") {
      points += 2;
    }
    if  (pick.method !== null && result.method !== null && pick.method !== "Draw/No-Contest" && result.method === "Draw/No-Contest") {
      // console.log('working')
    }

    else {

        if (pick.winner !== null && result.winner !== null && pick.winner == result.winner) {
          points += 1;

          // Check if the method also matches, only if the winner is correct
          if (pick.method !== null && result.method !== null && pick.method === result.method) {
            points += 1;
          }
        }
       }
  }

  return points;
}



const [cardsWon, setCardsWon] = useState({});

function calculateTotalPoints(result, mainEvent) {
  let totalPoints = 0;

  result.predictions.forEach((prediction, predIndex) => {
    const adminKevPicksForEvent = getAdminKevPicksForEvent(mainEvent);
    const adminKevPick = adminKevPicksForEvent[predIndex];
    const ufcResult = ufcResults[predIndex];
    const cardsWonCopy = { ...cardsWon }; 

    const points = calculatePoints(prediction, adminKevPick || ufcResult);
    totalPoints += points;


   
  });
  
  return totalPoints;
} 

// function findUsersWithMostPointsPerEvent(results) {
  

//   results.forEach((result) => {
//   });

  

  
// }

console.log(results);
// const winners = findUsersWithMostPointsPerEvent(results);
// console.log(winners);



  
  

  
  useEffect(() => {
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

          console.log(data)  
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
  }, []); 


  const fetchPicks = () => {
    fetch('https://off-therecordpicks.onrender.com/picks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the list of picks with the newly fetched data
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
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
        // Handle error as needed
      });
  };
  




  const handleDeletePick = (pickId) => {
    
    console.log(`https://off-therecordpicks.onrender.com/picks/${pickId}`)
    fetch(`https://off-therecordpicks.onrender.com/picks/${pickId}`, {
      method: "DELETE",
      
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to delete pick');
        }
        // Refresh the list of picks after successful deletion
        return fetchPicks();
      })
      .catch((error) => {
        console.error('Error deleting pick:', error);
        // Handle error as needed
      });
  };


  



const [deletePicks, setDeletePicks] = useState(false)


function countWinsForUsername(leaderboardwinners, username) {
  let winCount = 0;

  for (const event in leaderboardwinners) {
    const winner = leaderboardwinners[event].winner;
    const winners = leaderboardwinners[event].winners;

    if (winners) {
      if (winners.includes(username) ) {
        winCount++;
      }
    } else if (winner === username) {
      winCount++;
    }
  }

  return winCount;
}



const [updatedPicks, setUpdatedPicks] = useState(filteredByMainEvent);

// Function to handle prediction order change
// const handlePredictionOrderChange = (pickId, updatedPredictions) => {
//   console.log(pickId)
//   console.log(updatedPredictions)
//   const updatedPicksCopy = [...updatedPredictions];
//   const updatedPickIndex = updatedPicksCopy.findIndex((pick) => pick.id === pickId);
//   console.log(updatedPicksCopy)
//   console.log(updatedPickIndex)

//   if (updatedPickIndex !== -1) {
//     updatedPicksCopy[updatedPickIndex].predictions = updatedPredictions;
//     setUpdatedPicks(updatedPicksCopy);
//   }
// };

// Function to send a PATCH request to update the pick on the server
const handleUpdatePredictions = (pickId, updatedPredictions) => {
  // Find the pick you want to update in updatedPicks
  console.log(pickId)
  console.log(updatedPredictions)
  updatedPredictions.picks_id = pickId.id
  

  if (pickId !== -1) {
    // Create a copy of the updatedPick
    // const updatedPick = { ...updatedPicks[updatedPickIndex] };

    // // Update the predictions property with the new predictions
    // updatedPick.predictions = updatedPredictions;

    // // Create a copy of updatedPicks
    // const updatedPicksCopy = [...updatedPicks];

    // // Update the pick in the copied array
    // updatedPicksCopy[updatedPickIndex] = updatedPick;

    // Update the state with the modified updatedPicksCopy
    // setUpdatedPicks(updatedPicksCopy);
    console.log(pickId)
    const dataToSend = {
      id: pickId.id,
      owner: pickId.owner ,
      location: pickId.location,
      mainEvent: pickId.main_event,
      predictions: updatedPredictions,
      user_id: pickId.id || 2,
  };
  console.log(dataToSend)


    // Now, you can send a PATCH request to update the pick on the server
    fetch(`https://off-therecordpicks.onrender.com/picks/${pickId.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update pick");
        }
        // Refresh the list of picks after a successful update
        return fetchPicks();
      })
      .catch((error) => {
        console.error("Error updating pick:", error);
        // Handle error as needed
      });
  }
};

const movePredictionDown = (pickId, predIndex) => {
  console.log(pickId);/////pickOBJECT
  console.log(predIndex);/////PREDICTIONINDEX

  // Get the updated order of predictions within the pick
  const updatedPredictions = pickId.predictions;
  console.log(updatedPredictions);

  // Check if it's possible to move the prediction down
  if (predIndex < updatedPredictions.length - 1) {
    // Create a copy of the updated predictions array
    const updatedPredictionsCopy = [...updatedPredictions];

    // Swap the prediction with the one below it in the copied array
    const temp = updatedPredictionsCopy[predIndex];
    updatedPredictionsCopy[predIndex] = updatedPredictionsCopy[predIndex + 1];
    updatedPredictionsCopy[predIndex + 1] = temp;
    console.log(temp);

    // Now, call the function to update the predictions
    handleUpdatePredictions(pickId, updatedPredictionsCopy);
  }
};

// Function to move a prediction up within a pick
const movePredictionUp = (pickId, predIndex) => {
  // Get the updated order of predictions within the pick
  const updatedPredictions = pickId.predictions;
  console.log(updatedPredictions)

  // Check if it's possible to move the prediction up
  if (predIndex > 0) {
    // Swap the prediction with the one above it
    const temp = updatedPredictions[predIndex];
    updatedPredictions[predIndex] = updatedPredictions[predIndex - 1];
    updatedPredictions[predIndex - 1] = temp;

    // Update the order property of predictions
    updatedPredictions.forEach((prediction, index) => {
      prediction.order = index;
    });

    // Update the state with the reordered predictions
    // handlePredictionOrderChange(pickId, updatedPredictions);
    
    
  }
};

// Function to move a prediction down within a pick
const deletePrediction = (pickId, predIndex) => {
  // Get the updated list of predictions
  const updatedPredictions = pickId.predictions;

  // Check if the specified index is valid
  if (predIndex >= 0 && predIndex < updatedPredictions.length) {
    // Remove the prediction at the specified index
    updatedPredictions.splice(predIndex, 1);

    // Call the function to update the predictions
    handleUpdatePredictions(pickId, updatedPredictions);
  }
};
const [showPredictions, setShowPredictions] = useState(true);
const togglePredictions = () => {
  setShowPredictions(!showPredictions);
};



if (predictions.methodCounts) {
  // Data for the chart
  const data = {
    labels: ["TKO/KO", "Submission", "Decision", "Draw/No-Contest"],
    datasets: [
      {
        label: "Method Counts",
        data: [
          predictions.methodCounts["TKO/KO"],
          predictions.methodCounts["Submission"],
          predictions.methodCounts["Decision"],
          predictions.methodCounts["Draw/No-Contest"],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Get the canvas element
  const chartCanvas = document.getElementById("methodChart");

  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });
  }
}





  return (
<div>
  (
    <div className="results">

    <h1 style={{
                  textAlign: 'center',
                  marginTop: '0%',
                  marginBottom: '0%',
                  color: 'gold',
                  textShadow: '0 0 5px rgb(80, 10, 80)',
                  fontSize:'65px',
                  maxWidth: '100%',
                  letterSpacing: '4px',
                  
                  }}>
                  Results
                  </h1>


            {showLeaderBoard ? <div className="lboard">
            
            <h2 className="tac" style={{letterSpacing: '2xcpx',}}>Leaderboard</h2>
      <center><table ><thead><tr>
            <th className="downUnder">Username</th><th  className="downUnder">Total Points</th><th className="downUnder Left5">Wins</th></tr></thead>
        <tbody>{leaderboard.map((user, index) => (
            <tr key={index}>
              <td style={{backgroundColor:'rgba(55, 0, 59, 0.439)'}}>{user.username}</td><td className="tac" style={{backgroundColor:'rgba(55, 0, 59, 0.439)'}} >{user.totalPoints}</td><td className="tac Left6" style={{backgroundColor:'rgba(55, 0, 59, 0.650)'}}  >{countWinsForUsername(leaderboardwinners, user.username)}</td></tr>))}</tbody></table><button className="b2fight"style={{marginBottom:'0%', marginTop:'5%'}} onClick={() => setshowLeaderBoard(!showLeaderBoard)} >Hide Leaderboard</button></center></div>
               : <center><button className="expoint" onClick={() => setshowLeaderBoard(!showLeaderBoard)} >View Leaderboard</button></center> }

 




















            {explainPoints ?    <div className="pointEXB2"><div className="pointEX" >
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 1 point</span> for picking the correct Winner </p><br></br>
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 1 point</span> for picking the correct Method if you chose the correct fighter</p><br></br>
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 2 points</span> for picking Draw/No-Contest correctly</p><center><button className="expoint" onClick={() => setExplainPointst(!explainPoints)} >Hide Point System</button></center></div></div>
       : <center><button className="expoint" onClick={() => setExplainPointst(!explainPoints)} >Explain Point System</button></center> }

<center><button className="expoint"  onClick={() => setSelectedEvent('Jon Jones vs Fedor Emelianenko')} >Dream Card Results</button></center>

     



            <center><label style={{color:'gold',backgroundColor:'black',fontWeight:'bold'}}>Filter Results by Fight Card</label><br></br>
      <select className="filterbutton" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
        <option value="">All</option>
        <option value="Israel Adesanya vs Sean Strickland">Israel Adesanya vs Sean Strickland</option>
        <option value="Alexa Grasso vs Valentina Shevchenko">Grasso vs Shevchenko 2</option>
        <option value="Rafael Fiziev vs Mateusz Gamrot">Fiziev vs Gamrot</option>
        <option value="Grant Dawson vs Bobby Green">Dawson vs Green</option>
        <option value="Sodiq Yusuff vs Edson Barboza">Yusuff vs Barboza</option>
        <option value="Islam Makhachev vs Alexander Volkanovski">Makhachev vs Volkanovski 2</option>
        <option value="Derrick Lewis vs Jailton Almeida">Lewis vs Almeida</option>
        <option value="Jon Jones vs Stipe Miocic">Jones vs Miocic</option>

      </select></center>

      {showCardWins ?   <div className="pointEXCard" >
      
              {Object.entries(leaderboardwinners).map(([event, eventData]) => (
                <div key={event}>
                  <h3 className="tight">{event}</h3>
                  <div className="tight">
                    {eventData.winner === "Pending" ? (
                    
                    <div className="loading2 tight color-yellow" style={{  minHeight: '25px',textAlign:'center'}}>Results Pending</div>
                     
                  
                  ) : (
                    <div>
                      
                      <p className='color-yellow'>
                        {eventData.winners ? (
                          <span>
                            {eventData.winners.map((winner, index) => (
                              <span key={index}>
                                {winner} +{eventData.points} Points
                                {index < eventData.winners.length - 1 ? <br /> : ' '}
                              </span>
                            ))}
                          
                          </span>
                        ) : (
                          <span>
                            {eventData.winner} +{eventData.points} Points
                          </span>
                        )}
                      </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}



      <center><button className="expoint" onClick={() => setShowCardWins(!showCardWins)} >Hide Card Winners</button></center></div>
       : <center><button className="expoint" onClick={() => setShowCardWins(!showCardWins)} >Show Card Winners</button></center> }
      

      
      {user && user.username ? (
                  <center>
                    <button
                  className="urpicksB"
                  onClick={() => setShowOnlyUserPicks(!showOnlyUserPicks)}
                >
                  {showOnlyUserPicks ? "Show All Picks" : `Show Only My Picks`}
                </button>

                  </center>
                ) : null}





<button
          className={showPredictions ? "hide-button":"show-button"  }
          onClick={togglePredictions}
        >
          {showPredictions ?"Hide": "Show"  }
        </button>
      <table className="wholeOne" >
        <thead>
          <tr>
            <th>Picks</th>
            
            
            <th> Fight Results</th>
            {/* Add more table headers as needed later*/}
          </tr>
        </thead>
        <tbody >
        {filteredByMainEvent.map((result, index) => (
  <tr key={index} >
    
    <td className="LeftOne">
      <div className="ownpicksdiv">

              
        <center>
          <strong><span className="small">{result.owner}'s</span> picks</strong>
          <br />
          <strong>{result.main_event}</strong>
      <br></br>
          {deletePicks && user && (user.username === result.owner || user.username === 'AdminKev') ? (
    <button
      className="delete-button"
      onClick={() => handleDeletePick(result.id)}
    >
      Delete Pick
    </button>
  ) : null }
          <h2>{calculateTotalPoints(result, result.main_event, adminKevPicks)} Points</h2>
         
        </center>
      </div>
      {showPredictions ? (
      <div className={`predictions-container ${showPredictions ? '' : 'hidden-predictions'}`}>
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
              

                  {deletePicks && user && ( user.username === 'AdminKev') ?
                   (
                   <div key={prediction.id}>
                  {/* Display prediction details */}
                  {prediction.details}
                  <button onClick={() => movePredictionUp(result, predIndex)}>Move Up </button><br></br>
                  <button onClick={() => movePredictionDown(result, predIndex)}>Move Down </button>
                  <button onClick={() => deletePrediction(result, predIndex)}>Delete</button>
                  </div> ) : null }
                 
                
                <br></br>
                
            </p>
          );
        })}
        </div>)
 : null}
      </td>


      

      
    
      <td className="RightOne">  
        <div className="pickresultsdiv">
          {result.main_event !== 'Jon Jones vs Fedor Emelianenko' ?
          <center>
            <strong>Ufc Results</strong>
            <br />
            <strong>{result.main_event}</strong>
            <h2>{result.predictions.length * 2} Possible </h2>
          </center> :  <center>
            <strong>Dream Card Results</strong>
            <br />
            <strong>{result.main_event}</strong>
            <h2>Popularity Vote </h2>
          </center>}
        </div>
        {showPredictions ? (
        <div className="">
        {getAdminKevPicksForEvent(result.main_event).map((adminKevMatch, matchIndex) => (
  <div className="real-results-container" key={matchIndex}>
    <strong>{adminKevMatch.fighters.join(' vs ')}</strong>
    <br />
    
    {adminKevMatch.methodCounts ?  null :  <strong>Winner:  </strong> }
    {adminKevMatch.winner !== null
  ? adminKevMatch.winner === 'Draw/No-Contest' || 3
    ? 'Draw/No-Contest'
    : adminKevMatch.fighters[adminKevMatch.winner]
  : "Results Pending"}
{adminKevMatch.methodCounts ? (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div
       style={{
        backgroundColor: `${
          adminKevMatch.winner0C > adminKevMatch.winner1C
            ? 'green'
            : adminKevMatch.winner0C < adminKevMatch.winner1C
            ? 'white'
            : 'grey' // Set white for a tie
        }`,
        color: `${
          adminKevMatch.winner0C > adminKevMatch.winner1C
            ? 'white'
            : adminKevMatch.winner0C < adminKevMatch.winner1C
            ? 'darkred'
            : 'white' // Set darkred for a tie
        }`,
        flex: `${adminKevMatch.winner0C / (adminKevMatch.winner0C + adminKevMatch.winner1C)}`,
        padding: "5px", // Add padding for spacing
      }}
    >
      {adminKevMatch.fighters[0]}{" "}
      {((adminKevMatch.winner0C / (adminKevMatch.winner0C + adminKevMatch.winner1C)) * 100)}
      % {adminKevMatch.winner0C}
    </div>
    <div
     style={{
      backgroundColor: `${
        adminKevMatch.winner0C < adminKevMatch.winner1C
          ? 'green'
          : adminKevMatch.winner0C > adminKevMatch.winner1C
          ? 'white'
          : 'grey' // Set white for a tie
      }`,
      color: `${
        adminKevMatch.winner0C < adminKevMatch.winner1C
          ? 'white'
          : adminKevMatch.winner0C > adminKevMatch.winner1C
          ? 'darkred'
          : 'white' // Set darkred for a tie
      }`,
      flex: `${adminKevMatch.winner1C / (adminKevMatch.winner0C + adminKevMatch.winner1C)}`,
      padding: "5px", // Add padding for spacing
    }}
    >
      {adminKevMatch.fighters[1]}{" "}
      {((adminKevMatch.winner1C / (adminKevMatch.winner0C + adminKevMatch.winner1C)) * 100)}
      % {adminKevMatch.winner1C}
    </div>
  </div>
) : null}



{adminKevMatch.methodCounts ?  null : <br></br>}
    
    {adminKevMatch.methodCounts ?  null : <strong>Method:</strong>   }
    
     {adminKevMatch.method !== null ? adminKevMatch.method : "Results Pending"}
    <br />

    {adminKevMatch.methodCounts ? 
    <div>
    TKO/KO - {adminKevMatch.methodCounts['TKO/KO'] }  |  
    Submission - {adminKevMatch.methodCounts['Submission'] }<br></br>
    Decision - {adminKevMatch.methodCounts['Decision'] }  |  
    Draw/No-Contest - {adminKevMatch.methodCounts['Draw/No-Contest'] }<br></br>
    <div>
  {/* <canvas id="methodChart" style={{height:'300px', width: '400px'}}></canvas> */}
      </div>


  </div> : null}
    {adminKevMatch.winner !== null ? (
      <div className="flag-image">
        {/* ... Flag image code ... */}
      </div>
    ) : (
      <div className="loading" style={{ height: '30px', marginLeft: '40%' }}></div>
    )}
  </div>
))} 

</div>)
 : null}

      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
    {user && user.username ? (
                  
                  <button
                style={{ border: 'gold 3px solid', backgroundColor: 'rgb(80, 10, 80)', color: 'white', cursor: 'pointer', marginBottom: '5%',fontWeight:'bold' }}
                onClick={() => setDeletePicks(!deletePicks)}
              >
                {deletePicks ? "Hide Delete" : `Delete My Picks `}
              </button>

                
              ) : null}
  )<img src={logo} alt='fighting logo' onClick={() => handleOptionClick('/')} className='resultsimg' style={{cursor:'pointer'}}/> <p style={{color:'purple',fontWeight:'Bold',textAlign:'center'}}>Click Logo to go to Home Page</p>
       
            
</div>

  );
}

export default Results;
