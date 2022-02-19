//import React, { Component } from 'react'
import React, { useState, Component } from 'react'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Logo from './Logo'
import Links from './Links'
import Clock from "./Clock";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { MenuItems } from "./MenuItems"
import { Button} from "./Button";
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../soynet3.png'

/*
function NavBar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>

            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <Logo /><Clock />
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>

                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                </nav>

            </IconContext.Provider>
        </>
    );
}
*/

class NavBar extends Component {

    state = {clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render() {
        return (
            <nav className="navbar-items">
                <h1 className="navabar-logo">&nbsp;&nbsp;&nbsp;
                    <img src={logo} width="100" height="35" alt="soynet.io" />
                    <Clock />
                </h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}

                </ul>
                <Button> Sign Up</Button>
            </nav>
        )
    }
}


export default NavBar
