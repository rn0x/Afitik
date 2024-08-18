import React from "react";
import { Link } from 'react-router-dom';
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../components/NavigationBarAndStatusBar.jsx';
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { useTheme } from '../contexts/ThemeProvider.jsx';
import { MdOutlineTimer } from 'react-icons/md';
import { FaCalculator } from "react-icons/fa";


export default function Tools() {
  const { theme } = useTheme();
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "أدوات الصحة واللياقة - تطبيق عافيتك",
    description: "اكتشف مجموعة من الأدوات المميزة التي تساعدك في تحقيق أهدافك الصحية واللياقية. احسب السعرات الحرارية، كتلة الجسم، وتابع إنجازاتك الرياضية بسهولة مع تطبيق عافيتك.",
    keywords: "أدوات صحية, حساب السعرات الحرارية, كتلة الجسم, تتبع الإنجازات, تطبيق عافيتك",
    ogImage: `${window.location.origin}/images/preview.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "AfitikApp",
    analyticsKeywords: "أدوات صحية, صحة, لياقة بدنية, حساب السعرات, كتلة الجسم, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "تطبيق عافيتك",
      "url": currentUrl
    }
  };

  // قائمة الروابط
  const links = [
    { to: "/Tools/step-counter", title: "عداد الخطوات", ariaLabel: "step-counter", icon: <MdOutlineTimer /> },
    { to: "/Tools/calorie-calculator", title: "حساب السعرات الحرارية", ariaLabel: "calorie-calculator", icon: <FaCalculator /> },
  ];

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
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={true} />

      <ScrollToTop />

      <div id="ToolsPage">
        <ol id="box_tools">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className='menu-link'
                title={link.title}
                aria-label={link.ariaLabel}
                onMouseDown={(e) => e.preventDefault()}
                draggable="false"
              >
                {link.icon}
                <p className="title_tools">{link.title}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}