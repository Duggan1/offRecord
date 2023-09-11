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


  const ufcCard = [
    { fighters: ["Valentina Shevchenko", "Alexa Grasso"], match: "125 lbs", records: ["23-4", "16-3"], flags: ["Kyrgyzstan", "Mexico"] },
    { fighters: ["Kevin Holland", "Jack Della Maddalena"], match: "170 lbs", records: ["25-9", "15-2"], flags: ["United States", "Australia"] },
    { fighters: ["Raul Rosas Jr.", "Terrence Mitchell"], match: "135 lbs", records: ["7-1", "14-3"], flags: ["Mexico", "United States"] },
    { fighters: ["Daniel Zellhuber", "Christos Giagos"], match: "155 lbs", records: ["13-1", "20-10"], flags: ["Mexico", "United States"] },
    { fighters: ["Fernando Padilla", "Kyle Nelson"], match: "145 lbs", records: ["15-4", "14-5-1"], flags: ["Mexico", "Canada"] },
    { fighters: ["Lupita Godinez", "Elise Reed"], match: "115 lbs", records: ["10-3", "7-3"], flags: ["Mexico", "United States"] },
    { fighters: ["Roman Kopylov", "Josh Fremd"], match: "185 lbs", records: ["11-2", "11-4"], flags: ["Russia", "United States"] },
    { fighters: ["Edgar Cháirez", "Daniel Lacerda"], match: "125 lbs", records: ["10-5", "11-5"], flags: ["Mexico", "Brazil"] },
    { fighters: ["Tracy Cortez", "Jasmine Jasudavicius"], match: "125 lbs", records: ["10-1", "9-2"], flags: ["United States", "Canada"] },
    { fighters: ["Charlie Campbell", "Alex Reyes"], match: "155 lbs", records: ["7-2", "13-3"], flags: ["United States", "United States"] },
    { fighters: ["Josefine Knutsson", "Marnic Mann"], match: "115 lbs", records: ["6-0", "6-1"], flags: ["Sweden", "United States"] },
  ];
  
  






  
  const ufcResults = [
    { fighters: ["Valentina Shevchenko", "Alexa Grasso"], match: "125 lbs", winner: null, method: null },
    { fighters: ["Kevin Holland", "Jack Della Maddalena"], match: "170 lbs", winner: null, method: null },
    { fighters: ["Raul Rosas Jr.", "Terrence Mitchell"], match: "135 lbs", winner: null, method: null },
    { fighters: ["Daniel Zellhuber", "Christos Giagos"], match: "155 lbs", winner: null, method: null },
    { fighters: ["Fernando Padilla", "Kyle Nelson"], match: "145 lbs", winner: null, method: null },
    { fighters: ["Lupita Godinez", "Elise Reed"], match: "115 lbs", winner: null, method: null },
    { fighters: ["Roman Kopylov", "Josh Fremd"], match: "185 lbs", winner: null, method: null },
    { fighters: ["Edgar Cháirez", "Daniel Lacerda"], match: "125 lbs", winner: null, method: null },
    { fighters: ["Tracy Cortez", "Jasmine Jasudavicius"], match: "125 lbs", winner: null, method: null },
    { fighters: ["Charlie Campbell", "Alex Reyes"], match: "155 lbs", winner: null, method: null },
    { fighters: ["Josefine Knutsson", "Marnic Mann"], match: "115 lbs", winner: null, method: null },
  ];
  


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
     <div className="blackBB">
     <h1  style={{
  textAlign: 'center',
  marginTop: '0%',
  color: 'lightyellow',
  textShadow: '0px 0px 15px purple',
  fontSize:'55px',
  maxWidth: '100%'
   // Adjust this value as needed
}}>
  Off Record Picks
</h1>




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
      <Route path="/" element={<Home/>} />
       
      <Route path="/section1" element={<Johnny onLogin={handleLogin} onLogout={handleLogout} />} />
      
      <Route path="/section3" element={<Tommy ufcCard={ufcCard} user={user} />}/>
      <Route path="/results" element={<Results ufcResults={ufcResults} ufcCard={ufcCard} user={user}/>}/>
      
      <Route path="/about" element={<About/>}/>
      
       
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

