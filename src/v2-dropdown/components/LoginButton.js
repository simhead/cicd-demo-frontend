import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function LoginButton() {
  return (
    <Link to='/users'>
      <button className='btn'>LOGIN</button>
    </Link>
  );
}
