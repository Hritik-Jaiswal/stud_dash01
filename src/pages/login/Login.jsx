import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router-dom"

import "./login.scss"

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
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
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="submit">Login</button>
          <Link to={"./user/register"}>Or Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
