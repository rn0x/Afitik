import React from "react";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function Nutrition() {
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "التغذية الصحية - تطبيق عافيتك",
    description: "اكتشف نصائح وخطط غذائية صحية تساعدك في تحقيق أهدافك الصحية واللياقية. استمتع بمقالات وفيديوهات تغذية شاملة ودقيقة مع تطبيق عافيتك.",
    keywords: "تغذية صحية, خطط غذائية, نصائح تغذية, صحة, لياقة بدنية, تطبيق عافيتك",
    ogImage: `${window.location.origin}/nutrition.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "تغذية, صحة, لياقة بدنية, نصائح غذائية, تطبيق عافيتك",
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
    color:"#5e9e9e"
  };

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#eceff4" />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={true} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      
      <ScrollToTop />
      <div style={centerStyle}>
        قريباً
      </div>
    </>
  );
}
