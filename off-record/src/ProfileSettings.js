import P4pHeader from "./P4pHeader";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileSettings({ user, onLogout }) {
  const [fixin, setFixin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    image: user?.image || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [GTC , setGTC ] = useState(false)
  const [response , setResponse ] = useState('')

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
  
    try {
      setGTC(true)   
      const response = await axios.patch(`/users/${user.id}`, formData);
  
      console.log(response.data.message); 
      setResponse(response.data.message);
      setGTC(false)   
       // Log the server response
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <>
      <P4pHeader onLogout={onLogout} user={user} />

      {user ? (
        <div className="bg-white text-align-center ">
          <h1 className="fs45">Settings</h1>
          {fixin ? (
            <>
              <div className="flex">
                <div className="RightOne text-align-center">
                  <h2 className="fs20"> {user?.username} {user?.userName}</h2>
                  <p className="pt5">Hello, {user?.fullname}</p>
                  <p className="pt5">{user?.email}</p>
                </div>

                <div className="LeftOne text-align-center">
                  <h1 className="ProfilePicPreview" style={{
                    textAlign: 'center',justifyContent:'center', margin:' 0 10%',
                    backgroundImage: `url(${user?.image || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'})`
                  }} alt={`${user?.image}}`}></h1>
                </div>
              </div>

              <div className="text-align-center">
                <button className="submitb" onClick={() => setFixin(!fixin)} style={{ padding: '0' }}>
                  Edit Profile
                </button>
              </div>

            </>
          ) : (
            <>

             <h2 className="fs45 color-red "onClick={() => setFixin(!fixin)} style={{cursor:'pointer',textAlign:'start', marginBottom:'-35px',marginTop:'-10px', marginLeft:'5%'}} >&#8592;</h2>
              <p className="text-align-center" >Edit Profile</p>

              {/* Form */}
              <form className="formProfilePatch">
                
              <center>
                <div className="ProfilePicPreview" style={{backgroundImage:`url(${formData?.image || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'})`}}>

                </div></center>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label><br></br>
                  <input className="fgpsi"
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label><br></br>
                  <input className="fgpsi"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Profile Picture</label><br></br>
                  <input className="fgpsi"
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter your image URL"
                    required
                  />
                </div>

                <div className="text-align-center">
                {!GTC ? 
                <button className="submitb" onClick={handleUpdateProfile} style={{ padding: '0' }}>
                Update Profile
                </button> : <div style={{height:'40px'}} className="loading3"></div>}

                </div>
                
              </form>
              {/* End Form */}
              {response ? <p className="color-red">{response} </p>: null}


            </>
          )}
          <div style={{ paddingTop: '1%', paddingBottom: '5%', marginTop: '5%' }} className="element-with-border3"></div>
        </div>
      ) : (
        <div className="snowwhite marginTop20 flex">
          <p className="pt5">Please Sign In to view your settings </p> <h1 className="fs65">&#8599;</h1>
        </div>
      )}
    </>
  );
}

export default ProfileSettings;
