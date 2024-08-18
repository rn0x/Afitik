import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../../components/NavigationBarAndStatusBar.jsx';
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { useTheme } from '../../contexts/ThemeProvider.jsx';
import "../../assets/styles/Exercises.css"

export default function Exercises() {
  const { theme } = useTheme();
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "تمارين اللياقة البدنية - تطبيق عافيتك",
    description: "اكتشف مجموعة متنوعة من التمارين الرياضية المصممة لتحسين لياقتك البدنية وصحتك العامة. استمتع بتمارين مخصصة للرجال والنساء مع تطبيق عافيتك.",
    keywords: "تمارين رياضية, لياقة بدنية, صحة, تمارين للرجال, تمارين للنساء, تطبيق عافيتك",
    ogImage: `${window.location.origin}/images/preview.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "AfitikApp",
    analyticsKeywords: "تمارين رياضية, لياقة بدنية, صحة, تمارين للرجال, تمارين للنساء, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "تطبيق عافيتك",
      "url": currentUrl
    }
  };

  useEffect(() => {
    document.getElementById("BtTheme")?.style.setProperty("display", "none");
    return () => {
      document.getElementById("BtTheme")?.style.setProperty("display", "flex");
    };
  }, []);

  const statusBarColorTh = theme === 'light' ? '#eceff4' : '#121212';
  const iconIslightTh = theme === 'light' ? true : false;

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <NavigationBarAndStatusBar
        statusBarColor={statusBarColorTh}
        statusBarIconIsLight={!iconIslightTh}
        overrideTheme={true}
      />
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
              src="/images/icons/male-icon.webp"
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
              src="/images/icons/female-icon.webp"
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
