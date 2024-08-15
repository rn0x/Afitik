import React from 'react'
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";

export default function SixDaysWorkout() {
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "",
    description: "",
    keywords: "",
    ogImage: `${window.location.origin}/workout-schedule.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "جدول التمارين, خطة التمرين, لياقة بدنية, تطبيق عافيتك",
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
      <StatusBarColor color="#7AB2B2" />
      <AppBar title="جدول تمارين 6 ايام اسبوعيا" backLink="/workout-schedule" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />

      <ScrollToTop />
    </>
  )
}
