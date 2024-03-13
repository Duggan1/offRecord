import React from 'react';
import About from './About';
import P4pHeader from './P4pHeader';
import { useNavigate } from 'react-router-dom';


function Aboutp4p({ user, onLogout }) {
    const navigate = useNavigate();
  // Example content, adjust as needed
  return (<div className='rvb22'>
  <P4pHeader onLogout={onLogout} user={user} />
    <div >
    <h1 style={{padding : '20% 0',textAlign:'center',color:'white'}}>
      <span style={{
            borderTop: '15px solid red',
            borderRight: '15px solid blue',
            borderLeft: '15px solid red',
            borderBottom: '15px solid blue',
            borderRadius: '10%',
            color: 'white',
            backgroundColor: 'black',
            padding:'12% 15%',
            borderRadius:'50%'
}}
 className='p4pplus'
 
 ></span></h1>
      {user && <p>Welcome, {user.name}!</p>}

      </div>
      <div className='flex'>
        <div style={{width:'50%',padding:'0 5%'}}> <p className='text-black white75 border-1px-black'style={{padding:'0 5%',borderRadius:'15px'}}>Our platform is a App for Fight fans, offering a unique opportunity to showcase their fight prediction skills. The goal is simple: win the event by making accurate predictions for each fight on the card. But we don't just focus on event champions. We also reward consistency through our total points system. Even if you don't win an event, every correct prediction boosts your total points, highlighting your expertise and dedication. What sets us apart is that we operate entirely without monetary transactions. Instead, we rely on the support of our community through donations to secure our domain name and maintain the site's functionality.</p>
        </div>
        <div style={{width:'50%',marginLeft:'auto',marginRight:'2%'}}>
            
            <center className='side-borders-p4p bg-white' style={{ maxWidth:'800px',borderRadius:'10px'}}>
            <div className='element-with-borderTB'></div>
                <iframe
                    class=""
                    src="https://www.instagram.com/picks4points/embed"
                    width="90%"
                    height="300px"
                    frameborder="0"
                    scrolling="no"
                    allowtransparency="true"
                    

                ></iframe>
                <div className='element-with-borderBB'></div>
                </center>
            <div style={{marginTop:'100px'}} className='element-with-borderTB'></div>
                <About/>
            <div className='element-with-borderBB'></div>

       
        

        </div>
      </div>
      <div className='white75 border-1px-black' style={{marginTop:'100px',marginRight:'10%',marginLeft:'10%',borderRadius:'15px',}}>
                <h2 className='text-align-center text-black fs20 formL text-bold' >Frequently Asked Questions!</h2>
                <div className='flex'>
                        <div style={{marginLeft:'1%'}}><iframe
                src="https://www.loom.com/embed/b73e3fe0d562448abba20f7f717b239e?sid=03688900-a533-45f9-a798-1884bd4e9183"
                frameBorder="0"
                allowFullScreen
                title="Change Profile Picture"
                style={{ borderRadius: '5%', width: '90%', height: '150px'  }}
                ></iframe>
                    <h2 className='text-align-center text-black formL' ><span className='border-buttop bg-white'>Change Profile Picture</span></h2>
                    </div>
                        <div><iframe
                src="https://www.loom.com/embed/b5b84a7004c84748a0078ad2d935f31a?sid=c3a90499-6e5a-4372-a7e8-e968285c2781"
                frameBorder="0"
                allowFullScreen
                title="Leagues"
                style={{ borderRadius: '5%', width: '90%', height: '150px'  }}
                ></iframe><h2 className='text-align-center text-black formL ' ><span className='border-buttop bg-white'>P4P Leagues</span></h2>
                </div>
            </div>
        </div>

      

    {/* <div style={{marginTop:'200px',marginRight:'20%',marginLeft:'20%',backgroundColor:'rgba(128, 128, 128, 0.634)',borderRadius:'75px'}}>
      <h2 className='text-align-center snowwhite' >Video Tutorials coming soon....</h2> */}
      <h1 style={{padding : '20% 0',textAlign:'center',color:'white',marginTop:'100px'}}>
      <span  onClick={() => navigate('/section3')}
      style={{
            borderTop: '15px solid red',
            borderRight: '15px solid blue',
            borderLeft: '15px solid red',
            borderBottom: '15px solid blue',
            borderRadius: '10%',
            color: 'white',
            backgroundColor: 'black',
            padding:'12% 15%',
            borderRadius:'50%',cursor:'pointer'
}}
 className='aci'
 
 ></span></h1>
 <p className='color-red text-align-center' onClick={() => navigate('/section3')} style={{cursor:'pointer'}}>Click to Pick!</p>
    {/* </div> */}
      </div>
  );
}

export default Aboutp4p;
