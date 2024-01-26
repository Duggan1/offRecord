import React, { useState, useEffect  } from "react";
import { NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import './App.css';

function Dnd2() {
    
  
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

  return (
    <div className="dnd">
      <>
        

        <div style={{paddingTop:'15%',paddingBottom:'35%'}}className="element-with-border3">
              <div style={{marginTop:"5%",
                          
                          backgroundPosition: '50% 50%',
                          backgroundColor: currentClass === 'p4p8' ? 'black':'whitesmoke',
                          border:'3px solid black',
                          borderRadius:'50%',
                          backgroundSize: '75% 75%'}} 
                 className={`${currentClass}`}></div> 
        </div>
        <div style={{backgroundColor:'whitesmoke'}} >
            <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>
                 <p className=" text-align-center " style={{minHeight:'10px'}}><strong >Picks4Points.com</strong></p>
                 <div style={{borderBottom:'solid white 3px',borderTop:'solid white 3px'}} class="element-with-border"></div>         
            </div>          
   </>
    </div>
  );
}

export default Dnd2;
