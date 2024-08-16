import React, { useState } from "react";
import { FaDumbbell, FaYoutube, FaCalendarAlt } from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { openSystem } from '../../utils/inAppBrowserUtils.js'

export default function ThreeDaysWorkoutPage() {
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: "جدول تمارين 3 أيام أسبوعيًا - تطبيق عافيتك",
    description: "استعرض جدول تمارين مخصص لثلاثة أيام في الأسبوع يشمل تمارين متنوعة مع تفاصيل حول كل تمرين، العضلات المستهدفة، وعدد الجلسات والتكرارات. خطط لياقتك البدنية مع تطبيق عافيتك.",
    keywords: "جدول تمارين 3 أيام, خطة التمرين, تمارين رياضية, لياقة بدنية, تطبيق عافيتك",
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
      details: "راحة واستعادة النشاط (Rest)",
    },
    {
      day: "الأحد",
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
          exercise: "تمرين البطن (Crunches)",
          video: "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
          sets: 3,
          reps: 15,
        },
      ],
    },
    {
      day: "الإثنين",
      details: "راحة واستعادة النشاط (Rest)",
    },
    {
      day: "الثلاثاء",
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
          exercise: "تمرين العضلة الثنائية (Bicep Curls)",
          video: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      day: "الأربعاء",
      details: "راحة واستعادة النشاط (Rest)",
    },
    {
      day: "الخميس",
      details: [
        {
          muscle: "الساقين",
          exercise: "تمرين القرفصاء (Squats)",
          video: "https://www.youtube.com/watch?v=aclHkVaku9U",
          sets: 4,
          reps: 15,
        },
        {
          muscle: "الكتف",
          exercise: "تمرين رفع الأثقال (Shoulder Press)",
          video: "https://www.youtube.com/watch?v=B-aVuyhvLHU",
          sets: 3,
          reps: 10,
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
      <AppBar title="جدول تمارين 3 ايام اسبوعيا" backLink="/workout-schedule" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />

      <ScrollToTop />
      <main className="container" id="ThreeDaysWorkoutPage">
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
                            <h3><span className="iconitem"><GiMuscleUp /></span> العضلة: {detail.muscle}</h3>
                            <p><span className="iconitem"><FaDumbbell /></span> التمرين: {detail.exercise}</p>
                            <button onClick={() => { openSystem(detail.video) }}>
                              <span className="iconitem"><FaYoutube /></span>
                              <span>مشاهدة التمرين</span>
                            </button>
                            <p>عدد الجلسات: {detail.sets}</p>
                            <p>عدد التكرارات: {detail.reps}</p>
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