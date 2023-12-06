import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import './App.css';

function Payment() {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const handleOptionClick = (option) => {
        // Implement the functionality for each option here if needed
        console.log(`Option "${option}" clicked.`);
        
        setShowDropdown(false);
        navigate(`${option}`);
      };

  return (
    <div className="dnd">
      <h1>Please login!</h1>
      <div className="pupCirc" onClick={() => handleOptionClick('/section3')}><NavLink className='snowwhite' exact to="/section2">Login/Signup</NavLink></div>


    
    </div>
  );
}

export default Payment;
