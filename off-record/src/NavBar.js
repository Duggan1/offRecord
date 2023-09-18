import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import Header from './Header';




function NavBar({ user ,onLogin, onLogout}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()

  const handleAppleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    // Implement the functionality for each option here if needed
    console.log(`Option "${option}" clicked.`);
    
    setShowDropdown(false);
    navigate(`${option}`);
  };
  console.log(showDropdown)

  return (
    <div className="App">
      <Header user={user} onLogin={onLogin} onLogout={onLogout} />
      <header className="App-header">
      
        
        
      
        <div
          style={{ height: '100px' }}
          className="apple"
          onClick={handleAppleClick}
        ></div><p style={{ color: 'yellow',  margin: '0%' }}>Click the Money for the <strong>Menu!</strong></p>
        {/* Dropdown Menu */}
        {showDropdown && (
          <div style={{backgroundColor:'black',padding:'2%',minWidth:'100%'}} className="dropdown-menu">
            
            <div className='swm'  onClick={() => handleOptionClick('/')}><NavLink className='snowwhite' exact to="/">Home</NavLink></div>
            <div className='swm'  onClick={() => handleOptionClick('/section3')}><NavLink className='snowwhite' exact to="/section3">UFC Pick 'ems</NavLink></div>
            <div className='swm'  onClick={() => handleOptionClick('/results')}><NavLink className='snowwhite' exact to="/results">Results</NavLink></div>
            <div className='swm'  onClick={() => handleOptionClick('/about')}><NavLink className='snowwhite' exact to="/about">About Us</NavLink></div>
            
          </div>
        )}

        
        
        
      </header>
    </div>
  );
}

export default NavBar;
