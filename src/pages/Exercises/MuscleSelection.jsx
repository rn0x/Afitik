import React from "react";
import { useParams, Link } from "react-router-dom";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../../components/NavigationBarAndStatusBar.jsx';
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";
import AppBar from "../../components/AppBar.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { useTheme } from '../../contexts/ThemeProvider.jsx';
import "../../assets/styles/Exercises.css";
import musclesData from "../../assets/json/muscles.json";

export default function MuscleSelection() {
  const { gender } = useParams();
  const { theme } = useTheme();

  // قائمة الجنسين المقبولة
  const validGenders = ["male", "female"];

  // تحويل الجنس إلى أحرف صغيرة
  const normalizedGender = gender ? gender.toLowerCase() : '';

  // التحقق من صحة البيانات
  const isGenderValid = () => validGenders.includes(normalizedGender);

  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: isGenderValid() ? "اختيار العضلة - تطبيق عافيتك" : "جنس غير صالح - تطبيق عافيتك",
    description: isGenderValid()
      ? "اختر من قائمة العضلات المناسبة لجنسك لتحديد التمارين التي تناسب أهدافك الصحية والبدنية. اكتشف تمارين مخصصة للرجال والنساء."
      : "تم اختيار جنس غير صالح. يرجى العودة واختيار جنس صحيح لعرض العضلات المناسبة.",
    keywords: isGenderValid()
      ? "اختيار العضلة, تمارين رياضية, لياقة بدنية, عضلات, تطبيق عافيتك"
      : "جنس غير صالح, عضلات, تطبيق عافيتك",
    ogImage: `${window.location.origin}/images/preview.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "AfitikApp",
    analyticsKeywords: isGenderValid()
      ? "اختيار العضلة, تمارين رياضية, لياقة بدنية, تطبيق عافيتك"
      : "جنس غير صالح, عضلات, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": isGenderValid() ? "اختيار العضلة - تطبيق عافيتك" : "جنس غير صالح - تطبيق عافيتك",
      "url": currentUrl,
      "description": isGenderValid()
        ? "اختر من قائمة العضلات المناسبة لجنسك لتحديد التمارين التي تناسب أهدافك الصحية والبدنية. اكتشف تمارين مخصصة للرجال والنساء."
        : "تم اختيار جنس غير صالح. يرجى العودة واختيار جنس صحيح لعرض العضلات المناسبة."
    }
  };

  // دالة لإنشاء أزرار العضلات
  const renderMuscleButtons = () => {
    return musclesData.map((muscle, index) => {
      const imageSrc = muscle.bodymaps[normalizedGender]?.front || muscle.bodymaps[normalizedGender]?.back;

      return (
        <Link
          key={muscle.slug}
          to={`/Exercises/${normalizedGender}/${muscle.slug}`}
          title={`${muscle.name} | ${muscle.name_en}`}
          aria-label={`${muscle.name} | ${muscle.name_en}`}
          onMouseDown={(e) => e.preventDefault()}
          draggable="false"
        >
          <p>
            {muscle.name}
          </p>

          <ImageWithSkeleton
            key={index}
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
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidGender">
      <p>تم اختيار جنس غير صالح. يرجى العودة واختيار جنس صحيح لعرض العضلات المناسبة.</p>
      <Link to="/Exercises" onMouseDown={(e) => e.preventDefault()} draggable="false" >العودة إلى التمارين</Link>
    </div>
  );

  // دالة لعرض محتوى العضلات
  const renderMuscleSelection = () => (
    <>
      {renderMuscleButtons()}
    </>
  );

  const statusBarColorTh = theme === 'light' ? '#7AB2B2' : '#4a8e8e';

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <NavigationBarAndStatusBar
        statusBarColor={statusBarColorTh}
        statusBarIconIsLight={true}
        overrideTheme={true}
      />
      <AppBar title={isGenderValid() ? "اختيار العضلة" : "جنس غير صالح"} backLink="/Exercises" />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={true} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />


      <ScrollToTop />

      <div className="MuscleSelectionPage">
        {!isGenderValid() ? renderInvalidGenderMessage() : null}

        <div className="MuscleSelection">
          {isGenderValid() ? renderMuscleSelection() : null}
        </div>
      </div>
    </>
  );
}
