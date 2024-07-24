import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdPerson, MdSettings } from 'react-icons/md';


export default function MenuList() {

    // قائمة الفئات مع الأيقونات وروابط التوجيه
    const menuItems = [
        { name: 'Home', icon: <MdHome />, path: '/' },
        { name: 'Profile', icon: <MdPerson />, path: '/profile' },
        { name: 'Settings', icon: <MdSettings />, path: '/settings' },
        { name: 'Settings', icon: <MdSettings />, path: '/settings' },
        { name: 'Settings', icon: <MdSettings />, path: '/settings' },
    ]
    return (
        <ul className='menu-list'>
            {menuItems.map((item, index) => (
                <li key={index} className="menu-item">
                    <Link to={item.path} className="menu-link">
                        <p className="icon">{item.icon}</p>
                        <p className="name">{item.name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
