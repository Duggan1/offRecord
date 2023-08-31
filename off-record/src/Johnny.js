import React, { useState } from "react";
import './App.css';
import * as yup from 'yup';
// import axios from 'axios'
import {useNavigate} from 'react-router-dom'



function Johnny({ onLogin }) {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    
   
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
                    navigate('/');
          } else {
            console.log('failure');
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
            navigate("/");
            })
            .catch((error) => {
            console.error("Login error:", error);
            toggleIncorrect();
            });

      }
      

    const [showVideo, setShowVideo] = useState(false);

    const toggleVideoVisibility = () => {
      setShowVideo(!showVideo);
    };
    console.log(errors)

    return (
        <div className="johnny">
            <h1 style={{marginTop:'0%'}}>Sign Up / Login</h1>
            <div style={{ display: 'inline-block',marginBottom:'5%'}}className="custom-checkbox">
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
              data-unchecked="Sign-Up"
              data-checked="Login"
            ></div>
          </label>
        </div>

        { showVideo ? 
            <form className="loginsu" onSubmit={handleSubmit}>
                <label className="color-gold">Username:</label>
                <input className="ltypediv" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required /><br></br>
                <label className="color-gold">Password:</label>
                <input className="ltypediv" type="text" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>

                <label className="color-gold">Full Name:</label>
                <input className="ltypediv" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required /><br></br>
                
                <label className="color-gold" >Email:</label>
                <input className="ltypediv" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
                
                <button style={{marginRight:'17%',minWidth:'10%', marginTop:'3%'}} className="submitb" type="submit">Submit</button>
                
                {errors && (<p className="errors" style={{ border: errors.length > 1 ? '2px solid darkred' : 'none' }}>{errors} </p>)}

                



            </form> : 
            // <form >
            <form  className="loginsu" onSubmit={handleSubmit2}>
            <label className="  color-gold" >Username:</label>
            <input
            className="ltypediv"
              type="text"
              value={username}
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <label className="color-gold" >Password:</label>
            <input
            className="ltypediv"
            type="password"
            value={_password}
            placeholder=""
            onChange={(e) => set_password(e.target.value)}
          /><br></br>
            <button style={{marginRight:'17%',minWidth:'10%', marginTop:'3%'}} className="submitb"  type="submit">Login</button>
            {isIncorrect ? <div>
                <h2>Username or Password Invalid, Please Try Again!</h2>
            </div>: null}
          </form>
                
                
                }


            
        </div>
    )
}

export default Johnny;
