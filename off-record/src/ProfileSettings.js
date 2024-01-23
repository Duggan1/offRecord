import P4pHeader from "./P4pHeader";
import React, { useState, useEffect } from 'react';

function ProfileSettings({ user,leagueName, appLeagues,ufcResults ,weRlive,results2 ,menow, tapImage, onLogout }) {
//   const {  } = useParams();

const [fixin, setFixin]=  useState(true)




  console.log(user)

  return (
    <>
    <P4pHeader onLogout={onLogout} user={user} />

{user ?
    <div className="bg-white"><h1 className="text-align-center fs45">Settings</h1>
{fixin ? <>
    <div className="flex"><div className="RightOne text-align-center">
    <p>Hello, {user?.username} {user?.userName}</p>
                <p>{user?.fullname}</p>
                <p>{user?.email}</p>
    {/* <p></p> */}</div>

    <div className="LeftOne">
    <h1 style={{
                        textAlign:'center',
                        width: '80%',
                        height: '100px',
                        backgroundColor: 'white',
                        padding: '0px 0px',
                        backgroundSize: '100% 100%',
                        borderRadius:'50%',
                        backgroundImage: `url(${user?.image || 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'})`

                      }} alt={`${user?.image}}`}></h1>
     </div>                 
    </div>
    <div className="text-align-center ">
        <button className="submitb" onClick={() => setFixin(!fixin)} style={{padding:'0'}}> Update Profile</button>

    </div>

</>: <><p onClick={() => setFixin(!fixin)}>Patch</p> <div className="text-align-center ">
        <button className="submitb" onClick={() => setFixin(!fixin)} style={{padding:'0'}}> Update Profile</button>

    </div></>}
    <div style={{paddingTop:'1%',paddingBottom:'5%',marginTop:'5%'}}className="element-with-border3"></div></div>
    : <div className="snowwhite marginTop20 flex" >
    <p className="pt5">Please Sign In to view your settings </p> <h1 className="fs65">&#8599;</h1>
    </div> }
    </>
  );
}

export default ProfileSettings;