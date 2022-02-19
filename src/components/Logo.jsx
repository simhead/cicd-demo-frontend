import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../soynet2.png'
import {Link} from "react-router-dom";
import './Navbar.css';

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
    color: '#f5f5f5',
})``

class Logo extends Component {

    render() {
        return (
            <Wrapper>
                <img src={logo} width="50" height="50" alt="soynet.io" />
                <Link to="/"  >
                    SoyNet Frontend Application
                </Link>


            </Wrapper>
        )
    }
}

export default Logo
