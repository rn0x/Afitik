import React, { useState } from 'react';
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import glossaryJson from '../../assets/json/fitness_glossary.json';
import { MdBook } from 'react-icons/md';
import { copyToClipboard } from '../../utils/clipboardUtils.js';
import CustomNotification from "../../components/CustomNotification.jsx";

const fitnessTerms = glossaryJson.fitnessTerms;

export default function GlossaryPage() {
  const [notification, setNotification] = useState(null);

  const handleCopyToClipboard = (title, description) => {
    const textToCopy = `${title}: ${description}`;
    copyToClipboard(textToCopy);
    setNotification({
      message: `تم نسخ "${title}" إلى الحافظة.`,
      type: 'success'
    });
  };

  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "قائمة المصطلحات الرياضية",
    description: "تعرف على أهم المصطلحات الرياضية في عالم اللياقة البدنية.",
    keywords: "مصطلحات رياضية, تعريفات تمارين, لياقة بدنية, تطبيق عافيتك",
    ogImage: `${window.location.origin}/fitness-glossary.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "مصطلحات رياضية, تعريفات تمارين, لياقة بدنية, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "قائمة المصطلحات الرياضية",
      "url": currentUrl
    }
  };

  return (
    <> {/* معرف كبير للصفحة */}
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <AppBar title="قائمة المصطلحات الرياضية" backLink="/" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />

      <ScrollToTop />

      <main className="glossaryPage container">
        <section className="glossary">
          <header className="header">
            <MdBook size={32} color="var(--color-4)" />
            <h1>قائمة المصطلحات الرياضية</h1>
          </header>
          {Object.keys(fitnessTerms).map((key) => (
            <div
              key={key}
              className="term"
              onClick={() => handleCopyToClipboard(fitnessTerms[key].title, fitnessTerms[key].description)}
            >
              <h2>{fitnessTerms[key].title}</h2>
              <p>{fitnessTerms[key].description}</p>
            </div>
          ))}
        </section>
      </main>

      {notification && (
        <CustomNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}