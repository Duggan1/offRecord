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
      <h1>Off-Record-Picks' Story</h1>
      <img src={logo} alt='fighting logo' onClick={() => handleOptionClick('/')} style={{cursor:'pointer'}}/> {/* Use the imported image */}
      <h4>Our platform provides UFC enthusiasts with a unique opportunity to demonstrate their predictive skills for UFC events. The results will be updated after the enitre event is complete</h4>
      <p style={{color:'purple',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 1 point</span> for picking the correct Winner </p><br></br>
      <p style={{color:'purple',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 1 point</span> for picking the correct Method if you chose the correct fighter</p><br></br>
      <p style={{color:'purple',fontWeight:'Bold'}}><span style={{color:'gold'}}> + 2 points</span> for picking for Draw/No-Contest</p>
       <br></br>
       
       
       <h4>What sets us apart is that we operate entirely without monetary transactions. Instead, we rely on the support of our community through donations to secure our domain name and maintain the site's functionality.</h4>
      <p style={{color:'gold',marginTop:'5%',fontWeight:'Bold'}}>Donate Below</p>
      <button className="donateB" onclick="openPaymentWindow('https://donate.stripe.com/4gw8xEdNP0ypfqo6ot', 5)">$5</button>
      <button  className="donateB" onclick="openPaymentWindow('https://donate.stripe.com/6oE4ho113ch73HGfZ4', 10)">$10</button>
      <br></br><button className="backB" onClick={() => handleOptionClick('/')} >Home </button>
      

      
      
       </div>
  );
}

export default About;
