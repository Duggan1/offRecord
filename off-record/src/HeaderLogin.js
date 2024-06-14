import React, { useState } from "react";
import './App.css';
import * as yup from 'yup';
// import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Header from "./Header";
import P4pHeader from "./P4pHeader";



function HeaderLogin({ onLogin, ufcCard,onLogout  }) {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [GTC , setGTC ] = useState(false)
    
   
    const [errors, setErrors] = useState([]);

    // Yup validation schema
    const validationSchema = yup.object().shape({
        userName: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
        .min(6, 'Password must be 6 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
        fullName: yup.string().required('Full Name is required'),
        
        Email: yup.string().email('Invalid email').required('Parents\' Email is required'),
        
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate the form data using Yup
            setGTC(true) 
            await validationSchema.validate({
                userName,
                password,
                fullName,
                Email,
                
            });

            // If validation passes, create a new student object
            const newStudent = {
                userName,
                password,
                fullName,
                Email,
                
                
            };
            fetch('https://off-therecordpicks.onrender.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
              }).then((r) => {
                if (r.ok) {
                    r.json().then(console.log('success'));
                    // setStudents([...students, newStudent]);
                    
                    onLogin(newStudent)
                    setGTC(false) 
                    navigate('/');
          } else {
            console.log('failure');
            setGTC(false) 
          }
        });

            // Reset the form fields after submission
            setUserName('')
            setFullName('');
            setPassword('');
            setEmail('');
            
        } catch (error) {
            // Handle validation errors
            console.error(error.message);
            setGTC(false)
            const validationErrors = {};
            error.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
            });
            setErrors(error.message);
            
        }
    };

    const [username, setUsername] = useState("")
    const [_password, set_password] = useState("")
    const [isIncorrect, setIsIncorrect] = useState(false)

    const toggleIncorrect =()=>{
        setIsIncorrect(!isIncorrect)
    }
    function handleSubmit2(e) {
        e.preventDefault();
        setGTC(true)
        fetch("https://off-therecordpicks.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, _password }),
            })
            .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error("Login failed");
            }
            })
            .then((user) => {
            console.log(user);
            onLogin(user);
            setGTC(false)
            navigate("/");
            })
            .catch((error) => {
            console.error("Login error:", error);
            setGTC(false)
            toggleIncorrect();
            });

      }
      

    const [showVideo, setShowVideo] = useState(false);

    const toggleVideoVisibility = () => {
      setShowVideo(!showVideo);
    };
    console.log(errors)

    return (
        <div className="johnn">
          {/* <P4pHeader handleLogout={onLogout} ufcCard={ufcCard}/> */}
            {/* <h3 style={{marginTop:'0%'}}>Sign Up / Login</h3> */}
            {/* <div style={{ display: 'inline-block',marginBottom:'5%',marginTop:'5%',}}className="custom-checkbox">
          <input
            id="status"
            type="checkbox"
            name="status"
            checked={showVideo}
            onChange={toggleVideoVisibility}
          />
          <label style={{}} htmlFor="status">
            <div
            
              className={`status-switch ${showVideo ? 'checked' : ''}`}
              data-unchecked="Login"
              data-checked="Sign-Up"
            ></div>
          </label>
        </div> */}

        { showVideo ? 
            <form className="loginsu" onSubmit={handleSubmit}>
                {/* <label className="caged-black bold">Username:</label> */}
                <input className="ltypediv" type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required /><br></br>
                {/* <label className="caged-black bold">Password:</label> */}
                <input className="ltypediv" type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>

                {/* <label className="caged-black bold">Full Name:</label> */}
                <input className="ltypediv" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /><br></br>
                
                {/* <label className="caged-black bold" >Email:</label> */}
                <input className="ltypediv" type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
                
                <button style={{marginRight:'17%',minWidth:'10%', marginTop:'3%', backgroundColor:'whitesmoke'}} className="submitb" type="submit">Submit</button>
                
                {errors && (<p className="errors" style={{ border: errors.length > 1 ? '2px solid darkred' : 'none' }}>{errors} </p>)}

                



            </form> : 
            // <form >
            <form  className="loginu" onSubmit={handleSubmit2}>
            {/* <label className=" caged-black bold" >Username:</label> */}
            <input
            className="ltypediv"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* <br></br> */}
            {/* <label className="caged-black bold" >Password:</label> */}
            <input
            className="ltypediv"
            type="password"
            value={_password}
            placeholder="Password"
            onChange={(e) => set_password(e.target.value)}
          />
          <br></br>
{!GTC ? 
            <center><button style={{minWidth:'20%', marginTop:'3%', backgroundColor:'whitesmoke'}} className="submitb2"  type="submit">Login</button></center>
          :
            <div style={{height:'50px',marginRight:'19%', backgroundPosition:'right'}} className="loading3"></div>}
          
            {isIncorrect ? <div>
                <h2>Username or Password Invalid, Please Try Again!</h2>
            </div>: null}
          </form>
                
                
                }


            
        </div>
    )
}

export default HeaderLogin;
