import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Elijah from './Elijah';
import Johnny from './Johnny';
import Results from './Results';
import Tommy from './Tommy';
import About from './About';
import axios from 'axios';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
// import CommentSection from './CommentSection';











function App() {
  const [showDropdown, setShowDropdown] = useState(false);


  







 
  const handleAppleClick = () => {
    setShowDropdown(!showDropdown);
  };
  // const ufcCard = [
  //   { match: "Heavyweight", fighters: ["Ciryl Gane", "Serghei Spivac"], records: ["11-2", "16-3"], flags: ["France", "Romania"] },
  //   { match: "Flyweight", fighters: ["Manon Fiorot", "Rose Namajunas"], records: ["11-5", "12-2"], flags: ["France", "United States"] },
  //   { match: "Featherweight", fighters: ["Lucas Almeida", "Benoit Saint-Denis"], records: ["14-2", "11-1"], flags: ["Brazil", "Canada"] },
  //   { match: "Lightweight", fighters: ["Thiago Moisés", "Yanis Ghemmouri"], records: ["17-6", "12-1"], flags: ["Brazil", "France"] },
  //   { match: "Bantamweight", fighters: ["Bogdan Guskov", "Volkan Oezdemir"], records: ["8-0", "18-7"], flags: ["United Kingdom", "Switzerland"] },
  //   { match: "Light Heavyweight", fighters: ["Bogdan Guskov", "Nora Cornolle"], records: ["14-2", "6-1"], flags: ["Russia", "France"] },
  //   { match: "Bantamweight", fighters: ["Joselyne Edwards", "Ange Loosa"], records: ["13-4", "9-3"], flags: ["Panama", "France"] },
  //   { match: "Welterweight", fighters: ["Rhys McKee", "Taylor Lapilus"], records: ["13-4-1", "18-3"], flags: ["Ireland", "France"] },
  //   { match: "Bantamweight", fighters: ["Muin Gafurov", "Morgan Charriere"], records: ["18-5", "18-9-1"], flags: ["Russia", "France"] },
  //   { match: "Featherweight", fighters: ["Manolo Zecchini", "Farid Basharat"], records: ["11-3", "10-0"], flags: ["Italy", "Afghanistan"] },
  //   { match: "Flyweight", fighters: ["Kleydson Rodrigues", "Zarah Fairn"], records: ["8-2", "6-5"], flags: ["Brazil", "Germany"] },
  //   { match: "Flyweight", fighters: ["Jacqueline Cavalcanti", "Unknown Fighter"], records: ["5-1", "-"], flags: ["Brazil", "Unknown"] },
  // ];
const [ufcCard2, setUfcCard2] = useState([]);
const [eventInfo, setEventInfo] = useState({});
const apiUrl = 'https://offtherecordcards.onrender.com/scrape-ufc-website';

useEffect(() => { 
  async function fetchData() {
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data) 
 
      const { event_name, event_date,fights, records,
        backgroundImageSrc, location, locationCC, tapImage,
       } = response.data;



      const newUfcCard = fights.map((fight, index) => {
        return {
            fighters: [fight.redCornerName, fight.blueCornerName],
            match: fight.weightClass,
            records: [records[index]?.redCornerRecord, records[index]?.blueCornerRecord],
            flags: [fight.redCornerCountry, fight.blueCornerCountry],
            fighterPics: [fight.redCornerImage, fight.blueCornerImage],

        };
    });

    // Update state with the ufcCard
    setUfcCard2(newUfcCard);
 

      // Update state with the scraped data
      setEventInfo({ event_name, event_date, fights, records ,backgroundImageSrc, location, locationCC, tapImage});
      /////////////////////////////

    } catch (error) { 
      console.error('Error:', error);
    }
  }   
      
  fetchData();      
}, []);  

const [ufcEvents, setUfcEvents] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://off-therecordpicks.onrender.com/events');
      const data = await response.json();
      console.log(data)
      setUfcEvents(data.ufc_events[0] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

console.log(ufcEvents !== null)
console.log(eventInfo)
console.log(ufcEvents)

const patchEvent = () => {

  const recreatedFights = eventInfo.fights.map((fight, index) => {
    const record = eventInfo.records[index];

      // Check if record is defined before accessing its properties
    const redCornerRecord = record ? record.redCornerRecord : '';
    const blueCornerRecord = record ? record.blueCornerRecord : '';

    return {
      weight_class: fight.weightClass,
      red_corner_name: fight.redCornerName,
      blue_corner_name: fight.blueCornerName,
      red_corner_country: fight.redCornerCountry,
      blue_corner_country: fight.blueCornerCountry,
      red_corner_record: redCornerRecord, // Use record from records array
      blue_corner_record: blueCornerRecord, // Use record from records array
      red_corner_image: fight.redCornerImage,
      blue_corner_image: fight.blueCornerImage,
      method: fight.method,
      round: fight.round,
      winner: fight.winner,
      // ... other properties ...
    };
  });
  
  console.log(recreatedFights);

  const dataToSend = {
    event_name: eventInfo.event_name,
    locationCC: eventInfo.location,
    backgroundImageSrc: eventInfo.main_event,
    tapImage: eventInfo.tapImage,
    fights: eventInfo.fights,
  };

  fetch(`https://off-therecordpicks.onrender.com/events/${ufcEvents.id}`, {
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
//////////////////////////////

//need useeffect
////////////////////////////////
if (ufcEvents && ufcEvents.event_name && eventInfo && eventInfo.event_name ) {
  console.log('comparing');
  if (
    eventInfo.event_name === ufcEvents.event_name &&
    eventInfo.locationCC === ufcEvents.locationCC &&
    eventInfo.backgroundImageSrc === ufcEvents.backgroundImageSrc &&
    eventInfo.tapImage === ufcEvents.tapImage &&
    // eventInfo.fights.length === ufcEvents.fights.length &&
    eventInfo.fights.every((fight, index) => {
      const ufcEventFight = ufcEvents.fights[index];

      // console.log('Index:', index);

      if (ufcEventFight) {
        // console.log('Comparing fight details:');
        // console.log('eventInfo:', fight);
        // console.log('ufcEvents:', ufcEventFight);

        // Compare details within each fight
        return (
          fight.weightClass === ufcEventFight.weightClass &&
          fight.redCornerName === ufcEventFight.redCornerName &&
          fight.blueCornerName === ufcEventFight.blueCornerName &&
          fight.redCornerCountry === ufcEventFight.redCornerCountry &&
          fight.blueCornerCountry === ufcEventFight.blueCornerCountry
          // Add more comparisons for other fight details
          // ...
        );
      } else {
        console.log('ufcEventFight is undefined for index:', index);
        return false; // or handle the case where ufcEventFight is undefined
      }
    })
  ) {
    // The details, including fights, match
    console.log('Details match!');
  } else {
    // Details do not match
    console.log('Ready to patch ufcEvent ');
    //////////////////////////////////
    patchEvent()

  }
}






useEffect(() => {
  async function submitUfcEvent() {
    try {
      // Example data to send in the POST request
      const dataToSend = {
        event_name: eventInfo.event_name,
        locationCC: eventInfo.locationCC,
        backgroundImageSrc: eventInfo.backgroundImageSrc,
        tapImage: eventInfo.tapImage,
        fights: eventInfo.fights,
        records: eventInfo.records,
      };

      // Make a POST request to submit UFC event
      const postResponse = await axios.post('/submit-ufc-event', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (postResponse.status === 201) {
        // Handle success
        console.log('UFC event submitted successfully:', postResponse.data);
        // Perform any further actions here
      } else {
        // Handle errors
        console.error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors and validation errors as needed
    }
  }

  // Call the submitUfcEvent function separately, not dependent on the fetchData useEffect
  submitUfcEvent();
}, [eventInfo]);





console.log(eventInfo) 
const backgroundImageSrc = eventInfo.backgroundImageSrc
const tapImageSrc = eventInfo.tapImage
  
  // const ufcCard = [
  //   { fighters: ["Alexa Grasso","Valentina Shevchenko"], match: "125 lbs", records: ["23-4", "16-3"], flags: ["Mexico", "Kyrgyzstan"] },
  //   { fighters: ["Kevin Holland", "Jack Della Maddalena"], match: "170 lbs", records: ["25-9", "15-2"], flags: ["United States", "Australia"] },
  //   { fighters: ["Raul Rosas Jr", "Terrence Mitchell"], match: "135 lbs", records: ["7-1", "14-3"], flags: ["Mexico", "United States"] },
  //   { fighters: ["Daniel Zellhuber", "Christos Giagos"], match: "155 lbs", records: ["13-1", "20-10"], flags: ["Mexico", "United States"] },
  //   { fighters: ["Fernando Padilla", "Kyle Nelson"], match: "145 lbs", records: ["15-4", "14-5-1"], flags: ["Mexico", "Canada"] },
  //   { fighters: ["Loopy Godinez", "Elise Reed"], match: "115 lbs", records: ["10-3", "7-3"], flags: ["Mexico", "United States"] },
  //   { fighters: ["Roman Kopylov", "Josh Fremd"], match: "185 lbs", records: ["11-2", "11-4"], flags: ["Russia", "United States"] },
  //   { fighters: ["Edgar Chairez", "Daniel Lacerda"], match: "125 lbs", records: ["10-5", "11-5"], flags: ["Mexico", "Brazil"] },
  //   { fighters: ["Tracy Cortez", "Jasmine Jasudavicius"], match: "125 lbs", records: ["10-1", "9-2"], flags: ["United States", "Canada"] },
  //   { fighters: ["Alex Reyes", "Charlie Campbell"], match: "155 lbs", records: ["7-2", "13-3"], flags: ["United States", "United States"] },
  //   { fighters: ["Josefine Knutsson", "Marnic Mann"], match: "115 lbs", records: ["6-0", "6-1"], flags: ["Sweden", "United States"] },
  // ];
  // const ufcCard = [
  //   { fighters: ["Rafael Fiziev", "Mateusz Gamrot"], match: "155 lbs", records: ["12-2", "22-2"], flags: ["Azerbaijan", "Poland"] },
  //   { fighters: ["Bryce Mitchell", "Dan Ige"], match: "145 lbs", records: ["15-1", "17-6"], flags: ["United States", "United States"] },
  //   { fighters: ["Marina Rodriguez", "Michelle Waterson-Gomez"], match: "115 lbs", records: ["16-3-2", "18-11"], flags: ["Brazil", "United States"] },
  //   { fighters: ["Bryan Battle", "AJ Fletcher"], match: "170 lbs", records: ["9-2", "10-2"], flags: ["United States", "United States"] },
  //   { fighters: ["Ricardo Ramos", "Charles Jourdain"], match: "145 lbs", records: ["16-4","14-6-1" ], flags: ["Brazil", "Canada"] },
  //   { fighters: ["Dan Argueta", "Miles Johns"], match: "135 lbs", records: ["9-1", "13-2"], flags: ["United States", "United States"] },
  //   { fighters: ["Tim Means", "Andre Fialho"], match: "170 lbs", records: ["32-15-1", "16-7"], flags: ["United States", "Portugal"] },
  //   { fighters: ["Jacob Malkoun", "Cody Brundage"], match: "185 lbs", records: ["7-2", "8-5"], flags: ["Australia", "United States"] },
  //   { fighters: ["Mohammad Usman","Jake Collier" ], match: "265 lbs", records: ["9-2","13-9" ], flags: ["Nigeria","United States" ] },
  //   { fighters: ["Mizuki Inoue", "Hannah Goldy"], match: "115 lbs", records: ["14-6", "6-3"], flags: ["Japan", "United States"] },
  //   { fighters: ["Tamires Vidal","Montserrat Rendon" ], match: "135 lbs", records: ["7-1","5-0" ], flags: ["Brazil","Mexico" ] },
  // ];
  
  const ufcCard = [

      {
        fighters: ["Jon Jones", "Francis Ngannou0pp"],
        match: "Heavyweight Championship Bout",
        records: ["30-1-0", "17-3-0"],
        flags: ["United States", "Cameroon"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-03/JONES_JON_L_BELT_03_04.png?itok=Y8Eh_69p',
         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-03/67964%252Fprofile-galery%252Ffullbodyright-picture%252FNGANNOU_FRANCIS_R_03-27.png?itok=E8A9RaUa',],
      }
      ,
      {
        fighters: ["Demetrius Johnson", "Brandon Moreno"],
        match: "Flyweight Championship Bout",
        records: ["30-3-1", "19-5-2"],
        flags: ["United States", "Mexico"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2018-10/JOHNSON_DEMETRIOUS_L.png?VersionId=G0_mNHlnlWHbCJpUDDHsX1poESQCIfI2&itok=r_oiMkoC',
         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/9c4e751d-a7bb-45bf-81bb-5c57b661b325%252FMORENO_BRANDON_R_06-12.png?itok=-XuWENTW',],
      },
      {
        fighters: ["Dominick Cruz","Sean O'Malley"  ],
        match: "Bantamweight Championship Bout",
        records: ["23-3-0","15-1-0" ],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/7a064993-dfca-4c8e-aca4-8268fc6e711b%252FCRUZ_DOMINICK_L_12-11.png?itok=hInQ4zAq','https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-08/OMALLEY_SEAN_R_08-19.png?itok=eZovmDJG', ],
      },
      {
        fighters: ["Alexander Volkanovski", "Conor McGregor"],
        match: "Featherweight Championship Bout",
        records: ["24-1-0","22-5-0" ],
        flags: ["Australia", "Ireland"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-07/VOLKANOVSKI_ALEXANDER_L_BELT_07-08.png?itok=rrdc9sM9', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-07/67667%252Fprofile-galery%252Ffullbodyright-picture%252FMCGREGOR_CONOR_R_07-10.png?itok=gL8I_tyo',],
      },
      {
        fighters: ["Khabib Nurmagomedov", "BJ Penn"],
        match: "Lightweight Championship Bout",
        records: ["29-0-0", "16-14-2"],
        flags: ["Russia", "United States"],
        fighterPics: ['https://pngimg.com/d/khabib_PNG16.png', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2020-03/PENN_BJ_R.png?VersionId=eV2cIM3YqUYM26MitpCFKJsidC_ZRUmJ&itok=RboQJFln',],
      },
      {
        fighters: ["Kamaru Usman", "Georges St-Pierre"],
        match: "Welterweight Championship Bout",
        records: ["19-1-0", "26-2-0"],
        flags: ["Nigeria", "Canada"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-04/USMAN_KAMARU_L_03-18.png?itok=Zgf5AByJ', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fighter-container/68009/profile-galery/fullbodyleft-picture/Georges-St-Pierre_318_LeftFullBodyImage.png?itok=Hi9sDs23',],
      },
      {
        fighters: ["Yoel Romero", "Anderson Silva"],
        match: "Middleweight Championship Bout",
        records: ["13-5-0","34-11-0" ],
        flags: ["Cuba","Brazil" ],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_matchup_stats_full_body/s3/2019-08/ROMERO_YOEL_L.png?VersionId=wTpI3pU1qOO6j9MpcQ0gLSbeOTXWtrrY&itok=m3oyIJCE', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2020-10/67302%252Fprofile-galery%252Ffullbodyright-picture%252FSILVA_ANDERSON_R_10-31.png?itok=TlJEp4ti',],
      },
      {
        fighters: ["Daniel Cormier", "Chuck Liddell"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2020-08/CORMIER_DANIEL_L_08-15.png?VersionId=X4Gimp.0zYGxx4haM_ASnymi8cEe4qNr&itok=EWrGvjtb', 'https://eadn-wc03-11125112.nxedge.io/wp-content/uploads/2022/04/chuckL-1-585x1024.png',],
      }
    ];
    
  
console.log(ufcCard)
console.log(ufcCard2)


  const ufcResults = ufcCard2.map((match, index) => ({
    fighters: match.fighters,
    // match: match.match,
    winner: eventInfo.fights[0].winner === "" || eventInfo.fights[index].winner === "N/A" ? null : eventInfo.fights[index].winner,
    method: eventInfo.fights[0].method === "" || eventInfo.fights[index].method === "N/A" ? null : eventInfo.fights[index].method,
    round: eventInfo.fights[0].round === "" || eventInfo.fights[index].round === "N/A" ? null : eventInfo.fights[index].round[0],

  }));
  console.log(ufcResults) 
  // Define a function to normalize the method values
// Define a function to normalize the method values
function normalizeMethod(method, winner) {
  if (method) {
    // Normalize the method to your desired format
    // For example, if you want to change "TKO/KO" to "KO/TKO":
    if (method === "KO/TKOKO/TKO" || method === "DQDQ" && winner !== null) {
      return "TKO/KO";
    }
    if (method === "Decision - UnanimousDecision - Unanimous" || method === "Decision - SplitDecision - Split" && winner !== null
     || method === "DECISION - MAJORITYDECISION - MAJORITY" && winner !== null ) {
      return "Decision";
    }
    if (method === "SubmissionSubmission") {
      return "Submission";
    }
    if ((method === "Decision - SplitDecision - Split" ||
        method === "OverturnedOverturned" ||
        method === "Could Not ContinueCould Not Continue"||
        method === "Decision - MajorityDecision - Majority" ||
        method === "DECISION - MAJORITYDECISION - MAJORITY" ) && (winner === "N/A" || winner === null)) {
      return "Draw/No-Contest";
    }
    

    // Add more conditionals to handle other variations if needed
  }


  return  method;
}

function checkWinner4drawNocontest(method, winner) {
  if (!winner) {
    if ((method === "Decision - SplitDecision - Split" || method === "OverturnedOverturned" || method === "Could Not ContinueCould Not Continue" 
    || method === "Decision - MajorityDecision - Majority") && (winner === "N/A" || winner === null)) {
      return 3;
    }
    else {
      if (winner === '1'){
        return 1
      }
      if (winner === '2'){
        return 2
      }
    }
  }
  return winner; // Return the original winner if conditions are not met
}



// Map over ufcResults and modify the method values
const modifiedUfcResults = ufcResults.map((result) => ({
  ...result,
  method: normalizeMethod(result.method, result.winner),
  winner: checkWinner4drawNocontest(result.method, result.winner)
  
}));
console.log(modifiedUfcResults)





  const [results, setResults] = useState([]);

  ////////put in app soon 
  console.log(results)
  console.log(ufcResults)


  // console.log(showDropdown)
  const [user, setUser] = useState(null);
  const [signUp, setSignUp] = useState(false)
  const handleSignupClick=() =>{
        setSignUp(!signUp)
    }


  function handleLogin(user) {
    setUser(user);
}
  function handleLogout(){
    setUser(null);
  }

  console.log(user)



  // const validationSchema = yup.object().shape({
  //   // userName: yup.string().required('Username is required'),
  //   // password: yup.string().required('Password is required'),
  //   predictions: yup.array().of(
  //     yup.object().shape({
  //       winner: yup.number()
  //               .oneOf([0, 1], 'Invalid winner selection'),
  //               // .required('Winner is required'),
  //       method: yup.string().required('Method of victory is required'),
  //     })
  //   ).required('At least one prediction is required'),
  // });

console.log(modifiedUfcResults)
//   const handleSubmit = async (e) => {
   

useEffect(() => {
  // Define the async function for form submission
  async function submitForm() {
    try {
      
      // Validate the form data using Yup
      

      // Check if every method in modifiedUfcResults is not null
      if (modifiedUfcResults) {
        // All methods are not null, proceed to submit as "AdminKev"
        const mainEvent = `${eventInfo.fights[0].redCornerName} vs ${eventInfo.fights[0].blueCornerName}`;
        const dataToSend = {
          owner: "AdminKev", // Set the owner to "AdminKev"
          location: 'AUTO-Server',
          mainEvent: mainEvent,
          predictions: modifiedUfcResults, // Use modifiedUfcResults here
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
  submitForm();
}, [modifiedUfcResults.length > 0]);

const [akp , setAKP] = useState('')
const [ countPick ,setPickCount] = useState(null)
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
       setPickCount(data.picks.length);
      if (Array.isArray(data.picks)) {
        const mainEventToFind = `${eventInfo.fights[0].redCornerName} vs ${eventInfo.fights[0].blueCornerName}`;
        console.log(mainEventToFind)
        const adminKevPick = data.picks.find(
          pick =>
            pick.owner === 'AdminKev' &&
            pick.location === 'AUTO-Server' &&
            pick.main_event === mainEventToFind
        );
    
        if (adminKevPick) {
          console.log('AdminKev Pick ID:', adminKevPick.id);
          setAKP(adminKevPick)
          // Do something with the pick ID
        } else {
          console.log('AdminKev pick not found.');
          // Handle the case where the pick is not found
        }
      }
    })
    
    .catch(error => {
      console.error('Error fetching results:', error);
      // Handle error as needed
    });
}, [eventInfo]);
console.log(akp)

useEffect(() => {

  // if (akp, modifiedUfcResults){


  if (isEqual(akp.predictions, modifiedUfcResults)) {
    console.log('matching');
  }
  if (!akp){
    console.log('loading yo yo')

  } 
  if (akp && !isEqual(akp.predictions, modifiedUfcResults)){
    console.log('ready for patch')
    //////////////////////////////////
    const dataToSend = {
      id: akp.id,
      owner: akp.owner ,
      location: akp.location,
      mainEvent: akp.main_event,
      predictions: modifiedUfcResults,
      user_id: akp.id || 4,
  };
  ////////////////////////////////////
    fetch(`https://off-therecordpicks.onrender.com/picks/${akp.id}`, {
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
}, [akp, modifiedUfcResults]);







// Check if eventInfo.locationCC is defined before splitting it
let locationInfo = [];
if (eventInfo && eventInfo.locationCC) {
  locationInfo = eventInfo.locationCC.split(', ').map(part => part.trim());
}

const locationcity = locationInfo[0];
const locationstate = locationInfo[1];
const location = locationInfo[locationInfo.length - 1];

// console.log(locationcity); // New York City
// console.log(locationstate); // New York
console.log(location); // United States




  return (
    <BrowserRouter>
     <div >
 



     <div style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'end', fontSize: '8px', width: '100%' }}>
  {user ? (
    <>
      <h1 className='color-gold'>Hello {user.fullname}{user.fullName}</h1>
      <button onClick={handleLogout} className="submitb" style={{ marginLeft: '10px', minWidth: '10%', padding:'2%',marginTop:'0%' }} type="submit">
        Log out
      </button>
    </>
  ) : (
    <p></p>
  )}
</div>

</div>
{user ? <NavBar ufcCard={ufcCard2} user={user} /> : <Johnny onLogin={handleLogin} onLogout={handleLogout} />}

    
   <Routes>
      <Route path="/"  element={<Home user={user} ufcCard={ufcCard2} stallUfcCard={ufcCard} locationCity={locationcity} location={location} BGpic={backgroundImageSrc} tapImage={tapImageSrc} countPick={countPick} />} />
       
      <Route path="/section1" element={<Johnny onLogin={handleLogin} onLogout={handleLogout} />} />
      
      <Route path="/section3" element={<Tommy user={user} ufcCard={ufcCard2} stallUfcCard={ufcCard} locationCity={locationcity} location={location}/>}/>
      <Route path="/results" element={<Results ufcResults={modifiedUfcResults} ufcCard={ufcCard2} user={user} />}/>
      
      <Route path="/about" element={<About/>}/>
      {/* <Route path="/comments" element={<CommentSection />}/> */}
       
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

