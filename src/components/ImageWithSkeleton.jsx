import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

const ImageWithSkeleton = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // استخراج src و alt من الخصائص، مع تعيين قيمة افتراضية لـ alt
  const { src, alt = '', ...otherProps } = props;

  useEffect(() => {
    if (!src) return; // التحقق من وجود خاصية src

    const img = new Image();
    img.src = src;

    const handleLoad = () => setImageLoaded(true);
    const handleError = () => setHasError(true);

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return (
    <>
      {!imageLoaded && !hasError && <Skeleton variant="rectangular" height={200} />}
      {hasError ? (
        <div>Failed to load image</div> // رسالة خطأ يمكن تخصيصها
      ) : (
        <img
          src={src}
          alt={alt} // استخدام alt الذي تم تعيينه افتراضيًا
          style={{ display: imageLoaded ? 'block' : 'none' }}
          loading="lazy"
          {...otherProps} // تمرير جميع الخصائص الأخرى
        />
      )}
    </>
  );
};

export default ImageWithSkeleton;
