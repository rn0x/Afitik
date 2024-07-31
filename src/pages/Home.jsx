import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import AliceCarousel from "react-alice-carousel";
import SetPageMetadata from "../components/SetPageMetadata.jsx";
import StatusBarColor from "../components/StatusBarColor.jsx";
import ToggleActiveClass from "../components/ToggleActiveClass.jsx";
import MenuList from "../components/MenuList.jsx";
import tipsJson from "../assets/json/tips.json";
import musclesData from "../assets/json/muscles.json";
import "../assets/styles/Home.css";
import "react-alice-carousel/lib/alice-carousel.css";

export default function Home(props) {
  const pageMetadata = {
    title: "الصفحة الرئيسية",
    description: "مرحباً بك في الصفحة الرئيسية لموقعنا",
    keywords: "موقع, إنترنت, رياكت",
    ogImage: "https://example.com/homepage.jpg",
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
      <img
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

      <div className="tips">
        <MdOutlineTipsAndUpdates id="tipsIcon" />
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

      <p>
        kkkkkkkkkkkkkk
      </p>
    </div>
  );
}
