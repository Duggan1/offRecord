import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './App.css';
import './tailwind.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Elijah from './Elijah';
import Johnny from './Johnny';
import Header from './Header';
import Results from './Results';
import Tommy from './Tommy';
import TommyPFL from './TommyPFL';
import About from './About';
import axios from 'axios';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import Compare from './Compare';
import Leagues from './Leagues';
import LeagueInfo from './LeagueInfo';
import P4pHeader from './P4pHeader';
import Profile from './Profile';
import ProfileSettings from './ProfileSettings';
import LeagueAdjustments from './LeagueAdjustments';
// import CommentSection from './CommentSection';











function App() {
  const [showDropdown, setShowDropdown] = useState(false);



  const handleAppleClick = () => {
    setShowDropdown(!showDropdown);
  };
  // const PATHlocation = useLocation();
  // const { pathname } = PATHlocation;
  // console.log(pathname)


const [ufcCard2, setUfcCard2] = useState([]);
const [ufcCard3, setUfcCard3] = useState([]);
const [PFLCard, setPFLCard] = useState([]);
const [weRlivePFL , setweRlivePFL] = useState([]);
const [weRlive , setweRlive] = useState([]);
const [eventInfo, setEventInfo] = useState({});
const [tapI, setTapI] = useState('')
const [ufcI, setUfcI] = useState('')
const [lo1, setLo] = useState('')
const [lo2, setLo2] = useState('')
const [lo3, setLo3] = useState('')
const apiUrl = 'https://offtherecordcards.onrender.com/scrape-ufc-website';
const [liveFinishes, setLiveFinishes] = useState([]);
const [PFLEvents, setPFLEvents] = useState([]);

const apiUrlPFL = 'https://pfl-p4p.onrender.com/scrape-mma-websites';


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://off-therecordpicks.onrender.com/events');
      const data = await response.json();
      console.log(response.data);
      const EventNum = data.ufc_events.length - 1;
      const latestUfcEvent = data.ufc_events[EventNum] || [];
      
      const newUfcCard = latestUfcEvent.fights.map((fight, index) => {
        return {
          fighters: [fight.redCornerName, fight.blueCornerName],
          match: fight.weightClass,
          records: [fight.redCornerRecord, fight.blueCornerRecord],
          flags: [fight.redCornerCountry, fight.blueCornerCountry],
          fighterPics: [fight.redCornerImage, fight.blueCornerImage],
          odds: fight.odds
        };
      });

      setUfcEvents(latestUfcEvent);
      setUfcCard3(newUfcCard);
      setTapI(latestUfcEvent.tapImage);
      setUfcI(
        latestUfcEvent.backgroundImageSrc.startsWith("/s3/files/")
          ? "https://dmxg5wxfqgb4u.cloudfront.net/" + latestUfcEvent.backgroundImageSrc
          : latestUfcEvent.backgroundImageSrc
      );

      let locationInfo = [];
      locationInfo = latestUfcEvent.locationCC ? latestUfcEvent.locationCC.split(', ').map(part => part.trim()) : [];
      setLo(locationInfo[0]);
      setLo2(locationInfo[1]);
      setLo3(locationInfo[locationInfo.length - 1]);
      setLNmenow(latestUfcEvent.event_name);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []); // Empty dependency array, so it runs only once




useEffect(() => { 
  async function fetchData() {
    try {
      const response = await axios.get(apiUrlPFL)
      console.log(response.data);
      const { pflData, fighters, liveR
       } = response.data;

      const uniqueFighters = [...new Set(fighters.map(JSON.stringify))].map(JSON.parse);
      const updatedFighters = uniqueFighters.map((fighter, index) => {
        
        const corner = index % 2 === 0 ? 'Red Corner' : 'Blue Corner';

         return {
             ...fighter,
             corner,
         };
     });

     const associatedData = [];
     if (liveR && liveR[0]) {
         for (let i = 0; i < pflData.length - 1 ; i++) {
           const timeDetails1 = liveR[0][i]?.timeDetails; 
           const oddsDetails = liveR[0][i]?.odds;
     
             const fighter1Index = i * 2;
             const fighter2Index = fighter1Index + 1;
     
             const fighter1 = updatedFighters[fighter1Index];
             const fighter2 = updatedFighters[fighter2Index];
     
             const dataPair = {
                 timeDetails1,
                 fighter1,
                 fighter2,
             };
     
             associatedData.push(dataPair);
         }
         
         const sortedAssociatedData = associatedData.sort((a, b) => {
           // Assuming that pending results have an empty string for 'timeDetails1'
           const aIsPending = a.timeDetails1 === '';
           const bIsPending = b.timeDetails1 === '';
         
           if (aIsPending && !bIsPending) {
             return -1; // a comes before b
           } else if (!aIsPending && bIsPending) {
             return 1; // b comes before a
           } else {
             return 0; // leave them in the same order
           }
         });
         setweRlivePFL(sortedAssociatedData)}


     const updatedRecords = [];
 
     for (let i = 0; i < updatedFighters.length; i += 2) {
      const redFighter = updatedFighters[i];
      const blueFighter = updatedFighters[i + 1];
  
      const record = {
        fighterPics: [pflData[i / 2]?.leftImgSrc || '',pflData[i / 2 ]?.rightImgSrc || ''],
        fighters: [redFighter.name, blueFighter.name],
        flags:[pflData[i / 2]?.leftBackgroundImg || '',pflData[i / 2]?.rightBackgroundImg || ''],
        match:'',
        odds:liveR[0][i / 2]?.odds,
        records:[redFighter.record, blueFighter.record]

      };
  
      updatedRecords.push(record);
  }
  

      console.log(updatedRecords)
      setPFLCard(updatedRecords)
      console.log(pflData)
      console.log(liveR)






    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();
}, []); 
console.log(weRlivePFL)



useEffect(() => {
  async function submitPFLEvent() {
    try {
      // Example data to send in the POST request
      const recreatedFights = PFLCard.map((fight, index) => {
        return {
          weightClass: fight.match,
          redCornerName: fight.fighters[0],
          blueCornerName: fight.fighters[1],
          redCornerCountry: fight.flags[0].length > 1 ? fight.flags[0] : fight.flags2[0] ,
          blueCornerCountry: fight.flags[1].length > 1 ? fight.flags[1] : fight.flags2[1] ,
          redCornerRecord: fight.records[0] || ' ',
          blueCornerRecord: fight.records[1] || ' ',
          redCornerImage: fight.fighterPics[0],
          blueCornerImage: fight.fighterPics[1],
          // Add more properties as needed
          method: fight.method || ' ',  // Example placeholder
          round: fight.round || ' ', // Example placeholder
          winner: fight.winner || ' ',
          odds: fight.odds || ' ',
          // Example placeholder
        };
      });


      const dataToSend = {
        event_name: `${PFLCard[0].redCornerName} vs ${PFLCard[0].blueCornerName}`,
        locationCC: 'Saudi Arabia',
        backgroundImageSrc: 'https://pflmma-prod.s3.us-east-1.amazonaws.com/assets/img/base/superfights-logo.png',
        tapImage: 'https://images.tapology.com/poster_images/109606/profile/Screenshot.png?1707678498',
        // fights: eventInfo.fights,
        // records: eventInfo.records,
        fights: recreatedFights,
      };

      // Make a POST request to submit UFC event
      const postResponse = await axios.post('/submit-pfl-event', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (postResponse.status === 201) {
        // Handle success
        console.log('PFL event submitted successfully:', postResponse.data);
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
  submitPFLEvent();
}, [PFLCard ]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://off-therecordpicks.onrender.com/pfl-fights');
      const data = await response.json();
      console.log(data)
      const EventNum = data.pfl_events.length - 1
      console.log(data.pfl_events)
      setPFLEvents(data.pfl_events[EventNum] || []);
      console.log(EventNum)
      console.log(PFLEvents)
      const newUfcCard = PFLEvents.fights.map((fight, index) => {
        return {
            fighters: [fight.redCornerName, fight.blueCornerName],
            match: fight.weightClass || '',
            records: [fight.redCornerRecord, fight.blueCornerRecord],
            flags: [fight.redCornerCountry, fight.blueCornerCountry],
            fighterPics: [fight.redCornerImage, fight.blueCornerImage],
            odds: fight.odds  || ''

        };
    });

    // Faster!!!! need to Do!!!
    
    setPFLCard(newUfcCard);
    // setTapI(ufcEvents.tapImage)
    // setUfcI(ufcEvents.backgroundImageSrc.startsWith("/s3/files/")
    // ? "https://dmxg5wxfqgb4u.cloudfront.net/" + ufcEvents.backgroundImageSrc : ufcEvents.backgroundImageSrc )
    // let locationInfo = [];
    // locationInfo = ufcEvents.locationCC ? ufcEvents.locationCC.split(', ').map(part => part.trim()) : [];
    // setLo(locationInfo[0])
    // setLo2(locationInfo[1])
    // setLo3(locationInfo[locationInfo.length - 1])
    // setLNmenow(ufcEvents.event_name)

  } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://off-therecordpicks.onrender.com/events');
//       const data = await response.json();
//       console.log(data)
//       const EventNum = data.ufc_events.length - 1;
//       const latestUfcEvent = data.ufc_events[EventNum] || [];
      
//       const newUfcCard = latestUfcEvent.fights.map((fight, index) => {
//         return {
//             fighters: [fight.redCornerName, fight.blueCornerName],
//             match: fight.weightClass || '',
//             records: [fight.redCornerRecord, fight.blueCornerRecord],
//             flags: [fight.redCornerCountry, fight.blueCornerCountry],
//             fighterPics: [fight.redCornerImage, fight.blueCornerImage],
//             odds: fight.odds  || ''

//         };
//     });

//     // Faster por favor!!!! need to Do!!!
    
//     setUfcCard3(newUfcCard);
   

//   } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);



















useEffect(() => { 
  async function fetchData() {
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data) 
 
      const { event_name, event_date,fights, records,
        backgroundImageSrc, location, locationCC, tapImage, fighters, liveR
       } = response.data;

       const uniqueFighters = [...new Set(fighters.map(JSON.stringify))].map(JSON.parse);
       const updatedFighters = uniqueFighters.map((fighter, index) => {
         const corner = index % 2 === 0 ? 'Red Corner' : 'Blue Corner';

         return {
             ...fighter,
             corner,
         };
     });
     // Assuming you have the `updatedFighters` array
    const uniqueFinishes = new Set();

    // Iterate through each record and add it to the Set if it's not a duplicate
    records.forEach(record => {
      if (record.timeDetails && !uniqueFinishes.has(record.timeDetails)) {
        uniqueFinishes.add(record.timeDetails);
        // Process the record or store it as needed
        console.log(record.timeDetails);
      }
    });
    setLiveFinishes(uniqueFinishes)
    // console.log(uniqueFinishes)
    // console.log(liveR[0][0].timeDetails)
    // console.log(updatedFighters)
    const associatedData = [];
if (liveR && liveR[0]) {
    for (let i = 0; i < fights.length ; i++) {
      const timeDetails1 = liveR[0][i]?.timeDetails; 
      const oddsDetails = liveR[0][i]?.odds;

        const fighter1Index = i * 2;
        const fighter2Index = fighter1Index + 1;

        const fighter1 = updatedFighters[fighter1Index];
        const fighter2 = updatedFighters[fighter2Index];

        const dataPair = {
            timeDetails1,
            fighter1,
            fighter2,
        };

        associatedData.push(dataPair);
    }
    
    const sortedAssociatedData = associatedData.sort((a, b) => {
      // Assuming that pending results have an empty string for 'timeDetails1'
      const aIsPending = a.timeDetails1 === '';
      const bIsPending = b.timeDetails1 === '';
    
      if (aIsPending && !bIsPending) {
        return -1; // a comes before b
      } else if (!aIsPending && bIsPending) {
        return 1; // b comes before a
      } else {
        return 0; // leave them in the same order
      }
    });
    setweRlive(sortedAssociatedData)


}
console.log(associatedData);
/////////////////////////////////////
       const updatedRecords = [];
 
       for (let i = 0; i < updatedFighters.length; i += 2) {
           const redFighter = updatedFighters[i];
           const blueFighter = updatedFighters[i + 1];
 
           const record = {
               redCornerName: redFighter.name,
               redCornerRecord: redFighter.record,
               blueCornerName: blueFighter.name,
               blueCornerRecord: blueFighter.record,
           };
 
           updatedRecords.push(record);
       }
 


      console.log(updatedRecords.length)
      console.log(fights)
      console.log(records)
      const newUfcCard = fights.map((fight, index) => {
        return {
            fighters: [fight.redCornerName, fight.blueCornerName],
            match: fight.weightClass,
            records: [records[index]?.redCornerRecord, records[index]?.blueCornerRecord],
            flags: [fight.redCornerCountry, fight.blueCornerCountry],
            flags2: [records[index]?.redCornerFlag ,  records[index]?.blueCornerFlag],
            fighterPics: [fight.redCornerImage, fight.blueCornerImage],
            winner: fight.winner,
            method: fight.method,
            round: fight.round,
            odds: liveR && liveR[0] && liveR[0][index] && liveR[0][index].odds, // Perform null and undefined checks
            liveResults: liveR && liveR[0] && liveR[0][index] && liveR[0][index].timeDetails, 

        };
    });

    console.log(newUfcCard)
    // Update state with the ufcCard
    setUfcCard2(newUfcCard);
 
     
// Now, `updatedRecords` will have the same structure as `records`


      // Update state with the scraped data
      setEventInfo({ event_name, event_date, fights, records ,backgroundImageSrc, location, locationCC, tapImage, });
      /////////////////////////////
      // imgs & location
      setTapI(tapImage)
      setUfcI(backgroundImageSrc)
      let locationInfo = [];
        // if (locationCC) {
      locationInfo = locationCC ? locationCC.split(', ').map(part => part.trim()) : [];
        // }
      setLo(locationInfo[0])
      setLo2(locationInfo[1])
      setLo3(locationInfo[locationInfo.length - 1])



    } catch (error) { 
      console.error('Error:', error);
    }
  }   
      
  fetchData();      
}, []);  


const [ufcEvents, setUfcEvents] = useState([]);
const [LNmenow, setLNmenow] = useState('Loading');
// const LNmenow = eventInfo ? eventInfo.event_name : 'Loading'



console.log(ufcEvents !== null)
console.log(eventInfo)
console.log(ufcEvents)
console.log(ufcCard2)
console.log(ufcCard3)
useEffect(() => {
  async function submitUfcEvent() {
    try {
      // Example data to send in the POST request
      const recreatedFights = ufcCard2.map((fight, index) => {
        return {
          weightClass: fight.match,
          redCornerName: fight.fighters[0],
          blueCornerName: fight.fighters[1],
          redCornerCountry: fight.flags[0].length > 1 ? fight.flags[0] : fight.flags2[0] ,
          blue_corner_country: fight.flags[1].length > 1 ? fight.flags[1] : fight.flags2[1] ,
          redCornerRecord: fight.records[0] || ' ',
          blueCornerRecord: fight.records[1] || ' ',
          redCornerImage: fight.fighterPics[0],
          blueCornerImage: fight.fighterPics[1],
          // Add more properties as needed
          method: fight.method, // Example placeholder
          round: fight.round, // Example placeholder
          winner: fight.winner,
          odds: fight.odds,
          // Example placeholder
        };
      });


      const dataToSend = {
        event_name: eventInfo.event_name,
        locationCC: eventInfo.locationCC,
        backgroundImageSrc: eventInfo.backgroundImageSrc,
        tapImage: eventInfo.tapImage,
        // fights: eventInfo.fights,
        // records: eventInfo.records,
        fights: recreatedFights,
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
}, [eventInfo.event_name !== null]);

console.log(eventInfo)
const patchEvent = () => {

  const recreatedFights = ufcCard2.map((fight, index) => {



    return {
      weight_class: fight.match,
      red_corner_name: fight.fighters[0],
      blue_corner_name: fight.fighters[1],
      red_corner_country: fight.flags[0] && fight.flags[0].length > 1 ? fight.flags[0] : (fight.flags2[0] && fight.flags2[0].length > 1 ? fight.flags2[0] : ' '),
      blue_corner_country: fight.flags[1] && fight.flags[1].length > 1 ? fight.flags[1] : (fight.flags2[1] && fight.flags2[1].length > 1 ? fight.flags2[1] : ' '),      
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
    event_name: eventInfo.event_name,
    locationCC: eventInfo.locationCC,
    backgroundImageSrc: eventInfo.backgroundImageSrc,
    tapImage: eventInfo.tapImage,
    fights: recreatedFights,
  };
  console.log(dataToSend)

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

console.log(ufcCard2)
console.log(ufcCard3)


useEffect(() => {
  // Check if ufcCard2 and ufcCard3 are both loaded
  if (ufcCard2 && ufcCard3) {
    // Check if the details do not match for any fight
    const detailsDoNotMatch = ufcCard2.some((fight, index) => {
      const ufcCard3Fight = ufcCard3[index];

      if (!ufcCard3Fight) {
        console.log(`ufcCard3Fight is undefined for index: ${index}`);
        return true; // or handle the case where ufcCard3Fight is undefined
      }

      // Compare relevant properties within each fight for ufcCard2 and ufcCard3

      const backgroundImageSrcComparison = eventInfo.backgroundImageSrc === ufcEvents.backgroundImageSrc;
      const tapImageComparison = eventInfo.tapImage === ufcEvents.tapImage;
      const locationCCComparison = eventInfo.locationCC === ufcEvents.locationCC;
      const event_nameComparison = eventInfo.event_name === ufcEvents.event_name;

      const matchComparison = fight.match === ufcCard3Fight.match;

      const oddsComparison = fight.odds === ufcCard3Fight.odds;

      const recordsComparison = fight.records[0] === ufcCard3Fight.records[0] && fight.records[1] === ufcCard3Fight.records[1];

      const flagComparison = fight.flags[0].length > 1 && fight.flags[1].length > 1

      console.log(`Fight ${index + 1} - Match Comparison: ${matchComparison}`);
      console.log(`Fight ${index + 1} - Records Comparison: ${recordsComparison}`);

      return !(matchComparison && recordsComparison && oddsComparison && flagComparison && backgroundImageSrcComparison && tapImageComparison && locationCCComparison && event_nameComparison );
    });

    if (detailsDoNotMatch) {
      // Details do not match, ready to patch ufcEvent
      console.log('Details do not match! Ready to patch ufcEvent');
      //////////////////////////////////
      patchEvent();
    } else {
      // The details, including fights, match
      console.log('Details match!');
      console.log(ufcCard2)
    }
  }
}, [ufcCard3.length > 3 && ufcCard2.length > 3 ]);














  ///move out of App
  const ufcCard = [

      {
        fighters: ["Jon Jones", "Francis Ngannou"],
        match: "Heavyweight Championship Bout",
        records: ["30-1-0", "17-3-0"],
        flags: ["United States", "Cameroon"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-03/JONES_JON_L_BELT_03_04.png?itok=Y8Eh_69p',
         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-03/67964%252Fprofile-galery%252Ffullbodyright-picture%252FNGANNOU_FRANCIS_R_03-27.png?itok=E8A9RaUa',],
      }
      ,{
        fighters: ["Belal Muhammad", "Georges St-Pierre"],
        match: "Welterweight Championship Bout",
        records: ["19-1-0", "26-2-0"],
        flags: ["Palestine", "Canada"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-05/MUHAMMAD_BELAL_L_05-06.png?itok=i3X9IYq7', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fighter-container/68009/profile-galery/fullbodyleft-picture/Georges-St-Pierre_318_LeftFullBodyImage.png?itok=Hi9sDs23',],
      },
      {
        fighters: ["Alexander Volkanovski", "Conor McGregor"],
        match: "Featherweight Championship Bout",
        records: ["24-1-0","22-5-0" ],
        flags: ["Australia", "Ireland"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-07/VOLKANOVSKI_ALEXANDER_L_BELT_07-08.png?itok=rrdc9sM9', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-07/67667%252Fprofile-galery%252Ffullbodyright-picture%252FMCGREGOR_CONOR_R_07-10.png?itok=gL8I_tyo',],
      },
      {
        fighters: ["Khabib Nurmagomedov", "Islam"],
        match: "Lightweight Championship Bout",
        records: ["29-0-0", "16-14-2"],
        flags: ["Russia", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_matchup_stats_full_body/s3/image/fighter_images/Khabib_Nurmagomedov/1NURMAGOMEDOV_KHABIB_L.png?itok=czY7iR8-', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_matchup_stats_full_body/s3/2024-01/MAKHACHEV_ISLAM_BELT_R_10-21.png?itok=kS_KXIU2',],
      },
      {
        fighters: ["NATE", "NICK Diaz"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-02/DIAZ_NATE_L_09-10.png?itok=1GsE4yRS',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-11/DIAZ_NICK_R_09-25.png?itok=aoe74wGt',],
      } ,
      
      {
        fighters: ["Yoel Romero", "Anderson Silva"],
        match: "Middleweight Championship Bout",
        records: ["13-5-0","34-11-0" ],
        flags: ["Cuba","Brazil" ],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_matchup_stats_full_body/s3/2019-08/ROMERO_YOEL_L.png?VersionId=wTpI3pU1qOO6j9MpcQ0gLSbeOTXWtrrY&itok=m3oyIJCE', 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2020-10/67302%252Fprofile-galery%252Ffullbodyright-picture%252FSILVA_ANDERSON_R_10-31.png?itok=TlJEp4ti',],
      }
      ,
      {
        fighters: ["Jose Aldo", "Clay Guida "],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/d44b164d-b5ae-4594-959e-12a7d6343803%252FALDO_JOSE_L_12-04.png?itok=J0vKBt4n',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-06/GUIDA_CLAY_R_04-15.png?itok=6cgjVsTN',],
      } ,
      
      {
        fighters: ["Brock Lesner", "Stipe "],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fighter-container/67517/profile-galery/fullbodyleft-picture/Brock-Lesnar_548_LeftFullBodyImage.png?VersionId=.CZid9QN_ks9i7rARwM5Pd51IY3mwBc8&itok=i1mOQw43',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_matchup_stats_full_body/s3/2019-08/MIOCIC_STIPE_R.png?VersionId=gd_SnJ2wk3_BxWkuOwmr92pp028.w_8h&itok=TdtAGSuZ',],
      }   ,
      {
        fighters: ["Anthony Johnson", "JOrge Masvidal"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fighter-container/67359/profile-galery/fullbodyleft-picture/Anthony-Johnson_501_LeftFullBodyImage.png?VersionId=Ghml_r3SHEUV8mSGO3NbQSymR82cM.KJ&itok=nDLx9ojc',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-04/MASVIDAL_JORGE_R_04-08.png?itok=wVAws_LB',],
      }   ,
      {
        fighters: ["izzy", "Poatan"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-09/ADESANYA_ISRAEL_L_04-08.png?itok=gIhiG7zY',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-01/PEREIRA_ALEX_R_BELT_04-08.png?itok=D3MMVdow',],
      }   ,
      
      {
      
        fighters: ["Charles DO BRONX Oliveria ", "Khamzhat "],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-06/OLIVEIRA_CHARLES_L_06-10.png?itok=VPfDbyu9',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-10/71660%252Fprofile-galery%252Ffullbodyright-picture%252FCHIMAEV_KHAMZAT_R_10-30.png?itok=vBiGaKoz',],
      }
      ,
      
      {
      
        fighters: ["Derrick Lewis ", "Cowboy"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2024-01/LEWIS_DERRICK_L_11-04.png?itok=V8IV5cq2',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2021-05/67844%252Fprofile-galery%252Ffullbodyright-picture%252FCERRONE_DONALD_R_05-08.png?itok=v_85X6do',],
      },
      
      {
      
        fighters: ["Anthony Pettis", "Frankie Edgar"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2019-08/PETTIS_ANTHONY_L_0.png?VersionId=5.cy9oUi2OZvVHaXPccGKKv2xD3huZm8&itok=bsXSeAnf',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/44bed95d-2b1b-4bde-9686-3cebfe75a4fa%252FEDGAR_FRANKIE_R_11-06.png?itok=8JXAMuWN',],
      },
      
      {
        fighters: ["Mauricio Shogun Rua", "Gegard Mousasi"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2018-10/RUA_SHOGUN_L_0.png?itok=IQIPtISx',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/99ea9934-5ea2-4532-89b4-865243dc5ede%252FGegard-Mousasi_241929_RightFullBodyImage.png?itok=JN-iTDHv',],
      },
      {
        fighters: ["Dominick Cruz","Sean O'Malley"  ],
        match: "Bantamweight Championship Bout",
        records: ["23-3-0","15-1-0" ],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/7a064993-dfca-4c8e-aca4-8268fc6e711b%252FCRUZ_DOMINICK_L_12-11.png?itok=hInQ4zAq','https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-08/OMALLEY_SEAN_R_08-19.png?itok=eZovmDJG', ],
      },
      
      {
      
        fighters: ["Cain", "DC"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/image/ufc-fighter-container/67538/profile-galery/fullbodyleft-picture/Cain-Velasquez_899_LeftFullBodyImage.png?VersionId=RHMJaNxVQgvxL2xWew0TJDxqGdrh3npm&itok=-6Mp1zxm',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2020-08/CORMIER_DANIEL_R_08-15.png?VersionId=sEce7RCW7EdH_c8o_PQKIkhR5yb1D5YX&itok=xVtBANWq',],
      },
      
      {
      
        fighters: ["CODY", "MAX"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-12/GARBRANDT_CODY_L_12-16.png?itok=-lRLd7_3',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-06/HOLLOWAY_MAX_R_04-15.png?itok=KaRXBZAd',],
      }
      , {
      
        fighters: ["TONY", "ROB"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-12/FERGUSON_TONY_L_12-16.png?itok=sETe3UzJ',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-09/WHITTAKER_ROBERT_R_09-03.png?itok=N6p8U8R5',],
      },{
        fighters: ["Demetrius Johnson", "Brandon Moreno"],
        match: "Flyweight Championship Bout",
        records: ["30-3-1", "19-5-2"],
        flags: ["United States", "Mexico"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2018-10/JOHNSON_DEMETRIOUS_L.png?VersionId=G0_mNHlnlWHbCJpUDDHsX1poESQCIfI2&itok=r_oiMkoC',
         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/9c4e751d-a7bb-45bf-81bb-5c57b661b325%252FMORENO_BRANDON_R_06-12.png?itok=-XuWENTW',],
      },
      
      {
      
        fighters: ["FABER", "ANDRE"],
        match: "Light Heavyweight Championship Bout",
        records: ["22-3-0", "21-9-0"],
        flags: ["United States", "United States"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2019-07/FABER_URIJAH_L.png?VersionId=t70Jgq2xFpluEYBCt0bqsLtsOP3e.0Go&itok=N8JBx6qT',
                         'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-06/ARLOVSKI_ANDREI_R_06-03.png?itok=qcdNwYum',],
      }
      
      
     
    ]; ///FOR ADDING MORE BELOW LOADING LANDING PAGE
    // {
      
    //   fighters: ["", ""],
    //   match: "Light Heavyweight Championship Bout",
    //   records: ["22-3-0", "21-9-0"],
    //   flags: ["United States", "United States"],
    //   fighterPics: ['',
    //                    '',],
    // }
    // ,
    // ZABIT-RIGHT--https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2019-02/MAGOMEDSHARIPOV_ZABIT_R.png?VersionId=02bDgVdXFuELslgoOLV.Eu9K95Qumr99&itok=Yokvv_Az
    // 

console.log(ufcCard)
console.log(ufcCard2)


  const ufcResults = ufcCard2.map((match, index) => ({
    fighters: match.fighters,
    // match: match.match,
    winner: eventInfo.fights[0].winner === "" || eventInfo.fights[index].winner === "N/A" ? null : eventInfo.fights[index].winner,
    method: eventInfo.fights[0].method === "" || eventInfo.fights[index].method === "N/A" ? null : eventInfo.fights[index].method,
    round: eventInfo.fights[0].round === "" || eventInfo.fights[index].round === "N/A" ? null : eventInfo.fights[index].round[0],

  }));

//   const pflResults = PFLCard.map((match, index) => {
//     if (PFLEvents && PFLEvents.fights) {
//         return {
//             fighters: match.fighters,
//             winner: PFLEvents.fights[0]?.winner === " " || PFLEvents.fights[index]?.winner === "N/A" || PFLEvents.fights[index]?.winner === null ? null : PFLEvents.fights[index].winner,
//             method: PFLEvents.fights[0]?.method === " " || PFLEvents.fights[index]?.method === "N/A" || PFLEvents.fights[index]?.method === null ? null : PFLEvents.fights[index].method,
//             round: PFLEvents.fights[0]?.round === " " || PFLEvents.fights[index]?.round === "N/A" || PFLEvents.fights[index]?.round === null ? null : PFLEvents.fights[index].round[0],
//         };
//     } else {
//         // Handle the case when PFLEvents or PFLEvents.fights is undefined
//         return {
//             fighters: match.fighters,
//             winner: null,
//             method: null,
//             round: null,
//         };
//     }
// });

  
//   console.log(ufcResults) 
//   console.log(pflResults)
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
      if (winner == '1'){
        return 1
      }
      if (winner == '2'){
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

// const modifiedPFLResults = Results.map((result) => ({
//   ...result,
//   method: normalizeMethod(result.method, result.winner),
//   winner: checkWinner4drawNocontest(result.method, result.winner)
  
// }));
console.log(ufcResults)
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
const [results2, setResults2] = useState([]);
const [adminKevPicks, setAdminKevPicks] = useState({});
const [adminKevPickswID, setAdminKevPickswID] = useState({});


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
       ///////////////////////////////////
       ///////////////////////////////////
       setResults2(data.picks);
        const filteredResults = data.picks.filter(result => result.owner !== 'AdminKev');
          setResults2(filteredResults);
          const filteredAKPwID = data.picks.filter(result => result.owner === 'AdminKev');
          setAdminKevPickswID(filteredAKPwID)
          console.log(filteredResults)
          data.picks.forEach(result => {
            if (result.owner === 'AdminKev' && result.predictions.length > 0) {
              setAdminKevPicks(picks => ({
                ...picks,
                [result.main_event]: result.predictions
              }));
            }
          });


/////////////////////////////////////////////
////////////////////////////////////////////////
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
const liveNready = weRlive ? transformData(weRlive) : [];

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

useEffect(() => {

  // if (akp, modifiedUfcResults){


  if (areArraysEqual(akp.predictions, liveNready))  {
    console.log('matching');

    console.log(modifiedUfcResults)
    console.log(akp.predictions)
    console.log(weRlive)
    console.log(liveNready)
  }
  if (!akp){
    console.log('loading yo yo')

  } 
  if (akp && !isEqual(akp.predictions, liveNready)){
    console.log('ready for patch')
    //////////////////////////////////
    const dataToSend = {
      id: akp.id,
      owner: akp.owner ,
      location: akp.location,
      mainEvent: akp.main_event,
      predictions: liveNready,
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
}, [akp, liveNready]);
console.log(akp)
console.log(ufcCard3)



console.log(eventInfo) 
const PreLeonColby =  ('' + ufcEvents.backgroundImageSrc)
const backgroundImageSrc = eventInfo.backgroundImageSrc
const mewtwo = eventInfo.event_name
const tapImageSrc = eventInfo.tapImage
// console.log()
console.log(backgroundImageSrc) 
console.log(tapImageSrc) 
  

// Check if eventInfo.locationCC is defined before splitting it
let locationInfo = [];
if (eventInfo && eventInfo.locationCC) {
  locationInfo = eventInfo.locationCC.split(', ').map(part => part.trim());
}

const locationcity = locationInfo[0]; // Lav Vegas
const locationstate = locationInfo[1]; // Nevada 
const location = locationInfo[locationInfo.length - 1];// United States


const menow = ufcCard3.length > 2 ?  ufcCard3[0].fighters.join(' vs ') : 'LOADING';



console.log(menow)
console.log(eventInfo)
console.log(ufcEvents)
console.log(locationInfo.length)
console.log(location); 
console.log(liveFinishes)
console.log(weRlive)

console.log(tapI)
console.log(tapImageSrc)

console.log(user)
console.log(results2)
const [isOwnerAndEventMatch, setIsOwnerAndEventMatch] = useState(false);
const checkConditions = () => {
  const eventToCheck = ufcCard3.length > 2 ?  ufcCard3[0].fighters.join(' vs ') : 'LOADING';

  if (user) {
    const matchingResult = results2.find(
      (result) => result.owner === user.username && result.main_event === eventToCheck
    );

    setIsOwnerAndEventMatch(matchingResult || false); // Set to false if no match found
  }
};
const [isOwnerAndEventMatchPFL, setIsOwnerAndEventMatchPFL] = useState(false);
const checkConditionsPFL = () => {
  const eventToCheck = PFLCard.length > 2 ?  PFLCard[0].fighters.join(' vs ') : 'LOADING';

  if (user) {
    const matchingResult = results2.find(
      (result) => result.owner === user.username && result.main_event === eventToCheck
    );

    setIsOwnerAndEventMatchPFL(matchingResult || false); // Set to false if no match found
  }
};



useEffect(() => {
  checkConditions()

}, [user]);

console.log(isOwnerAndEventMatch)

const [justSubmitted, setjustSubmitted] = useState('');
console.log(justSubmitted)

const [leagueName ,setLeagueName] = useState('')
const setLN =(leagueN)=>{
  setLeagueName(leagueN)
}
console.log(leagueName)

const [leagues, setLeagues] = useState([])

        useEffect(() => {
        fetch('https://off-therecordpicks.onrender.com/leagues')
        .then(response => response.json())
        .then(data => setLeagues(data.leagues))
        .catch(error => console.error('Error fetching data:', error));
      }, []); 
      console.log(leagues)

      console.log(tapI)
////////////////////////////////////////////////////////////





  return (
    <BrowserRouter>
     
          {/* {user ?
              <Header handleLogout={handleLogout} user={user} ufcCard={ufcCard3} />
          : <Johnny onLogin={handleLogin} onLogout={handleLogout} ufcCard={ufcCard3} />} */}

    
   <Routes>
     <Route path="/newlook" element={<P4pHeader onLogout={handleLogout} />} />


      <Route path="/"  element={<Home user={user} ufcCard={ufcCard3} isOwnerAndEventMatch={isOwnerAndEventMatch}
                                      stallUfcCard={ufcCard} locationCity={lo1} state={lo2} weRlive={weRlive} LNmenow={LNmenow}
                                      location={lo3} BGpic={ufcI} tapImage={tapI} countPick={countPick} onLogout={handleLogout}  />} />
       
      <Route path="/section1" element={<Johnny onLogin={handleLogin} onLogout={handleLogout} />} />

      <Route path="/leagues"  element={<Leagues setLN={setLN} appLeagues={leagues} user={user} onLogout={handleLogout} />} />
      
      <Route path="/leagues/deatils" element={<LeagueInfo user={user} leagueName={leagueName} appLeagues={leagues} isOwnerAndEventMatch={isOwnerAndEventMatch} ufcResults={modifiedUfcResults}  weRlive={weRlive} results2={results2} menow={menow} tapImage={tapI} onLogout={handleLogout} />} />
      <Route path="/leagues/adjustments" element={<LeagueAdjustments user={user} leagueName={leagueName} appLeagues={leagues} isOwnerAndEventMatch={isOwnerAndEventMatch} ufcResults={modifiedUfcResults}  weRlive={weRlive} results2={results2} menow={menow} tapImage={tapI} onLogout={handleLogout} />} />

     
      
      <Route path="/section3" element={<Tommy user={user} ufcCard={ufcCard3} isOwnerAndEventMatch={isOwnerAndEventMatch} setjustSubmitted={setjustSubmitted}
                                              stallUfcCard={ufcCard} locationCity={lo1} location={lo3} state={lo2} weRlive={weRlive} onLogout={handleLogout} BGpic={ufcI} tapImage={tapI} mewtwo={mewtwo} />}/>

      <Route path="/pfl" element={<TommyPFL user={user} ufcCard={PFLCard} isOwnerAndEventMatch={isOwnerAndEventMatchPFL} setjustSubmitted={setjustSubmitted} PFLEvents={PFLEvents}
                                              stallUfcCard={ufcCard} locationCity={lo1} location={lo3} state={lo2} weRlive={weRlivePFL} adminKevPicks2={adminKevPicks}  onLogout={handleLogout} BGpic={ufcI} adminKevPickswID={adminKevPickswID}  tapImage={tapI} mewtwo={mewtwo} />}/>


      <Route path="/results" element={<Results ufcResults={modifiedUfcResults} ufcCard={ufcCard3} user={user} adminKevPicks2={adminKevPicks} results2={results2} 
                                                weRlive={weRlive} justSubmitted={justSubmitted} onLogout={handleLogout} />}/>
      <Route path="/results/Compare" element={<Compare ufcResults={modifiedUfcResults} ufcCard={ufcCard3} user={user} adminKevPicks2={adminKevPicks} results2={results2} liveFinishes={liveFinishes} onLogout={handleLogout} />}/>
      
      
      <Route path="/about" element={<About user={user} onLogout={handleLogout} />}/>

      <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} ufcResults={modifiedUfcResults}  results2={results2} adminKevPicks2={adminKevPicks} />}/>
      <Route path="/profile/settings" element={<ProfileSettings user={user} onLogout={handleLogout} />}/>
      {/* <Route path="/comments" element={<CommentSection />}/> */}


      {/* <Route path="/pools" element={<Pools />}/> */}
       
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

