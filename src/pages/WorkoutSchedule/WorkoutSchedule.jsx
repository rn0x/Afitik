import React from "react";
import { Link } from "react-router-dom";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../../components/NavigationBarAndStatusBar.jsx';
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { useTheme } from '../../contexts/ThemeProvider.jsx';
import { RiRunLine } from 'react-icons/ri';
import { MdSportsKabaddi } from "react-icons/md";
import {
    TbCircleDashedNumber3,
    TbCircleDashedNumber4,
    TbCircleDashedNumber5,
    TbCircleDashedNumber6
} from "react-icons/tb";
import '../../assets/styles/WorkoutSchedule.css'


export default function WorkoutSchedule() {
    const { theme } = useTheme();
    const currentUrl = window.location.origin + window.location.pathname;
    const pageMetadata = {
        title: "جداول التمارين - تطبيق عافيتك",
        description: "استعرض جدول التمارين الأسبوعي الخاص بك، وقم بتنظيم أنشطتك الرياضية بشكل فعال مع تطبيق عافيتك.",
        keywords: "جدول التمارين, خطة التمرين, لياقة بدنية, تطبيق عافيتك",
        ogImage: `${window.location.origin}/images/preview.jpg`,
        canonicalUrl: currentUrl,
        contentLanguage: "ar",
        author: "AfitikApp",
        analyticsKeywords: "جدول التمارين, خطة التمرين, لياقة بدنية, تطبيق عافيتك",
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "تطبيق عافيتك",
            "url": currentUrl
        }
    };

    const exercisePlans = [
        {
            name: 'تمارين التحمية',
            slug: 'warm-up-exercises',
            icon: <RiRunLine />
        },
        {
            name: 'تمارين اول يوم بالنادي',
            slug: 'first-day-gym',
            icon: <MdSportsKabaddi />
        },
        {
            name: 'جدول تمارين 3 ايام اسبوعيا',
            slug: '3-days-weekly-workout',
            icon: <TbCircleDashedNumber3 />
        },
        {
            name: 'جدول تمارين 4 ايام اسبوعيا',
            slug: '4-days-weekly-workout',
            icon: <TbCircleDashedNumber4 />
        },
        {
            name: 'جدول تمارين 5 ايام اسبوعيا',
            slug: '5-days-weekly-workout',
            icon: <TbCircleDashedNumber5 />
        },
        {
            name: 'جدول تمارين 6 ايام اسبوعيا',
            slug: '6-days-weekly-workout',
            icon: <TbCircleDashedNumber6 />
        }
    ];

    const statusBarColorTh = theme === 'light' ? '#7AB2B2' : '#4a8e8e';

    return (
        <>
            <SetPageMetadata {...pageMetadata} />
            <NavigationBarAndStatusBar
                statusBarColor={statusBarColorTh}
                statusBarIconIsLight={true}
                overrideTheme={true}
            />
            <AppBar title="جداول التمارين" backLink="/" />
            <ToggleActiveClass elementId="nvBarHome" isActive={true} />
            <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
            <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
            <ToggleActiveClass elementId="nvBarTools" isActive={false} />

            <ScrollToTop />

            <div id="WorkoutSchedulePage">
                <div id="box_menu">
                    {exercisePlans.map((item) => {
                        return (
                            <Link
                                key={item.slug}
                                to={item.slug}
                                className='menu-link'
                                title={item.name}
                                aria-label={item.slug}
                                onMouseDown={(e) => e.preventDefault()}
                                draggable="false"
                            >
                                {item.icon}
                                <p>{item.name}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
