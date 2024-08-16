import React, { useState } from "react";
import { FaDumbbell, FaYoutube, FaCalendarAlt } from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { openSystem } from '../../utils/inAppBrowserUtils.js'

export default function FiveDaysWorkout() {
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "جدول تمارين 5 أيام أسبوعيًا - تطبيق عافيتك",
    description: "استعرض جدول تمارين مخصص لـ خمسة أيام في الأسبوع يشمل تمارين متنوعة مع تفاصيل حول كل تمرين، العضلات المستهدفة، وعدد الجلسات والتكرارات. خطط لياقتك البدنية مع تطبيق عافيتك.",
    keywords: "جدول تمارين 5 أيام, خطة التمرين, تمارين رياضية, لياقة بدنية, تطبيق عافيتك",
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

  const schedule = [
    {
      day: "السبت",
      details: [
        {
          muscle: "الصدر",
          exercise: "تمرين الضغط (Push-ups)",
          video: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
          sets: 4,
          reps: 12,
        },
        {
          muscle: "البطن",
          exercise: "تمرين البطن العكسي (Reverse Crunches)",
          video: "https://www.youtube.com/watch?v=7rRWy7-Gokg",
          sets: 3,
          reps: 15,
        },
      ],
    },
    {
      day: "الأحد",
      details: [
        {
          muscle: "الظهر",
          exercise: "تمرين سحب الأثقال (Pull-ups)",
          video: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
          sets: 4,
          reps: 10,
        },
        {
          muscle: "الذراعين",
          exercise: "تمرين التمدد الثلاثي (Tricep Dips)",
          video: "https://www.youtube.com/watch?v=2z8JmcrW-As",
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      day: "الإثنين",
      details: [
        {
          muscle: "الساقين",
          exercise: "تمرين الطعنات (Lunges)",
          video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U",
          sets: 4,
          reps: 12,
        },
        {
          muscle: "الساقين",
          exercise: "تمرين القرفصاء (Squats)",
          video: "https://www.youtube.com/watch?v=aclHkVaku9U",
          sets: 4,
          reps: 15,
        },
        {
          muscle: "الأرداف",
          exercise: "تمرين رفع الورك (Hip Thrusts)",
          video: "https://www.youtube.com/watch?v=FJNPGhF1R-Y",
          sets: 3,
          reps: 15,
        },
      ],
    },
    {
      day: "الثلاثاء",
      details: "راحة واستعادة النشاط (Rest)",
    },
    {
      day: "الأربعاء",
      details: [
        {
          muscle: "الكتف",
          exercise: "تمرين رفع الأثقال (Shoulder Press)",
          video: "https://www.youtube.com/watch?v=B-aVuyhvLHU",
          sets: 4,
          reps: 12,
        },
        {
          muscle: "البطن",
          exercise: "تمرين الرفع الجانبي للركبة (Side Leg Raises)",
          video: "https://www.youtube.com/watch?v=DA4FVJH2PnU",
          sets: 3,
          reps: 15,
        },
      ],
    },
    {
      day: "الخميس",
      details: [
        {
          muscle: "الذراعين",
          exercise: "تمرين العضلة الثنائية (Bicep Curls)",
          video: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
          sets: 3,
          reps: 12,
        },
        {
          muscle: "الصدر",
          exercise: "تمرين الضغط المائل (Incline Push-ups)",
          video: "https://www.youtube.com/watch?v=Me9bHFAxnCs",
          sets: 4,
          reps: 12,
        },
        {
          muscle: "الظهر",
          exercise: "تمرين التمدد (Supermans)",
          video: "https://www.youtube.com/watch?v=ZNVWTVdJW5s",
          sets: 3,
          reps: 15,
        },
      ],
    },
    {
      day: "الجمعة",
      details: "راحة واستعادة النشاط (Rest)",
    },
  ];

  const [expandedDay, setExpandedDay] = useState(null);

  const toggleDetails = (dayIndex) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <AppBar title="جدول تمارين 5 ايام اسبوعيا" backLink="/workout-schedule" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />

      <ScrollToTop />
      <main className="container scheduleWorkout" id="ThreeDaysWorkoutPage">
        <table id="schedule">
          <thead>
            <tr>
              <th><FaCalendarAlt /> اليوم</th>
              <th>التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{item.day}</td>
                  <td>
                    {typeof item.details === "string" ? (
                      <span>{item.details}</span>
                    ) : (
                      <button className="details-button" onClick={() => toggleDetails(index)}>
                        {expandedDay === index ? "إخفاء التمرين" : "عرض التمرين"}
                      </button>
                    )}
                  </td>
                </tr>
                {expandedDay === index && Array.isArray(item.details) && (
                  <tr>
                    <td colSpan="2">
                      <div className="exercise-details">
                        {item.details.map((detail, i) => (
                          <div key={i} className="exercise-item">
                            <h3><span className="iconitem"><GiMuscleUp /></span> العضلة: <span className="text">{detail.muscle}</span></h3>
                            <p><span className="iconitem"><FaDumbbell /></span> التمرين: <span className="text">{detail.exercise}</span></p>
                            <button onClick={() => { openSystem(detail.video) }}>
                              <span className="iconitem"><FaYoutube /></span>
                              <span>مشاهدة التمرين</span>
                            </button>
                            <p>عدد الجلسات: <span className="number">{detail.sets}</span></p>
                            <p>عدد التكرارات: <span className="number">{detail.reps}</span></p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}