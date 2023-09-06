import React from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const handleOptionClick = (option) => {
        navigate(`${option}`);
      };
    




    return (
        < div className="App App-header" >
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
                </h1>
                <div className='crdiv'  onClick={() => handleOptionClick('/results')}><NavLink className='snow' exact to="/results">Check Results</NavLink></div>

        
        
        

        
        </div>
    )
}
export default Home;