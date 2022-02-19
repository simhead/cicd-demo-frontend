import React, { useState, useEffect } from 'react';
import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import { Link } from 'react-router-dom';
import './NavBar.css';
import UserDropdown from './UserDropdown';
import DeviceDropdown from './DeviceDropdown';
import logo from "../../soynet2.png";
import Clock from "../../components/Clock";

function NavBar() {
  const [click, setClick] = useState(false);
  const [userdropdown, setUserDropdown] = useState(false);
  const [devicedropdown, setDeviceDropdown] = useState(false);
  const [scrolled,setScrolled]=React.useState(false);

  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })

  let navbarClasses=['navbar'];
  if(scrolled){
    navbarClasses.push('scrolled');
  }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setUserDropdown(false);
    } else {
      setUserDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setUserDropdown(false);
    } else {
      setUserDropdown(false);
    }
  };

  const onDeviceMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDeviceDropdown(false);
    } else {
      setDeviceDropdown(true);
    }
  };

  const onDeviceMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDeviceDropdown(false);
    } else {
      setDeviceDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} width="150" height="50" alt="soynet.io" />

        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/users'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Users <i className='fas fa-caret-down' />
            </Link>
            {userdropdown && <UserDropdown />}
          </li>
          <li
              className='nav-item'
              onMouseEnter={onDeviceMouseEnter}
              onMouseLeave={onDeviceMouseLeave}
          >
            <Link
                to='/devices'
                className='nav-links'
                onClick={closeMobileMenu}
            >
              Devices <i className='fas fa-caret-down' />
            </Link>
            {devicedropdown && <DeviceDropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>

      </nav>
    </>
  );
}

export default NavBar;
