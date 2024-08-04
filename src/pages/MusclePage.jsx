import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import AppBar from "../components/AppBar.jsx";
import ScreenshotCapture from "../components/ScreenshotCapture.jsx";
import ImageWithSkeleton from "../components/ImageWithSkeleton.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import musclesData from "../assets/json/muscles.json";
import '../assets/styles/MusclePage.css'

export default function MusclePage() {
    const { muscleId } = useParams();
    const captureRef = useRef(null);

    const muscle = musclesData.find(m => m.slug === muscleId);
    if (!muscle) {
        return <div>Muscle not found</div>;
    }

    const pageMetadata = {
        title: muscle.name,
        description: `معلومات عن عضلة ${muscle.name}`,
        keywords: `عضلات, ${muscle.name}`,
        ogImage: muscle.image,
        canonicalUrl: `https://example.com/muscles/${muscleId}`,
        contentLanguage: "ar",
        author: "مؤسس الموقع",
        analyticsKeywords: `${muscle.name}, عضلات, رياضة`,
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: muscle.name,
            url: `https://example.com/muscles/${muscleId}`,
        },
    };

    return (
        <>
            <SetPageMetadata {...pageMetadata} />
            <StatusBarColor color="#7AB2B2" />
            <ToggleActiveClass elementId="nvBarHome" isActive={true} />
            <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
            <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
            <ToggleActiveClass elementId="nvBarTools" isActive={false} />
            <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

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
