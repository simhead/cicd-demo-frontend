import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const MenuItems = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        url: '/',
        cName: 'nav-links'
    },
    {
        title: 'Devices',
        path: '/devices',
        icon: <IoIcons.IoIosPaper />,
        url: '/devices',
        cName: 'nav-links'
    },
    {
        title: 'Users',
        path: '/users',
        icon: <IoIcons.IoMdPeople />,
        url: '/users',
        cName: 'nav-links'
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <FaIcons.FaEnvelopeOpenText />,
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />,
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Contact Us',
        url: '#',
        cName: 'nav-links-mobile'
    }

];