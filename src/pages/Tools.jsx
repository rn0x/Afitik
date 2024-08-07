import React from "react";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function Tools() {
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "أدوات الصحة واللياقة - تطبيق عافيتك",
    description: "اكتشف مجموعة من الأدوات المميزة التي تساعدك في تحقيق أهدافك الصحية واللياقية. احسب السعرات الحرارية، كتلة الجسم، وتابع إنجازاتك الرياضية بسهولة مع تطبيق عافيتك.",
    keywords: "أدوات صحية, حساب السعرات الحرارية, كتلة الجسم, تتبع الإنجازات, تطبيق عافيتك",
    ogImage: `${window.location.origin}/tools.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "أدوات صحية, صحة, لياقة بدنية, حساب السعرات, كتلة الجسم, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "تطبيق عافيتك",
      "url": currentUrl
    }
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
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={true} />
      
      <ScrollToTop />

      <div style={centerStyle}>
        قريباً
      </div>
    </>
  );
}
