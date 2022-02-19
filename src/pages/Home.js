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
<h3 className="log-in"> 로그인
        <input type="text" className="input-field" placeholder="아이디를 입력해주세요" required /> <br/>
        <input type="password" className="input-field" placeholder="패스워드를 입력해주세요" required />
        <LoginButton /> &nbsp;
        <SignupButton />

</h3> <br/><br/>
    <h5 className="social">------- SNS 계정 로그인 ---------- <br/>
    <img className="image" src={facebook} alt="facebook" />&nbsp;
    <img className="image" src={twitter} alt="twitter" />&nbsp;
    <img className="image" src={google} alt="google" />&nbsp;
    </h5>
    </>
  );
}
