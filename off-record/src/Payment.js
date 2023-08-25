import React, { useState } from "react";
import './App.css';

function Payment() {
  const [timeC, setTimeC] = useState("");
  const [Amount, setAmmount] = useState("");
  let total = timeC * Amount

  const handleTimeC = (event) => {
    setTimeC(event.target.value);
  };
  const handleAmmount = (event) => {
    setAmmount(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send payment details to a server
    // console.log("Payment method selected:", Amount);
  };

  return (
    <div className="payment">
      <h1>Payment for Tutoring</h1>
      <h4>Invest in your Sucess!</h4>
      <form onSubmit={handleFormSubmit}>
        <label>
          Select Time of Session:
          <select value={timeC} onChange={handleTimeC}>
            <option value=""></option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            {/* Add more payment options as needed */}
          </select>
        </label><br></br>
        <label>
          Select Amount of Session:
          <select  value={Amount} onChange={handleAmmount}>
          <option value=""></option>
            <option value="1">1 Session</option>
            <option value="5">5 Sessions</option>
            <option value="10">10 Sessions</option>
            <option value="20">20 Sessions</option>
            <option value="30">30 Sessions</option>
            {/* Add more payment options as needed */}
          </select>
        </label>
        <h3> ${total}</h3>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default Payment;
