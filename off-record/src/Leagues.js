import React, { useState, useEffect  } from "react";
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import './App.css';
import * as Yup from 'yup';  

function Leagues({user}) {

    const [backupID, setBackupID] = useState(0)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://off-therecordpicks.onrender.com/users');
          const data = await response.json();
          setBackupID(data.length);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []); 

  console.log(backupID)
    
  
      const fightingMan = ['p4p8','apple', 'f-Man5', 'f-Man6', 'f-Man7', 'f-Man', 'f-Man2', 'f-Man3',  'f-Man4R','f-Man4','apple'];
      const [currentClass, setCurrentClass] = useState(fightingMan[0]);
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          // Rotate through the classes
          const currentIndex = fightingMan.indexOf(currentClass);
          const nextIndex = (currentIndex + 1) % fightingMan.length;
          setCurrentClass(fightingMan[nextIndex]);
        }, 500);
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, [currentClass, fightingMan]);



      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        message: Yup.string().required('Message is required'),
        image: Yup.string().required('Image is required'),
        passcode: Yup.string(),
      });


      const [leagues, setLeagues] = useState([]);
      const [formData, setFormData] = useState({
        name: '',
        owner_id: '', // Assuming the owner_id is obtained from authentication
        user_id: user ? user.id : 3 ,
        message:'',
        image:'',
        passcode:'' // Assuming the user_id is obtained from authentication
      });
    
/////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Validate the form data using Yup
          await validationSchema.validate({ formData });
  
          const dataToSend = {
            owner: user.id !== undefined ? user.id : backupID,
            name: formData.name,
            message: formData.message,
            image: formData.image,
            passcode: formData.passcode? formData.passcode : null
            // user_id: 
        };
        
          console.log(dataToSend)
  
          fetch('https://off-therecordpicks.onrender.com/leagues', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend),
          })
          .then(response => {
              if (!response.ok) {
                  // setError(response);
                  console.log(response)
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log('Predictions submitted successfully:', data);
          })
          .catch(error => {
              console.error('Error submitting predictions:', error);
            
          });
      } catch (error) {
          console.error('Validation error:', error.message);
         
      }
  };

    
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


      const [clo ,setClo] = useState(false)
        const toggleClo =()=>{
        setClo(!clo)
        }

  return (
    <div className="dnd">
      <>
        

        <div style={{paddingTop:'15%',paddingBottom:'35%',color:"white"}}className="element-with-border3">
              <h1 ><span style={{backgroundColor:'black'}}>LEAGUES</span> </h1>
              <div className='text-align-center' style={{backgroundColor:'tan'}}>
      <h2 onClick={toggleClo} >Create a League</h2>
     { clo ? 
      <form  onClick={toggleClo}
    //   onSubmit={(e) => { e.preventDefault(); createLeague(); }}
      >
      <div><label>Name</label>
        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} /> 
      </div>
      <div><label>Motto</label>
        <input type="text" name="saying" placeholder='Message' value={formData.message} onChange={handleInputChange} />
      </div>
      <div><label>Logo</label>
        <input type="text" name="image" placeholder='Image Address' value={formData.image} onChange={handleInputChange} />
      </div>
      <div><label>Code</label>
        <input type="text" name="passcode  ( Optional )" placeholder='Passcode' value={formData.passcode} onChange={handleInputChange} />
      </div>

        <button onClick={handleSubmit} type="submit">Create League</button>
      </form> : null}

      <h2>Join a League</h2>
      {leagues.map(league => (
        <div key={league.id}>
          <span>{league.name}</span>
          <button 
        //   onClick={() => joinLeague(league.id)}
          >Join League</button>
        </div>
      ))}

     
      <h2>Delete a League</h2>
      {leagues.map(league => (
        <div key={league.id}>
          <span>{league.name}</span>
          <button 
        //   onClick={() => 
        //     deleteLeague(league.id)}
            >Delete League</button>
        </div>
      ))}



    </div>
        </div>
        <div style={{marginTop:"1%",marginBottom:'25px'}} className="element-with-border">
      <p className="snowwhite text-align-center " style={{minHeight:'10px'}}><strong >Picks4Points.com</strong></p></div>
                      <div style={{marginTop:"1%",marginBottom:'1%'}} className="element-with-borderBB"></div>              
        </>
    </div>
  );
}

export default Leagues;
