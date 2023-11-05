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
        backgroundImageSrc, location, 
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
      setEventInfo({ event_name, event_date, fights, records ,backgroundImageSrc, location,});
    } catch (error) { 
      console.error('Error:', error);
    }
  }   
      
  fetchData();      
}, []);      
console.log(eventInfo) 
const backgroundImageSrc = eventInfo.backgroundImageSrc
  
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
        fighters: ["Jon Jones", "Fedor Emelianenko"],
        match: "Heavyweight Championship Bout",
        records: ["30-1-0", "36-5-0"],
        flags: ["United States", "Russia"],
        fighterPics: ['https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2023-03/JONES_JON_L_BELT_03_04.png?itok=Y8Eh_69p', 'https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2021/10/fedor-emelianenko-bellator-269-17.jpg?w=800',],
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
    match: match.match,
    winner: eventInfo.fights[0].winner === "" || eventInfo.fights[index].winner === "N/A" ? null : eventInfo.fights[index].winner,
    method: eventInfo.fights[0].method === "" || eventInfo.fights[index].method === "N/A" ? null : eventInfo.fights[index].method,

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
    if (method === "Decision - UnanimousDecision - Unanimous" || method === "Decision - SplitDecision - Split" && winner !== null || method === "DECISION - MAJORITYDECISION - MAJORITY" && winner !== null ) {
      return "Decision";
    }
    if (method === "SubmissionSubmission") {
      return "Submission";
    }
    if ((method === "Decision - SplitDecision - Split" || method === "OverturnedOverturned" || method === "Could Not ContinueCould Not Continue"|| method === "Decision - MajorityDecision - Majority" ) && (winner === "N/A" || winner === null)) {
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



  const validationSchema = yup.object().shape({
    // userName: yup.string().required('Username is required'),
    // password: yup.string().required('Password is required'),
    predictions: yup.array().of(
      yup.object().shape({
        winner: yup.number()
                .oneOf([0, 1], 'Invalid winner selection'),
                // .required('Winner is required'),
        method: yup.string().required('Method of victory is required'),
      })
    ).required('At least one prediction is required'),
  });

console.log(modifiedUfcResults)
//   const handleSubmit = async (e) => {
   

//     try {
//         // Validate the form data using Yup
//         await validationSchema.validate({ modifiedUfcResults });

//         // Check if every method in modifiedUfcResults is not null
//         if (modifiedUfcResults.every(result => result.method !== null)) {
//             // All methods are not null, proceed to submit as "AdminKev"
//             const mainEvent = `${eventInfo.fights[0].redCornerName} vs ${eventInfo.fights[0].blueCornerName}`
//             const dataToSend = {
//                 owner: "AdminKev", // Set the owner to "AdminKev"
//                 location: 'AUTO-Server',
//                 mainEvent: mainEvent,
//                 predictions: modifiedUfcResults, // Use modifiedUfcResults here
//                 user_id: user.id || 2,
//             };

//             fetch('https://off-therecordpicks.onrender.com/submit-predictions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(dataToSend),
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     // setError(response);
//                     // console.error(error); // Use console.error to log errors
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Predictions submitted successfully:', data);
//                 // Perform any further actions here
//                 // setPredictions([]);
//                 // navigate('/results');
//             })
//             .catch(error => {
//                 console.error('Error submitting predictions:', error);
//                 // setError(error.message);
//                 // Handle error as needed
//             });
//         } else {
//             // If any method in modifiedUfcResults is null, show an error message
//             // setError("All methods must be provided.");
//         }
//     } catch (error) {
//         console.error('Validation error:', error.message);
//         // setErrors(error.message || []);
//         // Handle validation error messages, setErrors, etc.
//     }
// };
// handleSubmit()
useEffect(() => {
  // Define the async function for form submission
  async function submitForm() {
    try {
      
      // Validate the form data using Yup
      

      // Check if every method in modifiedUfcResults is not null
      if (modifiedUfcResults.every(result => result.method !== null)) {
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


const locationCity = ' Sao Paulo'
const location = 'Brazil' 



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
      <Route path="/"  element={<Home user={user} ufcCard={ufcCard2} stallUfcCard={ufcCard} locationCity={locationCity} location={location} BGpic={backgroundImageSrc} />} />
       
      <Route path="/section1" element={<Johnny onLogin={handleLogin} onLogout={handleLogout} />} />
      
      <Route path="/section3" element={<Tommy user={user} ufcCard={ufcCard2} stallUfcCard={ufcCard} locationCity={locationCity} location={location}/>}/>
      <Route path="/results" element={<Results ufcResults={modifiedUfcResults} ufcCard={ufcCard2} user={user} />}/>
      
      <Route path="/about" element={<About/>}/>
      {/* <Route path="/comments" element={<CommentSection />}/> */}
       
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

