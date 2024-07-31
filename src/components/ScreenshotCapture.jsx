import React, { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { MdOutlineImage } from "react-icons/md";
import generateUniqueId from '../utils/generateUniqueId.js';
import saveFile from '../utils/saveFile.js';
import PopupMessage from "./PopupMessage.jsx";

/**
 * ScreenshotCapture component for capturing an image of a specified component
 *
 * @param {Object} props - Component properties
 * @param {React.RefObject} props.captureRef - Reference to the element to capture
 * @param {string} [props.buttonText='Capture Image'] - The text displayed on the capture button
 * @param {string} [props.fileName='screenshot.png'] - The name of the file for the captured image
 * @param {string} [props.className=''] - Additional class name for the button
 * @returns {React.Element} - A React element rendering a button to capture the image
 */
const ScreenshotCapture = ({
  captureRef,
  buttonText = "Capture Image",
  fileName = "screenshot.png",
  className = "",
}) => {
  const uniqueId = generateUniqueId(40);
  const [popupMessage, setPopupMessage] = useState("");

  const handleCapture = useCallback(async () => {
    if (!captureRef || !captureRef.current) {
      console.error("Invalid reference provided for the element.");
      return;
    }

    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: true,
        scrollX: 0,
        scrollY: -window.scrollY
      });

      const img = canvas.toDataURL("image/png");
      const blob = await fetch(img).then(res => res.blob());

      saveFile(blob, `${uniqueId}-${fileName}`, (message) => {
        setPopupMessage(message);
      }, (message) => {
        setPopupMessage(message);
      });

    } catch (error) {
      console.error("An error occurred while capturing the image:", error);
      setPopupMessage('An error occurred while capturing the image.');
    }
  }, [captureRef, fileName, uniqueId]);

  return (
    <>
      <button onClick={handleCapture} className={className}>
        <MdOutlineImage />
      </button>
      {popupMessage && (
        <PopupMessage message={popupMessage} onClose={() => setPopupMessage("")} />
      )}
    </>
  );
};

export default ScreenshotCapture;