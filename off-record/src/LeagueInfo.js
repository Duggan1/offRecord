// import { useParams } from 'react-router-dom';
import P4pHeader from "./P4pHeader";

function LeagueInfo({ user,leagueName, appLeagues,ufcResults ,weRlive,results2 ,menow, tapImage, onLogout }) {
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
    <>
    <P4pHeader onLogout={onLogout} user={user} />
    <div className="text-align-center" style={{backgroundColor:'white',paddingBottom:'5%'}}>
      <div className="leag">
        <h1 ><span className="p4pborder" style={{backgroundColor:'white',margin:'0px 0px',padding:'0px 5px'}}>{leagueName? leagueName.name : null} League</span></h1>
        <p><span style={{backgroundColor:'white',border:'2px solid black',margin:'0px 0px',padding:'0px 5%'}}>{leagueName? leagueName.message : null}</span></p>
        <div className="flex Twoigs " style={{height:'150px'}}>
        <h2 className="leagueDImg LeftOne" style={{
            backgroundImage: `url("${leagueName.image}")`,
        }} ></h2>
        <h2 className="leagueDImg RightOne" style={{
            backgroundImage: `url("${tapImage}")`,
        }} ></h2>
        </div>
      </div>
      <h4 className="MainEventContainer"><span style={{backgroundColor:'black',textDecoration:'underline',margin:'0px 0px',padding:'0px 5px',color:'white'}}>{menow}</span></h4>
      {/* Other components or logic */}
      <div className="background-dash">
      <div className="flex "> 
      <div className="LeftOne">
        <h3 >Users</h3></div><div className="RightOne"><h3 >Points</h3></div>
     </div>


     {selectedLeague && selectedLeague.members ? (
        selectedLeague.members.map((member) => (
          <div key={member.id} className="flex leagueUcontainer">
            
            <div className="width10 " ><div className="p4pbg Limgsetup "
              
              style={member.image ? { backgroundImage: `url("${member.image}")` } : null}
            ></div>
            </div>
            <div style={{borderRight:'1px solid grey',paddingRight:'1%'}} className={`width40 ${findPredictionByMainEventAndOwner(results2, menow, member.username) ? 'color-black' : 'color-black'}`}>{member.username}
            </div>
     
            {/* <div className="width25">
                {findPredictionByMainEventAndOwner(results2, menow, member.username) ? <p>True</p> : <p>False</p> }
            
            
            </div> */}
            <div className="RightOne" style={{borderLeft:'1px solid black'}}>
            {/* {calculateLiveTotalPoints} */} 
            {findPredictionByMainEventAndOwner(results2, menow, member.username) ? <div className="color-green">

            {calculateLiveTotalPoints(findPredictionByMainEventAndOwner(results2, menow, member.username))}</div>
            : <div
              
            
          ><span style={{
              backgroundSize: '100% 100%',
              backgroundColor:'darkred',
              color:'white',
              padding: '1%',
              borderRadius: '50%'
              
              
            }}>X</span>Picks Missing</div> }
            </div>
          </div>
        ))
      ) : (
        <p>No members found</p>
      )}
      </div>
    </div>
    </>
  );
}

export default LeagueInfo;