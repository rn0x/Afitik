import React from "react";
import { useParams, Link } from "react-router-dom";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import AppBar from "../../components/AppBar.jsx";
import "../../assets/styles/Exercises.css";
import musclesData from "../../assets/json/muscles.json";

export default function ExerciseList() {
  const { gender, muscle } = useParams();

  // قائمة الجنسين المقبولة
  const validGenders = ["male", "female"];

  // تحويل الجنس إلى أحرف صغيرة
  const normalizedGender = gender ? gender.toLowerCase() : '';

  // التحقق من صحة البيانات
  const isGenderValid = validGenders.includes(normalizedGender);

  const muscleValue = musclesData.find(m => m.slug === muscle);

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

  // دالة لعرض رسالة الجنس غير صالح
  const renderInvalidGenderMessage = () => (
    <div style={{ textAlign: "center" , direction: "ltr" }} className="InvalidGender">
      <p>Invalid gender selected. Please go back and select a valid gender.</p>
      <Link to="/Exercises" onMouseDown={(e) => e.preventDefault()} draggable="false">Go back to Exercises</Link>
    </div>
  );

  const renderInvalidMuscleMessage = () => (
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidMuscle">
      <p>Invalid Muscle selected. Please go back and select a valid Muscle.</p>
      <Link to={`/Exercises/${gender}`} onMouseDown={(e) => e.preventDefault()} draggable="false">Go back to Muscle</Link>
    </div>
  );

  // دالة لعرض قائمة التمارين
  const renderExerciseList = () => (
    <div style={{ textAlign: "center" }} className="ExerciseList">
      <p>KKKKKKKKKKKKKKKKKK</p>
    </div>
  );

  // تحديد عنوان AppBar
  const appBarTitle = !isGenderValid
    ? "Invalid gender selected"
    : muscleValue
      ? muscleValue.name
      : "Invalid Muscle selected";

  // تحديد رابط العودة في AppBar
  const appBarBackLink = ((!isGenderValid && !muscleValue) || (!isGenderValid && muscleValue))
    ? "/Exercises"
    : `/Exercises/${normalizedGender}`;

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <AppBar title={appBarTitle} backLink={appBarBackLink} />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={true} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

      <div className="ExerciseListPage">
        {!isGenderValid ? renderInvalidGenderMessage() : null}
        {!muscleValue && isGenderValid ? renderInvalidMuscleMessage() : null}
        {muscleValue && isGenderValid ? renderExerciseList() : null}
      </div>
    </>
  );
}
