import React, { useState } from "react";
import './App.css';

function Payment() {
  const [timeC, setTimeC] = useState("");
  const [amount, setAmount] = useState("");
  const [prediction, setPrediction] = useState("");


  const handlePredictionChange = (event) => {
    setPrediction(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send payment details to a server
    // You can also handle the prediction value
    console.log("Payment method selected:", amount);
    console.log("Prediction:", prediction);
  };

  return (
    <div className="payment">
      <h1>Predict the future!</h1>
      <h4>Combat Sports Predictions only</h4>
      <form onSubmit={handleFormSubmit}>
       
        <label>
          Enter Prediction:
          </label><br></br><textarea
            rows="8"
            style={{ minWidth: "50%" }}  // You can adjust the number of rows to make it taller
            value={prediction}
            onChange={handlePredictionChange}
          />
        
        <br></br>
        <button type="submit">Submit Prediction</button>
      </form>
    </div>
  );
}

export default Payment;
