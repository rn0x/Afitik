import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

const ImageWithSkeleton = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { src, alt = '', ...otherProps } = props;

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  return (
    <>
      {!imageLoaded && <Skeleton variant="rectangular" height={200} />}
      <img
        src={src}
        alt={alt} 
        style={{ display: imageLoaded ? 'block' : 'none' }}
        loading="lazy"
        {...otherProps}
      />
    </>
  );
};

export default ImageWithSkeleton;
