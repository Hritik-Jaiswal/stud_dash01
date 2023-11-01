import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link, useNavigate } from "react-router-dom";
import "./register.scss"
import { useState } from 'react';
import axios from 'axios';


const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })
    
    const navigate = useNavigate()

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value, e.target.name)
  };
  const handleClick = async e => {
    e.preventDefault()
    try {
        const res = await axios.post("http://localhost:5000/user/register", userData)
        console.log(res)
        navigate('/user/login')
    } catch (error) {
        console.log("Error:",error)
    }
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Registration Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <GoogleIcon className='icon' />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <FacebookIcon className='icon' />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <GitHubIcon className='icon'/>
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input onChange={(e) => handleChange(e)} type="text" name='username' placeholder="Username" />
          <input onChange={(e) => handleChange(e)} type="email" name='email' placeholder="Email" />
          <input onChange={(e) => handleChange(e)} type="password" name='password' placeholder="Password" />
          <button className="submit" style={{ cursor: "pointer"}} onClick={handleClick}>Register</button>
          <Link to={"/"}>Or Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
