import React from "react";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from '../../components/StatusBarColor.jsx'
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";

export default function Back() {
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
      <StatusBarColor color="#7AB2B2" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarWorkouts" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarProgress" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />
      <div className="muscles_back_page muscles_pages">
        <div>Back</div>
      </div>
    </>
  );
}
