import React from "react";
import { Link } from "react-router-dom";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import "../../assets/styles/Exercises.css"

export default function Exercises() {

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

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#eceff4" />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={true} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

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
            <img
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
            <img
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
