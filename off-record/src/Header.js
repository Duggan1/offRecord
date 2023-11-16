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
      <div style={{display:'flex', justifyContent:'center'}}>
            <h1 
            onClick={() => handleOptionClick('/')}
            style={{
                textAlign: 'center',
                color: 'white',
                margin: "0",
                fontSize:'35px',
                maxWidth: '100%',
                cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                P
                </h1><h1 
            onClick={() => handleOptionClick('/')}
            style={{
                textAlign: 'center',
                color: 'white',
                margin: "0",
                fontSize:'15px',
                maxWidth: '100%',
                marginTop: '2%',
                cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                icks
                </h1>
                
                <h1 
            onClick={() => handleOptionClick('/')}
            style={{
                textAlign: 'center',
                color: 'white',
                margin: "0",
                fontSize:'35px',
                marginTop: '0%',
                cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                4P
                </h1>
                <h1 
            onClick={() => handleOptionClick('/')}
            style={{
                textAlign: 'center',
                color: 'white',
                margin: "0",
                fontSize:'15px',
                maxWidth: '100%',
                marginTop: '2%',
                cursor:'pointer',
                fontFamily:"Copperplate,monospace",
                


                // Adjust this value as needed
                }}>
                oints.com
                </h1></div>
                <img 
                height={'40px'}
                 src={logo} alt='fighting logo' 
                 onClick={() => handleOptionClick('/')}
                  style={{cursor:'pointer',backgroundColor:'purple',marginLeft:'0%',padding:'3%',border:'white 2px solid',borderRadius:'15%'}}/>
     


    
    </div>
  );
}

export default Header;
