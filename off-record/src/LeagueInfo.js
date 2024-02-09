// import { useParams } from 'react-router-dom';
import P4pHeader from "./P4pHeader";
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import React, { useState , useEffect } from 'react';

function LeagueInfo({ user,leagueName, appLeagues,ufcResults ,weRlive,results2 ,menow, tapImage, onLogout }) {
//   const {  } = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
// Now, you can use the leagueName in your component logic
  console.log(appLeagues)
  
  const selectedLeague = appLeagues.find((league) => league.name === leagueName.name);
  console.log(selectedLeague)
  console.log(results2)
  console.log(menow)
  const navigate = useNavigate();



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
  const sortedMembers = selectedLeague && selectedLeague.members
  ? selectedLeague.members.slice().sort((a, b) => {
      const hasPicksA = findPredictionByMainEventAndOwner(results2, menow, a.username);
      const hasPicksB = findPredictionByMainEventAndOwner(results2, menow, b.username);

      // Move members without picks to the bottom
      if (!hasPicksA && !hasPicksB) return 0;
      if (!hasPicksA) return 1;
      if (!hasPicksB) return -1;

      // Sort based on livetotalpoints for members with picks
      const pointsA = calculateLiveTotalPoints(hasPicksA);
      const pointsB = calculateLiveTotalPoints(hasPicksB);
      return pointsB - pointsA; // Sort in descending order
    })
  : [];
  console.log(sortedMembers)
  // console.log(findPredictionByMainEventAndOwner(results2, menow, user.username).predictions.length / 2)



  

  return (
    <>
    <P4pHeader onLogout={onLogout} user={user} />
    <div className="text-align-center" style={{backgroundColor:'white',paddingBottom:'5%'}}>
    <div className="leagueBGH" style={{ paddingBottom:'20%'}}>
    <div className="flex-start">
  <h2
    className="fs45 color-red"
    onClick={() => navigate('/leagues')}
    style={{ cursor: 'pointer', textAlign: 'start', marginLeft: '5%' }}
  >
    &#8592;
  </h2>
  <h2
    className="fs45 color-blue"
    onClick={() => navigate('/leagues/adjustments')}
    style={{ cursor: 'pointer', textAlign: 'start', marginLeft: 'auto',marginRight:'2%' }}
  >
    &#8594;
  </h2>
</div>

              </div>
              
      <div className="leag">
        <div className="flex Twoigs " style={{height:'150px'}}>
        <h2 className="leagueDImg LeftOne" style={{
            backgroundImage: `url("${leagueName.image}")`,
        }} ></h2>
        <h2 className="leagueDImg RightOne" onClick={() => {
      openModal();
      // setPredictions([]);
      // navigate('/results');
    }} style={{
            backgroundImage: `url("${tapImage}")`,height:'200px',cursor:'pointer'
        }} ></h2>
        </div>
        <div className="flex" style={{}}>
          <div className="LeftOne p4pborder bg-white">
        <h1 ><span className=" fs35" style={{textDecoration:'underline', backgroundColor:'white',margin:'0px 0px',padding:'0px 5px'}}>{leagueName? leagueName.name : null} </span></h1>
        <p><span style={{backgroundColor:'white',margin:'0px 0px',padding:'0px 5%'}}>{leagueName? leagueName.message : null}</span></p>
          </div>

          <div className="RightOne">
            <p style={{marginRight:'10%',marginLeft:'10%',marginTop:'50px'}}><span className="" style={{cursor:'pointer',backgroundColor:'white', padding:'0px 10%',border:'black solid 2px', borderRadius:'10px',paddingBottom:'3px'}}
            onClick={() => {
              openModal();
              // setPredictions([]);
              // navigate('/results');
            }}>View Card</span></p>

        

  



          </div>
        </div>

      </div>
      <h4 className="MainEventContainer"><span style={{backgroundColor:'black',margin:'0px 0px',padding:'0px 5px',color:'white'}}>{menow} </span></h4>
      {/* Other components or logic */}
      <div className="background-dash">
        <p className="fs35" style={{backgroundImage:'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqRuIYdVnjICsgB0quMOkLy6ezG4gwBRNFmw&usqp=CAU)',backgroundColor:'black', color:'white',textDecoration:'underline'}}>Results</p>
      <div className="flex " style={{backgroundImage:'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqRuIYdVnjICsgB0quMOkLy6ezG4gwBRNFmw&usqp=CAU)',backgroundColor:'black',padding:'2% 0%',flexWrap: 'wrap' }}> 


      
      {liveNready ? (
  liveNready.map((fight, index) => (
    <div key={index} className="flex" style={{
      backgroundColor: 'whitesmoke',
      padding: '1%',
      margin: '2px',
      borderRadius: '18px',
      color: 'black',
      border: 'black 1px solid',
    }}>
      <p>{index + 1}.</p>
      <p
        style={{
          backgroundColor: fight.winner ? fight.winner === 1 ? "navy" : 'darkred' : "grey",
          padding: '0px 3%',
          margin: '2px',
          borderRadius: '18px',
          color: fight.winner ? 'white' : 'white',
          border: 'black 1px solid', width:'50px'
        }}
      >
        {fight.method && fight.method[0] !== null ? fight.method[0] : ' ?'}

        {fight.method && fight.method[0] === 'T'
  ? (fight.round ? `KO R${fight.round}` : 'KO')
  : (fight && fight.method
      ? (fight.method[0] === 'D' ? 'Dec' : `${fight.method[0]}${fight.round ? ` R${fight.round}` : ''}`)
         : (fight && fight.method
           ? (fight.method[0] === 'S'  ? `S R${fight.round}` : 'Sub') : null))}



      </p>
    </div>
  ))
) : null}






</div>
<div className="flex "> 
      <div className="LeftOne">
        <h3 >League Members</h3></div><div className="RightOne"><h3 >Points</h3></div>
     </div>
     <div style={{borderBottom:'solid white 0px',borderTop:'solid white 3px'}} class="element-with-border2"></div>

<div className='text-align-center' style={{backgroundColor:'whitesmoke', margin: '0px 0%', padding:'5%'}}>
     {sortedMembers ? (
        sortedMembers.map((member) =>
         (
          <div style={{border:'black 1px solid', backgroundColor:'white', marginBottom: '10px',borderRadius:'8px', marginRight: '15px', marginLeft: '15px' }}>
          <div key={member.id} style={{display: 'flex', alignItems: 'center' }}>
            
            <img
              src={member.image || leagueName.image} // Use a default image URL if member.image is null
              alt={member.username}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <p
              style={{
                marginLeft: '10px',
                // fontSize: member.username.length > 10 ? '50%' : 'inherit',
                 maxWidth:'40%'
              }}

              className={member.username.length > 10 ? `moblie-small `: ""}
            >
              {member.username}
            </p>

            
            {findPredictionByMainEventAndOwner(results2, menow, member.username) ? 
            <div
              style={{
              //   width: '20px',
                color: 'white',
                borderRadius: '9px',
                backgroundColor: 
              //   clickedMembers.includes(member.id) ? 'red' : 
                'darkgreen', fontWeight:'900',fontSize:'20px',
                cursor: 'pointer',
                marginLeft: 'auto', marginRight:'5%',padding:'5px 20px'
  
              }}
              // onClick={() => handleRemoveMember(member.id)}
            >{calculateLiveTotalPoints(findPredictionByMainEventAndOwner(results2, menow, member.username))}</div>
            
            : 
            
            <div  style={{
              //   width: '20px',
                color: 'black',
                borderRadius: '9px',border: '2px solid darkred',
                backgroundColor: 
              //   clickedMembers.includes(member.id) ? 'red' : 
                'whitesmoke',
                cursor: 'pointer',
                marginLeft: 'auto', marginRight:'0%',padding:'5px',minWidth:'40%'
  
              }}><div
            
          
                ><span style={{
                    backgroundSize: '100% 100%',
                    backgroundColor:'darkred',
                    color:'white',
                    padding: '1%',
                    borderRadius: '50%'
                    
                    
                  }}>X</span>Picks Missing</div>
              </div>}


          </div>

          <div className="flex" style={{ flexWrap: 'wrap' }}>
  {findPredictionByMainEventAndOwner(results2, menow, member.username)?.predictions?.map((fight, index) => {
    // Check if liveNready[index] and fight are defined
    if (liveNready[index] && fight) {
      return (
        <div key={index} className="flex" style={{
          backgroundColor: 'whitesmoke',
          padding: '1%',
          margin: '2px',
          borderRadius: '18px',
          color: 'black',
          border:
            liveNready[index].winner && fight.winner
              ? liveNready[index].winner === fight.winner
                ? 'green 3px solid'
                : 'red 3px solid'
              : 'black 3px solid',
        }}>

{liveNready[index].winner && fight.winner ? 
    liveNready[index].winner === fight.winner ? <p className='color-green bold'>+1</p> :
        (liveNready[index].method && fight.method ?
            liveNready[index].method === fight.method ? <p className='color-green bold'>+2</p> :
                (liveNready[index].round && fight.round ?
                    liveNready[index].round === fight.round ? <p className='color-green bold'>+3</p> : <p className='color-green bold'>+2</p> :
                <p className='color-green bold'> +2</p>) :
            <p className='color-green bold'>+2</p>) :
    <p className=''>{index + 1}.</p>
}


                    

          
          
          
          
          
          <p
            style={{
              backgroundColor: fight.winner ? 'darkred' : 'navy',
              padding: '1%',
              margin: '2px',
              borderRadius: '18px',
              color: 'white',
              border: 'black 1px solid', width:'50px'
            }}
          >
           {fight.method && fight.method[0] === 'T'
  ? (fight.round ? `KO R${fight.round}` : 'KO')
  : (fight && fight.method
      ? (fight.method[0] === 'D' ? 'Dec' : `${fight.method[0]}${fight.round ? ` R${fight.round}` : ''}`)
      : `S R${fight.round || ''}`)}







          </p>
        </div>
      );
    }
    // Return null if liveNready[index] or fight is undefined
    return null;
  })}
</div>




          </div>
        ))


        
       
      
      
        ) : (
        <p>No members found</p>
      )}

</div>


      </div>
    </div>

    <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel=""
>
  <div className='text-align-center bg-black 'style={{MaxHeight:'fit-content'}}>
  <center> <div className='p4pplusBlack ggg'></div></center>
    <h2 className='snowwhite fs20'
    style={{ margin:'10px' }}
    >Picks4Points.com</h2>
          {liveNready ? (
  liveNready.map((fight, index) => (
    <div key={index} className="flex" style={{
      backgroundColor: 'grey',
      padding: '1%',
      margin: '2px',
      borderRadius: '18px',
      color: 'black',
      border: 'black 1px solid',
    }}>
      <div className="flex WholeOne element-with-border3 snowwhite">
        <span style={{marginLeft:'auto',backgroundColor:'whitesmoke',color:'black', borderRadius:'50%',border:'1px solid black',padding:'2px 5px',fontSize:'100%', maxHeight:'35px'}} >{liveNready.length - index}.</span>
      <p style={{
        backgroundColor: fight.winner == 0 ? "darkgreen": 'darkred'
      }} className="LeftOne">{fight.fighters[0]} </p><p className="RightOne" style={{
        backgroundColor: fight.winner == 1 ? "darkgreen": 'navy'
      }}>{fight.fighters[1]} </p>
      </div>
    </div>
  ))
) : null}



    <button className="p4pborder"
    style={{backgroundColor:'whitesmoke', color:'black',padding :"3%",  borderRadius:'10%', margin:'2%'}}
    onClick={() => {
      closeModal();
      // setPredictions([]);
      // navigate('/results');
    }}>Close</button>
  </div>
</Modal>
    </>
  );
}

export default LeagueInfo;