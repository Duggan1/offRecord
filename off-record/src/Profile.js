// import { useParams } from 'react-router-dom';
import P4pHeader from "./P4pHeader";
import React, { useState, useEffect } from "react";

function Profile({ user,leagueName, appLeagues,ufcResults ,weRlive,results2 ,menow, tapImage, onLogout,adminKevPicks2 }) {
//   const {  } = useParams();
const [results, setResults] = useState(results2);
const [adminKevPicks, setAdminKevPicks] = useState(adminKevPicks2);



const filteredByMainEvent = results.filter((result) => {
    return (
      ( result.owner === user?.username)
    );
  });
//   const filteredByMainEvent2 = results.filter((result) => {
//     return (
//       ( result.owner === user.username)
//     );
//   });
//////////////////////////////////////////////
const [leaderboard, setLeaderboard] = useState([]);
const [leaderboardwinners, setLeaderboardwinners] = useState([]);




  useEffect(() => {
    // Fetch and set results data as you are currently doing...

    // Calculate and set the leaderboard based on results and user data
    calculateLeaderboard(results, ufcResults);
  }, [results, ufcResults]);

  const calculateLeaderboard = (results, ufcResults) => {
    const userPointsMap = new Map();
    const eventWinners = {};
    const userPicksCountMap = new Map();
  
    results.filter(result => result.main_event !== 'Jon Jones vs Fedor Emelianenko').forEach((result) => {
      // Standardize the username by converting it to lowercase
      const standardizedUsername = result.owner.toLowerCase();
  
      // Calculate total points for each result
      const totalPoints = calculateTotalPoints(result, result.main_event, ufcResults);
  
      if (!userPicksCountMap.has(standardizedUsername)) {
        userPicksCountMap.set(standardizedUsername, { totalPicksCount: 0 });
      }
      userPicksCountMap.get(standardizedUsername).totalPicksCount += result.predictions.length;
  
      // Update the user's total points in the map
      if (!userPointsMap.has(standardizedUsername)) {
        userPointsMap.set(standardizedUsername, { totalPoints: 0, totalWinnerPointsOnly: 0, totalPicksCount: 0 });
      }
      userPointsMap.get(standardizedUsername).totalPoints += totalPoints;
      userPointsMap.get(standardizedUsername).totalWinnerPointsOnly += calculateTotalWinnerPointsOnly(result, result.main_event);
      userPointsMap.get(standardizedUsername).totalPicksCount += result.predictions.length;
  
      const userPoints = calculateTotalPoints(result, result.main_event);
  
      if (!eventWinners.hasOwnProperty(result.main_event)) {
        eventWinners[result.main_event] = { winner: null, points: -1 };
      }
  
      if (userPoints > eventWinners[result.main_event].points) {
        eventWinners[result.main_event] = { winner: standardizedUsername, points: userPoints };
      } else if (userPoints === eventWinners[result.main_event].points && userPoints > 0) {
        // Check if there's already an array to store tied winners; if not, create one
        if (!eventWinners[result.main_event].winners) {
          eventWinners[result.main_event].winners = [eventWinners[result.main_event].winner];
        }
        // Add the current user to the array of tied winners
        eventWinners[result.main_event].winners.push(standardizedUsername);
      }
    });
  
    // Set the winner to "Pending" for events with no points
    for (const event in eventWinners) {
      if (eventWinners[event].points === 0) {
        eventWinners[event].winner = "Pending";
      }
    }
  
    const leaderboardArray = Array.from(userPointsMap, ([username, { totalPoints, totalWinnerPointsOnly, totalPicksCount }]) => ({
      username,
      totalPoints: totalPoints,
      totalPicksCount: totalPicksCount || 0,
      totalWinnerPointsOnly: totalWinnerPointsOnly
    }));
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

  function calculatewinnerePointsonly(pick, result) {
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
  
  
          }
         }
    }
  
    return points;
  }
  function calculateTotalWinnerPointsOnly(result, mainEvent) {
    let totalPoints = 0;
  
    result.predictions.forEach((prediction, predIndex) => {
      const adminKevPicksForEvent = getAdminKevPicksForEvent(mainEvent);
      const adminKevPick = adminKevPicksForEvent[predIndex];
      const ufcResult = ufcResults[predIndex];
      
  
      const points = calculatewinnerePointsonly(prediction, adminKevPick || ufcResult);
      totalPoints += points;
    });
    
    return totalPoints;
  }
  
   
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
            
            if (pick.round !== null && result.round !== null && pick.round == result.round) {
              points += 1;
            }}
  
  
          }
         }
    }
  
    return points;
  }


  
  const getAdminKevPicksForEvent = (event) => {
    if (event === 'Jon Jones vs Fedor Emelianenko') {
      // Return a separate array for the dream card event
      return  null;
    } else {
      // For other events, return adminKevPicks or ufcResults as before
      return adminKevPicks[event] || ufcResults;
    }
  };
  
  
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

console.log(filteredByMainEvent)
// Step 1: Identify all unique main events
const uniqueMainEvents = [...new Set(filteredByMainEvent.map(result => result.main_event))];

// Step 2: Filter out main events with predictions
const mainEventsWithPredictions = filteredByMainEvent.map(result => result.main_event);

// Step 3: Display main events you missed or don't have picks for
const uniqueMainEventsMissedOrNoPicks = results.filter(result => {
    return !mainEventsWithPredictions.includes(result.main_event)
    //  && uniqueMainEvents.includes(result.main_event) ;
  });
  // Step 4: Extract unique main events from mainEventsMissedOrNoPicks
// const  = [...new Set(mainEventsMissedOrNoPicks.map(result => result.main_event))];

// Step 4: Extract unique main events from mainEventsMissedOrNoPicks
const mainEventsMissedOrNoPicks = [...new Set(uniqueMainEventsMissedOrNoPicks.map(result => result.main_event))];


  


console.log(mainEventsMissedOrNoPicks);
console.log(mainEventsWithPredictions);
console.log(uniqueMainEvents)
// console.log(user.username)
// console.log(countWinsForUsername(leaderboardwinners, user.username.toLowerCase() ))

// useEffect(() => {
    // Check if user is not null before setting wins
    if (user) {
      user.wins = countWinsForUsername(leaderboardwinners, user.username.toLowerCase());
    }
//   }, [user && leaderboardwinners ]);

  const getWinnerByIndex = (results, mainEventsList, index) => {
    const mainEventAtIndex = mainEventsList[index];
  
    if (mainEventAtIndex) {
      const winnerInfo = results[mainEventAtIndex];
      const winner = winnerInfo ? winnerInfo.winner : 'No Winner';
      return winner;
    } else {
      return 'Index out of range';
    }
  };
  const findUserPointsByUsername = (leaderboard, username) => {
    const user = leaderboard.find((user) => user.username === username);
  
    // Check if the user is found
    if (user) {
      return user.totalPoints;
    } else {
      // Handle case when user is not found
      console.log(`User with username ${username} not found.`);
      return null;
    }
  };
  
//   console.log(getWinnerByIndex())
return (
    <>
      <P4pHeader onLogout={onLogout} user={user} />
      {user ? (
        <div className="bg-white">
          <h1 className="text-align-center fs45">{user?.username} {user?.userName}</h1>
  
          <div className="flex">
            <div className="RightOne text-align-center">
              <p className="pt5">{user?.fullname}</p>
              <p className="pt5">{user?.email}</p>

            <div className='p4pBelt pt5'>
              
              </div>
              <p className="pt95 "style={{marginTop:'-20px',}}><span  className="insideBelt green-bg ">x {user?.wins}</span></p> 
            </div>
  
            <div className="LeftOne">
              <h1 className="ProfilePicPreview" style={{
                textAlign: 'center',
                margin: '0 15%',
                backgroundImage: `url(${user?.image || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'})`
              }} alt={`${user?.image}`} />
             <p className="text-align-center pt5"> Total Points { findUserPointsByUsername(leaderboard,user.username.toLowerCase())}</p>
            </div>
          </div>
  
          <div style={{ paddingTop: '1%', paddingBottom: '5%' }} className="element-with-border3"></div>
  <div className="flex-start background-dash">
    <div className="LeftOne text-align-center">
    <><h2 style={{borderBottom:'3px solid darkred'}} className="fs25"> Missed</h2>
        {mainEventsMissedOrNoPicks.map((mainEvent, index) => (
                    <p className="color-red" key={index}>
                     {mainEvent}
                    {/* Add additional information here if needed */}
                    </p>
                ))}</>
                </div>
              <div className="RightOne text-align-center">
                <><h2 className="fs25" style={{borderBottom:'3px solid navy',borderLeft:'3px solid black'}}> Submitted </h2>
          {mainEventsWithPredictions.map((mainEvent, index) => (
            
<p className={`${getWinnerByIndex(leaderboardwinners, mainEventsWithPredictions, index) == user.username.toLowerCase() ? 'green-bg' : 'color-black'}`} key={index}>       
              {mainEvent} {mainEvent.winner} 
              {/* Add additional information here if needed */}
            </p>
          ))}</>
          </div>
          
                </div>
        </div>
      ) : (
        <div className="snowwhite marginTop20 flex">
          <p className="pt5">Please Sign In to view your Profile </p> <h1 className="fs65">&#8599;</h1>
        </div>
      )}
    </>
  );
}

export default Profile;