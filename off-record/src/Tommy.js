import React, { useState , useEffect } from 'react';
import cheerio from 'cheerio';
import './App.css';
import * as yup from 'yup';
import axios from 'axios';
import Modal from 'react-modal';



import { useNavigate } from 'react-router-dom';
import Dnd from './Dnd';
import Dnd2 from './Dnd2';

function Tommy({ user, ufcCard, stallUfcCard,locationCity,location, isOwnerAndEventMatch, setjustSubmitted}) {


  const [modalIsOpen, setModalIsOpen] = useState(false);

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

console.log(backupID)






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
  // console.log(mainEvent)
 
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


console.log(predictions)







console.log(predictions)
console.log(mainEvent)
// console.log(user.username !== undefined ? user.username : user.userName)
// console.log(user.id !== undefined ? user.id : 2)


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data using Yup
        await validationSchema.validate({ predictions });

        const predictionData = selectedUfcCard.map((fight, index) => ({
            fighters: fight.fighters,
            winner: predictions[index]?.winner ,
            method: predictions[index]?.method ,
            round: predictions[index]?.round, 
        }));

        const dataToSend = {
          owner: user.username !== undefined ? user.username : user.userName,
          location: location,
          mainEvent: mainEvent,
          predictions: predictionData,
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
        // Handle validation error messages, setErrors, etc.
    }
};


const countryData = {
  "Andorra": "AD",
  "United Arab Emirates": "AE",
  "Afghanistan": "AF",
  "Antigua and Barbuda": "AG",
  "Anguilla": "AI",
  "Albania": "AL",
  "Armenia": "AM",
  "Netherlands Antilles": "AN",
  "Angola": "AO",
  "Antarctica": "AQ",
  "Argentina": "AR",
  "American Samoa": "AS",
  "Austria": "AT",
  "Australia": "AU",
  "Aruba": "AW",
  "Åland Islands": "AX",
  "Azerbaijan": "AZ",
  "Bosnia and Herzegovina": "BA",
  "Barbados": "BB",
  "Bangladesh": "BD",
  "Belgium": "BE",
  "Burkina Faso": "BF",
  "Bulgaria": "BG",
  "Bahrain": "BH",
  "Burundi": "BI",
  "Benin": "BJ",
  "Saint Barthélemy": "BL",
  "Bermuda": "BM",
  "Brunei Darussalam": "BN",
  "Bolivia": "BO",
  "Bonaire, Sint Eustatius and Saba": "BQ",
  "Brazil": "BR",
  "Bahamas": "BS",
  "Bhutan": "BT",
  "Bouvet Island": "BV",
  "Botswana": "BW",
  "Belarus": "BY",
  "Belize": "BZ",
  "Canada": "CA",
  "Cocos (Keeling) Islands": "CC",
  "Congo, The Democratic Republic Of The": "CD",
  "Central African Republic": "CF",
  "Congo": "CG",
  "Switzerland": "CH",
  "Côte D'Ivoire": "CI",
  "Cook Islands": "CK",
  "Chile": "CL",
  "Cameroon": "CM",
  "China": "CN",
  "Colombia": "CO",
  "Costa Rica": "CR",
  "Cuba": "CU",
  "Cape Verde": "CV",
  "Curaçao": "CW",
  "Christmas Island": "CX",
  "Cyprus": "CY",
  "Czech Republic": "CZ","Czechia": "CZ",
  "Germany": "DE",
  "Djibouti": "DJ",
  "Denmark": "DK",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Algeria": "DZ",
  "Ecuador": "EC",
  "Estonia": "EE",
  "Egypt": "EG",
  "Western Sahara": "EH",
  "Eritrea": "ER",
  "Spain": "ES",
  "Ethiopia": "ET",
  "England":"GB",
  "Finland": "FI",
  "Fiji": "FJ",
  "Falkland Islands (Malvinas)": "FK",
  "Micronesia, Federated States Of": "FM",
  "Faroe Islands": "FO",
  "France": "FR",
  "Gabon": "GA",
  "United Kingdom": "GB",
  "Grenada": "GD",
  "Georgia": "GE",
  "French Guiana": "GF",
  "Guernsey": "GG",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greenland": "GL",
  "Gambia": "GM",
  "Guinea": "GN",
  "Guadeloupe": "GP",
  "Equatorial Guinea": "GQ",
  "Greece": "GR",
  "South Georgia and the South Sandwich Islands": "GS",
  "Guatemala": "GT",
  "Guam": "GU",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Hong Kong": "HK",
  "Heard and McDonald Islands": "HM",
  "Honduras": "HN",
  "Croatia": "HR",
  "Haiti": "HT",
  "Hungary": "HU",
  "Indonesia": "ID",
  "Ireland": "IE",
  "Israel": "IL",
  "Isle of Man": "IM",
  "India": "IN",
  "British Indian Ocean Territory": "IO",
  "Iraq": "IQ",
  "Iran, Islamic Republic Of": "IR",
  "Iceland": "IS",
  "Italy": "IT",
  "Jersey": "JE",
  "Jamaica": "JM",
  "Jordan": "JO",
  "Japan": "JP",
  "Kenya": "KE",
  "Kyrgyzstan": "KG",
  "Cambodia": "KH",
  "Kiribati": "KI",
  "Comoros": "KM",
  "Saint Kitts And Nevis": "KN",
  "Korea, Democratic People's Republic Of": "KP",
  "South Korea": "KR",
  "Kuwait": "KW",
  "Cayman Islands": "KY",
  "Kazakhstan": "KZ",
  "Lao People's Democratic Republic": "LA",
  "Lebanon": "LB",
  "Saint Lucia": "LC",
  "Liechtenstein": "LI",
  "Sri Lanka": "LK",
  "Liberia": "LR",
  "Lesotho": "LS",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Latvia": "LV",
  "Libya": "LY",
  "Morocco": "MA",
  "Monaco": "MC",
  "Moldova": "MD",
  "Montenegro": "ME",
  "Saint Martin": "MF",
  "Madagascar": "MG",
  "Marshall Islands": "MH",
  "Macedonia, the Former Yugoslav Republic Of": "MK",
  "Mali": "ML",
  "Myanmar": "MM",
  "Mongolia": "MN",
  "Macao": "MO",
  "Northern Mariana Islands": "MP",
  "Martinique": "MQ",
  "Mauritania": "MR",
  "Montserrat": "MS",
  "Malta": "MT",
  "Mauritius": "MU",
  "Maldives": "MV",
  "Malawi": "MW",
  "Mexico": "MX",
  "Malaysia": "MY",
  "Mozambique": "MZ",
  "Namibia": "NA",
  "New Caledonia": "NC",
  "Niger": "NE",
  "Norfolk Island": "NF",
  "Nigeria": "NG",
  "Nicaragua": "NI",
  "Netherlands": "NL",
  "Norway": "NO",
  "Nepal": "NP",
  "Nauru": "NR",
  "Niue": "NU",
  "New Zealand": "NZ",
  "Oman": "OM",
  "Panama": "PA",
  "Peru": "PE",
  "French Polynesia": "PF",
  "Papua New Guinea": "PG",
  "Philippines": "PH",
  "Pakistan": "PK",
  "Poland": "PL",
  "Saint Pierre And Miquelon": "PM",
  "Pitcairn": "PN",
  "Puerto Rico": "PR",
  "Palestine, State of": "PS",
  "Portugal": "PT",
  "Palau": "PW",
  "Paraguay": "PY",
  "Qatar": "QA",
  "Réunion": "RE",
  "Romania": "RO",
  "Serbia": "RS",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saudi Arabia": "SA",
  "Solomon Islands": "SB",
  "Seychelles": "SC",
  "Sudan": "SD",
  "Sweden": "SE",
  "Singapore": "SG",
  "Saint Helena": "SH",
  "Slovenia": "SI",
  "Svalbard And Jan Mayen": "SJ",
  "Slovakia": "SK",
  "Sierra Leone": "SL",
  "San Marino": "SM",
  "Senegal": "SN",
  "Somalia": "SO",
  "Scotland": "GB",
  "Suriname": "SR",
  "South Sudan": "SS",
  "Sao Tome and Principe": "ST",
  "El Salvador": "SV",
  "Sint Maarten": "SX",
  "Syrian Arab Republic": "SY",
  "Swaziland": "SZ",
  "Turks and Caicos Islands": "TC",
  "Chad": "TD",
  "French Southern Territories": "TF",
  "Togo": "TG",
  "Thailand": "TH",
  "Tajikistan": "TJ",
  "Tokelau": "TK",
  "Timor-Leste": "TL",
  "Turkmenistan": "TM",
  "Tunisia": "TN",
  "Tonga": "TO",
  "Turkey": "TR",
  "Trinidad and Tobago": "TT",
  "Tuvalu": "TV",
  "Taiwan, Republic Of China": "TW",
  "Tanzania, United Republic of": "TZ",
  "Ukraine": "UA",
  "Uganda": "UG",
  "United States Minor Outlying Islands": "UM",
  "United States": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Holy See (Vatican City State)": "VA",
  "Saint Vincent And The Grenadines": "VC",
  "Venezuela": "VE",
  "Virgin Islands, British": "VG",
  "Virgin Islands, U.S.": "VI",
  "Vietnam": "VN",
  "Vanuatu": "VU",
  "Wallis and Futuna": "WF",
  "Samoa": "WS",
  "Yemen": "YE",
  "Mayotte": "YT",
  "South Africa": "ZA",
  "Zambia": "ZM",
  "Zimbabwe": "ZW"
};

function getCountryAbbreviation(countryName) {
  return countryData[countryName] || "Not Found";
}
function getFighterCountryAbbreviation(matchIndex, fighterIndex) {
  const countryName = selectedUfcCard[matchIndex].flags[fighterIndex];
  return getCountryAbbreviation(countryName);
}
// Example usage
const inputCountry = "United States";
const abbreviation = getCountryAbbreviation(inputCountry);


const [signIn, setSignIn] = useState(false);

const toggleSI = () => {
  setSignIn(!signIn);
}


console.log(selectedUfcCard)



if (isLoading) {
  return <Dnd />; // Render loading indicator
} 



  return  (
    <>
    {/* {user ?
              <Header handleLogout={handleLogout} user={user} ufcCard={ufcCard} />
          : <Johnny onLogin={onLogin} onLogout={handleLogout} ufcCard={ufcCard} />} */}




    <div>
      {user ? (
    <div className="tommy">


          <button className='dreamcardbutton' onClick={toggleCard}>
                {showUfcCard ? ' Dream Card' : 'Show Current UFC Card'}
              </button>



      {showUfcCard?
      <div className="bayLoc" > 
      
        
                  <h1 style={{
                              height: '100px',
                              backgroundColor: 'black',
                              padding: '0px 2px',
                              backgroundSize: '100% 100%',
                              margin:'0% 20%',
                              backgroundImage: `url(https://flagsapi.com/${getCountryAbbreviation(location)}/flat/64.png)`
                            }} alt={`Flag of ${location}`}>
                              
                            </h1><div class="element-with-border"></div><h1 style={{margin:'0'}}> UFC {locationCity}</h1>
          
          
          {/* <br></br><h2 className="" >{mainEvent}</h2> */}
          

          
        {/* <h1> Fight Predictions</h1> */}
        
        
        </div>: 
          
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
    <div  className=" mobile-fighter-name">
      <span  style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%'}} className={` redName white-border mobile-fighter-name
      
      ${predictions[index]?.winner === 0 ? 'selected' : ''} ${predictions[index]?.winner === 1 ? 'notselected' : ''}`}> {fight.fighters[0]} </span>


      <span  style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',backgroundColor:'white',color:'black'}} className=" white-border mobile-fight-name color-black"> vs </span>
      <span  style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%'}} className={`blueName white-border mobile-fighter-name
      
      ${predictions[index]?.winner === 1 ? 'selected' : ''} ${predictions[index]?.winner === 0 ? 'notselected' : ''} `}> {fight.fighters[1]} </span>
      

    </div><span className='color-black bg-white'>{fight.odds}</span>
  </p>



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
                      
            
            
            
            
            </div>


            <div className={`${(predictions[index]?.winner === 0 || predictions[index]?.winner === 1) && 
      (predictions[index]?.method === 'TKO/KO' || predictions[index]?.method === 'Decision' || predictions[index]?.method === 'Draw/No-Contest/DQ' || predictions[index]?.method === 'Submission') &&
      (predictions[index]?.round === '1' || predictions[index]?.round === '2' || predictions[index]?.round === '3' || predictions[index]?.round === '4'|| predictions[index]?.round === '5' || predictions[index]?.method === 'Decision' || predictions[index]?.method === 'Draw/No-Contest/DQ')
     ? 'fighter-container2' : 'fighter-container'}`}>

      <div
        className={`fighter-image ${
          predictions[index]?.winner === 0 ? 'selected' : ''
        }`}
        style={{
          width: '100%',
          backgroundImage: `url('${fight.fighterPics[0]}'`,
          
          


        }}
        // url("https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/fighter_images/SHADOW_Fighter_fullLength_RED.png?VersionId=1Jeml9w1QwZqmMUJDg8qTrTk7fFhqUra&itok=fiyOmUkc")
       
        // https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/fighter_images/SHADOW_Fighter_fullLength_BLUE.png?VersionId=1Jeml9w1QwZqmMUJDg8qTrTk7fFhqUra&itok=fiyOmUkc

      ><div className="sireal" ><div className="recordwcir redcorner">{fight.records[0]}</div>  <button
      className={`fighter-button ${predictions[index]?.winner === 0 ? 'selected' : ''}`}
      onClick={() => handlePredictionChange(index, 0)}
      style={{
        backgroundImage: getFighterCountryAbbreviation(index, 0) !== "Not Found"
          ? `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, 0)}/shiny/64.png")`
          : `url('https://www.tapology.com/${fight.flags[0]}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      
      
    >
      
      {fight.fighters[0]}
    </button>
    
    </div>
      </div>
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
          width: '100%',
          backgroundImage: `url('${fight.fighterPics[1]}')`,
          backgroundSize: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '135% 100%' : '',
          marginBottom: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '20%' : '',
          paddingBottom: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '20%' : '',
          zIndex:'-1'


          
        }}
        
      ><div className="sireal" ><div className="recordwcir bluecorner">{fight.records[1]}</div>  <button
      className={`fighter-button ${predictions[index]?.winner === 1 ? 'selected' : ''}`}
      onClick={() => handlePredictionChange(index, 1)}
      style={{
        backgroundImage: getFighterCountryAbbreviation(index, 1) !== "Not Found"
        ? `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, 1)}/shiny/64.png")`
        : `url('https://www.tapology.com/${fight.flags[1]}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      
      {fight.fighters[1]} 
    </button>
    
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

{isOwnerAndEventMatch ? <p className="color-green">{user.username} submitted picks for {mainEvent} ! </p> :   <button className="submitb" type="submit">Submit Predictions</button> }
 
 </div>

        

        
    
        
    


        
      </form>
      
    </div> 
    
    ) : (
      <div>
        {/* //////////// tAKE 2 NO SIGNIN////// */}
        <div className="tommy">

      {showUfcCard?
      <div className="bayLoc" >   {signIn ? <p className='snowwhite'>Please Login or SignUp! </p>: <p className='color-yellow'>Please Login or SignUp! </p>}
       <button className='dreamcardbutton' onClick={toggleCard}>
          {showUfcCard ? 'Show Dream Card' : 'Show Current UFC Card'}
        </button>
      <h1 style={{
  height: '100px',
  backgroundColor: 'black',
  padding: '0px 2px',
  backgroundSize: '100% 100%',
  margin:'0% 20%',
  backgroundImage: `url(https://flagsapi.com/${getCountryAbbreviation(location)}/flat/64.png)`,
  backgroundRepeat:'no-repeat',
  // border:'1px solid black',

}} alt={`Flag of ${location}`}>
  
</h1><div style={{borderTop:'solid white 3px'}} class="element-with-border"></div><h1 style={{margin:'0'}}> UFC {locationCity}</h1>


          
          
          
          
          {/* <h2 className="bay" >{mainEvent}</h2> */}
          </div>: 
          
          <div className="bayLoc">
            
            {signIn ? <p className='snowwhite'>Please Login or SignUp! </p>: <p className='color-yellow'>Please Login or SignUp! </p>}
            <button className='dreamcardbutton' onClick={toggleCard}>
          {showUfcCard ? 'Show Dream Card' : 'Show Current UFC Card'}
        </button>
            
            {/* <h1 >Dream Card <img style={{height:'40px',
             backgroundColor:'black', padding:'0px 2px',border:' purple solid 2px'}}
              src={`https://s.tmimgcdn.com/scr/800x500/294500/crown-concept-logo-design-template2_294549-original.jpg`}
          alt={`Flag of ${location}`} ></img></h1> */}

              <h1 style={{
                height: '100px',
                backgroundColor: 'black',
                padding: '0px 2px',
                backgroundSize: '100% 100%',
                margin:'0',
                backgroundImage: `url(https://s.tmimgcdn.com/scr/800x500/294500/crown-concept-logo-design-template2_294549-original.jpg)`
              }} alt={`Flag of ${location}`}>
                
              </h1><div style={{borderTop:'solid white 3px'}} class="element-with-border"></div><h1 style={{margin:'0'}}>Dream Card</h1>
          
          
          
         {/* <h2 className="marginB0" >{mainEvent}</h2> */}
         
          
         
        </div>}

      
      
      
       
      {/* <p className="color-black bold ">Fighter's images will be availabe on Friday after UFC photoshoot occurs </p> */}
      <div style={{marginBottom: '0px'}} className="blackBG" >
        {selectedUfcCard.length > 2 && selectedUfcCard.map((fight, index) => (
    <div key={index} className="fight">
      <div key={index} className="fighterready">
  <p key={index} className="mobile-fight-info">
    <div className="mobile-fighter-name">
      <span style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',backgroundColor:'red',color:'white'}} className={` white-border mobile-fighter-name ${predictions[index]?.winner === 0 ? 'selected' : ''}`}>
        {fight.fighters[0]}
      </span>
      <span style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',backgroundColor:'white'}} className={` white-border mobile-fighter-name  color-black`}> vs </span>
      <span style={{marginTop:'0%',paddingTop:'0%',marginBottom:'0%',paddingBottom:'0%',backgroundColor:'blue',color:'white'}} className={` white-border mobile-fighter-name ${predictions[index]?.winner === 1 ? 'selected' : ''}`}>
         {fight.fighters[1]}
      </span>
      
    </div><span className='bg-white color-black'>{fight.odds}</span>
  </p>


  {signIn ? <p className='snowwhite'>Please Login or SignUp! </p>: <p className='color-yellow'>Please Login or SignUp! </p>}

            
            </div>


    <div className="fighter-container">
      <div
        className={`fighter-image ${
          predictions[index]?.winner === 0 ? 'selected' : ''
        }`}
        style={{
          width: '100%',
          backgroundImage: `url('${fight.fighterPics[0]}'`,
          
          


        }}
        // url("https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/fighter_images/SHADOW_Fighter_fullLength_RED.png?VersionId=1Jeml9w1QwZqmMUJDg8qTrTk7fFhqUra&itok=fiyOmUkc")
       
        // https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/fighter_images/SHADOW_Fighter_fullLength_BLUE.png?VersionId=1Jeml9w1QwZqmMUJDg8qTrTk7fFhqUra&itok=fiyOmUkc

      ><div className="sireal" ><div className="recordwcir redcorner">{fight.records[0]}</div>  <button
      className={`fighter-button ${predictions[index]?.winner === 0 ? 'selected' : ''}`}
      onClick={toggleSI}
      style={{
        backgroundImage: getFighterCountryAbbreviation(index, 0) !== "Not Found"
        ? `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, 0)}/shiny/64.png")`
        : `url('https://www.tapology.com/${fight.flags[0]}')`,
        
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      
    >
      
      {fight.fighters[0]}
    </button>
    
    </div>
      </div>
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
          width: '100%',
          backgroundImage: `url('${fight.fighterPics[1]}')`,
          backgroundSize: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '135% 100%' : '',
          marginBottom: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '20%' : '',
          paddingBottom: fight.fighterPics[1] === "https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png" ? '20%' : '',
          zIndex:'-1'


          
        }}
        
      ><div className="sireal" ><div className="recordwcir bluecorner">{fight.records[1]}</div>  <button
      className={`fighter-button ${predictions[index]?.winner === 1 ? 'selected' : ''}`}
      onClick={toggleSI}
      style={{
        backgroundImage: getFighterCountryAbbreviation(index, 1) !== "Not Found"
          ? `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, 1)}/shiny/64.png")`
          : `url('https://www.tapology.com/${fight.flags[1]}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      
      {fight.fighters[1]}
    </button>
    
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
</center><div style={{ }} className="blackBG">
 </div>

        

        
    
        
    


        
      </div>
      <h1 className='snowwhite'>Please login!</h1>
      < Dnd2/>
        </div>
    </div>
    ) }
    </div>
    {/* Modal */}
    <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel=""
>
  <div className='text-align-center element-with-border3 'style={{MaxHeight:'fit-content'}}>
  <center> <div className='p4pplusBlack ggg'></div></center>
    <h2 className='snowwhite'
    style={{ margin:'10px' }}
    >Picks4Points.com</h2>

    {/* selectedUfcCard.map((fight, index) => ({
            fighters: fight.fighters,
            winner: predictions[index]?.winner ,
            method: predictions[index]?.method ,
            round: predictions[index]?.round */}
    {selectedUfcCard.map((fight, index) => (
      <div style={{maxWidth:'100%' }}  key={index}>

        {/* <div className='text-align-center snowwhite' style={{ display:'flex', justifyContent: 'center' ,margin:'0px',marginTop:'-25px'  }}>
          <p style={{ color: predictions[index]?.winner === 0 ? 'white' : 'white',backgroundColor: predictions[index]?.winner === 0 ? 'green' : '' }}>{fight.fighters[0]} </p>
          <p style={{padding:'0px 5px', backgroundColor:'whitesmoke', border:'black 1px solid', borderRadius:'40%',color:'black'}}> VS </p>
          <p style={{ color: predictions[index]?.winner === 1 ? 'white' : 'white',backgroundColor: predictions[index]?.winner === 1 ? 'green' : '' }}>
                    {fight.fighters[1]}</p>
        </div> */}

        <div className='text-align-center snowwhite' style={{ display:'flex', justifyContent: 'center',margin:'0px',marginTop:'-25px'   }}>
          
        {predictions[index]?.winner === 0 ? <>
        <p style={{backgroundColor:'darkgreen',paddingLeft:'5px',paddingRight:'5px'}}>{fight.fighters[0].split(' ').pop()} </p>
        
        {predictions[index]?.round ? 
          <p style={{paddingLeft:'5px',backgroundColor:'black'}}>R. {predictions[index]?.round} </p>: null}
          <p style={{paddingLeft:'5px',paddingRight:'5px',backgroundColor:'black'}}>
             {predictions[index]?.method}</p>
         <p className='color-transp'
         style={{backgroundColor:'black',
         backgroundImage: `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, predictions[index]?.winner)}/shiny/64.png")`,
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
                backgroundImage: `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, predictions[index]?.winner)}/shiny/64.png")`,
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
export default Tommy;

