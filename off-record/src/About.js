import React from "react";
import './App.css';
import logo from './logo.png';
import {useNavigate} from 'react-router-dom';
import { NavLink } from "react-router-dom";

function About() {
  const navigate = useNavigate()
    const handleOptionClick = (option) => {
        navigate(`${option}`);
      };

  function openPaymentWindow(link, amount) {
      // Open a new window with the provided link
      const paymentWindow = window.open(link, '_blank');
      if (paymentWindow) {
        // Focus the new window if it was successfully opened
        paymentWindow.focus();
      } else {
        // Handle cases where the popup blocker prevents the window from opening
        alert('Popup blocker may be preventing the payment window from opening. Please allow popups for this site.');
      }
    }
  return (
    <div className="about">
      {/* <button className="backB" onClick={() => handleOptionClick('/')} >Home </button> */}
      <h1 style={{marginTop:'0px'}}>Off-The-Record-Picks' Story</h1>
      <h4>Our platform is a hub for UFC enthusiasts, offering a unique opportunity to showcase their fight prediction skills. The goal is simple: win the event by making accurate predictions for each fight on the card.

But we don't just focus on event champions. We also reward consistency through our total points system. Even if you don't win an event, every correct prediction boosts your total points, highlighting your expertise and dedication.</h4>
      
      <div className="pointEXB"><div className="pointEX">
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 1 point</span> for picking the correct Winner </p><br></br>
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 1 point</span> for picking the correct Method if you chose the correct fighter</p><br></br>
      <p style={{color:'white',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 2 points</span> for picking Draw/No-Contest correctly</p></div></div>
       <br></br>
       
       
       <h4>What sets us apart is that we operate entirely without monetary transactions. Instead, we rely on the support of our community through donations to secure our domain name and maintain the site's functionality.</h4>
      <p style={{color:'gold',marginTop:'5%',fontWeight:'Bold'}}>Donate Below</p>
      <button className="donateB" onClick={() => window.open('https://donate.stripe.com/4gw8xEdNP0ypfqo6ot')}>$5</button>
      <button className="donateB" onClick={() => window.open('https://donate.stripe.com/6oE4ho113ch73HGfZ4')}>$10</button>

      <br></br>
      
      <img src={logo} alt='fighting logo' onClick={() => handleOptionClick('/')} style={{cursor:'pointer'}}/> {/* Use the imported image */}
      <p style={{color:'gold',fontWeight:'Bold',marginBottom:'0%'}}>Click Logo to go to Home Page</p>

      
      
       </div>
  );
}

export default About;
