import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import AppBar from "../../components/AppBar.jsx";
import Slider from "../../components/Slider.jsx";     
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx"; 
import CustomVideoPlayer from "../../components/CustomVideoPlayer.jsx"; 
import musclesData from "../../assets/json/muscles.json";

export default function ExerciseContent() {
  const { gender, muscle, exercise } = useParams();
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validGenders = ["male", "female"];
  const normalizedGender = gender ? gender.toLowerCase() : '';
  const isGenderValid = validGenders.includes(normalizedGender);
  const muscleValue = musclesData.find(m => m.slug === muscle);

  useEffect(() => {
    if (muscleValue) {
      const fetchExerciseDetail = async () => {
        const json_data_path = muscleValue.json_data_path;
        const { data, error } = await fetchData(json_data_path);
        if (error) {
          setError(error);
        } else {
          const exerciseDetail = data.flatMap(data => data.exercises).find(ex => ex.slug === exercise);
          if (exerciseDetail) {
            setExerciseDetail(exerciseDetail);
          } else {
            setError("Exercise not found.");
          }
        }
        setLoading(false);
      };
      fetchExerciseDetail();
    }
  }, [muscleValue, exercise]);

  const pageMetadata = {
    title: "تفاصيل التمرين",
    description: "تفاصيل تمرين محدد",
    keywords: "تمرين, رياضة, تفاصيل",
    ogImage: "https://example.com/exercise.jpg",
    canonicalUrl: "https://example.com",
    contentLanguage: "ar",
    author: "مؤسس الموقع",
    analyticsKeywords: "زيارات, تحليلات, إحصائيات",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "موقعنا",
      url: "https://example.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://example.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  };

  const renderInvalidGenderMessage = () => (
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidGender">
      <p>Invalid gender selected. Please go back and select a valid gender.</p>
      <Link to="/Exercises" onMouseDown={(e) => e.preventDefault()} draggable="false">Go back to Exercises</Link>
    </div>
  );

  const renderInvalidMuscleMessage = () => (
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidMuscle">
      <p>Invalid Muscle selected. Please go back and select a valid Muscle.</p>
      <Link to={`/Exercises/${gender}`} onMouseDown={(e) => e.preventDefault()} draggable="false">Go back to Muscle</Link>
    </div>
  );

  const renderInvalidExerciseMessage = () => (
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidExercise">
      <p>Invalid Exercise selected. Please go back and select a valid Exercise.</p>
      <Link to={`/Exercises/${gender}/${muscle}`} onMouseDown={(e) => e.preventDefault()} draggable="false">Go back to Exercises</Link>
    </div>
  );

  const renderExerciseDetail = () => {
    if (loading) {
      return (
        <div>
          <Skeleton variant="rectangular" height={400} style={{ marginBottom: '20px' }} />
        </div>
      );
    }

    if (error) {
      return <div style={{ textAlign: "center" }} className="ExerciseDetail">{error}</div>;
    }

    const videos = exerciseDetail.videos[normalizedGender];

    const videosMap = videos.map((el, index) => {
      const filePath = `https://musclewiki.i8x.net/api/files/${el.file_path}`;
      return (
        <CustomVideoPlayer
          key={index}
          src={filePath}
          autoPlay
          loop
          className="video_item"
        />
      )
    });

    return (
      <div className="ExerciseDetail">
        <Slider items={videosMap} />
        <div dangerouslySetInnerHTML={{ __html: exerciseDetail.description }} />
        {/* Render other details like images, videos, etc. */}
      </div>
    );
  };

  const appBarTitle = !isGenderValid
    ? "Invalid gender selected"
    : muscleValue && exerciseDetail
      ? exerciseDetail.name
      : muscleValue
        ? muscleValue.name
        : "Invalid Muscle selected";

  const appBarBackLink = () => {
    // إذا كان الجنس غير صحيح
    if (!isGenderValid) {
      return "/Exercises";
    }

    // إذا كان الجنس صحيح ولكن العضلة غير صحيحة
    if (isGenderValid && !muscleValue) {
      return `/Exercises/${normalizedGender}`;
    }

    // إذا كان الجنس والعضلة صحيحة ولكن التمرين غير صحيح
    if (isGenderValid && muscleValue && !exerciseDetail) {
      return `/Exercises/${normalizedGender}/${muscle}`;
    }

    // إذا كان الجنس والعضلة غير صحيحة ولكن التمرين صحيح (غير محتمل)
    if (!isGenderValid && muscleValue && exerciseDetail) {
      return "/Exercises";
    }

    // إذا كان الجنس صحيح ولكن العضلة والتمرين غير صحيحين
    if (isGenderValid && !muscleValue && !exerciseDetail) {
      return `/Exercises/${normalizedGender}`;
    }

    // إذا كان الجنس والعضلة صحيحة ولكن التمرين غير صحيح
    if (isGenderValid && muscleValue && !exerciseDetail) {
      return `/Exercises/${normalizedGender}/${muscle}`;
    }

    // إذا كان الجنس والعضلة والتمر صحيحة
    return `/Exercises/${normalizedGender}/${muscle}`;
  };


  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <AppBar title={appBarTitle} backLink={appBarBackLink()} />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={true} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

      <div className="ExerciseContentPage">
        {!isGenderValid ? renderInvalidGenderMessage() : null}
        {!muscleValue && isGenderValid ? renderInvalidMuscleMessage() : null}
        {muscleValue && isGenderValid && error && !exerciseDetail ? renderInvalidExerciseMessage() : null}
        {muscleValue && isGenderValid && exerciseDetail ? renderExerciseDetail() : null}
      </div>
    </>
  );
}

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


// دالة للتحقق من صلاحية الروابط
const checkVideoUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};