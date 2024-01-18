import React, { useState, useEffect  } from "react";
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import './App.css';
import * as Yup from 'yup';  
import Dnd2 from './Dnd2';

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
        // image: Yup.string().required('Image is required'),
        passcode: Yup.string(),
      });


      const [leagues, setLeagues] = useState([]);
      const [formData, setFormData] = useState({
        name: '',
        // Assuming the owner_id is obtained from authentication
        user_id: user ? user.id : 3 ,
        message:'',
        image:'',
        passcode:'' // Assuming the user_id is obtained from authentication
      });
      console.log(formData)
    
/////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Validate the form data using Yup
          console.log('Before validation:', formData);
          // await validationSchema.validate({ formData });
  
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

        // const files = [
        //   {
        //     title: 'IMG_4985.HEIC',
        //     size: '1.9 MB',
        //     source:
        //       'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        //   },
        // ]
        // const actions = [
        //   {
        //     title: 'Request time off',
        //     href: '#',
        //     icon: ClockIcon,
        //     iconForeground: 'text-teal-700',
        //     iconBackground: 'bg-teal-50',
        //   },
        //   {
        //     title: 'Benefits',
        //     href: '#',
        //     icon: CheckBadgeIcon,
        //     iconForeground: 'text-purple-700',
        //     iconBackground: 'bg-purple-50',
        //   },
        //   {
        //     title: 'Schedule a one-on-one',
        //     href: '#',
        //     icon: UsersIcon,
        //     iconForeground: 'text-sky-700',
        //     iconBackground: 'bg-sky-50',
        //   },
        //   {
        //     title: 'Payroll',
        //     href: '#',
        //     icon: BanknotesIcon,
        //     iconForeground: 'text-yellow-700',
        //     iconBackground: 'bg-yellow-50',
        //   },
        //   {
        //     title: 'Submit an expense',
        //     href: '#',
        //     icon: ReceiptRefundIcon,
        //     iconForeground: 'text-rose-700',
        //     iconBackground: 'bg-rose-50',
        //   },
        //   {
        //     title: 'Training',
        //     href: '#',
        //     icon: AcademicCapIcon,
        //     iconForeground: 'text-indigo-700',
        //     iconBackground: 'bg-indigo-50',
        //   },
        // ]
        // function classNames(...classes) {
        //   return classes.filter(Boolean).join(' ')
        // }
        

  return (
    <div className="dnd">

      { user ?  <>
        

        <div style={{paddingTop:'15%',paddingBottom:'35%',color:"white"}}className="element-with-border3">
              <h1 ><span style={{backgroundColor:'black'}}>League Settings</span> </h1>
              <div className='text-align-center' style={{backgroundColor:'tan'}}>
      
    <div className="display- flex">  
    <div className="LeftOne">
       { clo ? <>
   {/* <h2 onClick={toggleClo} >Create a League</h2> */}
      <form  
    //   onSubmit={(e) => { e.preventDefault(); createLeague(); }}
      ><h3 onClick={toggleClo}>League Details</h3>
      <div><label>Name</label>
        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} /> 
      </div>
      <div><label>Motto</label>
        <input type="text" name="message" placeholder='Message' value={formData.message} onChange={handleInputChange} />
      </div>
      <div><label>Logo</label>
        <input type="text" name="image" placeholder='Image Address' value={formData.image} onChange={handleInputChange} />
      </div>
      <div><label>Code</label>
        <input type="text" name="passcode" placeholder='Passcode  ( Optional )' value={formData.passcode} onChange={handleInputChange} />
      </div>

        <button onClick={handleSubmit} type="submit">Create League</button>
      </form> </>: <h2 onClick={toggleClo} >Create a League</h2>}</div>

      <div  className="LeftOne"><h2>Join a League</h2>
      {leagues.map(league => (
        <div key={league.id}>
          <span>{league.name}</span>
          <button 
        //   onClick={() => joinLeague(league.id)}
          >Join League</button>
        </div>
      ))}</div>

    </div>


     
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
        </>:<Dnd2/> }
    </div>
  );
}

export default Leagues;
