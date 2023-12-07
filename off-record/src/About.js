import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import tqtcat from './tqtcat.jpeg'

import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sections = [
    {
      className: 'section section1',
      content: (
        <>
          <h1 style={{ marginTop: '0px',backgroundColor:'black', color:'white' }}> Story</h1>
          <p style={{ backgroundColor:'whitesmoke',color:'black', padding:'0% 3%',border:'2px black solid'}}>
            Our platform is a App for Fight fans, offering a unique opportunity to showcase their fight prediction skills. The goal is simple: win the event by making accurate predictions for each fight on the card. But we don't just focus on event champions. We also reward consistency through our total points system. Even if you don't win an event, every correct prediction boosts your total points, highlighting your expertise and dedication. What sets us apart is that we operate entirely without monetary transactions. Instead, we rely on the support of our community through donations to secure our domain name and maintain the site's functionality.
          </p>
        </>
      ),
    },
    {
      className: 'section section2',
      content: (
        <>
          <h1 style={{ marginTop: '0px',backgroundColor:'black' }}> Point System</h1>
          <div className="pointEXB">
            <div className="pointEX">
              <p style={{ color: 'white', fontWeight: 'Bold' }}>
                <span style={{ color: 'gold' }}> + 1 point</span> for picking the correct Winner
              </p>
              <p style={{ color: 'white', fontWeight: 'Bold' }}>
                <span style={{ color: 'gold' }}> + 2 point</span> for picking the correct Method & Winner
              </p>
              <p style={{ color: 'white', fontWeight: 'Bold' }}>
                <span style={{ color: 'gold' }}> + 3 point</span> for picking the correct Round, Method & Winner
              </p>
              <p style={{ color: 'white', fontWeight: 'Bold' }}>
                <span style={{ color: 'gold' }}> + 2 point</span> for picking Draw/No-Contest correctly
              </p>
            </div>
          </div>
          <br />
        </>
      ),
    },
    {
      className: 'section section3',
      content: (
        <>
          <div className="section3 ">
            <h1 style={{ marginTop: '0px',backgroundColor:"black",color:'white', }}> Donate Below</h1>
            <p style={{ backgroundColor:'whitesmoke',color:'black', padding:'0% 3%',border:'2px black solid'}}>Since the website does not take part in gambling or money exchanges, we rely on the kindness of our users</p>
            <button className="donateB" onClick={() => window.open('https://donate.stripe.com/4gw8xEdNP0ypfqo6ot')}>$5</button>
            <button className="donateB" onClick={() => window.open('https://donate.stripe.com/6oE4ho113ch73HGfZ4')}>$10</button>
            <br></br>
          </div>
        </>
      ),
    },
  ];

  const handleOptionClick = (option) => {
    navigate(`${option}`);
  };

  useEffect(() => {
    let timer;

    if (!isPaused) {
      timer = setTimeout(() => {
        setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
      }, 5000); // Rotate every 5 seconds
    }

    return () => clearTimeout(timer);
  }, [currentSection, isPaused]);

  return (
    <div  style={{backgroundImage:`url(${tqtcat})`,backgroundSize:'cover' ,marginBottom: '0px',marginTop:'0%' }}>
      <h1 style={{padding :'10% 0',textAlign:'center',color:'white'}}>
      <span style={{color:'white',backgroundColor:'black',borderTop:'3px solid black',borderBottom:'3px solid black',borderLeft:'3px solid black'}} >About </span>
      <span style={{color:'red',backgroundColor:'white',borderTop:'3px solid black',borderBottom:'3px solid black'}}>P</span>
      <span style={{color:'black',backgroundColor:'white',borderTop:'3px solid black',borderBottom:'3px solid black'}}>4</span>
      <span style={{color:'blue',backgroundColor:'white',borderTop:'3px solid black',borderBottom:'3px solid black',borderRight:'3px solid black'}} >P</span> 
      </h1>
      <div className="about"style={{maxWidth:'80%', margin:'0 10%'}}>
          <div className={sections[currentSection].className}>{sections[currentSection].content}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className='redbutton' onClick={() => setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length)}>{'<'}</button>
            <button style={{background:`url(${logo})`,backgroundColor:'white',backgroundSize:'cover'}} className='pauseButton' onClick={() => setIsPaused(!isPaused)}>
              <span className='bgw-cb'>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button className='bluebutton' onClick={() => setCurrentSection((prevSection) => (prevSection + 1) % sections.length)}>{'>'}</button>
            
          </div>
      </div>
      {/* <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {sections.map((_, index) => (
          <span
            style={{ minHeight: '100px' }}
            key={index}
            className={index === currentSection ? 'dot active' : 'dot'}
            onClick={() => setCurrentSection(index)}
          ></span>
        ))}
      </div> */}
      <h1 style={{padding :'10% 0',textAlign:'center',color:'red'}}>
      <span style={{color:'red',backgroundColor:'white'}}>P</span>
      <span style={{color:'black',backgroundColor:'white'}}>4</span>
      <span style={{color:'blue',backgroundColor:'white'}} >P</span> 
      </h1>
    </div>
  );
}

export default About;



// import React from "react";
// import './App.css';
// import logo from './logo.png';
// import {useNavigate} from 'react-router-dom';
// import { NavLink } from "react-router-dom";

// function About() {
//   const navigate = useNavigate()
//     const handleOptionClick = (option) => {
//         navigate(`${option}`);
//       };

//   function openPaymentWindow(link, amount) {
//       // Open a new window with the provided link
//       const paymentWindow = window.open(link, '_blank');
//       if (paymentWindow) {
//         // Focus the new window if it was successfully opened
//         paymentWindow.focus();
//       } else {
//         // Handle cases where the popup blocker prevents the window from opening
//         alert('Popup blocker may be preventing the payment window from opening. Please allow popups for this site.');
//       }
//     }
//   return (
//     <div className="about">
     
     
       
       
       
// {/*       
//       <img src={logo} alt='fighting logo' onClick={() => handleOptionClick('/')} style={{cursor:'pointer'}}/> {/* Use the imported image */}
//       {/* <p style={{color:'gold',fontWeight:'Bold',marginBottom:'0%'}}>Click Logo to go to Home Page</p>  */}

      
      
//        </div>
//   );
// }

// export default About;
