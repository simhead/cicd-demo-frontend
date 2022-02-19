import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function SignupButton() {
    return (
        <Link to='/users'>
            <button className='btn'>Sign Up</button>
        </Link>
    );
}
