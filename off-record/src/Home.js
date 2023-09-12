import React, { useState, useEffect  } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

function Home({user}) {
    const navigate = useNavigate()
    const handleOptionClick = (option) => {
        navigate(`${option}`);
      };
    const [ countPick ,setPickCount] = useState(null)
    
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
    



    return (
        < div className="home" >
            {/* <p style={{ color: 'yellow' }}>Welcome to</p> */}
            <h1 style={{
                textAlign: 'center',
                marginTop: '0%',
                color: 'purple',
                textShadow: '0 0 5px yellow',
                fontSize:'55px',
                maxWidth: '90%'
                // Adjust this value as needed
                }}>
                Off Record Picks!
                </h1><div className='crdiv'  onClick={() => handleOptionClick('/about')}><NavLink className='snow' exact to="/about">About Us</NavLink></div>
                { user ? <div className='crdiv'  onClick={() => handleOptionClick('/section3')}><NavLink className='snow' exact to="/section3">UFC Pick 'ems</NavLink></div> : null }
               
                
                <div className='crdiv'  onClick={() => handleOptionClick('/results')}><NavLink className='snow' exact to="/results">Check Results</NavLink></div>
                
               
                <h2>Off-The-Record-Picks - {countPick} - </h2>
        
        
        

        
        </div>
    )
}
export default Home;