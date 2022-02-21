import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import UserDropdown from './UserDropdown';
import logo from "../../devops.png";

function NavBar() {
  const [click, setClick] = useState(false);
  const [userdropdown, setUserDropdown] = useState(false);
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

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} width="150" height="50" alt="test.io" />

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
              Users
            </Link>
          </li>

          <li className='nav-item'>
            <Link
                to='/adduser'
                className='nav-links'
                onClick={closeMobileMenu}
            >
              Add User
            </Link>
          </li>

          <li className='nav-item'>
            <Link
                to='/streamdataio'
                className='nav-item'
                onClick={closeMobileMenu}
            >
              StreamDataIO
            </Link>
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
