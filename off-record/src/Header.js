import React, { useState } from "react";

import {useNavigate} from 'react-router-dom'
import './App.css';

function Header({user}) {
    const navigate = useNavigate()

    const handleOptionClick = (option) => {
        // Implement the functionality for each option here if needed
        console.log(`Option "${option}" clicked.`);
        
        
        navigate(`${option}`);
      };

  return (
    <div className="Header">
            <h1 
            onClick={() => handleOptionClick('/')}
            style={{
                textAlign: 'center',
                marginTop: '0%',
                color: 'purple',
                textShadow: '0 0 5px yellow',
                fontSize:'35px',
                maxWidth: '100%',
                cursor:'pointer'

                // Adjust this value as needed
                }}>
                Off Record Picks
                </h1>
          


    
    </div>
  );
}

export default Header;
