import React from 'react';
import { Link } from 'react-router-dom';
import { MdFitnessCenter, MdFastfood, MdBuild, MdOutlineSportsMartialArts, MdCalendarMonth } from 'react-icons/md';

export default function MenuList() {
    // قائمة الفئات مع الأيقونات وروابط التوجيه
    const menuItems = [
        {
            name: 'التمارين',
            path: '/Exercises',
            icon: <MdOutlineSportsMartialArts />
        },
        {
            name: 'التغذية',
            path: '/Nutrition',
            icon: <MdFastfood />
        },
        {
            name: 'الأدوات',
            path: '/Tools',
            icon: <MdBuild />
        },
        {
            name: 'معدات النادي',
            path: '/gym-equipment',
            icon: <MdFitnessCenter />
        },
        {
            name: 'جداول التمارين',
            path: '/workout-schedule',
            icon: <MdCalendarMonth />
        },
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
                    >
                        {item.icon}
                        <p>{item.name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
