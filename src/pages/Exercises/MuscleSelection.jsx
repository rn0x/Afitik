import React from "react";
import { useParams, Link } from "react-router-dom";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import AppBar from "../../components/AppBar.jsx";
import "../../assets/styles/Exercises.css";
import musclesData from "../../assets/json/muscles.json";

export default function MuscleSelection() {
  const { gender } = useParams();

  // قائمة الجنسين المقبولة
  const validGenders = ["male", "female"];

  // تحويل الجنس إلى أحرف صغيرة
  const normalizedGender = gender ? gender.toLowerCase() : '';

  // التحقق من صحة البيانات
  const isGenderValid = () => validGenders.includes(normalizedGender);

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

  // دالة لإنشاء أزرار العضلات
  const renderMuscleButtons = () => {
    return musclesData.map((muscle) => {
      const imageSrc = muscle.bodymaps[normalizedGender]?.front || muscle.bodymaps[normalizedGender]?.back;

      return (
        <Link
          to={`/Exercises/${normalizedGender}/${muscle.slug}`}
          title={`${muscle.name} | ${muscle.name_en}`}
          aria-label={`${muscle.name} | ${muscle.name_en}`}
          onMouseDown={(e) => e.preventDefault()}
          draggable="false"
        >
          <p>
            {muscle.name}
          </p>
          <img
            src={imageSrc}
            alt={`${muscle.name} | ${muscle.name_en}`}
            title={`${muscle.name} | ${muscle.name_en}`}
            aria-label={`${muscle.name} | ${muscle.name_en}`}
          />
        </Link>
      );
    });
  };

  // دالة لعرض رسالة الجنس غير صالح
  const renderInvalidGenderMessage = () => (
    <div style={{ textAlign: "center" , direction: "ltr" }} className="InvalidGender">
      <p>Invalid gender selected. Please go back and select a valid gender.</p>
      <Link to="/Exercises" onMouseDown={(e) => e.preventDefault()} draggable="false" >Go back to Exercises</Link>
    </div>
  );

  // دالة لعرض محتوى العضلات
  const renderMuscleSelection = () => (
    <>
      {renderMuscleButtons()}
      {/* <h2>You selected: {gender ? gender : "null"}</h2> */}
    </>
  );

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <AppBar title={isGenderValid() ? "اختيار العضلة" : "Invalid gender selected"} backLink="/Exercises" />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={true} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

      <div className="MuscleSelectionPage">
        {/* <h2>Select Muscle</h2> */}
        <div className="MuscleSelection">
          {isGenderValid() ? renderMuscleSelection() : null}
        </div>
        {!isGenderValid() ? renderInvalidGenderMessage() : null}

      </div>
    </>
  );
}
