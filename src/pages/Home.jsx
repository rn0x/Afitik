import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLightbulb } from "react-icons/md";
import AliceCarousel from "react-alice-carousel";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import ImageWithSkeleton from "../components/ImageWithSkeleton.jsx";
import MenuList from "../components/MenuList.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import tipsJson from "../assets/json/tips.json";
import musclesData from "../assets/json/muscles.json";
import "../assets/styles/Home.css";
import "react-alice-carousel/lib/alice-carousel.css";

export default function Home(props) {
  const currentUrl = window.location.origin + window.location.pathname;

  const pageMetadata = {
    title: "تطبيق عافيتك | الصفحة الرئيسية",
    description: "تطبيق عافيتك هو تطبيق شامل يهدف إلى مساعدتك في تحقيق أهدافك الرياضية والصحية. اكتشف معلومات شاملة عن العضلات وتمارينها، خطط غذائية وصحية، أدوات لحساب السعرات الحرارية وكتلة الجسم، وتتبع إنجازاتك الرياضية. سواء كنت تسعى لبناء العضلات، فقدان الوزن، أو الحفاظ على لياقتك البدنية، فإن عافيتك هو رفيقك المثالي.",
    keywords: "تطبيق عافيتك, رياضة, صحة, لياقة بدنية, تمارين رياضية, بناء العضلات, فقدان الوزن, تغذية, صحة عامة, خطط غذائية, حمية صحية, تمارين, حساب السعرات الحرارية, حساب كتلة الجسم, تتبع الإنجازات الرياضية",
    ogImage: `${window.location.origin}/homepage.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "زيارات, تحليلات, إحصائيات, تطبيق عافيتك, رياضة وصحة, تحسين اللياقة البدنية, تمارين بالصور والفيديو, معلومات عن العضلات",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "تطبيق عافيتك",
      "url": currentUrl
    }
  };

  const tipsRandom =
    tipsJson.tips[Math.floor(Math.random() * tipsJson.tips.length)];

  const items = musclesData.map((muscle, index) => (
    <Link
      to={`/muscles/${muscle.slug}`}
      title={muscle.name_en}
      aria-label={muscle.name_en}
      onMouseDown={(e) => e.preventDefault()}
      draggable="false"
      key={index}
      className="slider-item"
    >

      <ImageWithSkeleton
        key={index}
        src={muscle.bodymaps.male.front ? muscle.bodymaps.male.front : muscle.bodymaps.male.back}
        alt={muscle.name_en}
        title={muscle.name_en}
        aria-label={muscle.name_en}
        className="slider_muscles_image"
      />
      <p className="slider_muscles_names">
        {`${muscle.name}`}
      </p>
    </Link>
  ));

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 640);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="homepage">
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#eceff4" />
      <ToggleActiveClass elementId="nvBarHome" isActive={true} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={false} />
      <ToggleActiveClass elementId="nvBarCommunity" isActive={false} />

      <ScrollToTop />

      <div className="tips">
        <p className="tips_title">
          نصيحة عشوائية
        </p>
        <h3>{tipsRandom.tip}</h3>
        <p>{tipsRandom.description}</p>
      </div>

      <h3 className="title_item">أسماء العضلات</h3>

      <div className="slider-muscles">
        <AliceCarousel
          autoWidth
          items={items}
          infinite={true}
          disableDotsControls={true}
          disableButtonsControls={!isLargeScreen} // Disable controls if screen is smaller than 640px
          touchTracking={true} // Enable touch tracking for all screen sizes
        />
      </div>


      <h3 className="title_item">القائمة الرئيسية</h3>

      <MenuList />
    </div>
  );
}
