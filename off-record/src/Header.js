import React, { useState } from "react";
import whitelogo  from './whitelogo.png'
import logo from './logo.png';
import { NavLink, useLocation } from "react-router-dom";

import {useNavigate} from 'react-router-dom'
import './App.css';

function Header({user, ufcCard}) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname)

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
        <div 
                
                style={{color:'darkred',
                cursor:'pointer',
                background:'white',
                marginLeft:'20%',
                marginRight:'20%',
                padding: '3% 25%',
                maxWidth:'80%',
                borderTop:'red 5px solid',
                borderRight:'blue 5px solid',
                borderLeft:'red 5px solid',
                borderBottom:'blue 5px solid',
                backgroundImage:`url(${logo})`, 
                backgroundSize:'25% 100%',
                backgroundPosition:'5%',
                backgroundRepeat:'no-repeat',
                height:'40px',
                // padding:'3%',
                borderRadius:'15%',
                // backgroundSize:'cover'
              }}
                onClick={() => handleAppleClick()}
                ><div >



<div style={{display:'flex', justifyContent:'center'}}>
<div className="p4pplus"></div>
</div>
                  





                 </div>
                  
                  
                  </div>  
     
         </>         
          : 
<>
      
                <div 
                
                  style={{color:'darkred',
                  cursor:'pointer',
                  background:'white',
                  marginLeft:'20%',
                  marginRight:'20%',
                  padding: '3% 25%',
                  maxWidth:'80%',
                  borderTop:'red 5px solid',
                  borderRight:'blue 5px solid',
                  borderLeft:'red 5px solid',
                  borderBottom:'blue 5px solid',
                  backgroundImage:`url(${logo})`, 
                  backgroundSize:'25% 100%',
                  backgroundPosition:'95%',
                  backgroundRepeat:'no-repeat',
                  height:'40px',
                  // padding:'3%',
                  borderRadius:'15%',
                  // backgroundSize:'cover'
                }}
                  onClick={() => handleAppleClick()}
                  >
                    <div className="p4pplus"></div>
                    
                    
                    
                    
                    </div>  
     
      

     <div style={{ backgroundColor: 'black', padding: '2%', minWidth: '100%',
      // backgroundImage: `url(${logo})`,backgroundSize:'cover',backgroundRepeat:'no-repeat' 
      }} className="dropdown-menu">
              {/* Dropdown Menu */}
            <div className='swm '
             style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: '25% 100%',
              backgroundPosition: location.pathname === "/" ? '85% 0' : '5% 0',
              backgroundRepeat: 'no-repeat',
            }}
            
         onClick={() => { handleOptionClick('/'); handleAppleClick(); }}>
            <NavLink className='wavy' exact to="/">Home</NavLink>
                    </div>

           {isUfcCardLoaded ? <div style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: '25% 100%',
              backgroundPosition: location.pathname === "/section3" ? '85% 0' : '5% 0',
              backgroundRepeat: 'no-repeat',
            }}  className='swm'  onClick={() => { handleOptionClick('/section3'); handleAppleClick(); }}><NavLink className='wavy' exact to="/section3">Pick 'em</NavLink></div>
           :
           <div style={{  }}><div className="apple" 
           style={{ maxHeight: '10%',minHeight: '10%', maxWidth: '10%', minWidth: '10%',marginLeft:'45%',backgroundRepeat:'repeat'}}></div>
           {/* <h5 style={{ display: 'flex', whiteSpace: 'nowrap' }}>
             Loading Card Details
           </h5> */}
         </div>}
            <div  className='swm' style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: '25% 100%',
              backgroundPosition: location.pathname === "/results" ? '85% 0' : '5% 0',
              backgroundRepeat: 'no-repeat',
            }}  onClick={() => { handleOptionClick('/results'); handleAppleClick(); }}><NavLink className='wavy' exact to="/results">Results</NavLink></div>
            <div  className='swm' style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: '25% 100%',
              backgroundPosition: location.pathname === "/about" ? '85% 0' : '5% 0',
              backgroundRepeat: 'no-repeat',
            }} onClick={() => { handleOptionClick('/about'); handleAppleClick(); }}><NavLink className='wavy' exact to="/about">About P4P</NavLink></div>
            
          </div>
          </>  }

    
    </div>
  );
}

export default Header;
