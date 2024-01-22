import React, { useState, useEffect  } from "react";
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import './App.css';
import * as Yup from 'yup';  
import Dnd2 from './Dnd2';

function Leagues({user,setLN,appLeagues}) {

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
  const navigate = useNavigate()



      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        message: Yup.string().required('Message is required'),
        // image: Yup.string().required('Image is required'),
        passcode: Yup.string(),
      });


    
      const [formData, setFormData] = useState({
        name: '',
        owner_id: user ? (user.id !== undefined ? user.id : backupID) : 3,
        message: '',
        image: '',
        passcode: '',
        members: user ? (user.username !== undefined ? user.username : user.userName) : '',
      });
      console.log(formData)
      // console.log(user.username !== undefined ? user.username : user.userName)
    
/////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Validate the form data using Yup
          console.log('Before validation:', formData);
          // await validationSchema.validate({ formData });
  
          const dataToSend = {
            owner_id: user.id !== undefined ? user.id : backupID,
            name: formData.name,
            message: formData.message,
            image: formData.image,
            members: formData.members,
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
              navigate('/results')

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


      const [clo ,setClo] = useState(2)
        const toggleClo =()=>{
        setClo(0)
        }

   
        const [leagues, setLeagues] = useState([appLeagues])

        useEffect(() => {
        fetch('https://off-therecordpicks.onrender.com/leagues')
        .then(response => response.json())
        .then(data => setLeagues(data.leagues))
        .catch(error => console.error('Error fetching data:', error));
      }, []); 
      console.log(leagues)



      const userLeagues =  user && leagues.length > 1 ? leagues.filter(league => league.members.some(member => member.username === user.username)) : [];
      console.log(userLeagues);



      const joinLeague = async (leagueId) => {
        try {
          const response = await fetch(`https://off-therecordpicks.onrender.com/leagues/${leagueId}/members`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: user.id,  // Assuming user.id is the correct field
              // username: user.username,
            }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to join the league');
          }
      
          // Assuming leagues state is used to render the list
          setLeagues((prevLeagues) =>
            prevLeagues.map((league) =>
              league.id === leagueId ? { ...league, members: [...league.members, user.username] } : league
            )
          );
      
          console.log('User joined the league successfully');
        } catch (error) {
          console.error('Error joining the league:', error);
        }
      };

      const [showMembers, setShowMembers] = useState({});

      const offMembers = (leagueId) => {
        console.log(leagueId)
        setShowMembers((prevShowMembers) => ({
          ...prevShowMembers,
          [leagueId]: !prevShowMembers,
        }));
      };
      const onMembers = (leagueId) => {
        console.log(leagueId)
        setShowMembers((prevShowMembers) => ({
          ...prevShowMembers,
          [leagueId]: prevShowMembers,
        }));
      };
      

      useEffect(() => {
        console.log(showMembers);
      }, [showMembers]);
      
      

    

        

  return (
    <div className="dnd">

      { user ?  <>
      <div style={{marginBottom:''}}>
      <div style={{backgroundColor:'whitesmoke'}}>

      <div className={`element-with-border3`}>
        <center> <h3 
        style={{margin:'0',marginBottom:'-3px'}}  
        className="p4pplusBlack"></h3></center>
       { userLeagues.length > 0 ? <div style={{}}>
              <h1 style={{borderBottom:'10px solid black',margin:'0',backgroundColor:'black' }}><span style={{border:'2px solid black',backgroundColor:'white',color:'black',padding:' 0 5%'}}>My Leagues</span> </h1>
              {/* <div className='' style={{backgroundColor:''}}> */}
        
                  
          <div className={`element-with-border3 paddingneeds`} >
                {userLeagues.map(league => (
                <div className="flex-start" style={{border:'black 2px solid',borderRadius:'10%', margin:'0% 5%', marginTop:'5%',backgroundColor:'whitesmoke',cursor:'pointer'}}
                onClick={() => {
                  setLN(league);
                  navigate('/leagues/deatils');
                }}
                
                >
                <span className="LeftOne"> <h2>{league.name}</h2>{league.message}</span>
                <span className="RightOne">
                  <h1 style={{
                        textAlign:'center',
                        width: '80%',
                        height: '100px',
                        backgroundColor: 'white',
                        padding: '0px 0px',
                        backgroundSize: '100% 100%',
                        borderRadius:'5%',
                        backgroundImage: `url(${league.image})`
                      }} alt={`${league.image}`}></h1></span>
                      
                      
                      
                      </div>


                ))}</div>

       </div> : null }



      </div>
        </div></div>
 <div style={{paddingBottom:'5%',color:"white"}}>
        



        <div style={{backgroundColor:'whitesmoke'}} className="flex-start">
      <span  style={{
            borderTop: '15px solid red',
            borderRight: '15px solid blue',
            borderLeft: '15px solid red',
            borderBottom: '15px solid blue',
            borderRadius: '10%',
            color: 'white',
            backgroundColor: 'white',
            padding:'5% 8%',
            borderRadius:'50%',
            
            }}
            className='p4pplus LeftOne'
            
            ></span> 
            <h1 className="LeftOne color-black" style={{margin:'5%'}} > League Settings</h1></div>
            <div style={{marginTop:"0%",marginBottom:'0%'}} className="element-with-borderBB"></div> 



    <div className="wholeOne2 flex text-align-center" style={{borderBottom:'10px solid whitesmoke',margin:'0' }}>  
      <div className="LeftOne2">
        {/* <h2 className={clo === 4 ? `chosenL`:`notLchosenL`} onClick={() => setClo(4)}>My Leagues </h2> */}
        <h2 className={clo === 2 ? `chosenL`:`notLchosenL`} onClick={() => setClo(2)}>About Leagues </h2>
        <h2 className={clo === 0 ? `chosenL`:`notLchosenL`} onClick={() => setClo(0)}>Create League</h2>
        <h2 className={clo === 1 ? `chosenL`:`notLchosenL`} onClick={() => setClo(1)}>Join a League</h2>
        <h2 className={clo === 3 ? `chosenL`:`notLchosenL`} onClick={() => setClo(3)}>Delete a League</h2>
      </div>

      {/* ////////////////////////////////////////////////////////////////////// */}

      <div style={{backgroundColor:'whitesmoke'}} className="RightOne2">
        {clo === 0 ? <h2 style={{backgroundColor:'black',cursor:'crosshair'}} className="notLchosenL">Create League </h2>: null }
        {clo === 1 ?<h2 style={{backgroundColor:'black',cursor:'crosshair'}}  className="notLchosenL">Join a League </h2>: null }
        {clo === 2 ? <h2  style={{backgroundColor:'black',cursor:'crosshair'}} className="notLchosenL">About Leagues </h2>: null }
        {clo === 3 ? <h2  style={{backgroundColor:'black',cursor:'crosshair'}} className="notLchosenL">Delete a League </h2>: null }
        {/* {clo === 4 ? <h2  style={{backgroundColor:'black'}} className="notLchosenL">My Leagues </h2>: null } */}

        {clo === 0 ? 
      <div className="create color-black ">
        <form  className="formL"
        //   onSubmit={(e) => { e.preventDefault(); createLeague(); }}
          >
            <h3 >League Details</h3>
          <div className="formL"><label>Name </label>
            <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} /> 
          </div>
          <div className="formL"><label>Motto </label>
            <input type="text" name="message" placeholder='Message' value={formData.message} onChange={handleInputChange} />
          </div>
          <div ><label>Logo </label>
            <input type="text" name="image" placeholder='Image Address' value={formData.image} onChange={handleInputChange} />
          </div>
          <h1 className="" style={{
                textAlign:'center',
                width: '60%',
                height: '100px',
                backgroundColor: 'white',
                padding: '0px 0px',
                backgroundSize: 'cover',
                margin:'0 20%',
                backgroundImage: `url(${formData.image})`,
                color:'black'
              }} alt={`Preview of Logo`}>Preview</h1>
          <div><label>Code</label>
            <input type="text" name="passcode" placeholder='Passcode  ( Optional )' value={formData.passcode} onChange={handleInputChange} />
          </div>

            <button className="submitb" onClick={handleSubmit} type="submit">Create League</button>
          </form> 
          </div> : null }

        {clo === 1 ? 
        <div className="join ">
      {leagues.map(league => (
        <div className="joinL " key={league.id}>
          <div ></div><h3>{league.name}</h3>
          
        <span>{league.message}</span>
          <h1 style={{
                textAlign:'center',
                width: '60%',
                height: '100px',
                backgroundColor: 'white',
                padding: '0px 0px',
                backgroundSize: 'cover',
                margin:'0 20%',
                backgroundImage: `url(${league.image})`
              }} alt={`${league.image}`}></h1>
            
            <div className="flex" >
                  <p>{showMembers[league.id] ? 'Hide Members' : 'Show Members'}</p>
                  {showMembers[league.id] ? <p
                  onClick={() => offMembers(league.id)}
                    style={{
                      textAlign: 'center',
                      width: '15px',
                      height: '15px',
                      backgroundColor:'green',
                      borderRadius: '50%',
                      border: 'white 1px solid',
                      marginLeft: '2%',
                      cursor:'pointer'
                    }}
                  ></p>  :
                  <p
                  onClick={() => onMembers(league.id)}
                    style={{
                      textAlign: 'center',
                      width: '15px',
                      height: '15px',
                      backgroundColor:'red',
                      borderRadius: '50%',
                      border: 'white 1px solid',
                      marginLeft: '2%', cursor:'pointer'
                    }}
                  ></p> }
                </div>

                {showMembers[league.id] ? <>

              {league.members? league.members.map(member => ( 
              
              <div className="flex "><p style={{
                textAlign:'center',
                width: '30px',
                height: '30px',
                backgroundColor: 'white',
                padding: '0px 0px',
                backgroundSize: 'cover',
                marginRight: '5%',
                backgroundImage: `url(${member.image})`,
                borderRadius:'50%',
              }}></p><p> {member.username}</p></div> )): null} </> : null}


          
          <button className="cursor-pointer"
          onClick={() => joinLeague(league.id)}
          >Join League</button>
        </div>
      ))}
      
      </div> : null }

        {clo === 2 ? 
      <div className="aboutL ">
          <p className="color-black">Leagues are to help you and some friends make predictions and compare them between a particular group of friends. This allows you to compete between your group similar to Fantasy Football </p>     
          <p style={{height:'50px'}}></p>
          <span style={{
            borderTop: '15px solid red',
            borderRight: '15px solid blue',
            borderLeft: '15px solid red',
            borderBottom: '15px solid blue',
            borderRadius: '10%',
            color: 'white',
            backgroundColor: 'white',
            padding:'12% 15%',
            borderRadius:'50%',
            
            }}
            className='p4pplus'
            //  onClick={() => setIsPaused(!isPaused)}
            ></span>
      </div> : null }

      {clo === 3 ? 
      <div className="delete">
       <p className="color-black">Development</p></div> : null }

       {clo === 4 ? 
      <div className="delete">
       <p className="color-black">My Leagues</p>
       {userLeagues.map(league => (
       <div className="flex">
       
        <h1 style={{
              textAlign:'center',
              width: '60%',
              height: '100px',
              backgroundColor: 'white',
              padding: '0px 0px',
              backgroundSize: 'cover',
              margin:'0 20%',
              backgroundImage: `url(${league.image})`
            }} alt={`${league.image}`}></h1> <p>{league.name}</p><span>{league.message}</span>
            
            </div>


       ))}
       
       
       
       </div> : null }
      

        
          
      
      
      </div>

    </div>

    {/* </div> */}
        </div>


        <div style={{marginTop:"1%",marginBottom:'25px'}} className="element-with-border">
      <p className="snowwhite text-align-center " style={{minHeight:'10px'}}><strong >Picks4Points.com</strong></p></div>
                      <div style={{marginTop:"1%",marginBottom:'1%'}} className="element-with-borderBB"></div>              
        </>:
        null
        }
    </div>
  );
}

export default Leagues;