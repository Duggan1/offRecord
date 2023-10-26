import React, { useState , useEffect } from 'react';
import cheerio from 'cheerio';
import './App.css';
import * as yup from 'yup';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';
import Dnd from './Dnd';

function Tommy({ user, ufcCard, stallUfcCard,locationCity,location}) {

  // const locationCity = locationCity
  // const location = location

  const [showUfcCard, setShowUfcCard] = useState(true);

  
  const toggleCard = () => {
    setShowUfcCard((prevShowUfcCard) => !prevShowUfcCard);
    setPredictions([])

  };

  // Determine which card to display
  const selectedUfcCard = showUfcCard ? ufcCard : stallUfcCard;

  
  const [isLoading, setIsLoading] = useState(true);

      
  
// console.log(eventInfo)        
  useEffect(() => {
    if (ufcCard)
      setIsLoading(false); // Data has loaded
      
    
  }, []);

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
  
  
  const mainEvent = selectedUfcCard[0].fighters.join(' vs ');
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


console.log(user)








const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data using Yup
        await validationSchema.validate({ predictions });

        const predictionData = selectedUfcCard.map((fight, index) => ({
            fighters: fight.fighters,
            winner: predictions[index]?.winner ,
            method: predictions[index]?.method ,
        }));

        const dataToSend = {
            owner: user.username || user.userName,
            location: location,
            mainEvent: mainEvent,
            predictions: predictionData,
            user_id: user.id || 2,
        };

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
            setPredictions([]);
            navigate('/results');

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
  "Czech Republic": "CZ",
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
  "Venezuela, Bolivarian Republic of": "VE",
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
  
if (isLoading) {
  return <Dnd />; // Render loading indicator
} 

  return  (
    <div>
      {user ? (
    <div className="tommy">

      {showUfcCard?
      <div className="bayLoc" > 
      <h1 >UFC {locationCity} <img style={{height:'40px', backgroundColor:'black', padding:'0px 2px'}} src={`https://flagsapi.com/${getCountryAbbreviation(location)}/flat/64.png`}
          alt={`Flag of ${location}`} ></img></h1><br></br><h2 className="bay" >{mainEvent}</h2><button className='dreamcardbutton' onClick={toggleCard}>
          {showUfcCard ? ' Dream Card' : 'Show Current UFC Card'}
        </button><h1> Fight Predictions</h1></div>: 
          
          <div className="bayLoc"><h1 >Dream Card <img style={{height:'40px', backgroundColor:'black', padding:'0px 2px',border:' purple solid 2px'}} src={`https://s.tmimgcdn.com/scr/800x500/294500/crown-concept-logo-design-template2_294549-original.jpg`}
          alt={`Flag of ${location}`} ></img></h1><br></br><h2 className="bay" >{mainEvent}</h2
          
          ><button className='dreamcardbutton' onClick={toggleCard}>
          {showUfcCard ? 'Show Dream Card' : 'Show Current UFC Card'}
        </button><h1> Fight Predictions</h1></div>}

      
      
      
       
      {/* <p className="color-black bold ">Fighter's images will be availabe on Friday after UFC photoshoot occurs </p> */}
      <form style={{marginBottom: '0px'}} className="blackBG" onSubmit={handleSubmit}>
        {selectedUfcCard.map((fight, index) => (
    <div key={index} className="fight">
      <div key={index} className="fighterready">
  <p key={index} className="mobile-fight-info">
    <div className="mobile-fighter-name">
      <span className={`mobile-fighter-name ${predictions[index]?.winner === 0 ? 'selected' : ''}`}>
        {fight.fighters[0]}
      </span>
      <span className="mobile-fight-info color-black"> vs. </span>
      <span className={`mobile-fighter-name ${predictions[index]?.winner === 1 ? 'selected' : ''}`}>
        {fight.fighters[1]}
      </span>
    </div>
  </p>



<div className="nice" style={{zIndex:'0'}}>
              <label 
              
              className={`method ${predictions[index]?.method === 'TKO/KO' ||predictions[index]?.method === 'Decision' ||predictions[index]?.method === 'Draw/No-Contest' || predictions[index]?.method === 'Submission' ? 'selected' : ''}`}


              >Method of Victory:</label>
              <select className={`methodbar ${predictions[index]?.method === 'TKO/KO' ||predictions[index]?.method === 'Decision' ||predictions[index]?.method === 'Draw/No-Contest' || predictions[index]?.method === 'Submission' ? 'selected' : ''}`}onChange={(e) => handleMethodChange(index, e.target.value)}>
                <option value="">Select Method</option>
                <option value="TKO/KO">TKO/KO</option>
                <option value="Submission">Submission</option>
                <option value="Decision">Decision</option>
                <option value="Draw/No-Contest/DQ">Draw/No-Contest</option>
              </select>
            </div></div>


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
      onClick={() => handlePredictionChange(index, 0)}
      style={{
        backgroundImage: `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, 0)}/shiny/64.png")`,
        
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
        backgroundImage: `url("https://flagsapi.com/${getFighterCountryAbbreviation(index, 1)}/shiny/64.png")`,
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
       
     <center>
        {errors && (<p className="errortime" style={{ border: errors.length > 0 ? '5px solid red' : 'none' }}>{errors} </p>)}
</center><div style={{ borderTop: '2px solid purple'}} className="blackBG">
 <button className="submitb" type="submit">Submit Predictions</button></div>

        

        
    
        
    


        
      </form>
    </div> ) : (
      <Dnd />
    )}
  </div>
);
    }
export default Tommy;

