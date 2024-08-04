import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import AppBar from "../../components/AppBar.jsx";
import Slider from "../../components/Slider.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";
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
            setError("تمرين غير موجود.");
          }
        }
        setLoading(false);
      };
      fetchExerciseDetail();
    }
  }, [muscleValue, exercise]);

  const currentUrl = window.location.origin + window.location.pathname;
  const pageMetadata = {
    title: exerciseDetail ? `${exerciseDetail.name} - تفاصيل التمرين | تطبيق عافيتك` : "تفاصيل التمرين - تطبيق عافيتك",
    description: exerciseDetail
      ? `تعرف على تفاصيل تمرين ${exerciseDetail.name} المخصص لعضلة ${muscleValue ? muscleValue.name : 'غير محددة'} لجنس ${normalizedGender === 'male' ? 'الرجال' : 'النساء'} في تطبيق عافيتك. يحتوي على خطوات التمرين، فيديوهات تعليمية، والعديد من المعلومات المفيدة.` 
      : "تفاصيل تمرين غير محددة. يرجى العودة واختيار تمرين صحيح.",
    keywords: exerciseDetail
      ? `تفاصيل تمرين, تمرين ${exerciseDetail.name}, تمرين عضلة ${muscleValue ? muscleValue.name : 'غير محددة'}, تطبيق عافيتك`
      : "تفاصيل تمرين, تطبيق عافيتك",
    ogImage: exerciseDetail
      ? `${window.location.origin}/exercise-${exercise}.jpg`
      : `${window.location.origin}/error.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: exerciseDetail
      ? `تفاصيل تمرين, تمرين ${exerciseDetail.name}, تطبيق عافيتك`
      : "تفاصيل تمرين, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": exerciseDetail ? `${exerciseDetail.name} - تفاصيل التمرين` : "تفاصيل التمرين - تطبيق عافيتك",
      "url": currentUrl,
      "description": exerciseDetail
        ? `تعرف على تفاصيل تمرين ${exerciseDetail.name} المخصص لعضلة ${muscleValue ? muscleValue.name : 'غير محددة'} لجنس ${normalizedGender === 'male' ? 'الرجال' : 'النساء'} في تطبيق عافيتك. يحتوي على خطوات التمرين، فيديوهات تعليمية، والعديد من المعلومات المفيدة.`
        : "تفاصيل تمرين غير محددة. يرجى العودة واختيار تمرين صحيح."
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

  const renderInvalidExerciseMessage = () => (
    <div style={{ textAlign: "center", direction: "ltr" }} className="InvalidExercise">
      <p>تم اختيار تمرين غير صحيح. يرجى العودة وتحديد تمرين صحيح.</p>
      <Link to={`/Exercises/${gender}/${muscle}`} onMouseDown={(e) => e.preventDefault()} draggable="false">العودة إلى التمارين</Link>
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
      const preview_image = `https://musclewiki.i8x.net/api/files/${el.preview_image}`;
      const original_video = el.original_video;
      const file_path = `https://musclewiki.i8x.net/api/files/${el.file_path}`;
      return (
        <>
          {index === 0 && (
            <style>{`
              video::-webkit-media-controls-mute-button {
                display: none;
              }
            `}</style>
          )}

          <video
            key={index}
            src={original_video ? original_video : file_path}
            poster={preview_image}
            controlsList="nodownload noremoteplayback norewind novolume"
            controls
            preload="metadata"
            autoPlay
            loop
            className="video_item"
            title={exerciseDetail.name}
            aria-label={exerciseDetail.name}
          />
        </>
      );
    });

    const body_map = exerciseDetail.body_map[normalizedGender];
    const correct_steps = exerciseDetail.correct_steps;
    const correct_steps_map = correct_steps.map((el, index) => (
      <li key={index}>
        <div className="step_number">{index + 1}</div>
        <div className="step_text">{el.text}</div>
      </li>
    ));

    const youtube_link = exerciseDetail?.long_form_content?.[normalizedGender]?.youtube_link;
    const seo_tags = exerciseDetail.seo_tags;
    const seo_tags_map = seo_tags.map((tag, index) => (
      <li key={'seo_tags_' + index}>
        {tag}
      </li>
    ));

    const difficulty = exerciseDetail.difficulty.name;
    const category = exerciseDetail.category.name;
    const force = exerciseDetail.force.name;

    return (
      <div className="ExerciseDetail">
        <div className="box_info">
          {difficulty ? <p className="difficulty">{difficulty}</p> : null}
          {category ? <p className="category">{category}</p> : null}
        </div>

        <Slider items={videosMap} />

        {body_map ? (
          <>
            <h2 className="category_title">العضلات المستهدفة</h2>
            <div className="box_body_map">
              {body_map.front && (
                <ImageWithSkeleton
                  src={body_map.front}
                  alt={exerciseDetail.name}
                  title={exerciseDetail.name}
                  aria-label={exerciseDetail.name}
                />
              )}
              {body_map.back && (
                <ImageWithSkeleton
                  src={body_map.back}
                  alt={exerciseDetail.name}
                  title={exerciseDetail.name}
                  aria-label={exerciseDetail.name}
                />
              )}
            </div>
          </>
        ) : null}

        {correct_steps ? (
          <>
            <h2 className="category_title">خطوات التمرين الصحيحة</h2>
            <ol className="box_correct_steps">
              {correct_steps_map}
            </ol>
          </>
        ) : null}

        {youtube_link && (
          <iframe
            src={youtube_link}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={exerciseDetail.name}
            aria-label={exerciseDetail.name}
            className="box_youtube"
            sandbox="allow-same-origin allow-scripts"
            poster="/images/icons/youtube.png"
          ></iframe>
        )}

        {exerciseDetail.description && exerciseDetail.description !== 0 && (
          <div dangerouslySetInnerHTML={{ __html: exerciseDetail.description }} className="box_description" />
        )}

        {seo_tags && (
          <ul className="seo_tags_box">
            {seo_tags_map}
          </ul>
        )}
      </div>
    );
  };

  const appBarTitle = !isGenderValid
    ? "تم اختيار جنس غير صحيح"
    : muscleValue && exerciseDetail
      ? exerciseDetail.name
      : muscleValue
        ? muscleValue.name
        : "تم اختيار عضلة غير صحيحة";

  const appBarBackLink = () => {
    if (!isGenderValid) return "/Exercises";
    if (isGenderValid && !muscleValue) return `/Exercises/${normalizedGender}`;
    if (isGenderValid && muscleValue && !exerciseDetail) return `/Exercises/${normalizedGender}/${muscle}`;
    if (!isGenderValid && muscleValue && exerciseDetail) return "/Exercises";
    if (isGenderValid && !muscleValue && !exerciseDetail) return `/Exercises/${normalizedGender}`;
    if (isGenderValid && muscleValue && !exerciseDetail) return `/Exercises/${normalizedGender}/${muscle}`;
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
      <ScrollToTop />
      <div className="ExerciseContentPage">
        {!isGenderValid ? renderInvalidGenderMessage() : null}
        {!muscleValue && isGenderValid ? renderInvalidMuscleMessage() : null}
        {muscleValue && isGenderValid && error && !exerciseDetail ? renderInvalidExerciseMessage() : null}
        {muscleValue && isGenderValid && exerciseDetail ? renderExerciseDetail() : null}
      </div>
    </>
  );
}