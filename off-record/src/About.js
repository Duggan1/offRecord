import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import tqtcat from './tqtcat.jpeg'

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import P4pHeader from './P4pHeader';

function About({user, onLogout}) {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sections = [
    {
      className: 'section section1',
      content: (
        < >
          <h1 onClick={() => setIsPaused(!isPaused)} style={{ marginTop: '0px', color:'white' }} className='rvb'><span className='bg-black text-white padding1 text-bold'>MMA Organizations</span></h1>
          <p onClick={() => setIsPaused(!isPaused)}  style={{ color:'black', padding:'3%'}} className='aboutPetr'>
          
          <center><h1 style={{
                              height: '50px',
                              backgroundColor: 'whitesmoke',
                              // padding: '9%',
                              backgroundSize: '100% 100%',
                              minWidth:'60%',
                               maxWidth:'50%',
                               textAlign:'center',marginTop:'4px',
                              // paddingBottom:'20px',
                              // margin:'0% 20%',
                              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UFC_logo.svg/2560px-UFC_logo.svg.png)`
                            }} alt={`UFC `}> </h1></center>
         <div className='flex'> <h1 style={{
                              height: '50px',
                              backgroundColor: 'whitesmoke',
                              // padding: '7%',
                              backgroundSize: '100% 100%',
                              width:'100%',marginTop:'8px',marginRight:'8px',
                              // paddingBottom:'20px',
                              // margin:'0% 20%',
                                backgroundImage: `url(https://pflmma.com/assets/img/logos/pfl-logo-color.svg)`
                            //   backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bellator_MMA_Logo.svg/2560px-Bellator_MMA_Logo.svg.png)`
                            }} alt={`PFL `}> </h1>
                            
                            <h1 style={{
                              height: '50px',
                              backgroundColor: 'whitesmoke',
                              // padding: '7%',
                              backgroundSize: '100% 100%',marginTop:'8px',
                              width:'100%',
                              // paddingBottom:'20px',
                              // margin:'0% 20%',
                              //   backgroundImage: `url(https://pflmma.com/assets/img/logos/pfl-logo-color.svg)`
                              backgroundImage: `url(https://www.aca-mma.com/img/logo/aca-logo-black.png?v=28.11.17)`
                            }} alt={`PFL `}> </h1>
          </div><div className='flex'>

          <h1 style={{
                              height: '50px',
                              backgroundColor: 'whitesmoke',
                              // padding: '7%',
                              backgroundSize: '100% 100%',marginTop:'8px',marginRight:'8px',
                              width:'100%',
                              // paddingBottom:'20px',
                              // margin:'0% 20%',
                              //   backgroundImage: `url(https://pflmma.com/assets/img/logos/pfl-logo-color.svg)`
                              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bellator_MMA_Logo.svg/2560px-Bellator_MMA_Logo.svg.png)`
                            }} alt={`PFL `}> </h1>
                            <h1 style={{
                              height: '50px',
                              backgroundColor: 'whitesmoke',
                              // padding: '7%',
                              backgroundSize: '100% 100%',marginBottom:'4px',marginTop:'8px',
                              width:'100%',
                              // paddingBottom:'20px',
                              // margin:'0% 20%',
                              //   backgroundImage: `url(https://pflmma.com/assets/img/logos/pfl-logo-color.svg)`
                              backgroundImage: `url(https://seeklogo.com/images/O/one-championship-logo-7DB699A00B-seeklogo.com.png)`
                            }} alt={`PFL `}> </h1></div>

          </p>
        </>
      ),
    },
    {
      className: 'section section2',
      content: (
        <>
          <h1 onClick={() => setIsPaused(!isPaused)} style={{ marginTop: '0px', color:'white' }} className='rvb'><span className='bg-black text-white padding1 text-bold'> Point System</span></h1>
          <div className="">
            <div onClick={() => setIsPaused(!isPaused)} className='aboutPetr aboutsmaller' style={{textAlign:'start',marginBottom:'0px'}}>
              <p style={{ backgroundColor:'whitesmoke',color:'black', padding:'0% 3% 1% 0%',border:'2px black solid', fontWeight: 'Bold', }}>
                <span style={{ color: 'gold',backgroundColor:'black'  }}> + 1 point</span> for picking the correct Winner
              </p>
              <p style={{ backgroundColor:'whitesmoke',color:'black', padding:'0% 3% 1% 0%',border:'2px black solid', fontWeight: 'Bold' }}>
                <span style={{ color: 'gold',backgroundColor:'black'  }}> + 2 points</span> for picking the correct Method & Winner
              </p><p style={{backgroundColor:'whitesmoke',color:'black', padding:'0% 3% 1% 0%',border:'2px black solid', fontWeight: 'Bold' }}>
                <span style={{ color: 'gold',backgroundColor:'black'  }}> + 2 points</span> for picking Draw/No-Contest correctly
              </p>
              <p style={{ backgroundColor:'whitesmoke',color:'black', padding:'0% 3% 1% 0%',border:'2px black solid', fontWeight: 'Bold' }}>
                <span style={{ color: 'gold',backgroundColor:'black' }}> + 3 points</span> for picking the correct Round, Method & Winner
              </p>
              
            </div>
          </div>
          
        </>
      ),
    },
    {
      className: 'section section3',
      content: (
        <>
          <div onClick={() => setIsPaused(!isPaused)} className="section3 ">
            <h1 style={{ marginTop: '0px',marginBottom: '0px', color:'white' }} className='rvb'><span className='bg-black text-white padding1 text-bold'> Donate Below</span></h1>
            <div className='flex'>
            <button className="donateB shake" onClick={() => window.open('https://donate.stripe.com/4gw8xEdNP0ypfqo6ot')}>$5</button>
            <button className="donateB shake" onClick={() => window.open('https://donate.stripe.com/6oE4ho113ch73HGfZ4')}>$10</button>
            </div>
            <p  className='aboutPetr aboutsmaller'style={{ backgroundColor:'whitesmoke',color:'black', padding:'0% 3%',border:'2px black solid'}}>Since the website does not take part in gambling or money exchanges, we rely on the kindness of our users</p>
            
           
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
    <>
    {/* // <P4pHeader onLogout={onLogout} user={user} /> */}
    <div  className='bg-aboutbb' style={{
        // backgroundImage:`url(${tqtcat})`,backgroundSize:'cover' ,
    marginBottom: '0px',marginTop:'0%',textAlign:'center'}}>
      
      {/* <span style={{color:'white',backgroundColor:'black'}} >About </span><br></br> */}
     
       {/* <h1 style={{padding : '20% 0',textAlign:'center',color:'white'}}>
      <span style={{
            borderTop: '15px solid red',
            borderRight: '15px solid blue',
            borderLeft: '15px solid red',
            borderBottom: '15px solid blue',
            borderRadius: '10%',
            color: 'white',
            backgroundColor: 'black',
            padding:'12% 15%',
            borderRadius:'50%'
}}
 className='p4pplus'
 onClick={() => setIsPaused(!isPaused)}
 ></span></h1> */}
      {/* <span style={{color:'red',backgroundColor:'white',borderTop:'3px solid black',borderBottom:'3px solid black'}}>P</span>
      <span style={{color:'black',backgroundColor:'white',borderTop:'3px solid black',borderBottom:'3px solid black'}}>4</span>
      <span style={{color:'blue',backgroundColor:'white',borderTop:'3px solid black',borderBottom:'3px solid black',borderRight:'3px solid black'}} >P</span>  */}
      
      <div className="about"style={{maxWidth:'100%', margin: '0 0%'}}>
          <div className={sections[currentSection].className}>{sections[currentSection].content}</div>
          <div className='rvb2' style={{ display: 'flex', justifyContent: 'center',marginTop:'auto' }}>
            <button className='redbutton' onClick={() => setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length)}>{'<'}</button>
            <button style={{
              // background:`url(${logo})`,
            backgroundColor:'white',backgroundSize:'cover', minWidth:"40px"}} className='pauseButton ggg'
             onClick={() => setIsPaused(!isPaused)}
             >
            <span className='bgw-cb'>
                {isPaused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
              </span>
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
      {/* <h1 style={{padding :'10% 0',textAlign:'center',color:'red'}}>
      <span style={{color:'red',backgroundColor:'white'}}>P</span>
      <span style={{color:'black',backgroundColor:'white'}}>4</span>
      <span style={{color:'blue',backgroundColor:'white'}} >P</span> 
      </h1> */}
    </div>
    </>
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
