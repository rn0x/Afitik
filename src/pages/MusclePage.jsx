import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../components/NavigationBarAndStatusBar.jsx';
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import AppBar from "../components/AppBar.jsx";
import ScreenshotCapture from "../components/ScreenshotCapture.jsx";
import ImageWithSkeleton from "../components/ImageWithSkeleton.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useTheme } from '../contexts/ThemeProvider.jsx';
import musclesData from "../assets/json/muscles.json";
import '../assets/styles/MusclePage.css'

export default function MusclePage() {
    const { theme } = useTheme();
    const { muscleId } = useParams();
    const captureRef = useRef(null);

    const muscle = musclesData.find(m => m.slug === muscleId);
    if (!muscle) {
        return <div>Muscle not found</div>;
    }
    const currentUrl = window.location.origin + window.location.pathname;
    const pageMetadata = {
        title: `معلومات عن عضلة ${muscle.name}`,
        description: `اكتشف معلومات شاملة عن عضلة ${muscle.name}، بما في ذلك مواقعها، وظائفها، وكيفية تقويتها بالتمارين المناسبة.`,
        keywords: `عضلات, عضلة ${muscle.name}, تمارين ${muscle.name}, تقوية ${muscle.name}, رياضة, صحة`,
        ogImage: muscle.image,
        canonicalUrl: currentUrl,
        contentLanguage: "ar",
        author: "مؤسس تطبيق عافيتك",
        analyticsKeywords: `${muscle.name}, عضلات, تمارين, صحة, رياضة, تقوية العضلات`,
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "تطبيق عافيتك",
            "url": currentUrl
        }
    };

    const statusBarColorTh = theme === 'light' ? '#7AB2B2' : '#4a8e8e';
    return (
        <>
            <SetPageMetadata {...pageMetadata} />
            <NavigationBarAndStatusBar
                statusBarColor={statusBarColorTh}
                statusBarIconIsLight={true}
                overrideTheme={true}
            />
            <ToggleActiveClass elementId="nvBarHome" isActive={true} />
            <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
            <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
            <ToggleActiveClass elementId="nvBarTools" isActive={false} />


            <ScrollToTop />

            <AppBar title={muscle.name} backLink="/" />

            <div className={`muscles_pages`} ref={captureRef}>

                <div className="muscle_description" >{muscle.description}</div>

                <div className="muscles_pages_images">
                    {muscle.bodymaps.male.front ? <ImageWithSkeleton
                        src={muscle.bodymaps.male.front}
                        alt={`معلومات عن ${muscle.name} | ${muscle.name_en}`}
                        title={`معلومات عن ${muscle.name} | ${muscle.name_en}`}
                        aria-label={`معلومات عن ${muscle.name} | ${muscle.name_en}`}
                        onMouseDown={(e) => e.preventDefault()}
                        draggable="false"
                    /> : ''}

                    {muscle.bodymaps.male.back ? <ImageWithSkeleton
                        src={muscle.bodymaps.male.back}
                        alt={`معلومات عن ${muscle.name} | ${muscle.name_en}`}
                        title={`معلومات عن ${muscle.name} | ${muscle.name_en}`}
                        aria-label={`معلومات عن ${muscle.name} | ${muscle.name_en}`}
                        onMouseDown={(e) => e.preventDefault()}
                        draggable="false"
                    /> : ''}
                </div>

            </div>

            <ScreenshotCapture
                captureRef={captureRef}
                fileName="my_capture.png"
                className="muscles_pages_ScreenshotCaptureButton"
            />
        </>
    );
}
