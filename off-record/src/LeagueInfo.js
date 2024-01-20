// import { useParams } from 'react-router-dom';

function LeagueInfo({ user,leagueName, appLeagues,ufcResults ,weRlive,results2 ,menow }) {
//   const {  } = useParams();

  // Now, you can use the leagueName in your component logic
  console.log(appLeagues)
  
  const selectedLeague = appLeagues.find((league) => league.name === leagueName.name);
  console.log(selectedLeague)
  console.log(results2)
  console.log(menow)



  function transformData(initialData) {
    const predictions = initialData.map((fight, index) => {
      const winner =
    (fight.fighter1 && fight.fighter1.hasRedArrow) ? 0 :
      (fight.fighter2 && fight.fighter2.hasBlueArrow) ? 1 :
        fight.timeDetails1 ? 3 : null;
  
                              
                              ; // Assuming red arrow signifies winner
      const methodMapping = {
        'Dec': 'Decision',
        'Sub': 'Submission',
        'KO/TKO': 'TKO/KO',
      };
  
      const methodMatch = fight.timeDetails1 ? fight.timeDetails1.match(/(Dec|Sub|KO\/TKO)/) : null;
  
  
      const method = methodMatch ? methodMapping[methodMatch[0]] : null;
      const roundMatch = fight.timeDetails1 ? fight.timeDetails1.match(/R(\d+)/): null;
      const round = roundMatch ? roundMatch[1] : null;
  
      const fighter1Name = fight.fighter1 ? fight.fighter1.name : 'Unknown Fighter 1';
      const fighter2Name = fight.fighter2 ? fight.fighter2.name : 'Unknown Fighter 2';
      
      const fighters = [fighter1Name, fighter2Name];
      
  
      return {
        fighters: fighters,
        method: method,
        round: round,
        winner: winner,
      };
    });
  
    return  predictions ;
  }
  
  // Example usage
  
  const liveNready = weRlive ? transformData(weRlive) : [];
  console.log(liveNready);
//   console.log(adminKevPicks)
  console.log(weRlive)


  function findPredictionByMainEventAndOwner(predictions, mainEvent, owner) {
    return predictions.find(prediction => prediction.main_event === mainEvent && prediction.owner === owner);
  }
  
//   // Example usage:
//   const predictionsArray = [
//     { id: 128, location: "United States", main_event: "Alexa Grasso vs Valentina Shevchenko", owner: "Lamro", predictions: [/* ... */] },
//     { id: 130, location: "United States", main_event: "Alexa Grasso vs Valentina Shevchenko", owner: "Skuntpunch", predictions: [/* ... */] },
//     // ... other objects
//   ]
//   const mainEventToFind = "Alexa Grasso vs Valentina Shevchenko";
//   const ownerToFind = "Lamro";
  
  const foundPrediction = findPredictionByMainEventAndOwner(results2, menow, "Lamro");
  
  console.log(foundPrediction);
  
  
  
  // ///////////////////////////////////////////////////////
  // LIVE/////////////////////////////
  // ///////////////////////////////////////////////////////
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
  // ///////////////////////////////
  function calculateLiveTotalPoints(result) {
    let totalPoints = 0;
  
    result.predictions.forEach((prediction, predIndex) => {
      const adminKevPick = liveNready[predIndex];
      const ufcResult = ufcResults[predIndex];
      
      
      const points = calculatePoints(prediction, adminKevPick || ufcResult);
      totalPoints += points;
  
  
     
    });
    
    return totalPoints;
  } 
  
  

  return (
    <div className="text-align-center" style={{backgroundColor:'white'}}>
      
      <h1>{leagueName? leagueName.name : null} League</h1>
      <h2 className="leagueDImg" style={{
         backgroundImage: `url("${leagueName.image}")`,
         
       }} ></h2>
      <p>{leagueName? leagueName.message : null}</p>
      <h4>{menow}</h4>
      {/* Other components or logic */}
      <div className="flex "> 
        <h5 className="width25">Users</h5><h5 className="RightOne">Points</h5>
     </div>


     {selectedLeague && selectedLeague.members ? (
        selectedLeague.members.map((member) => (
          <div key={member.id} className="flex">
            <div
              className="width25"
              style={{
                backgroundImage: `url("${member.image || ''}")`,
                backgroundSize: 'cover',
                backgroundColor:'aqua',
                width: '25px',
                height: '25px',
                borderRadius: '50%',
              }}
            ></div>
            <div className={`width25 ${findPredictionByMainEventAndOwner(results2, menow, member.username) ? 'color-green' : 'color-red'}`}>{member.username}</div>
     
            {/* <div className="width25">
                {findPredictionByMainEventAndOwner(results2, menow, member.username) ? <p>True</p> : <p>False</p> }
            
            
            </div> */}
            <div className="RightOne">
            {/* {calculateLiveTotalPoints} */}
            {calculateLiveTotalPoints(findPredictionByMainEventAndOwner(results2, menow, member.username))}
            </div>
          </div>
        ))
      ) : (
        <p>No members found</p>
      )}
    </div>
  );
}

export default LeagueInfo;