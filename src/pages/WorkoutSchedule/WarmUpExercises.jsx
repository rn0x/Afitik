import React, { useState } from 'react';
import { Skeleton } from "@mui/material";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../../components/NavigationBarAndStatusBar.jsx';
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { useTheme } from '../../contexts/ThemeProvider.jsx';
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";

export default function WarmUpExercises() {
  const { theme } = useTheme();
  const [videoLoaded, setVideoLoaded] = useState(false); // حالة التحميل

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

  const statusBarColorTh = theme === 'light' ? '#7AB2B2' : '#4a8e8e';

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <NavigationBarAndStatusBar
        statusBarColor={statusBarColorTh}
        statusBarIconIsLight={true}
        overrideTheme={true}
      />
      <AppBar title="تمارين التحمية" backLink="/workout-schedule" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />

      <ScrollToTop />

      <div id='WarmUpExercisesPage'>
        <div id='box_steps'>
          <div>
            <p className='step_number'>
              1
            </p>
            <div>
              <p>
                الخطوة الاولى: المشي السريع على السير لمدة 5 دقائق
              </p>

              <ImageWithSkeleton
                src="/images/workout-schedule/sports-treadmill.jpg"
                alt="treadmill"
                title="treadmill"
                aria-label="sports-treadmill"
                className="images_step"
                onMouseDown={(e) => e.preventDefault()}
                draggable="false"
              />

              <div className='box_step_info'>
                <p>السرعة: <span>5.0</span></p>
                <p>المدة: <span>5 دقائق</span></p>
              </div>

            </div>
          </div>

          <div>
            <p className='step_number'>
              2
            </p>
            <div>
              <p>
                الخطوة الثانية: تمارين هوائية تسخينية بدون اوزان
              </p>

              {/* يظهر Skeleton إلى أن ينتهي تحميل الفيديو */}
              {!videoLoaded && (
                <Skeleton variant="rectangular" width="100%" height={200} style={{ borderRadius: "8px" }} />
              )}

              <video
                src="/images/workout-schedule/cardio-warm-up.webm"
                title="cardio-warm-up"
                aria-label="cardio-warm-up"
                autoPlay
                loop
                muted
                playsInline
                onCanPlayThrough={() => setVideoLoaded(true)} // يتم تحديث الحالة عندما يصبح الفيديو جاهزًا
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  display: videoLoaded ? "block" : "none" // إخفاء الفيديو حتى يتم تحميله
                }}
              />

            </div>
          </div>
        </div>

      </div>

    </>
  );
}