import React from 'react';
import '../app/App.css';
import { LoginButton } from '../v2-dropdown/components/LoginButton';
import { SignupButton } from '../v2-dropdown/components/SignupButton';
import facebook from "../images/fb.png"
import twitter from "../images/tw.png"
import google from "../images/gl.png"

export default function Home() {
  return (
    <>
<h3 className="log-in"> LOGIN
        <input type="text" className="input-field" placeholder="Enter Login ID" required /> <br/>
        <input type="password" className="input-field" placeholder="Enter Password" required />
        <LoginButton /> &nbsp;
        <SignupButton />

</h3> <br/><br/>
    <h5 className="social">------- SNS Account Login ---------- <br/>
    <img className="image" src={facebook} alt="facebook" />&nbsp;
    <img className="image" src={twitter} alt="twitter" />&nbsp;
    <img className="image" src={google} alt="google" />&nbsp;
    </h5>
    </>
  );
}
