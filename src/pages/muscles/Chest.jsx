import React, { useRef } from "react";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from '../../components/StatusBarColor.jsx'
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScreenshotCapture from "../../components/ScreenshotCapture.jsx";
import muscleData from "../../assets/json/muscle_data.json";

export default function Chest() {
  const captureRef = useRef(null);
  const pageMetadata = {
    title: "الصفحة الرئيسية",
    description: "مرحباً بك في الصفحة الرئيسية لموقعنا",
    keywords: "موقع, إنترنت, رياكت",
    ogImage: "https://example.com/homepage.jpg",
    canonicalUrl: "https://example.com",
    contentLanguage: "ar",
    author: "مؤسس الموقع",
    analyticsKeywords: "زيارات, تحليلات, إحصائيات",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "موقعنا",
      url: "https://example.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://example.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  };
  const musclesJson = muscleData.muscles;

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarWorkouts" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarProgress" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

      <div className="muscles_chest_page muscles_pages" ref={captureRef}>
        <h2 className="Muscle_Name">{musclesJson[0].name}</h2>
        <h3 className="title_item">تقسيمات العضلة</h3>
        <img
          src={musclesJson[0].classification.image}
          alt=""
          onMouseDown={(e) => e.preventDefault()}
          draggable="false"
        />

        {/* <ScreenshotCapture
          captureRef={captureRef}
          buttonText="التقط صورة الآن"
          fileName="my_capture.png"
        /> */}

        
        <div>Chest</div>
      </div>
    </>
  );
}
