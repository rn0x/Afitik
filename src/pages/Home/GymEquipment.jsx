// GymEquipment.jsx
import React, { useState } from "react";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../../components/NavigationBarAndStatusBar.jsx';
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { useTheme } from '../../contexts/ThemeProvider.jsx';
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";
import CustomNotification from "../../components/CustomNotification.jsx";
import { copyToClipboard } from '../../utils/clipboardUtils.js';
import equipmentJson from '../../assets/json/gym-equipment.json';

export default function GymEquipment() {
    const { theme } = useTheme();
    const [notification, setNotification] = useState(null);
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

    const handleCopyToClipboard = (text) => {
        copyToClipboard(text);
        setNotification({
            message: `تم نسخ "${text}" إلى الحافظة.`,
            type: 'success'
        });
    };

    const equipments = equipmentJson.map((equ) => (
        <div
            className="item_equipments"
            key={equ.id}
            onClick={() => handleCopyToClipboard(`${equ.name} - ${equ.name_en}`)}
            style={{ cursor: 'pointer' }}
        >
            <p>
                {equ.name} - {equ.name_en}
            </p>
            <ImageWithSkeleton
                src={equ.image}
                alt={equ.name}
                title={equ.name_en}
                aria-label={equ.slug}
                className="equipments_images"
            />
        </div>
    ));

    const statusBarColorTh = theme === 'light' ? '#7AB2B2' : '#4a8e8e';

    return (
        <>
            <SetPageMetadata {...pageMetadata} />
            <NavigationBarAndStatusBar
                statusBarColor={statusBarColorTh}
                statusBarIconIsLight={true}
                overrideTheme={true}
            />
            <AppBar title="معدات النادي الرياضي" backLink="/" />
            <ToggleActiveClass elementId="nvBarHome" isActive={true} />
            <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
            <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
            <ToggleActiveClass elementId="nvBarTools" isActive={false} />

            <ScrollToTop />

            <div id="GymEquipmentPage">
                <div id="box_equipments">
                    {equipments}
                </div>
            </div>

            {/* عرض الإشعار إذا كانت الحالة متاحة */}
            {notification && <CustomNotification {...notification} />}
        </>
    );
}