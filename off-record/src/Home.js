import React, { useState, useEffect  } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

function Home({user, ufcCard, stallUfcCard}) {
    const navigate = useNavigate()
    const handleOptionClick = (option) => {
        navigate(`${option}`);
      };
    const [ countPick ,setPickCount] = useState(null)
    // const [mainEvent, setMainEvent ] = useState('UFC')
    
      useEffect(() => {
        // Fetch results from the API
        fetch('https://off-therecordpicks.onrender.com/picks')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data); // Log the data received from the API
            if (Array.isArray(data.picks)) {
                console.log(data)
                setPickCount(data.picks.length);
              
            } 
          })
          .catch(error => {
            console.error('Error fetching results:', error);
            // Handle error as needed
          });
      }, []); // Empty dependency array means this effect runs once after the component mounts
      
      
   
      const selectedUfcCard = ufcCard.length > 1 ? ufcCard : stallUfcCard;
      console.log(selectedUfcCard)

      const isUfcCardLoaded = ufcCard.length > 1;

      const mainEvent = isUfcCardLoaded ? ufcCard[0].fighters.join(' vs ') : '';
    



    return (
        < div className="home" >
            {/* <p style={{ color: 'yellow' }}>Welcome to</p> */}
            <h1 className="homeheaders"
                // Adjust this value as needed
                >
                Off The Record Picks!
                </h1>
                { !user ? 
                <div className='crdiv2' >
                <h6 className='color-yellow snow'style={{marginBottom:'0%',paddingBottom:'0%'}}> Login/Signup to make Off the Record Picks </h6><br></br>
                <h5 className='color-yellow  snow'style={{marginTop:'0%',paddingTop:'0%'}} >{mainEvent}</h5></div>
                : null }
                { isUfcCardLoaded ? <div className='crdiv'  onClick={() => handleOptionClick('/section3')}><NavLink className='color-gold hgysnow' exact to="/section3">Off the Record Pick 'ems</NavLink><h5 className='purple2   snow'style={{marginTop:'0%',paddingTop:'0%'}} >{mainEvent}</h5></div> : 
                <div style={{ display: 'flex' }}><div className="loading" style={{ height: '100px', width: '100px' }}></div>
                <h5 style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                  Loading Card Details
                </h5>
              </div>
               }
               
                
                <div className='crdiv' onClick={() => handleOptionClick('/results')}><NavLink className=' purple2 snow' exact to="/results">Check Results</NavLink></div>
                <div className='crdiv'  onClick={() => handleOptionClick('/about')}><NavLink className='purple2 snow' exact to="/about">About Us</NavLink></div>
                
               
                <h2 style={{paddingTop:'15%'}} className="homeheaders">{countPick} - Off-The-Record-Picks -  </h2>
        
        
        

        
        </div>
    )
}
export default Home;