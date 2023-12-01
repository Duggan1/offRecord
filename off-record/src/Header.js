import React, { useState } from "react";
import logo from './logo.png';
import { NavLink } from "react-router-dom";

import {useNavigate} from 'react-router-dom'
import './App.css';

function Header({user, ufcCard}) {
    const navigate = useNavigate()

    const [showDropdown, setShowDropdown] = useState(true);
  // const navigate = useNavigate()
  const isUfcCardLoaded = ufcCard ? ufcCard.length > 1 : false;
  console.log(isUfcCardLoaded)
  console.log(ufcCard)

  const handleAppleClick = () => {
    setShowDropdown(!showDropdown);
  };


    

    const handleOptionClick = (option) => {
        // Implement the functionality for each option here if needed
        console.log(`Option "${option}" clicked.`);
        
        
        navigate(`${option}`);
      };

  return (
    <div className="Header text-align-center">
      {showDropdown ? <>
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
                 onClick={() => handleAppleClick()}
                  style={{cursor:'pointer',backgroundColor:'purple',marginLeft:'0%',padding:'3%',border:'white 2px solid',borderRadius:'15%'}}/>
     
         </>         
          : 
<>
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
                 onClick={() => handleAppleClick()}
                  style={{color:'darkred',cursor:'pointer',backgroundColor:'darkred',marginLeft:'0%',padding:'3%',border:'white 2px solid',borderRadius:'15%'}}/>
     
      

     <div style={{ backgroundColor: 'black', padding: '2%', minWidth: '100%',
      // backgroundImage: `url(${logo})`,backgroundSize:'cover',backgroundRepeat:'no-repeat' 
      }} className="dropdown-menu">
              {/* Dropdown Menu */}
            <div style={{border: 'white 5px solid'}} className='swm' onClick={() => { handleOptionClick('/'); handleAppleClick(); }}>
            <NavLink className='color-gold' exact to="/">Home</NavLink>
                    </div>

           {isUfcCardLoaded ? <div style={{border: 'white 5px solid'}} className='swm'  onClick={() => { handleOptionClick('/section3'); handleAppleClick(); }}><NavLink className='color-gold' exact to="/section3">Pick 'em</NavLink></div>
           :
           <div style={{ display: 'flex',justifyContent:'center' }}><div className="loading" style={{ height: '50px', width: '50px' }}></div>
           <h5 style={{ display: 'flex', whiteSpace: 'nowrap' }}>
             Loading Card Details
           </h5>
         </div>}
            <div style={{border: 'white 5px solid'}} className='swm'  onClick={() => { handleOptionClick('/results'); handleAppleClick(); }}><NavLink className='color-gold' exact to="/results">Results</NavLink></div>
            <div style={{border: 'white 5px solid'}} className='swm'  onClick={() => { handleOptionClick('/about'); handleAppleClick(); }}><NavLink className='color-gold' exact to="/about">About P4P</NavLink></div>
            
          </div>
          </>  }

    
    </div>
  );
}

export default Header;
