import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuList() {
    // قائمة الفئات مع الأيقونات وروابط التوجيه
    const menuItems = [
        {
            name: 'التمارين',
            path: '/Exercises',
            background: 'url(/images/Menu_List/background-Exercises.jpg)',
        },
        {
            name: 'التغذية',
            path: '/Nutrition',
            background: 'url(/images/Menu_List/background-Nutrition.jpg)',
        },
        {
            name: 'الأدوات',
            path: '/Tools',
            background: 'url(/images/Menu_List/background-Tools.jpg)',
        }
    ];

    return (
        <ul className='menu-list'>
            {menuItems.map((item, index) => (
                <li key={index} className='menu-item'>
                    <Link
                        to={item.path}
                        className='menu-link'
                        title={item.name}
                        aria-label={item.name}
                        onMouseDown={(e) => e.preventDefault()}
                        draggable="false"
                        style={{ position: 'relative', overflow: 'hidden', textDecoration: 'none' }}
                    >
                        <div
                            className='backgroundMenuList'
                            style={{ backgroundImage: item.background }}
                        ></div>
                        <p>{item.name} </p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
