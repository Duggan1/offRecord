import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Elijah from './Elijah';
import Johnny from './Johnny';
import Results from './Results';
import Tommy from './Tommy';
import Payment from './Payment';








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
    { fighters: ["Israel Adesanya", "Sean Strickland"], match: "185 lbs", records: ["24-2-0", "27-5-0"], flags: ["Nigeria", "United States"] },
    { fighters: ["Tai Tuivasa", "Alexander Volkov"], match: "265 lbs", records: ["15-5-0", "36-10-0"], flags: ["Australia", "Russia"] },
    { fighters: ["Manel Kape", "Felipe dos Santos"], match: "125 lbs", records: ["18-6-0", "7-0-0"], flags: ["Portugal", "Brazil"] },
    { fighters: ["Justin Tafa", "Austen Lane"], match: "265 lbs", records: ["6-3-0", "12-3-0"], flags: ["Australia", "United States"] },
    { fighters: ["Tyson Pedro", "Anton Turkalj"], match: "205 lbs", records: ["9-4-0", "8-2-0"], flags: ["Australia", "Sweden"] },
    { fighters: ["Carlos Ulberg", "Da-Un Jung"], match: "205 lbs", records: ["8-1-0", "15-4-1"], flags: ["New Zealand", "South Korea"] },
    { fighters: ["Jack Jenkins", "Chepe Mariscal"], match: "145 lbs", records: ["12-2-0", "14-6-0"], flags: ["Australia", "United States"] },
    { fighters: ["Jamie Mullarkey", "John Makdessi"], match: "155 lbs", records: ["16-6-0", "18-8-0"], flags: ["Australia", "Canada"] },
    { fighters: ["Nasrat Haqparast", "Landon Quiñones"], match: "155 lbs", records: ["14-5-0", "7-1-1"], flags: ["Afghanistan", "United States"] },
    { fighters: ["Blood Diamond", "Charlie Radtke"], match: "170 lbs", records: ["3-2-0", "7-3-0"], flags: ["Zimbabwe", "United States"] },
    { fighters: ["Shane Young", "Gabriel Miranda"], match: "145 lbs", records: ["13-7-0", "16-6-0"], flags: ["New Zealand", "Brazil"] },
    { fighters: ["Kevin Jousset", "Kiefer Crosbie"], match: "170 lbs", records: ["8-2-0", "10-3-0"], flags: ["France", "Ireland"] }
  ];
  
  const ufcResults = [
    { fighters: ["Israel Adesanya", "Sean Strickland"], match: "185 lbs", winner: null, method: null },
    { fighters: ["Tai Tuivasa", "Alexander Volkov"], match: "265 lbs", winner: null, method: null },
    { fighters: ["Manel Kape", "Felipe dos Santos"], match: "125 lbs", winner: null, method: null },
    { fighters: ["Justin Tafa", "Austen Lane"], match: "265 lbs", winner: null, method: null },
    { fighters: ["Tyson Pedro", "Anton Turkalj"], match: "205 lbs", winner: null, method: null },
    { fighters: ["Carlos Ulberg", "Da Un Jung"], match: "205 lbs", winner: null, method: null },
    { fighters: ["Jack Jenkins", "Chepe Mariscal"], match: "145 lbs", winner: null, method: null },
    { fighters: ["Jamie Mullarkey", "John Makdessi"], match: "155 lbs", winner: null, method: null },
    { fighters: ["Nasrat Haqparast", "Landon Quiñones"], match: "155 lbs", winner: null, method: null },
    { fighters: ["Blood Diamond", "Charlie Radtke"], match: "170 lbs", winner: null, method: null },
    { fighters: ["Shane Young", "Gabriel Miranda"], match: "145 lbs", winner: null, method: null },
    { fighters: ["Kevin Jousset", "Kiefer Crosbie"], match: "170 lbs", winner: null, method: null },
  ];
  


  const [results, setResults] = useState([]);

  ////////put in app soon 
  console.log(results)
  console.log(ufcResults)
  

   
  // useEffect(() => {
  //   // Fetch results from the API
  //   fetch('https://off-therecordpicks.onrender.com/picks')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data); // Log the data received from the API
  //       if (Array.isArray(data.picks)) {
  //         // Filter results for the owner "AdminKev"
  //         const adminKevResults = data.picks.filter(result => result.owner === 'AdminKev');
  //         setResults(adminKevResults.predictions); // Set filtered results in state
  //       } else {
  //         console.error('API response does not have an array in the "picks" property:', data);
  //         // Handle the unexpected response as needed
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching results:', error);
  //       // Handle error as needed
  //     });
  // }, []);
  












  // console.log(showDropdown)
  const [user, setUser] = useState(null);
  const [signUp, setSignUp] = useState(false)
  const handleSignupClick=() =>{
        setSignUp(!signUp)
    }
  

  // useEffect(() => {
  //   fetch("https://off-therecordpicks.onrender.com/check_session").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  function handleLogin(user) {
    setUser(user);
}
  function handleLogout(){
    setUser(null);
  }
  // console.log(user.fullName)
  // console.log(user.fullname)
  console.log(user)


  return (
    <BrowserRouter>
     <div className="blackBB">
     <h1 style={{
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
      
      <Route path="/section3" element={<Tommy ufcCard={ufcCard} user={true} />}/>
      <Route path="/results" element={<Results ufcResults={ufcResults} ufcCard={ufcCard} user={user}/>}/>
      
      <Route path="/payment" element={<Payment/>}/>
      
       
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

