import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";
import Slider from "../../components/Slider.jsx";
import AppBar from "../../components/AppBar.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import "../../assets/styles/Exercises.css";
import musclesData from "../../assets/json/muscles.json";

export default function ExerciseList() {
  const { gender, muscle } = useParams();
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(10);

  const validGenders = ["male", "female"];
  const normalizedGender = gender ? gender.toLowerCase() : '';
  const isGenderValid = validGenders.includes(normalizedGender);
  const muscleValue = musclesData.find(m => m.slug === muscle);

  useEffect(() => {
    if (muscleValue) {
      const fetchDataFromPath = async () => {
        const json_data_path = muscleValue.json_data_path;
        const { data, error } = await fetchData(json_data_path);
        if (error) {
          setError(error);
        } else {
          setExerciseData(data);
        }
        setLoading(false);
      };
      fetchDataFromPath();
    }
  }, [muscleValue]);
  
  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: isGenderValid && muscleValue ? `تمارين عضلة ${muscleValue.name} - تطبيق عافيتك` : "خطأ في اختيار الجنس أو العضلة - تطبيق عافيتك",
    description: isGenderValid && muscleValue
      ? `اكتشف قائمة التمارين المتخصصة لعضلة ${muscleValue.name} لجنس ${gender === 'male' ? 'الرجال' : 'النساء'} في تطبيق عافيتك. عرض تفاصيل التمارين، الصعوبة، وفئات التمارين المناسبة لك.`
      : "تم اختيار جنس أو عضلة غير صحيحة. يرجى العودة وتحديد جنس وعضلة صحيحة لعرض التمارين المناسبة.",
    keywords: isGenderValid && muscleValue
      ? `تمارين عضلات, عضلة ${muscleValue.name}, ${gender === 'male' ? 'تمارين للرجال' : 'تمارين للنساء'}, تطبيق عافيتك`
      : "جنس غير صحيح, عضلة غير صحيحة, تطبيق عافيتك",
    ogImage: isGenderValid && muscleValue
      ? `${window.location.origin}/exercise-list-${normalizedGender}-${muscleValue.slug}.jpg`
      : `${window.location.origin}/error.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: isGenderValid && muscleValue
      ? `تمارين عضلات, عضلة ${muscleValue.name}, تطبيق عافيتك`
      : "جنس أو عضلة غير صحيحة, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": isGenderValid && muscleValue ? `تمارين عضلة ${muscleValue.name} - تطبيق عافيتك` : "خطأ في اختيار الجنس أو العضلة - تطبيق عافيتك",
      "url": currentUrl,
      "description": isGenderValid && muscleValue
        ? `اكتشف قائمة التمارين المتخصصة لعضلة ${muscleValue.name} لجنس ${gender === 'male' ? 'الرجال' : 'النساء'} في تطبيق عافيتك. عرض تفاصيل التمارين، الصعوبة، وفئات التمارين المناسبة لك.`
        : "تم اختيار جنس أو عضلة غير صحيحة. يرجى العودة وتحديد جنس وعضلة صحيحة لعرض التمارين المناسبة."
    }
  };

  // دالة لجلب البيانات من مسار محدد
  const fetchData = async (paths) => {
    try {
      const data = await Promise.all(
        paths.map(async (path) => {
          const response = await fetch(path);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error: `Error loading data: ${error.message}` };
    }
  };

  const renderInvalidGenderMessage = () => (
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidGender">
      <p>تم اختيار جنس غير صحيح. يرجى العودة وتحديد جنس صحيح.</p>
      <Link to="/Exercises" onMouseDown={(e) => e.preventDefault()} draggable="false">العودة إلى التمارين</Link>
    </div>
  );

  const renderInvalidMuscleMessage = () => (
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidMuscle">
      <p>تم اختيار عضلة غير صحيحة. يرجى العودة وتحديد عضلة صحيحة.</p>
      <Link to={`/Exercises/${gender}`} onMouseDown={(e) => e.preventDefault()} draggable="false">العودة إلى العضلات</Link>
    </div>
  );

  const renderExerciseList = () => {
    if (loading) {
      return (
        <div>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={200} style={{ marginBottom: '20px' }} />
          ))}
        </div>
      );
    }

    if (error) {
      return <div style={{ textAlign: "center" }} className="ExerciseList">{error}</div>;
    }

    const handleLoadMore = () => {
      setItemsToShow((prev) => prev + 10);
    };

    const exercises = exerciseData.flatMap(data => data.exercises);

    return (
      <div className="ExerciseList">
        {exercises.slice(0, itemsToShow).map((ex, index) => {
          const difficulty = ex.difficulty.name;
          const category = ex.category.name;
          const videos = ex.videos[gender];
          const videosMap = videos.map((videoData, videoIndex) => {
            const preview_image = `https://musclewiki.i8x.net/api/files/${videoData.preview_image}`;
            return (
              <ImageWithSkeleton
                key={videoIndex}
                src={preview_image}
                alt={ex.name}
                title={ex.name}
                className="slider_images"
              />
            );
          });

          return (
            <Link
              to={`/Exercises/${gender}/${muscle}/${ex.slug}`}
              key={index}
              title={ex.name}
              aria-label={ex.name}
              onMouseDown={(e) => e.preventDefault()}
              draggable="false"
              className="item-exercise"
            >

              <div className="item-exercise-title">
                <p>{ex.name}</p>
              </div>

              <Slider items={videosMap} />
              {difficulty ? <p className="difficulty">{difficulty}</p> : null}
              {category ? <p className="category">{category}</p> : null}
            </Link>
          );
        })}
        {exercises.length > itemsToShow && (
          <button onClick={handleLoadMore} className="buttonMore">عرض المزيد</button>
        )}
      </div>
    );
  };

  const appBarTitle = !isGenderValid
    ? "جنس غير صحيح"
    : muscleValue
      ? muscleValue.name
      : "عضلة غير صحيحة";

  const appBarBackLink = ((!isGenderValid && !muscleValue) || (!isGenderValid && muscleValue))
    ? "/Exercises"
    : `/Exercises/${normalizedGender}`;

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <AppBar title={appBarTitle} backLink={appBarBackLink} />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={true} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      

      <ScrollToTop />

      <div className="ExerciseListPage">
        {!isGenderValid ? renderInvalidGenderMessage() : null}
        {!muscleValue && isGenderValid ? renderInvalidMuscleMessage() : null}
        {muscleValue && isGenderValid ? renderExerciseList() : null}
      </div>
    </>
  );
}