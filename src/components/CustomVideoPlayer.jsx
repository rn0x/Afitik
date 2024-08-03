import React, { useState, useRef, useEffect, useCallback } from "react";
import { Skeleton } from "@mui/material";

const CustomVideoPlayer = (props) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleCanPlay = useCallback(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener("canplay", handleCanPlay);
            return () => {
                videoElement.removeEventListener("canplay", handleCanPlay);
            };
        }
    }, [handleCanPlay]);

    // Combine class names manually
    const videoClassName = [
        "video_item",
        isLoading ? "hidden" : "",
        props.className || ""
    ].filter(Boolean).join(" ");

    return (
        <>
            {isLoading && <Skeleton variant="rectangular" width="100%" height={400} />}
            <video
                ref={videoRef}
                className={videoClassName}
                {...props}
            />
        </>
    );
};

export default CustomVideoPlayer;