import React, { useState, useEffect } from "react";
import './App.css';
import {useNavigate} from 'react-router-dom';
import logo from './logo.png';
import Chart from "chart.js/auto";
import Modal from 'react-modal';
import Dnd from './Dnd';

function Compare({results2, user, ufcCard, ufcResults,  adminKevPicks2, liveFinishes }) {
  const [results, setResults] = useState(results2);
  const [updatedResults, setUpdatedResults] = useState(ufcResults)
  const [showOnlyUserPicks, setShowOnlyUserPicks] = useState(false);
  const [adminKevPicks, setAdminKevPicks] = useState(adminKevPicks2);
  const [selectedEvent, setSelectedEvent] = useState(""); 
  
  console.log(adminKevPicks2,user, ufcCard, ufcResults, results2,  liveFinishes)
  useEffect(()=>{
    setResults(results2)
  },[])
  const navigate = useNavigate()
  const handleOptionClick = (option) => {
      navigate(`${option}`);
    };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

console.log(results)
  const byMainEvent = (results) => {
    return !selectedEvent || results.main_event === selectedEvent;
  }
  
  const [selectedUser, setSelectedUser] = useState(""); // Add this line to define the state
  const [selectedUser2, setSelectedUser2] = useState(""); 

  
  const filteredByMainEvent = results.filter((result) => {
    return (
      (!selectedEvent || result.main_event === selectedEvent) &&
      (!selectedUser || result.owner === selectedUser) &&
      (!showOnlyUserPicks || result.owner === user.username)
    );
  });
  const filteredByMainEvent2 = results.filter((result) => {
    return (
      (!selectedEvent || result.main_event === selectedEvent) &&
      (!selectedUser2 || result.owner === selectedUser2) &&
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
  

  
  

  

  

  const getAdminKevPicksForEvent = (event) => {
    if (event === 'Jon Jones vs Fedor Emelianenko') {
      // Return a separate array for the dream card event
      return  predictions;
    } else {
      // For other events, return adminKevPicks or ufcResults as before
      return adminKevPicks[event] || ufcResults;
    }
  };
  
  useEffect(()=>{
    getAdminKevPicksForEvent(selectedEvent)
  },[selectedEvent])

 
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




  
  

  


  



  const uniqueMainEventsRD = [...new Set(results.map(result => result.main_event))];
  const uniqueMainEvents = uniqueMainEventsRD.filter(event => event !== 'Jon Jones vs Fedor Emelianenko');
  console.log(uniqueMainEvents);
  const uniqueUsernamesRD = [...new Set(results.map(result => result.owner))];
  const uniqueUsernames = uniqueUsernamesRD.filter(user => user !== 'AdminKev');
  console.log(uniqueUsernames);




  





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



const [showPredictions, setShowPredictions] = useState(false);
console.log(filteredByMainEvent)



const [ownPicksVisibility, setOwnPicksVisibility] = useState(
  filteredByMainEvent.map((result) => [result.id, false])
);

useEffect(() => {
  const visibility = filteredByMainEvent.reduce((visibility, result) => {
    visibility[result.id] = false;
    return visibility;
  }, {});
  setOwnPicksVisibility(visibility);
}, [filteredByMainEvent.length > 2]);

console.log(ownPicksVisibility)
const togglePredictions = () => {
  setShowPredictions(!showPredictions);

  // Determine the new visibility state based on showPredictions
  const newVisibility = showPredictions ? false : true;

  // Create an updated object with all entries set to newVisibility
  const updatedOwnPicksVisibility = {};
  for (const key in ownPicksVisibility) {
    updatedOwnPicksVisibility[key] = newVisibility;
  }
  console.log(updatedOwnPicksVisibility)
  setOwnPicksVisibility(updatedOwnPicksVisibility);
};





filteredByMainEvent.forEach((result) => {
  result.points = calculateTotalPoints(result, result.main_event, adminKevPicks);
});


filteredByMainEvent.sort((a, b) => b.points - a.points);


  const liveFinishesArray = Array.from(liveFinishes);
  console.log( liveFinishesArray)
  console.log( liveFinishes)
  ////////////////////////////////////////////
  const adminKevPicksForEvent = getAdminKevPicksForEvent(selectedEvent);
   // Separate AdminKev's picks from other users
  const adminKevPicksFiltered = adminKevPicksForEvent.filter(
    (pick) => pick.owner === 'AdminKev'
  );
  const otherUserPicksFiltered = adminKevPicksForEvent.filter(
    (pick) => pick.owner !== 'AdminKev'
  );
  



console.log(filteredByMainEvent)
console.log(filteredByMainEvent2)

console.log(adminKevPicksForEvent)
console.log(selectedEvent)

  return (<>
<div>
  
    <div style={{backgroundImage:'url(https://pokerstarslearn.com/wp-content/uploads/2019/04/GettyImages-648062892-scaled.jpg)', backgroundSize:'100% 100%', minHeight:'200px'}}>
            <h1 style={{
                  textAlign: 'center',
                  marginTop: '0%',
                  marginBottom: '0%',
                  color: 'white',
                  textShadow: '0 0 5px darkred',
                  fontSize:'65px',
                  maxWidth: '100%',
                  letterSpacing: '4px',
                  
                  }}>
                  Compare 
                  </h1>
    </div>
                 

                   
<div className="element-with-border3" style={{backgroundColor:'', padding:'2%'}}>
        <div style={{ flex: 1 }}>
            <center>
                                <label style={{ color: 'white', backgroundColor: 'black', fontWeight: 'bold' }}>
                                    Select Fight Card
                                </label>
                                <br />
                                <select className="" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
                                    <option value="">All</option>
                                    {uniqueMainEvents
                                    .slice()
                                    .reverse()
                                    .map((mainEvent, index) => (
                                        <option key={index} value={mainEvent}>
                                        {mainEvent}
                                        </option>
                                    ))}
                                </select></center>
            </div>
{ selectedEvent.length > 2 ? 
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%',paddingTop:'20px',paddingBottom:'20px' }}>
        
        <div style={{ flex: 1 }}>
            <center>
            <label style={{ color: 'white', backgroundColor: 'darkred', fontWeight: 'bold' }}>
                Select Red Corner
            </label>
            <br />
            <select
                className=""
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
            >
                <option value="">All </option>
                {uniqueUsernames.map((username, index) => (
                <option key={index} value={username}>
                    {username}
                </option>
                ))}
            </select></center>
            </div>

        


        
            
            <div style={{ flex: 1 }}>
            <center>
            <label style={{ color: 'white', backgroundColor: 'navy', fontWeight: 'bold' }}>
                Select Blue Corner
            </label>
            <br />
            <select
                className=""
                value={selectedUser2}
                onChange={(e) => setSelectedUser2(e.target.value)}
            >
                <option value="">All </option>
                {uniqueUsernames.map((username, index) => (
                <option key={index} value={username}>
                    {username}
                </option>
                ))}
            </select></center>
            </div>
        </div>: null  }
    
</div>
  {/* //////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////
/////////////////////////////////////////////////// */}
{ selectedEvent.length > 2 && selectedUser2.length > 2 && selectedUser.length ? 
  <table className="wholeOne">
  <thead>
    <tr>
      <th style={{color:'white',backgroundColor:'red',border:'solid white 2px',minWidth:'33%',maxWidth:'33%'}} >{selectedUser}<br></br>
      {filteredByMainEvent.map((result, rowIndex) => (
                <div key={rowIndex}>
                    {calculateTotalPoints(result, result.main_event, adminKevPicks)}
                </div>
                ))}

      </th>
      <th style={{color:'black',backgroundColor:'whitesmoke',border:'solid black 2px',minWidth:'33%',maxWidth:'33%'}} >Fight Results</th>
      <th style={{color:'white',backgroundColor:'blue',border:'solid white 2px',minWidth:'33%',maxWidth:'33%'}} >{selectedUser2}<br></br>
      {filteredByMainEvent2.map((result, rowIndex) => (
                <div key={rowIndex}>
                    {calculateTotalPoints(result, result.main_event, adminKevPicks)}
                </div>
                ))}
      </th>
      {/* Add more table headers as needed later*/}
    </tr>
  </thead>
  <tbody className="text-align-center">
    

        <tr>

          {/* Red Corner user's pick for the fight card */}
          {filteredByMainEvent.map((result, rowIndex) => (
            <td style={{color:'black',backgroundColor:' white',border:'solid darkred 2px',minWidth:'33%',maxWidth:'33%'}}  key={rowIndex}>
                
                {result.predictions.map((prediction, matchIndex) => (
                    <div key={matchIndex}  style={{border: 'solid black 2px', minHeight:'200px',maxHeight:'200px'}} >
                    {/* <strong>{prediction.fighters.join(' vs ')}</strong> */}
                    <br />
                    {/* Display other prediction details */}
                    <strong className={calculatePoints(prediction, adminKevPicksForEvent[rowIndex] || ufcResults[rowIndex]) > 0 ? "color-green" : ""}>Winner:{" "}
                        {prediction.winner === 0
                            ? prediction.fighters[0]
                            : prediction.winner === 1
                            ? prediction.fighters[1]
                            
                            : "None"}</strong>
                        <br />
                        <strong className={calculatePoints(prediction, adminKevPicksForEvent[rowIndex] || ufcResults[rowIndex]) > 1 ? "color-green" : ""}>Method: {prediction.method} </strong>
                        <br />
                        {prediction.round ? <>
                        <strong className={calculatePoints(prediction, adminKevPicksForEvent[rowIndex] || ufcResults[rowIndex]) > 2 ? "color-green" : ""}>Round:{prediction.round} </strong> 
                        <br /> </>: null }
                    </div>
                ))}
                
            </td>
            ))}


          {/* AdminKev's pick for that fight card (results) */}
          <td className="" style={{color:'white',backgroundColor:'black',border:'solid white 2px',minWidth:'33%',maxWidth:'33%'}}>
            {adminKevPicksForEvent.map((adminKevMatch, matchIndex) => (
              <div style={{border: 'solid black 2px', minHeight:'200px',maxHeight:'200px'}} >
                <div className="element-with-border2"></div>
                <strong key={matchIndex}>{adminKevMatch.fighters.join(' vs ')}</strong>
                <br />

                {adminKevMatch.methodCounts ? null : <strong>Winner: </strong>}
                {adminKevMatch.winner !== null ? (
                  adminKevMatch.winner === 'Draw/No-Contest' ? (
                    'Draw/No-Contest'
                  ) : (
                    adminKevMatch.fighters[adminKevMatch.winner]
                  )
                ) : (
                  liveFinishesArray ? liveFinishesArray[matchIndex] : 'results pending'
                )}

                {adminKevMatch.methodCounts ? null : <br />}

                {adminKevMatch.methodCounts ? null : <strong>Method:</strong>}

                {adminKevMatch.method !== null ? (
                  adminKevMatch.method === 'Decision - MajorityDecision - Majority' &&
                  adminKevMatch.winner === 3 ? (
                    'Draw/No-Contest'
                  ) : (
                    adminKevMatch.method
                  )
                ) : (
                  liveFinishesArray[matchIndex]
                )}

                <br />
                {!adminKevMatch.methodCounts ? (
                  adminKevMatch.round ? (
                    <>
                      <strong>Round:</strong> {adminKevMatch.round}
                      <br />
                    </>
                  ) : null
                ) : null}
                

                {adminKevMatch.winner !== null ? (
                  <div className="flag-image">
                    {/* ... Flag image code ... */}
                  </div>
                ) : (
                  <div className="loading" style={{ height: '30px', marginLeft: '40%' }}></div>
                )}
              </div>
            ))}
          </td>

          {/* Blue Corner user's pick for the fight card */}
          
          {filteredByMainEvent2.map((result, rowIndex) => (
            <td key={rowIndex} style={{backgroundColor:'white',color:'black',border:'solid  navy 2px',minWidth:'33%',maxWidth:'33%'}}>
                <div>
                {result.predictions.map((prediction, matchIndex) => (
                    <div key={matchIndex} className="" style={{border: 'solid black 2px', minHeight:'200px',maxHeight:'200px'}}>
                    {/* <strong>{prediction.fighters.join(' vs ')}</strong> */}
                    <br />
                    {/* Display other prediction details */}
                    <strong>Winner:</strong>{" "}
                        {prediction.winner === 0
                            ? prediction.fighters[0]
                            : prediction.winner === 1
                            ? prediction.fighters[1]
                            
                            : "None"}
                        <br />
                        <strong>Method:</strong> {prediction.method} 
                        <br />
                        {prediction.round ? <>
                        <strong>Round:</strong> {prediction.round} 
                        <br /> </>: null }
                    </div>
                ))}
                </div>
            </td>
            ))}

        </tr>
      

  </tbody>
</table>

:  <div style={{ margin: '0px 20%', backgroundColor: 'whitesmoke', textAlign: 'center', marginTop: '5%', padding: '20px', borderRadius: '10px' }}>
<p style={{ marginBottom: '20px' }}>If you'd like to compare users picks, please:</p>
<div style={{ backgroundColor: 'whitesmoke', textAlign: 'center' }}>
  <span style={{ display: 'block', marginTop: '10px' }}>
    <span style={{ padding: '5px', backgroundColor: 'black', color: 'white', borderRadius: '40%', marginRight: '5px' }}>1.</span> Select the <span className="landunder">fight card</span>
  </span>
  <span style={{ display: 'block', marginTop: '10px' }}>
    <span style={{ padding: '5px', backgroundColor: 'black', color: 'white', borderRadius: '40%', marginRight: '5px' }}>2.</span> Select a <span className="color-red">Red Corner</span>
  </span>
  <span style={{ display: 'block', marginTop: '10px' }}>
    <span style={{ padding: '5px', backgroundColor: 'black', color: 'white', borderRadius: '40%', marginRight: '5px' }}>3.</span> Select a <span className="color-blue">Blue Corner</span>
  </span>
</div>
</div>



}


            

                
      
   
    
  
  <img src={logo} alt='fighting logo' onClick={() => handleOptionClick('/')} className='resultsimg' style={{cursor:'pointer'}}/> 
  
  <p style={{color:'white',fontWeight:'Bold',textAlign:'center'}}>Click Logo to go to Home Page</p>
  <div onClick={closeModal} className="element-with-border2"></div>     
            
</div>
{/* Modal */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel=""
  style={{maxHeight:'fit-content'}}
>
    <div  className='text-align-center  '>
            <h2 className=''
            style={{ margin:'10px' }}
            >Picks4Points.com</h2>
        
        </div>
  
</Modal>
</>
  );
}

export default Compare;
