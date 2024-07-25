import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScreenshotCapture from "../components/ScreenshotCapture.jsx";
import muscleData from "../assets/json/muscle_data.json";

export default function MusclePage() {
    const { muscleId } = useParams();
    const captureRef = useRef(null);

    const muscle = muscleData.muscles.find(m => m.name_en === muscleId);
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
            <ToggleActiveClass elementId="nvBarHome" isActive={false} />
            <ToggleActiveClass elementId="nvBarWorkouts" isActive={false} />
            <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
            <ToggleActiveClass elementId="nvBarProgress" isActive={false} />
            <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

            <div className={`muscles_pages`} ref={captureRef}>
                <h2 className="Muscle_Name">{muscle.name}</h2>
                <div className="muscle_description">{muscle.description}</div>
                <h3 className="title_item">تقسيمات العضلة</h3>
                <img
                    src={muscle.classification.image}
                    alt=""
                    onMouseDown={(e) => e.preventDefault()}
                    draggable="false"
                />
                {/* <ScreenshotCapture captureRef={captureRef} buttonText="التقط صورة الآن" fileName="my_capture.png" /> */}
            </div>
        </>
    );
}
