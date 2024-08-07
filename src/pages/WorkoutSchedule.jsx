import React from "react";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import AppBar from "../components/AppBar.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function WorkoutSchedule() {
    const currentUrl = window.location.origin + window.location.pathname;
    const pageMetadata = {
        title: "جداول التمارين - تطبيق عافيتك",
        description: "استعرض جدول التمارين الأسبوعي الخاص بك، وقم بتنظيم أنشطتك الرياضية بشكل فعال مع تطبيق عافيتك.",
        keywords: "جدول التمارين, خطة التمرين, لياقة بدنية, تطبيق عافيتك",
        ogImage: `${window.location.origin}/workout-schedule.jpg`,
        canonicalUrl: currentUrl,
        contentLanguage: "ar",
        author: "مؤسس تطبيق عافيتك",
        analyticsKeywords: "جدول التمارين, خطة التمرين, لياقة بدنية, تطبيق عافيتك",
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "تطبيق عافيتك",
            "url": currentUrl
        }
    };


    const centerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
    };

    return (
        <>
            <SetPageMetadata {...pageMetadata} />
            <StatusBarColor color="#7AB2B2" />
            <AppBar title="جداول التمارين" backLink="/" />
            <ToggleActiveClass elementId="nvBarHome" isActive={true} />
            <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
            <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
            <ToggleActiveClass elementId="nvBarTools" isActive={false} />

            <ScrollToTop />

            <div style={centerStyle}>
                قريباً
            </div>
        </>
    );
}
