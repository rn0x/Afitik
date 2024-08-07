import React from "react";
import { Link } from "react-router-dom";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import "../../assets/styles/Exercises.css"

export default function Exercises() {
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "تمارين اللياقة البدنية - تطبيق عافيتك",
    description: "اكتشف مجموعة متنوعة من التمارين الرياضية المصممة لتحسين لياقتك البدنية وصحتك العامة. استمتع بتمارين مخصصة للرجال والنساء مع تطبيق عافيتك.",
    keywords: "تمارين رياضية, لياقة بدنية, صحة, تمارين للرجال, تمارين للنساء, تطبيق عافيتك",
    ogImage: `${window.location.origin}/exercises.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "تمارين رياضية, لياقة بدنية, صحة, تمارين للرجال, تمارين للنساء, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "تطبيق عافيتك",
      "url": currentUrl
    }
  };

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#eceff4" />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={true} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      

      <ScrollToTop />

      <div className="ExercisesPage">
        {/* <h2>SelectGender</h2> */}
        <div className="ExercisesPageSelectGender">
          <Link
            to="/Exercises/male"
            title="ذكر"
            aria-label="ذكر"
            onMouseDown={(e) => e.preventDefault()}
            draggable="false"
            id="male"
          >
            <p>ذكر</p>

            <ImageWithSkeleton
              src="/images/icons/male.png"
              alt="ذكر"
              title="ذكر"
              aria-label="ذكر"
            />
          </Link>

          <Link
            to="/Exercises/Female"
            title="انثى"
            aria-label="انثى"
            onMouseDown={(e) => e.preventDefault()}
            draggable="false"
            id="female"
          >
            <p>انثى</p>
            <ImageWithSkeleton
              src="/images/icons/female.png"
              alt="انثى"
              title="انثى"
              aria-label="انثى"
            />
          </Link>
        </div>

      </div>
    </>
  );
}
