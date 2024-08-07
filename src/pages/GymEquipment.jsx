import React from "react";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import AppBar from "../components/AppBar.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function GymEquipment() {
    const currentUrl = window.location.origin + window.location.pathname;
    const pageMetadata = {
        title: "أجهزة (معدات) النادي الرياضي - تطبيق عافيتك",
        description: "تعرف على مختلف الأجهزة الرياضية المستخدمة في النادي، وكيفية استخدامها لتحقيق أهدافك الصحية واللياقية.",
        keywords: "أجهزة رياضية, نادي رياضي, لياقة بدنية, تطبيق عافيتك",
        ogImage: `${window.location.origin}/gym-equipment.jpg`,
        canonicalUrl: currentUrl,
        contentLanguage: "ar",
        author: "مؤسس تطبيق عافيتك",
        analyticsKeywords: "أجهزة رياضية, نادي رياضي, لياقة بدنية, تطبيق عافيتك",
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
            <AppBar title="معدات النادي الرياضي" backLink="/" />
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
