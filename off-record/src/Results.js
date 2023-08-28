import React, { useState, useEffect } from "react";
import './App.css';

import Dnd from './Dnd';

function Results({ user, ufcCard, ufcResults }) {
  const [results, setResults] = useState([]);

////////put in app soon 
console.log(results)

    




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
 
  function calculatePoints(pick, result) {
    let points = 0;
    // Check if the winner matches
    if (pick.fighters[pick.winner] !== null && result.winner !== null && pick.fighters[pick.winner] === result.winner) {
      points += 1;
  
      // Check if the method also matches, only if the winner is correct
      if (pick.method !== null && result.method !== null && pick.method === result.method) {
        points += 1;
      }
    }
  
    return points;
  }
  
  
  
  function calculateTotalPoints(result) {
    let totalPoints = 0;
  
    result.predictions.forEach((prediction, predIndex) => {
      const points = calculatePoints(prediction, ufcResults[predIndex]);
      totalPoints += points;
    });
  
    return totalPoints;
  }
  

  // Fetch results when the component mounts
  useEffect(() => {
    // Fetch results from the API
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
          setResults(data.picks); // Extract the array from the 'picks' property
        } else {
          console.error('API response does not have an array in the "picks" property:', data);
          // Handle the unexpected response as needed
        }
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        // Handle error as needed
      });
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
<div>
  {user ? (
    <div className="results">
      <h1 className="color-white">Results</h1>
      <table>
        <thead>
          <tr>
            <th>Your  Picks</th>
            
            <th> Fight Results</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
  {results.map((result, index) => (
    <tr key={index}>
      <td>
        <div className="ownpicksdiv">
          <center>
            <strong>{result.owner}'s picks</strong>
            <br />
            <strong>{result.main_event}</strong>
            <h2>{calculateTotalPoints(result)} Points  </h2>
          </center>
        </div>
        <div >
          {result.predictions.map((prediction, predIndex) => (
            <p className={calculatePoints(prediction, ufcResults[predIndex]) > 0 ? "winnerCircle" : ""}key={predIndex}>
              <strong>{prediction.fighters.join(' vs ')}</strong>
              <br />
              <strong>Winner:</strong>{" "}
              {prediction.winner === 0
                ? prediction.fighters[0]
                : prediction.winner === 1
                ? prediction.fighters[1]
                : "None"}
              {prediction.winner !== undefined && (
                <img
                  style={{ height: '30px', marginBottom: '-4%', marginLeft: '3%' }}
                  src={`https://flagsapi.com/${getFighterCountryAbbreviation(predIndex, prediction.winner)}/flat/64.png`}
                  alt={`Flag of ${prediction.fighters[prediction.winner]}`}
                />
              )}
              <br />
              
              <strong>Method:</strong> {prediction.method}<strong className={calculatePoints(prediction, ufcResults[predIndex]) > 1 ? "rightgreen" : ""}>
  {calculatePoints(prediction, ufcResults[predIndex]) > 1
    ? ` + ${calculatePoints(prediction, ufcResults[predIndex])} `
    : null}
</strong>
              <br />
              <center>
              </center>

            </p>
          ))}
        </div>
      </td>
      <td>
        <div>
          {ufcResults.map((match, matchIndex) => (
            <p key={matchIndex}>
              <strong>{match.fighters.join(' vs ')}</strong>
              <br />
              <strong>Winner:</strong>{" "}
              {match.winner !== null ? `${match.winner}` : "Results Pending"}
              <br />
              <strong>Method:</strong> {match.method !== null ? match.method : "Results Pending"}
              <br />
            </p>
          ))}
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  ) : (
    <Dnd />
  )}
</div>

  );
}

export default Results;
