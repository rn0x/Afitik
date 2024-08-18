import React, { useState } from 'react';
import { Skeleton } from "@mui/material";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import NavigationBarAndStatusBar from '../../components/NavigationBarAndStatusBar.jsx';
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { useTheme } from '../../contexts/ThemeProvider.jsx';
import { openSystem } from '../../utils/inAppBrowserUtils.js'
import firstDayGymJson from '../../assets/json/first-day-gym.json'

const workouts = firstDayGymJson || [];

export default function FirstDayGym() {
  const { theme } = useTheme();
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "تمارين أول يوم بالنادي - تطبيق عافيتك",
    description: "استعرض جدول تمارين أول يوم في النادي مع تفاصيل حول كل تمرين، العضلات المستهدفة، وعدد الجلسات والتكرارات. خطط لياقتك البدنية مع تطبيق عافيتك.",
    keywords: "تمارين أول يوم, جدول تمارين, خطة التمرين, لياقة بدنية, تطبيق عافيتك",
    ogImage: `${window.location.origin}/images/preview.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "AfitikApp",
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
      <AppBar title="تمارين اول يوم بالنادي" backLink="/workout-schedule" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />

      <ScrollToTop />

      <main className="container" id='FirstDayGymPage'>
        <div className="workout-list">
          {workouts.map((workout, index) => (
            <WorkoutItem key={index} workout={workout} />
          ))}
        </div>
      </main>
    </>
  );
}

function WorkoutItem({ workout }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="workout-item">
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          style={{ borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      <img
        src={workout.image}
        alt={workout.exercise}
        style={{ display: imageLoaded ? 'block' : 'none', borderRadius: "8px" }}
        onLoad={() => setImageLoaded(true)}
        className="workout-image"
      />
      <h3 className="workout-title">{workout.exercise}</h3>
      <p className="workout-target">العضلة المستهدفة: <span>{workout.targetMuscle}</span></p>
      <p className="workout-sets">الجلسات: <span>{workout.sets}</span></p>
      <p className="workout-reps">التكرارات: <span>{workout.repetitions}</span></p>
      <p className="workout-description">{workout.description}</p>
      <button onClick={() => { openSystem(workout.videoLink) }} className="workout-video-button">
        شاهد الفيديو
      </button>
    </div>
  );
}
