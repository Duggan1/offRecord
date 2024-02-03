import React, { useState, useEffect } from 'react';
import P4pHeader from './P4pHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LeagueAdjustments({ user, leagueName, appLeagues, onLogout }) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    image: '',
    // Add other fields as needed
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (leagueName) {
      setFormData({
        name: leagueName.name || '',
        message: leagueName.message || '',
        image: leagueName.image || '',
        // Add other fields as needed
      });
    }
  }, [leagueName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [GTC , setGTC ] = useState(false)
  const [response , setResponse ] = useState('')

  const handleUpdateLeague = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
  
    try {
      setGTC(true)   
      const response = await axios.patch(`https://off-therecordpicks.onrender.com/leagues`, formData);
  
      console.log(response.data.message); 
      setResponse(response.data.message);
      user.image = formData.image
      setGTC(false)   
       // Log the server response
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <>
      <P4pHeader onLogout={onLogout} user={user} />
      <div className="text-align-center" style={{ backgroundColor: 'white', paddingBottom: '5%' }}>
        <div className="leagueBGH" style={{ paddingBottom: '20%' }}>
          <h2
            className="fs45 color-red "
            onClick={() => navigate('/leagues')}
            style={{ cursor: 'pointer', textAlign: 'start', marginLeft: '5%' }}
          >
            &#8592;
          </h2>
        </div>


        <div className="leag marginBottom5per text-align-center ">
            {/* <div className='flex-start'> */}
                <div className='' style={{justifyContent:'center',alignItems:'center'}}>
            <h1 style={{ margin: '5% 0px' }}>
            <span className="p4pborder fs20" style={{ backgroundColor: 'white', padding: '0px 5px' }}>
              {leagueName ? leagueName.name : null} League
            </span>
          </h1><center><h2
            className="leagueDImg  margin-top-2per width45 editLeagueInput"
            style={{
              backgroundImage: `url("${leagueName.image}")`,
            }}
          ></h2></center>
          <p style={{ paddingBottom:'5% '}}>
            <span style={{  padding: '5px 15%',backgroundColor: 'white',border: '2px solid black' }}>
              {leagueName ? leagueName.message : null}
            </span>
          </p>
            </div>
          
            {/* </div> */}
            <div style={{borderTop:'solid white 3px'}} class="element-with-border2"></div>
            </div>
          {/* Add your form here */}<h3 className='landunder fs20 Twoigs'>Edit League </h3>

          <form onSubmit={handleUpdateLeague} className='margin-0-10 text-align-center Twoigs border-1px-black' style={{backgroundColor:'whitesmoke'}}>
            
            <label>League Name:</label><br></br>          
              <input type="text" className='editLeagueInput' name="name" value={formData.name} onChange={handleChange} placeholder={leagueName?.name} />
            <br></br>
            <label>League Message:</label><br></br>              
              <input type="text" name="message" className='widh-75per editLeagueInput' value={formData.message} onChange={handleChange} placeholder={leagueName?.message} />
            <br></br>
            <label>League Image URL:</label><br></br>
                <input className='widh-75per editLeagueInput marginBottom5per' type="text" name="image" value={formData.image} onChange={handleChange} placeholder={leagueName?.image} />
            <br></br>
            {/* Add other form fields as needed */}
            <h2
            className="leagueDImg editLeagueInput"
            style={{
              backgroundImage: `url("${formData.image}")`,
            }}
          >Preview</h2>
            <button className='submitb' type="submit p4pborder ">Update League Info</button>
          </form>
        
      </div>
    </>
  );
}

export default LeagueAdjustments;
