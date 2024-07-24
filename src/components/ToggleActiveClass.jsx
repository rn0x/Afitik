import React, { useEffect } from "react";

export default function ToggleActiveClass({ elementId, isActive }) {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      if (isActive) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    }
  }, [elementId, isActive]); // تحديث التأثير عند تغيير المعرف أو حالة isActive

  return null; // هذا المكون لا يحتاج إلى عرض أي محتوى
}