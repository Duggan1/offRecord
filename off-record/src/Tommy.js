import React, { useState } from "react";
import './App.css';
import * as yup from 'yup';

import { useNavigate } from 'react-router-dom';
import Dnd from './Dnd';

function Tommy({ user }) {
  const navigate = useNavigate();

  // UFC card information
  const location = 'France'
  const ufcCard = [
    { match: "Heavyweight", fighters: ["Ciryl Gane", "Serghei Spivac"], records: ["11-2", "16-3"], flags: ["France", "Romania"] },
    { match: "Flyweight", fighters: ["Manon Fiorot", "Rose Namajunas"], records: ["11-5", "12-2"], flags: ["France", "United States"] },
    { match: "Featherweight", fighters: ["Lucas Almeida", "Benoit Saint-Denis"], records: ["14-2", "11-1"], flags: ["Brazil", "Canada"] },
    { match: "Lightweight", fighters: ["Thiago Moisés", "Yanis Ghemmouri"], records: ["17-6", "12-1"], flags: ["Brazil", "France"] },
    { match: "Bantamweight", fighters: ["Caolan Loughran", "Volkan Oezdemir"], records: ["8-0", "18-7"], flags: ["United Kingdom", "Switzerland"] },
    { match: "Light Heavyweight", fighters: ["Bogdan Guskov", "Nora Cornolle"], records: ["14-2", "6-1"], flags: ["Russia", "France"] },
    { match: "Bantamweight", fighters: ["Joselyne Edwards", "Ange Loosa"], records: ["13-4", "9-3"], flags: ["Panama", "France"] },
    { match: "Welterweight", fighters: ["Rhys McKee", "Taylor Lapilus"], records: ["13-4-1", "18-3"], flags: ["Ireland", "France"] },
    { match: "Bantamweight", fighters: ["Muin Gafurov", "Morgan Charriere"], records: ["18-5", "18-9-1"], flags: ["Russia", "France"] },
    { match: "Featherweight", fighters: ["Manolo Zecchini", "Farid Basharat"], records: ["11-3", "10-0"], flags: ["Italy", "Afghanistan"] },
    { match: "Flyweight", fighters: ["Kleydson Rodrigues", "Zarah Fairn"], records: ["8-2", "6-5"], flags: ["Brazil", "Germany"] },
    { match: "Flyweight", fighters: ["Jacqueline Cavalcanti", "Unknown Fighter"], records: ["5-1", "-"], flags: ["Brazil", "Unknown"] },
  ];
 
  
  function getFighterCountry(matchIndex, fighterIndex) {
    return ufcCard[matchIndex].flags[fighterIndex];
  }
  
  // Example usage
  const matchIndex = 0;
  const fighterIndex = 0;
  const country = getFighterCountry(matchIndex, fighterIndex);
  console.log(`The country of fighter ${fighterIndex + 1} in match ${matchIndex + 1} is ${country}`);
  
  
  const mainEvent = ufcCard[0].fighters.join(' vs ');
 
  const [predictions, setPredictions] = useState([]);


  const handlePredictionChange = (index, winnerIndex) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = { ...updatedPredictions[index], winner: winnerIndex };
    setPredictions(updatedPredictions);
  };
  const handleMethodChange = (index, method) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = { ...updatedPredictions[index], method };
    setPredictions(updatedPredictions);
  };

  const validationSchema = yup.object().shape({
    // userName: yup.string().required('Username is required'),
    // password: yup.string().required('Password is required'),
    predictions: yup.array().of(
      yup.object().shape({
        winner: yup.number().oneOf([0, 1], 'Invalid winner selection'),
        method: yup.string().required('Method of victory is required'),
      })
    ).required('At least one prediction is required'),
  });

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data using Yup
        await validationSchema.validate({ predictions });

        const predictionData = ufcCard.map((fight, index) => ({
            fighters: fight.fighters,
            winner: predictions[index]?.winner ,
            method: predictions[index]?.method ,
        }));

        const dataToSend = {
            owner: user.username || user.userName,
            location: location,
            mainEvent: mainEvent,
            predictions: predictionData,
            user_id: user.id || 99,
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
            // Handle error as needed
        });
    } catch (error) {
        console.error('Validation error:', error.message);
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
  "Korea, Republic of": "KR",
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
  "Moldova, Republic of": "MD",
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
  const countryName = ufcCard[matchIndex].flags[fighterIndex];
  return getCountryAbbreviation(countryName);
}
// Example usage
const inputCountry = "United States";
const abbreviation = getCountryAbbreviation(inputCountry);
console.log(`The abbreviation for ${inputCountry} is ${abbreviation}`);
  
  

  return  (
    <div>
      {user ? (
    <div className="tommy">
      <h2 >UFC {location} <img style={{height:'20px',}} src={`https://flagsapi.com/${getCountryAbbreviation(location)}/flat/64.png`}
          alt={`Flag of ${location}`} ></img> Fight Predictions</h2><h1></h1>
        
      <h2 className="color-white" >{mainEvent}</h2>
      
      <form onSubmit={handleSubmit}>
        {ufcCard.map((fight, index) => (
          <div key={index} className="fight">
             <p key={index} className="mobile-fight-info" >
          <span className="mobile-fighter-name" >
            {fight.fighters[0]} 
          </span> {fight.records[0]}
          <span className="mobile-fighter-name" ><span className="mobile-fight-info color-black"  > vs.{' '}</span>
            {fight.fighters[1]} 
          </span> {fight.records[1]} 
        </p>
            <div className="prediction">
              <button
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
              <button
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
            <div className="prediction">
              <label>Method of Victory:</label>
              <select className='selectO'onChange={(e) => handleMethodChange(index, e.target.value)}>
                <option value="">Select Method</option>
                <option value="TKO/KO">TKO/KO</option>
                <option value="Submission">Submission</option>
                <option value="Decision">Decision</option>
                <option value="Draw/No-Contest">Draw/No-Contest</option>
              </select>
            </div>
          </div>
        ))}
        <button className="submitb" type="submit">Submit Predictions</button>
      </form>
    </div> ) : (
      <Dnd />
    )}
  </div>
);
    }
export default Tommy;

