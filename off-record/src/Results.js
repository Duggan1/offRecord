import React, { useState, useEffect } from "react";
import './App.css';
import {useNavigate} from 'react-router-dom';
import logo from './logo.png';
import Chart from "chart.js/auto";

import Dnd from './Dnd';

function Results({ user, ufcCard, ufcResults, results2, adminKevPicks2 }) {
  const [results, setResults] = useState(results2);
  const [updatedResults, setUpdatedResults] = useState(ufcResults)
  const [showOnlyUserPicks, setShowOnlyUserPicks] = useState(false);
  const [adminKevPicks, setAdminKevPicks] = useState(adminKevPicks2);
  const [selectedEvent, setSelectedEvent] = useState(""); 
  const [explainPoints, setExplainPointst] = useState(false); 
  const [showLeaderBoard, setshowLeaderBoard] = useState(false); 
  const [showCardWins, setShowCardWins] = useState(false); 
  // console.log(updatedResults)
  const navigate = useNavigate()
  const handleOptionClick = (option) => {
      navigate(`${option}`);
    };








  const byMainEvent = (results) => {
    return !selectedEvent || results.main_event === selectedEvent;
  }
  
  const [selectedUser, setSelectedUser] = useState(""); // Add this line to define the state

  
  const filteredByMainEvent = results.filter((result) => {
    return (
      (!selectedEvent || result.main_event === selectedEvent) &&
      (!selectedUser || result.owner === selectedUser) &&
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
  
  
  
  
  
  
  

console.log(leaderboard)






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




  
  

  
  useEffect(() => {
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

          console.log(data)  
          setResults(data.picks);
          const filteredResults = data.picks.filter(result => result.owner !== 'AdminKev');
          setResults(filteredResults);
          console.log(filteredResults)
          data.picks.forEach(result => {
            if (result.owner === 'AdminKev' && result.predictions.length > 0) {
              setAdminKevPicks(picks => ({
                ...picks,
                [result.main_event]: result.predictions
              }));
            }
          });
        } else {
          console.error('API response does not have an array in the "picks" property:', data);
        }
      
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        // Handle error as needed
      });
  }, []); 


  const fetchPicks = () => {
    fetch('https://off-therecordpicks.onrender.com/picks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the list of picks with the newly fetched data
        setResults(data.picks);
        const filteredResults = data.picks.filter(result => result.owner !== 'AdminKev');
          setResults(filteredResults);
          console.log(filteredResults)
          data.picks.forEach(result => {
            if (result.owner === 'AdminKev' && result.predictions.length > 0) {
              setAdminKevPicks(picks => ({
                ...picks,
                [result.main_event]: result.predictions
              }));
            }
          });
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
        // Handle error as needed
      });
  };
  



  const uniqueMainEventsRD = [...new Set(results.map(result => result.main_event))];
  const uniqueMainEvents = uniqueMainEventsRD.filter(event => event !== 'Jon Jones vs Fedor Emelianenko');
  console.log(uniqueMainEvents);
  const uniqueUsernamesRD = [...new Set(results.map(result => result.owner))];
  const uniqueUsernames = uniqueUsernamesRD.filter(user => user !== 'AdminKev');
  console.log(uniqueUsernames);

  
  const handleDeletePick = (pickId) => {
    
    console.log(`https://off-therecordpicks.onrender.com/picks/${pickId}`)
    fetch(`https://off-therecordpicks.onrender.com/picks/${pickId}`, {
      method: "DELETE",
      
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to delete pick');
        }
        // Refresh the list of picks after successful deletion
        return fetchPicks();
      })
      .catch((error) => {
        console.error('Error deleting pick:', error);
        // Handle error as needed
      });
  };


  



const [deletePicks, setDeletePicks] = useState(false)


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



// Function to send a PATCH request to update the pick on the server
const handleUpdatePredictions = (pickId, updatedPredictions) => {
  // Find the pick you want to update in updatedPicks
  console.log(pickId)
  console.log(updatedPredictions)
  updatedPredictions.picks_id = pickId.id
  

  if (pickId !== -1) {
    // Create a copy of the updatedPick
    // const updatedPick = { ...updatedPicks[updatedPickIndex] };

    // // Update the predictions property with the new predictions
    // updatedPick.predictions = updatedPredictions;

    // // Create a copy of updatedPicks
    // const updatedPicksCopy = [...updatedPicks];

    // // Update the pick in the copied array
    // updatedPicksCopy[updatedPickIndex] = updatedPick;

    // Update the state with the modified updatedPicksCopy
    // setUpdatedPicks(updatedPicksCopy);
    console.log(pickId)
    const dataToSend = {
      id: pickId.id,
      owner: pickId.owner ,
      location: pickId.location,
      mainEvent: pickId.main_event,
      predictions: updatedPredictions,
      user_id: pickId.id || 2,
  };
  console.log(dataToSend)


    // Now, you can send a PATCH request to update the pick on the server
    fetch(`https://off-therecordpicks.onrender.com/picks/${pickId.id}`, {
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
        return fetchPicks();
      })
      .catch((error) => {
        console.error("Error updating pick:", error);
        // Handle error as needed
      });
  }
};

const movePredictionDown = (pickId, predIndex) => {
  console.log(pickId);/////pickOBJECT
  console.log(predIndex);/////PREDICTIONINDEX

  // Get the updated order of predictions within the pick
  const updatedPredictions = pickId.predictions;
  console.log(updatedPredictions);

  // Check if it's possible to move the prediction down
  if (predIndex < updatedPredictions.length - 1) {
    // Create a copy of the updated predictions array
    const updatedPredictionsCopy = [...updatedPredictions];

    // Swap the prediction with the one below it in the copied array
    const temp = updatedPredictionsCopy[predIndex];
    updatedPredictionsCopy[predIndex] = updatedPredictionsCopy[predIndex + 1];
    updatedPredictionsCopy[predIndex + 1] = temp;
    console.log(temp);

    // Now, call the function to update the predictions
    handleUpdatePredictions(pickId, updatedPredictionsCopy);
  }
};

// Function to move a prediction up within a pick
const movePredictionUp = (pickId, predIndex) => {
  // Get the updated order of predictions within the pick
  const updatedPredictions = pickId.predictions;
  console.log(updatedPredictions)

  // Check if it's possible to move the prediction up
  if (predIndex > 0) {
    // Swap the prediction with the one above it
    const temp = updatedPredictions[predIndex];
    updatedPredictions[predIndex] = updatedPredictions[predIndex - 1];
    updatedPredictions[predIndex - 1] = temp;

    // Update the order property of predictions
    updatedPredictions.forEach((prediction, index) => {
      prediction.order = index;
    });

    // Update the state with the reordered predictions
    // handlePredictionOrderChange(pickId, updatedPredictions);
    
    
  }
};

// Function to move a prediction down within a pick
const deletePrediction = (pickId, predIndex) => {
  // Get the updated list of predictions
  const updatedPredictions = pickId.predictions;

  // Check if the specified index is valid
  if (predIndex >= 0 && predIndex < updatedPredictions.length) {
    // Remove the prediction at the specified index
    updatedPredictions.splice(predIndex, 1);

    // Call the function to update the predictions
    handleUpdatePredictions(pickId, updatedPredictions);
  }
};
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

const toggleOwnPicks = (id) => {
  setOwnPicksVisibility((prevState) => ({
    ...prevState,
    [id]: !prevState[id],
  }));
  console.log(ownPicksVisibility);
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



// Calculate the points and add a 'points' property to each result
filteredByMainEvent.forEach((result) => {
  result.points = calculateTotalPoints(result, result.main_event, adminKevPicks);
});

// Sort the filteredByMainEvent array by the 'points' property in descending order
filteredByMainEvent.sort((a, b) => b.points - a.points);

// useEffect(() => {
//   const initialVisibility = {};
//   filteredByMainEvent.forEach((result) => {
//     initialVisibility[result.owner] = true;
//   });
//   setOwnPicksVisibility(initialVisibility);
// }, [filteredByMainEvent]);





// if (predictions.methodCounts) {
//   // Data for the chart
//   const data = {
//     labels: ["TKO/KO", "Submission", "Decision", "Draw/No-Contest"],
//     datasets: [
//       {
//         label: "Method Counts",
//         data: [
//           predictions.methodCounts["TKO/KO"],
//           predictions.methodCounts["Submission"],
//           predictions.methodCounts["Decision"],
//           predictions.methodCounts["Draw/No-Contest"],
//         ],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

  // Get the canvas element
//   const chartCanvas = document.getElementById("methodChart");

//   if (chartCanvas) {
//     const ctx = chartCanvas.getContext("2d");
//     new Chart(ctx, {
//       type: "bar",
//       data: data,
//       options: options,
//     });
//   }
// }





  return (
<div>
  (
    <div className="snowwhite">
    <div className="results">

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
                  Results
                  </h1>


            {showLeaderBoard ? <div className="lboard">
            
            <h2 className="tac" style={{letterSpacing: '2xcpx',}}>Leaderboard</h2>
      <center><table ><thead><tr>
            <th className="downUnder">Username</th><th  className="downUnder">Total Points</th><th className="downUnder ">Wins</th><th className="downUnder Left5" >%</th></tr></thead>
        <tbody>{leaderboard.map((user, index) => (
            <tr key={index}>
              
              <td style={{backgroundColor:'rgba(0, 5, 59, 0.439)'}}>{user.username}</td>
              <td className="tac" style={{backgroundColor:'rgba(0, 5, 59, 0.439)'}} >{user.totalPoints}</td>
              
              <td className="tac " style={{backgroundColor:'rgba(0, 5, 59, 0.650)'}}  >{countWinsForUsername(leaderboardwinners, user.username)}</td>
              <td className="tac Left6" style={{backgroundColor:'rgba(0, 5, 59, 0.439)'}}>{((user.totalWinnerPointsOnly / (user.totalPicksCount )) * 100).toFixed(0)}% </td>
              
              
              </tr>))}</tbody></table><button className="b2fight"style={{marginBottom:'0%', marginTop:'5%'}} onClick={() => setshowLeaderBoard(!showLeaderBoard)} >Hide Leaderboard</button></center>
              </div>
               : <center><button className="expoint" onClick={() => setshowLeaderBoard(!showLeaderBoard)} >View Leaderboard</button></center> }

 




















            {explainPoints ?    <div className="pointEXB"><div className="pointEX" >
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 1 point</span> for picking the correct Winner </p><br></br>
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 2 point</span> for picking the correct Method & Winner</p><br></br>
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 3 point</span> for picking the correct Round, Method & Winner</p><br></br>
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 2 points</span> for picking Draw/No-Contest correctly</p><center><button className="expoint" onClick={() => setExplainPointst(!explainPoints)} >Hide Point System</button></center></div></div>
       : <center><button className="expoint" onClick={() => setExplainPointst(!explainPoints)} >Explain Point System</button></center> }

{/* <center><button className="expoint"  onClick={() => setSelectedEvent('Jon Jones vs Fedor Emelianenko')} >Dream Card Results</button></center>
*/}

{showCardWins ?   <div className="pointEXCard" >
      
      {Object.entries(leaderboardwinners).map(([event, eventData]) => (
        <div key={event}>
          <p className="tight snow landunder" style={{textDecoration:'underline',fontWeight:'bold'}}>{event}</p>
          <div className="tight">
            {eventData.winner === "Pending" ? (
            
            <div className="loading2 tight color-yellow" style={{  minHeight: '25px',textAlign:'center'}}>Results Pending</div>
             
          
          ) : (
            <div>
              
              <p className='color-yellow'>
                {eventData.winners ? (
                  <span>
                    {eventData.winners.map((winner, index) => (
                      <span key={index}>
                        {winner} +{eventData.points} Points
                        {index < eventData.winners.length - 1 ? <br /> : ' '}
                      </span>
                    ))}
                  
                  </span>
                ) : (
                  <span>
                    {eventData.winner} +{eventData.points} Points
                  </span>
                )}
              </p>
              </div>
            )}
          </div>
        </div>
      ))}



<center><button className="expoint" onClick={() => setShowCardWins(!showCardWins)} >Hide Card Winners</button></center></div>
: <center><button className="expoint" onClick={() => setShowCardWins(!showCardWins)} >Show Card Winners</button></center> }

     



            <center><label style={{color:'lightblue',backgroundColor:'black',fontWeight:'bold'}}>Filter Results by Fight Card</label><br></br>
            <select className="filterbutton" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
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

            <center>
  <label style={{ color: 'lightblue', backgroundColor: 'black', fontWeight: 'bold' }}>
    Filter Results by User
  </label>
  <br />
  <select
    className="filterbutton"
    value={selectedUser}
    onChange={(e) => setSelectedUser(e.target.value)}
  >
    <option value="">All Users</option>
    {uniqueUsernames.map((username, index) => (
      <option key={index} value={username}>
        {username}
      </option>
    ))}
  </select>
</center>






     

      
      {user && user.username ? (
                  <center>
                    <button
                  className="urpicksB"
                  onClick={() => setShowOnlyUserPicks(!showOnlyUserPicks)}
                >
                  {showOnlyUserPicks ? "Show All Picks" : `Show Only My Picks`}
                </button>

                  </center>
                ) : null}



<center style={{paddingBottom:'5%'}}>

  
  {/* <button
    className={showPredictions ? "allhide-button" : "allshow-button"}
    onClick={togglePredictions}
  >
    {showPredictions ? "Hide All" : "Show All"}
  </button> */}
<label className={`switch ${showPredictions ? 'pborder' : ''}`}>

  <input onClick={togglePredictions} type="checkbox" class="cb"></input>
  <span class="toggle">
    <span class="left">Hide All</span>  
    <span class="right">Show All</span>  
  </span>
</label>








</center>



</div>


                
      <table className="wholeOne" >
        <thead>
          <tr>
            <th>{filteredByMainEvent.length} Picks</th>
            
            
            <th> Fight Results</th>
            {/* Add more table headers as needed later*/}
          </tr>
        </thead>
        <tbody >
        {filteredByMainEvent.map((result, index) => (
  <tr key={index} >
    
    <td className="LeftOne">
      <div className="ownpicksdiv">

      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <button
    className={ownPicksVisibility[result.owner] ? "hide-button" : "show-button"}
    onClick={() => toggleOwnPicks(result.id)}
  >
    {ownPicksVisibility[result.owner] ? "Hide" : "Show"}
  </button>
  <p style={{ textAlign: 'right', margin: '0' }}>
  {((calculateTotalPoints(result, result.main_event, adminKevPicks) / (result.predictions.length * 2)) * 100).toFixed(0)}%
</p>


</span>

        <center>
          
         <strong>{result.main_event}</strong>
      <br></br><strong className=" landunder"><span className="small color-red landunder">{result.owner}'s</span> picks</strong>
           
          <br />
          
          {deletePicks && user && (user.username === result.owner || user.username === 'AdminKev') ? (
              <button
                className="delete-button"
                onClick={() => handleDeletePick(result.id)}
              >
                Delete Pick
              </button>
            ) : null }
          <h2>{calculateTotalPoints(result, result.main_event, adminKevPicks)}+ Points</h2>
         
        </center>
      </div>
      { ownPicksVisibility[result.id] ? (
      <div className={`predictions-container ${ownPicksVisibility ? '' : 'hidden-predictions'}`}>
        {result.predictions.map((prediction, predIndex) => {
          // Check if adminKevPicks contains the main event as a key
          const adminKevPicksForEvent = adminKevPicks[result.main_event] || {};

          return (
            <p
              className={calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex]) > 0 ? "winnerCircle" : "results-container"}
              key={predIndex}
            >
              <strong>{prediction.fighters.join(' vs ')}</strong>
              <br />
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
              <center>
                {/* Your additional code */}
              
              <strong className={calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex]) > 1 ? "rightgreen" : ""}>
                {calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex]) > 1
                  ? ` + ${calculatePoints(prediction, adminKevPicksForEvent[predIndex] || ufcResults[predIndex])} `
                  : null}
              </strong></center>
              <br />
              

                  {deletePicks && user && ( user.username === 'AdminKev') ?
                   (
                   <div key={prediction.id}>
                  {/* Display prediction details */}
                  {prediction.details}
                  <button onClick={() => movePredictionUp(result, predIndex)}>Move Up </button><br></br>
                  <button onClick={() => movePredictionDown(result, predIndex)}>Move Down </button>
                  <button onClick={() => deletePrediction(result, predIndex)}>Delete</button>
                  </div> ) : null }
                 
                
                <br></br>
                
            </p>
          );
        })}
        </div>)
 : null}
      </td>


      

      
    
      <td  className="RightOne">  
        <div  className="pickresultsdiv">
          {result.main_event !== 'Jon Jones vs Fedor Emelianenko' ?<>
          <center >
          
          <strong >
            {result.location}
          </strong><br></br>
          <strong>{result.main_event}</strong>
          <br />
          <strong className="landunder">
            Results
            </strong>
          
        </center><h2 style={{
            backgroundImage: `url("https://flagsapi.com/${getCountryAbbreviation(result.location)}/flat/64.png")`,
            backgroundSize: '50% 150%',
            backgroundRepeat:'no-repeat',
            backgroundPosition: 'right',
            paddingLeft:'5%',
          }}>  / {result.predictions.length * 2}+</h2></>
         :  <center>
            <strong>Dream Card Results</strong>
            <br />
            <strong>{result.main_event}</strong>
            <h2>Popularity Vote </h2>
          </center>}
        </div>
        { ownPicksVisibility[result.id]  ? (
        <div className="">
        {getAdminKevPicksForEvent(result.main_event).map((adminKevMatch, matchIndex) => (
  <div className="real-results-container" key={matchIndex}>
    <strong>{adminKevMatch.fighters.join(' vs ')}</strong>
    <br />
    
    {adminKevMatch.methodCounts ?  null :  <strong>Winner:  </strong> }
    {adminKevMatch.winner !== null
  ? adminKevMatch.winner === 'Draw/No-Contest'
    ? 'Draw/No-Contest'
    : adminKevMatch.fighters[adminKevMatch.winner]
  : "Results Pending"
}
{adminKevMatch.methodCounts ? (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div
       style={{
        backgroundColor: `${
          adminKevMatch.winner0C > adminKevMatch.winner1C
            ? 'green'
            : adminKevMatch.winner0C < adminKevMatch.winner1C
            ? 'white'
            : 'grey' // Set white for a tie
        }`,
        color: `${
          adminKevMatch.winner0C > adminKevMatch.winner1C
            ? 'white'
            : adminKevMatch.winner0C < adminKevMatch.winner1C
            ? 'darkred'
            : 'white' // Set darkred for a tie
        }`,
        flex: `${adminKevMatch.winner0C / (adminKevMatch.winner0C + adminKevMatch.winner1C)}`,
        padding: "5px", // Add padding for spacing
      }}
    >
      {adminKevMatch.fighters[0]}{" "}
      {((adminKevMatch.winner0C / (adminKevMatch.winner0C + adminKevMatch.winner1C)) * 100)}
      % {adminKevMatch.winner0C}
    </div>
    <div
     style={{
      backgroundColor: `${
        adminKevMatch.winner0C < adminKevMatch.winner1C
          ? 'green'
          : adminKevMatch.winner0C > adminKevMatch.winner1C
          ? 'white'
          : 'grey' // Set white for a tie
      }`,
      color: `${
        adminKevMatch.winner0C < adminKevMatch.winner1C
          ? 'white'
          : adminKevMatch.winner0C > adminKevMatch.winner1C
          ? 'darkred'
          : 'white' // Set darkred for a tie
      }`,
      flex: `${adminKevMatch.winner1C / (adminKevMatch.winner0C + adminKevMatch.winner1C)}`,
      padding: "5px", // Add padding for spacing
    }}
    >
      {adminKevMatch.fighters[1]}{" "}
      {((adminKevMatch.winner1C / (adminKevMatch.winner0C + adminKevMatch.winner1C)) * 100)}
      % {adminKevMatch.winner1C}
    </div>
  </div>
) : null}



{adminKevMatch.methodCounts ?  null : <br></br>}
    
    {adminKevMatch.methodCounts ?  null : <strong>Method:</strong>   }
    
     {adminKevMatch.method !== null  ? 
     adminKevMatch.method === "Decision - MajorityDecision - Majority" && adminKevMatch.winner === 3  ?
      "Draw/No-Contest": 
      adminKevMatch.method : 
      "Results Pending"}


    <br />
    { !adminKevMatch.methodCounts ? 
        adminKevMatch.method === 'TKO/KO' || adminKevMatch.method === 'Submission'  ? <>
        <strong>Round:</strong> {adminKevMatch.round} 
        <br /> </> : null
    
               : null }

    {adminKevMatch.methodCounts ? 
    <div>
    TKO/KO - {adminKevMatch.methodCounts['TKO/KO'] }  |  
    Submission - {adminKevMatch.methodCounts['Submission'] }<br></br>
    Decision - {adminKevMatch.methodCounts['Decision'] }  |  
    Draw/No-Contest - {adminKevMatch.methodCounts['Draw/No-Contest'] }<br></br>
    <div>
  {/* <canvas id="methodChart" style={{height:'300px', width: '400px'}}></canvas> */}
      </div>


  </div> : null}
    {adminKevMatch.winner !== null ? (
      <div className="flag-image">
        {/* ... Flag image code ... */}
      </div>
    ) : (
      <div className="loading" style={{ height: '30px', marginLeft: '40%' }}></div>
    )}
  </div>
))} 

</div>)
 : null}

      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
    {user && user.username ? (
                  
                  <button
                style={{ border: 'gold 3px solid', backgroundColor: 'rgb(80, 10, 80)', color: 'white', cursor: 'pointer', marginBottom: '5%',fontWeight:'bold' }}
                onClick={() => setDeletePicks(!deletePicks)}
              >
                {deletePicks ? "Hide Delete" : `Delete My Picks `}
              </button>

                
              ) : null}
  )
  <img src={logo} alt='fighting logo' onClick={() => handleOptionClick('/')} className='resultsimg' style={{cursor:'pointer'}}/> 
  
  <p style={{color:'white',fontWeight:'Bold',textAlign:'center'}}>Click Logo to go to Home Page</p>
  <div className="element-with-border2"></div>     
            
</div>

  );
}

export default Results;
