import React, { useState } from "react";
import logo from './logo.png';

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
                color: 'purple',
                margin: "0",
                fontSize:'35px',
                maxWidth: '100%',
                cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                Off the Record Picks
                </h1>
                <img 
                height={'50px'}
                 src={logo} alt='fighting logo' 
                 onClick={() => handleOptionClick('/')}
                  style={{cursor:'pointer',backgroundColor:'purple'}}/>
     


    
    </div>
  );
}

export default Header;
