import React from "react";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function Nutrition() {
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

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
  };

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#eceff4" />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={true} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />
      <ScrollToTop />
      <div style={centerStyle}>
        قريباً
      </div>
    </>
  );
}
