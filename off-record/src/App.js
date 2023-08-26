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

  const handleOptionClick = (option) => {
    // Implement the functionality for each option here if needed
    console.log(`Option "${option}" clicked.`);
    setShowDropdown(false);
  };
  console.log(showDropdown)
  const [user, setUser] = useState(null);
  const [signUp, setSignUp] = useState(false)
  const handleSignupClick=() =>{
        setSignUp(!signUp)
    }
  

  useEffect(() => {
    fetch("https://off-therecordpicks.onrender.com/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

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
     <h1 style={{color:'purple',textAlign:'center', marginTop:'0%'}}> Off Record Picks!</h1>
     <div style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'end', fontSize: '8px', width: '100%' }}>
  {user ? (
    <>
      <h1>Hello {user.fullname}{user.fullName}</h1>
      <button onClick={handleLogout} style={{ marginLeft: '10px', minWidth: '10%' }} type="submit">
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
      
      <Route path="/section3" element={<Tommy user={user} />}/>
      <Route path="/results" element={<Results user={user}/>}/>
      
      <Route path="/payment" element={<Payment/>}/>
      
       
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;

