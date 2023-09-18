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
  const ufcCard = [
    { fighters: ["Rafael Fiziev", "Mateusz Gamrot"], match: "155 lbs", records: ["12-2", "22-2"], flags: ["Azerbaijan", "Poland"] },
    { fighters: ["Bryce Mitchell", "Dan Ige"], match: "145 lbs", records: ["15-1", "17-6"], flags: ["United States", "United States"] },
    { fighters: ["Marina Rodriguez", "Michelle Waterson-Gomez"], match: "115 lbs", records: ["16-3-2", "18-11"], flags: ["Brazil", "United States"] },
    { fighters: ["Bryan Battle", "AJ Fletcher"], match: "170 lbs", records: ["9-2", "10-2"], flags: ["United States", "United States"] },
    { fighters: ["Charles Jourdain", "Ricardo Ramos"], match: "145 lbs", records: ["14-6-1", "16-4"], flags: ["Canada", "Brazil"] },
    { fighters: ["Dan Argueta", "Miles Johns"], match: "135 lbs", records: ["9-1", "13-2"], flags: ["United States", "United States"] },
    { fighters: ["Tim Means", "Andre Fialho"], match: "170 lbs", records: ["32-15-1", "16-7"], flags: ["United States", "Portugal"] },
    { fighters: ["Jacob Malkoun", "Cody Brundage"], match: "185 lbs", records: ["7-2", "8-5"], flags: ["Australia", "United States"] },
    { fighters: ["Jake Collier", "Mohammed Usman"], match: "265 lbs", records: ["13-9", "9-2"], flags: ["United States", "Nigeria"] },
    { fighters: ["Mizuki Inoue", "Hannah Goldy"], match: "115 lbs", records: ["14-6-0", "6-3-0"], flags: ["Japan", "United States"] },
    { fighters: ["Montserrat Rendon", "Tamires Vidal"], match: "135 lbs", records: ["5-0-0", "7-1-0"], flags: ["Mexico", "Brazil"] },
  ];
  
  

  
  const ufcResults = ufcCard.map((match) => ({
    fighters: match.fighters,
    match: match.match,
    winner: null,
    method: null,
  }));
  


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
{user ? <NavBar user={user} /> : <Johnny onLogin={handleLogin} onLogout={handleLogout} />}

    
   <Routes>
      <Route path="/" element={<Home user={user} />} />
       
      <Route path="/section1" element={<Johnny onLogin={handleLogin} onLogout={handleLogout} />} />
      
      <Route path="/section3" element={<Tommy ufcCard={ufcCard} user={user} />}/>
      <Route path="/results" element={<Results ufcResults={ufcResults} ufcCard={ufcCard} user={user}/>}/>
      
      <Route path="/about" element={<About/>}/>
      
       
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

