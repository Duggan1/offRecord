import React, { useState , useEffect } from 'react';
import cheerio from 'cheerio';
import './App.css';
import * as yup from 'yup';
import axios from 'axios';
import Modal from 'react-modal';
import P4pHeader from './P4pHeader';
import isEqual from 'lodash/isEqual';



import { useNavigate } from 'react-router-dom';
import Dnd from './Dnd';
import Dnd2 from './Dnd2';

function TommyPFL({BGpic,tapImage,PFLEvents, adminKevPickswID, state, user,mewtwo,adminKevPicks2, ufcCard, stallUfcCard,locationCity,location, isOwnerAndEventMatch, setjustSubmitted, onLogout, weRlive}) {


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [AKP, setAKP] = useState([])

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  const [backupID, setBackupID] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://off-therecordpicks.onrender.com/users');
        const data = await response.json();
        setBackupID(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 


console.log(ufcCard)
console.log(adminKevPicks2)
console.log(adminKevPickswID)





  // const locationCity = locationCity
  const handleRoundChange = (index, round) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = { ...updatedPredictions[index], round };
    setPredictions(updatedPredictions);

    // Validate the updated predictions
    validationSchema
      .validate({ predictions: updatedPredictions })
      .then(() => {
        setErrors([]); // No errors, clear errors
      })
      .catch((validationError) => {
        setErrors(validationError.errors || []);
      });
  };
  // const location = location

  const [showUfcCard, setShowUfcCard] = useState(true);

  console.log(user)
  const toggleCard = () => {
    setShowUfcCard((prevShowUfcCard) => !prevShowUfcCard);
    setPredictions([])

  };

  // Determine which card to display
  const selectedUfcCard = showUfcCard ? ufcCard : stallUfcCard;

  
  const [isLoading, setIsLoading] = useState(true);

      
  
// console.log(eventInfo)        
  useEffect(() => {
    if (ufcCard.length > 3)
      setIsLoading(false); // Data has loaded
      
    
  }, [ufcCard]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);
 
  
  
  const fighterNamesFormatted = ufcCard.map(({ fighters }) => {
    const formattedFighters = fighters.map(name => {
      const matches = name.match(/^(.*?)\s(.*)$/);
      if (matches && matches.length === 3) {
        const [_, firstName, lastName] = matches;
        return `${lastName.replace(/\s/g, '_').toUpperCase()}_${firstName.toUpperCase()}`;
      } else {
        return name.toUpperCase();
      }
    });
    return formattedFighters;
  });   
  
  
  function getFighterCountry(matchIndex, fighterIndex) {
  if (ufcCard[matchIndex] && ufcCard[matchIndex].flags) {
    return ufcCard[matchIndex].flags[fighterIndex] || "Country Not Found";
  } else {
    return "Data Not Available";
  }
}

  

  const matchIndex = 0;
  const fighterIndex = 0;
  const country = getFighterCountry(matchIndex, fighterIndex);
  
  
  const mainEvent = selectedUfcCard.length > 2 ? selectedUfcCard[0].fighters.join(' vs ') : 'Loading'
  console.log(mainEvent)
 
  const [predictions, setPredictions] = useState([]);


  const handlePredictionChange = (index, winnerIndex) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = {
      ...updatedPredictions[index],
      winner: winnerIndex,
    };
    setPredictions(updatedPredictions);
  
    // Validate the updated predictions
    validationSchema
      .validate({ predictions: updatedPredictions })
      .then(() => {
        setErrors([]); // No errors, clear errors
      })
      .catch((validationError) => {
        setErrors(validationError.errors || []);
      });
  };
  
  const handleMethodChange = (index, method) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = { ...updatedPredictions[index], method };
    setPredictions(updatedPredictions);
  
    // Validate the updated predictions
    validationSchema
      .validate({ predictions: updatedPredictions })
      .then(() => {
        setErrors([]); // No errors, clear errors
      })
      .catch((validationError) => {
        setErrors(validationError.errors || []);
      });
  };
  

  const validationSchema = yup.object().shape({
    // userName: yup.string().required('Username is required'),
    // password: yup.string().required('Password is required'),
    predictions: yup.array().of(
      yup.object().shape({
        winner: yup.number()
                .oneOf([0, 1], 'Invalid winner selection')
                .required('Winner is required'),
        method: yup.string().required('Method of victory is required'),
      })
    ).required('At least one prediction is required'),
  });

// console.log(user.username !== undefined ? user.username : user.userName)
// console.log(user.id !== undefined ? user.id : 2)
const [GTC , setGTC ] = useState(false)


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data using Yup
        setGTC(true) 
        await validationSchema.validate({ predictions });

        const predictionData = selectedUfcCard.map((fight, index) => ({
            fighters: fight.fighters,
            winner: predictions[index]?.winner ,
            method: predictions[index]?.method ,
            round: predictions[index]?.round, 
        }));

        const dataToSend = {
          owner: user.username !== undefined ? user.username : user.userName,
          location: 'Saudi Arabia',
          mainEvent: ufcCard[0]?.fighters.join(' vs '),
          predictions: predictionData,
          event_league:'PFL',
          user_id: user.id !== undefined ? user.id : backupID,
      };
      
        console.log(dataToSend)

        fetch('https://off-therecordpicks.onrender.com/submit-predictions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => {
            if (!response.ok) {
                setError(response);
                console.log(error)
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Predictions submitted successfully:', data);
            // Perform any further actions here
            // setPredictions([]);
            setjustSubmitted([mainEvent])
            openModal()
            // navigate('/results');

        })
        .catch(error => {
            console.error('Error submitting predictions:', error);
            setError(error.message);
            // Handle error as needed
        });
    } catch (error) {
        console.error('Validation error:', error.message);
        setErrors(error.message || []);
        setGTC(false) 
        // Handle validation error messages, setErrors, etc.
    }
};



const [signIn, setSignIn] = useState(false);

const toggleSI = () => {
  setSignIn(!signIn);
}



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
    console.log(isOwnerAndEventMatch)

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
const liveNready = weRlive ? transformData(weRlive) : [];

console.log(weRlive);
console.log(liveNready)




///////////////////////////////////////////////////////////








const mainEventToFind = ufcCard[0]?.fighters.join(' vs ') === null ? ' ': ufcCard[0]?.fighters.join(' vs ') ;
console.log()
console.log(adminKevPicks2)
console.log(mainEventToFind)
console.log(adminKevPicks2[mainEventToFind])

useEffect(() => {
  // Check if adminKevPickswID is an array and not empty
  if (Array.isArray(adminKevPickswID) && adminKevPickswID.length > 0) {
    console.log(mainEventToFind);

    // Find the object in the array based on mainEventToFind
    const adminKevPick = adminKevPickswID.find(pick => pick.main_event === mainEventToFind);

    if (adminKevPick) {
      console.log('AdminKev Pick ID:', adminKevPick.id);
      setAKP(adminKevPick); // Assuming you want to set the ID in the state
      // Do something with the pick ID
    } else {
      console.log('AdminKev pick not found.');
      // Handle the case where the pick is not found
    }
  }
}, [mainEventToFind, adminKevPickswID]);



console.log(AKP)



const areArraysEqual = (array1, array2) => {
  // Use the nullish coalescing operator to provide an empty array as the default value
  const arr1 = array1 ?? [];
  const arr2 = array2 ?? [];

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];
    console.log(obj1.winner, obj2.winner)
    console.log(obj1.method, obj2.method)


    if (obj1.winner !== obj2.winner || obj1.method !== obj2.method) {
      return false;
    }
    // You can add more conditions for other properties if needed
  }

  return true;
};
console.log(liveNready)
useEffect(() => {

  // if (akp, modifiedUfcResults){


  if (areArraysEqual(AKP.predictions, liveNready))  {
    console.log('matching');

    
    console.log(AKP)
    console.log(weRlive)
    console.log(liveNready)
  }
  if (!AKP){
    console.log('loading yo yo')

  } 
  if (AKP && !isEqual(AKP.predictions, liveNready)){
    console.log('ready for patch')
    //////////////////////////////////
    const dataToSend = {
      id: AKP.id,
      owner: AKP.owner ,
      location: AKP.location,
      mainEvent: AKP.main_event,
      predictions: liveNready,
      user_id: AKP.id || 4,
  };
  ////////////////////////////////////
    fetch(`https://off-therecordpicks.onrender.com/picks/${AKP.id}`, {
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
        // return fetchPicks();
      })
      .catch((error) => {
        console.error("Error updating pick:", error);
        // Handle error as needed
      })


  }
  // else {
  //   console.log('not a match');
  //   console.log(akp.predictions);
  //   console.log(modifiedUfcResults);
  // }
}, [AKP, liveNready]);






const patchEvent = () => {

  const recreatedFights = ufcCard.map((fight, index) => {



    return {
      weight_class: fight.match,
      red_corner_name: fight.fighters[0],
      blue_corner_name: fight.fighters[1],
      red_corner_country: fight.flags[0].length > 1 ? fight.flags[0] : fight.flags2[0] ,
      blue_corner_country: fight.flags[1].length > 1 ? fight.flags[1] : fight.flags2[1] ,
      red_corner_record: fight.records[0] || ' ',
      blue_corner_record: fight.records[1] || ' ',
      red_corner_image: fight.fighterPics[0],
      blue_corner_image: fight.fighterPics[1],
      // Add more properties as needed
      method: fight.method, // Example placeholder
      round: fight.round, // Example placeholder
      winner: fight.winner,
      odds: fight.odds // Example placeholder
    };
  });
  
  console.log(recreatedFights);

  const dataToSend = {
    event_name: AKP.main_event,
    locationCC: PFLEvents.locationCC,
    backgroundImageSrc: PFLEvents.backgroundImageSrc,
    tapImage: PFLEvents.tapImage,
    fights: recreatedFights,
  };
  console.log(dataToSend)

  fetch(`https://off-therecordpicks.onrender.com/pfl-events/${PFLEvents.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to update pick");
      }
      if (response.ok) {
        // Handle success
        console.log(response)
        const responseData = await response.json();
        console.log('Predictions patched successfully:', responseData);
        // Perform any further actions here
      }
      // Refresh the list of picks after a successful update
      // return fetchPicks();
    })
    .catch((error) => {
      console.error("Error updating pick:", error);
      // Handle error as needed
    });
};

useEffect(() => {
  patchEvent()

}, [PFLEvents.length > 0]);






useEffect(() => {
  // Define the async function for form submission
  async function submitPFLForm() {
    try {
      
      // Validate the form data using Yup
      

      // Check if every method in modifiedUfcResults is not null
      if (liveNready) {
        // All methods are not null, proceed to submit as "AdminKev"
        const mainEvent = `${ufcCard[0].fighters[0]} vs ${ufcCard[0].fighters[1]}`;
        const dataToSend = {
          owner: "AdminKev", // Set the owner to "AdminKev"
          location: 'AUTO-Server',
          mainEvent: mainEvent,
          predictions: liveNready, // Use modifiedUfcResults here
          event_league: 'PFL',
          user_id: 4,
        };
        // await validationSchema.validate({ dataToSend });

        const response = await fetch('https://off-therecordpicks.onrender.com/submit-predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          // Handle success
          const responseData = await response.json();
          console.log('Predictions submitted successfully:', responseData);
          // Perform any further actions here
        } else {
          // Handle errors
          throw new Error('Network response was not ok');
        }
      } else {
        // If any method in modifiedUfcResults is null, show an error message
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors and validation errors as needed
    }

  }

  // Call the submitForm function to submit the form data automatically
  submitPFLForm();
}, [liveNready.length > 0]);








if (isLoading) {
  return <> <P4pHeader onLogout={onLogout} user={user} /> <Dnd /></>; // Render loading indicator
} 



  return  (
    <>
    {/* {user ?
              <Header handleLogout={handleLogout} user={user} ufcCard={ufcCard} />
          : <Johnny onLogin={onLogin} onLogout={handleLogout} ufcCard={ufcCard} />} */}

          <P4pHeader onLogout={onLogout} user={user} />

          {weRlive.some(item => item.timeDetails1 !== '') ?  
 
 <div className='text-align-center bg-black 'style={{MaxHeight:'fit-content'}}>
  
  <center> <div className='p4pplusBlack ggg'></div></center>
    <h2 className='snowwhite fs20'
    style={{ margin:'10px' }}
    >Picks4Points.com</h2>
    <h1 style={{
                              height: '100px',
                              backgroundColor: 'black',
                              padding: '0px 2px',
                              backgroundSize: '100% 100%',
                              width:'400px',
                              minWidth:'70%',
                              maxWidth:'100%',
                              backgroundImage: `url(https://pflmma-prod.s3.us-east-1.amazonaws.com/assets/img/base/superfights-logo.png)`
                            }} alt={`Flag of ${location}`}> </h1>
    <p className='color-red'>Sorry, You cannot Pick after the Event Starts</p>
    
          {liveNready ? (
  liveNready.map((fight, index) => (<>
    <div key={index} className="flex" style={{
      backgroundColor: fight.winner !== null ? 'rgb(61, 61, 61)': index == '0' ?  'white' : 'rgb(153, 153, 153)',
      padding: '1%',
      margin: '2px',
      borderRadius: '18px',
      color: 'black',
      border: 'black 1px solid',
    }}>
      <div className="flex WholeOne element-with-border3 snowwhite">

        {index == '0' ? 
        <span style={{marginLeft:'auto',
        backgroundColor: 'darkgreen',
        borderRadius: '0%',
        color:'white' ,border:'1px solid black',padding:'2px 5px',fontSize:'100%', maxHeight:'35px'}} >Live</span>
        
        : 
        <span style={{marginLeft:'auto',
        backgroundColor: fight.winner !== null ? 'white': 'white',
        borderRadius: '0%',
        color:'black' ,border:'1px solid black',padding:'2px 5px',fontSize:'100%', maxHeight:'35px'}} >{1 + index}.</span>}
      
      
      
      
      
      <p style={{
       backgroundColor: fight.winner === 1 ? "black" : (fight.winner === 0 ? "darkgreen" : (fight.winner === null ? "darkred" : ""))
      }} className="LeftOne">{fight.fighters[0]} </p><p className="RightOne" style={{
        backgroundColor: fight.winner === 1 ? "darkgreen" : (fight.winner === 0 ? "black" : (fight.winner === null ? "navy" : ""))

      }}>{fight.fighters[1]} </p>
      </div>

    


    </div>
    
    {fight.winner !== null && (
        <div className="snowwhite flex">

          
          {fight.method.toLowerCase() !== 'decision' ? <p>{fight.fighters[fight.winner]} {fight.method}   R:{fight.round}</p> : <p>{fight.fighters[fight.winner]} {fight.method} </p>}
          
        </div>
      )}
    
    </>
  ))
) : null}



    
  </div>
 :
 

    <div className="tommy">


          {/* <button className='dreamcardbutton' onClick={toggleCard}>
                {showUfcCard ? ' Dream Card' : 'Show Current UFC Card'}
              </button> */}



      {showUfcCard?
      <div className="bayLoc"  > 
          {/* <h1 className='fs45 fs-mono'>PFL</h1> */}
          <h1 style={{
                              height: '50px',
                              backgroundColor: 'whitesmoke',
                              padding: '0px 2px',
                              backgroundSize: '100% 100%',
                              width:'100%',
                              // paddingBottom:'20px',
                              // margin:'0% 20%',
                              backgroundImage: `url(https://pflmma.com/assets/img/logos/pfl-logo-color.svg)`
                            }} alt={`PFL `}> </h1>
      <div
                  style={{zIndex:'1',display:'flex',justifyContent:'center',backgroundColor:'whitesmoke'}}>
                 <p className='text-black homebullet'style={{marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'0%',backgroundColor:'whitesmoke',color:'black'}}>Kingdom Arena, Riyadh, Saudi Arabia. </p>
                 <h6 className=' snow color-transp' 
                 style={{ 

                  backgroundSize: '100% 100%',
                  backgroundRepeat:'no-repeat',
                  marginBottom:'0%',paddingBottom:'0%',marginTop:'0%',paddingTop:'0%',backgroundColor:'black',
                  backgroundImage: `url(https://cdn.britannica.com/79/5779-050-46C999AF/Flag-Saudi-Arabia.jpg)`
                  
                  }} >_____</h6></div><div class="element-with-border2"></div>
                <div className='flex'>
                  <h1 style={{
                              height: '200px',
                              backgroundColor: 'black',
                              padding: '0px 2px',
                              backgroundSize: '100% 100%',
                              width:'400px',
                              minWidth:'70%',
                              maxWidth:'100%',
                              backgroundImage: `url(https://pflmma-prod.s3.us-east-1.amazonaws.com/assets/img/base/superfights-logo.png)`
                            }} alt={`Flag of ${location}`}> </h1>
                            </div>

                           
                            
                            
          
          
          {/* <br></br><h2 className="" >{mainEvent}</h2> */}
          

          
        {/* <h1> Fight Predictions</h1> */}
        
        
        </div>
        : 
          
          <div className="bayLoc">
            {/* <button className='dreamcardbutton' onClick={toggleCard}>
          {showUfcCard ? 'Show Dream Card' : 'Show Current UFC Card'}
        </button> */}
            
            <h1 style={{
                height: '100px',
                backgroundColor: 'black',
                padding: '0px 2px',
                backgroundSize: '100% 100%',
                margin:'0',
                backgroundImage: `url(https://s.tmimgcdn.com/scr/800x500/294500/crown-concept-logo-design-template2_294549-original.jpg)`
              }} alt={`Flag of ${location}`}>
                
              </h1><div class="element-with-border"></div><h1 style={{margin:'0'}}>Dream Card</h1>
          
          {/* <h2 className="" >{mainEvent}</h2> */}
          

          
          
          
        {/* <h1> Fight Predictions</h1> */}
        </div>}

      
      
      
       
      {/* <p className="color-black bold ">Fighter's images will be availabe on Friday after UFC photoshoot occurs </p> */}
      <form style={{marginBottom: '0px',textAlign:'center'}} className="blackBG" onSubmit={handleSubmit}>
        {selectedUfcCard.length > 2 && selectedUfcCard.map((fight, index) => (
    <div key={index} className="fight">

      <div key={index} 
      className={`${(predictions[index]?.winner === 0 || predictions[index]?.winner === 1) && 
        (predictions[index]?.method === 'TKO/KO' || predictions[index]?.method === 'Decision' || predictions[index]?.method === 'Draw/No-Contest/DQ' || predictions[index]?.method === 'Submission') &&
        (predictions[index]?.round === '1' || predictions[index]?.round === '2' || predictions[index]?.round === '3' || predictions[index]?.round === '4'|| predictions[index]?.round === '5' || predictions[index]?.method === 'Decision' || predictions[index]?.method === 'Draw/No-Contest/DQ')
        ? 'fighterACTready' : 'fighterready'}`}>
      
  <p key={index} className="mobile-fight-info">
    <p className='snowwhite'>{fight.match.slice(0, fight.match.length / 2)}</p>
    <div  className=" mobile-fighter-name">
      <span  style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%'}} className={` redName white-border mobile-fighter-name
      
      ${predictions[index]?.winner === 0 ? 'selected' : ''} ${predictions[index]?.winner === 1 ? 'notselected' : ''}`}> {fight.fighters[0]} </span>


      <span  style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',backgroundColor:'white',color:'black'}} className=" white-border mobile-fight-name color-black"> vs </span>
      <span  style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%'}} className={`blueName white-border mobile-fighter-name
      
      ${predictions[index]?.winner === 1 ? 'selected' : ''} ${predictions[index]?.winner === 0 ? 'notselected' : ''} `}> {fight.fighters[1]} </span>
      

    </div><span className='color-black bg-white'>{fight.odds}</span>
  </p>


        {user ? <>
        <div className="nice" style={{zIndex:'0'}}>
              {/* <label 
              
              className={`method ${predictions[index]?.method === 'TKO/KO' ||predictions[index]?.method === 'Decision' ||predictions[index]?.method === 'Draw/No-Contest' || predictions[index]?.method === 'Submission' ? 'selected' : ''}`}


              >Method of Victory:</label> */}
              <select className={`methodbar ${predictions[index]?.method === 'TKO/KO' ||predictions[index]?.method === 'Decision' ||predictions[index]?.method === 'Draw/No-Contest/DQ' || predictions[index]?.method === 'Submission' ? 'selected' : ''}`} onChange={(e) => handleMethodChange(index, e.target.value)}>
                <option value="">Select Method of Victory</option>
                <option value="TKO/KO">TKO/KO</option>
                <option value="Submission">Submission</option>
                <option value="Decision">Decision</option>
                <option value="Draw/No-Contest/DQ">Draw/No-Contest</option>
              </select>
            </div>

            {/* Add the following code for selecting the round */}
            {(predictions[index]?.method === 'TKO/KO' || predictions[index]?.method === 'Submission') && (
              <div>
                {/* <label
                
                
                >Round:</label> */}
                <select
                  className={`methodbar2 ${predictions[index]?.round === '1' ||predictions[index]?.round === '2' ||predictions[index]?.round === '3' || predictions[index]?.round === '4'|| predictions[index]?.round === '5' ? 'selected' : ''}`}
                  onChange={(e) => handleRoundChange(index, e.target.value)}
                >
                  <option value="">Select Round</option>
                      {[1, 2, 3, 4, 5].map((round) => (
                        <option key={round} value={round}>
                          {round === 4 || round === 5 ? `${round} (Championship Rounds)` : round}
                        </option>
                      ))}

                </select>
              </div>
            )}
                      
            
            </>: null}
            
            
            </div>


             <div className={`${(predictions[index]?.winner === 0 || predictions[index]?.winner === 1) && 
      (predictions[index]?.method === 'TKO/KO' || predictions[index]?.method === 'Decision' || predictions[index]?.method === 'Draw/No-Contest/DQ' || predictions[index]?.method === 'Submission') &&
      (predictions[index]?.round === '1' || predictions[index]?.round === '2' || predictions[index]?.round === '3' || predictions[index]?.round === '4'|| predictions[index]?.round === '5' || predictions[index]?.method === 'Decision' || predictions[index]?.method === 'Draw/No-Contest/DQ')
     ? 'fighter-container2' : 'pfl-container'}`}>
      

      <div
        className={`fighter-image ${
          predictions[index]?.winner === 0 ? 'selected' : ''
        }`}
        style={{
          width: '100%',maxWidth: '300px',backgroundSize:'100% 100%',marginLeft: 'auto',
          backgroundImage: `url('${
            ufcCard[index].fighterPics[0].startsWith("/s3/files/")
              ? "https://dmxg5wxfqgb4u.cloudfront.net/" +
                ufcCard[index].fighterPics[0].substring("/s3/files/".length)
                : ufcCard[index].fighterPics[0].startsWith("/themes/custom/") 
                ? "https://www.ufc.com/" + ufcCard[index].fighterPics[0]
                  : ufcCard[index].fighterPics[0]
          }')`,
          
          


        }}
        // url("https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/fighter_images/SHADOW_Fighter_fullLength_RED.png?VersionId=1Jeml9w1QwZqmMUJDg8qTrTk7fFhqUra&itok=fiyOmUkc")
       
        // https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/fighter_images/SHADOW_Fighter_fullLength_BLUE.png?VersionId=1Jeml9w1QwZqmMUJDg8qTrTk7fFhqUra&itok=fiyOmUkc

      ><div className="sirealpfl" ><div className="recordwcir redcorner">{fight.records[0]}</div>  
      
      
     {user ? <button
      className={`fighter-button ${predictions[index]?.winner === 0 ? 'selected' : ''}`}
      onClick={() => handlePredictionChange(index, 0)}
      style={{
        backgroundImage:`url(${ufcCard[index].flags[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',color:'white'
      }}>{fight.fighters[0]}
    </button> :  <div
      className={`pfl-button ${predictions[index]?.winner === 0 ? 'selected' : ''}`}
      style={{
        backgroundImage:`url(${ufcCard[index].flags[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',color:'white'
      }}>{fight.fighters[0]}
    </div>  }
    
    </div>
      </div>
      
      <div className='fc3' style={{backgroundImage:`url(${BGpic})`}}> </div>
      <div
        className={`fighter-info ${
          predictions[index]?.winner === 0 ? 'selected' : ''
        }`}
        style={{
          width: '50%',
          textAlign: 'center',
        }}
      ><div
        className={`fighter-image ${
          predictions[index]?.winner === 1 ? 'selected' : ''
        }`}
        style={{
          width: '100%',maxWidth: '300px',backgroundSize:'100% 100%',marginLeft: 'auto',
          backgroundImage: `url('${
             ufcCard[index].fighterPics[1] 
          }')`,
          
          marginBottom: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '20%' : '',
          paddingBottom: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '20%' : '',
          zIndex:'-1'


          
        }}
        
      ><div className="sirealpfl" ><div className="recordwcir bluecorner">{fight.records[1]}</div> 
      {user?  <button
      className={`fighter-button ${predictions[index]?.winner === 1 ? 'selected' : ''}`}
      onClick={() => handlePredictionChange(index, 1)}
      style={{
        backgroundImage:`url(${ufcCard[index].flags[1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',color:'white'
      }}
    >
      
      {fight.fighters[1]} 
    </button>:  <div
      className={`pfl-button `}
      style={{
        backgroundImage:`url(${ufcCard[index].flags[1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',color:'white'
      }}>{fight.fighters[1]}
    </div>  }
    
    </div>
        
        {/* Add other fighter information here */}
      </div>
    </div>
   
    </div>
   
    




    
            
            
          </div>
        ))}
        <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>
     <center>
        {errors && (<p className="errortime" style={{ border: errors.length > 0 ? '5px solid red' : 'none' }}>{errors} </p>)}
</center>
<div className="blakBG">

{isOwnerAndEventMatch ? <p className="color-green">{user.username} submitted picks for {mainEvent} ! </p> :  
 !GTC ? 
<button style={{backgroundColor:'white'}} className="submitb" type="submit">Submit Predictions</button>
: <h1 className="loadingL " style={{padding:'25%',margin:' 0 25%'}}></h1>


}
 
 </div>

        

        
    
        
    


        
      </form>
      
    </div> }
    

    {/* Modal */}
    <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel=""
>
  <div className='text-align-center element-with-border3 'style={{MaxHeight:'fit-content'}}>
  <center> <div className='p4pplusBlack ggg'></div></center>
    <h2 className='snowwhite fs20'
    style={{ margin:'10px' }}
    >Picks4Points.com</h2>

    {/* selectedUfcCard.map((fight, index) => ({
            fighters: fight.fighters,
            winner: predictions[index]?.winner ,
            method: predictions[index]?.method ,
            round: predictions[index]?.round */}
    {selectedUfcCard.map((fight, index) => (
      <div style={{maxWidth:'100%' }}  key={index}>


        <div className='text-align-center snowwhite ' style={{ display:'flex', justifyContent: 'center',margin:'0px',marginTop:'0px',paddingTop:'4px'   }}>
          
        {predictions[index]?.winner === 0 ? <>
        <p style={{backgroundColor:'darkgreen',paddingLeft:'5px',paddingRight:'5px'}}>{fight.fighters[0].split(' ').pop()} </p>
        
        {predictions[index]?.round ? 
          <p style={{paddingLeft:'5px',backgroundColor:'black'}}>R. {predictions[index]?.round} </p>: null}
          <p style={{paddingLeft:'5px',paddingRight:'5px',backgroundColor:'black'}}>
             {predictions[index]?.method}</p>
         <p className='color-transp'
         style={{backgroundColor:'black',
        
         backgroundSize: '100% 100%',
         backgroundPosition: 'center center',
       }}
       
       >___</p>
          
          
         </> : null}
         

      {/* You can add additional content or actions here */}
          
 
    {/* You can add additional content or actions here */}

             {predictions[index]?.winner === 1 ? <>
              
                <p className='color-transp'
                style={{backgroundColor:'black',
                
                backgroundSize: '100% 100%',
                backgroundPosition: 'center center',
              }}
              
              > ___</p>{predictions[index]?.round ? 
                <p style={{paddingLeft:'5px',backgroundColor:'black'}}>R. {predictions[index]?.round} </p>: null}
                <p style={{paddingLeft:'5px',paddingRight:'5px',backgroundColor:'black'}}>
                   {predictions[index]?.method}</p>

                        <p style={{backgroundColor:'darkgreen',paddingLeft:'5px',paddingRight:'5px'}}>{fight.fighters[1].split(' ').pop()} </p>
                          
         </> : null}
         

          
        </div>
      </div>
    ))}
   
    {/* You can add additional content or actions here */}
    {/* You can add additional content or actions here */}
   
    
    <button
    style={{backgroundColor:'whitesmoke', color:'black',padding :"3%", border:'black solid 3px', borderRadius:'10%', marginTop:'2%'}}
    onClick={() => {
      closeModal();
      setPredictions([]);
      navigate('/results');
    }}>Close</button>
  </div>
</Modal>

    </>
        );
      
    }
export default TommyPFL;

