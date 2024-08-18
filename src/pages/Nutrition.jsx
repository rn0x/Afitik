import React from "react";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../components/NavigationBarAndStatusBar.jsx';
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useTheme } from '../contexts/ThemeProvider.jsx';

export default function Nutrition() {
  const { theme } = useTheme();
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "التغذية الصحية - تطبيق عافيتك",
    description: "اكتشف نصائح وخطط غذائية صحية تساعدك في تحقيق أهدافك الصحية واللياقية. استمتع بمقالات وفيديوهات تغذية شاملة ودقيقة مع تطبيق عافيتك.",
    keywords: "تغذية صحية, خطط غذائية, نصائح تغذية, صحة, لياقة بدنية, تطبيق عافيتك",
    ogImage: `${window.location.origin}/nutrition.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "AfitikApp",
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
    color: "#5e9e9e"
  };

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
