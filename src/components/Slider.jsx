import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../assets/styles/Exercises.css";

const Slider = ({ items }) => {
  // تغليف كل عنصر في div لإضافة المسافة
  const wrappedItems = items.map((item, index) => (
    <div key={index} style={{ padding: '0 10px' }}>
      {item}
    </div>
  ));

  return (
    <div className="slider">
      <AliceCarousel
        mouseTracking
        items={wrappedItems}
        infinite={false}
        disableDotsControls={false}
        disableButtonsControls={true}
        touchTracking={true}
        responsive={{
          0: { items: 1 }, // عرض صورة واحدة على الشاشات الصغيرة
          768: { items: 1 }, // عرض صورة واحدة على الشاشات الأكبر
        }}
        controlsStrategy="alternate"
      />
    </div>
  );
};

export default Slider;
