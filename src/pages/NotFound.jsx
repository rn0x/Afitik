import React from "react";
import { Link } from "react-router-dom";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function NotFound() {
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "صفحة غير موجودة - تطبيق عافيتك",
    description: "الصفحة التي تبحث عنها غير موجودة. قم بالعودة إلى الصفحة الرئيسية لمتابعة تصفح تطبيق عافيتك.",
    keywords: "404, صفحة غير موجودة, خطأ, تطبيق عافيتك",
    ogImage: `${window.location.origin}/404.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "صفحة غير موجودة, خطأ 404, تطبيق عافيتك",
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
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      

      <ScrollToTop />

      <div className="not-found">
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    </>
  );
}
