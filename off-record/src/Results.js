import React, { useState, useEffect } from "react";
import './App.css';
import {useNavigate} from 'react-router-dom';
import logo from './logo.png';

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
  

    const getAdminKevPicksForEvent = (event) => {
    return adminKevPicks[event] || ufcResults; };

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
  
    results.forEach((result) => {
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
      } else if (userPoints === eventWinners[result.main_event].points) {
        eventWinners[result.main_event].winner = null; // Set winner to null if points are the same
      }
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

  // Check if both pick and result are valid objects
  if (pick && result) {
    // Check if the winner matches
    if (pick.method !== null && result.method !== null && pick.method === "Draw/No-Contest" && result.method === "Draw/No-Contest") {
      points += 2;
    }
    if  (pick.method !== null && result.method !== null && pick.method !== "Draw/No-Contest" && result.method === "Draw/No-Contest") {
      // console.log('working')
    }

    else {

        if (pick.winner !== null && result.winner !== null && pick.winner === result.winner) {
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

    if (winner === username) {
      winCount++;
    }
  }

  return winCount;
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


{showCardWins ?   <div className="pointEXCard" >
      
              {Object.entries(leaderboardwinners).map(([event, eventData]) => (
                <div key={event}>
                  <h3 className="tight">{event}</h3>
                  <div className="tight">
                    {eventData.winner === "Pending" ? (
                    
                    <div className="loading2 tight color-yellow" style={{  minHeight: '25px',textAlign:'center'}}>Results Pending</div>
                     
                  
                  ) : (
                    <div>
                      
                      <p  className='color-yellow' >
                         {eventData.winner} + {eventData.points} Points
                      </p></div>
                    )}
                  </div>
                </div>
              ))}



      <center><button className="expoint" onClick={() => setShowCardWins(!showCardWins)} >Hide Card Winners</button></center></div>
       : <center><button className="expoint" onClick={() => setShowCardWins(!showCardWins)} >Show Card Winners</button></center> }
     



            <center><label style={{color:'gold',backgroundColor:'black',fontWeight:'bold'}}>Filter Results by Fight Card</label><br></br>
      <select className="filterbutton" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
        <option value="">All</option>
        <option value="Israel Adesanya vs Sean Strickland">Israel Adesanya vs Sean Strickland</option>
        <option value="Alexa Grasso vs Valentina Shevchenko">Grasso vs Shevchenko 2</option>
        <option value="Rafael Fiziev vs Mateusz Gamrot">Fiziev vs Gamrot</option>
        <option value="Grant Dawson vs Bobby Green">Dawson vs Green</option>
        <option value="Sodiq Yusuff vs Edson Barboza">Yusuff vs Barboza</option>
        <option value="Islam Makhachev vs Charles Oliveira">Makhachev vs Oliveira 2</option>
        <option value="Curtis Blaydes vs Jailton Almeida">Blaydes vs Almeida</option>
        <option value="Jon Jones vs Stipe Miocic">Jones vs Miocic</option>

      </select></center>
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





     
      <table className="wholeOne" >
        <thead>
          <tr>
            <th>Picks</th>
            
            
            <th> Fight Results</th>
            {/* Add more table headers as needed */}
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
          <strong>{result.main_event}</strong><br></br>
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


      

      
    
      <td className="RightOne">  
        <div className="pickresultsdiv">
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
    {adminKevMatch.winner !== null
  ? adminKevMatch.winner === 'Draw/No-Contest'
    ? 'Draw/No-Contest'
    : adminKevMatch.fighters[adminKevMatch.winner]
  : "Results Pending"}

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
