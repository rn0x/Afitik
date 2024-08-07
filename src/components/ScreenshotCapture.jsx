import React, { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { MdOutlineImage } from "react-icons/md";
import generateUniqueId from '../utils/generateUniqueId.js';
import { writeFile, getDirectories, COMMON_DIRECTORIES } from '../utils/FileUtils.js';
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
      const fileNameWithId = `${uniqueId}-${fileName}`;

      if (window.cordova && window.cordova.file) {
        const externalRootDirectory = getDirectories().externalRootDirectory;
        const baseDirectory = externalRootDirectory;
        const targetDirectory = `${baseDirectory}${COMMON_DIRECTORIES.DCIM}`;
        const filePath = `${targetDirectory}/${fileNameWithId}`;

        try {
          await writeFile(filePath, blob);
          console.log(`Saving to: ${filePath}`);
          setPopupMessage('File saved successfully.');
        } catch (error) {
          try {
            console.error("Error in first writeFile call: ", error);
            const targetDirectory = `${baseDirectory}${COMMON_DIRECTORIES.Download}`;
            const filePath = `${targetDirectory}/${fileNameWithId}`;
            await writeFile(filePath, blob);
            console.log(`Saving to: ${filePath}`);
            setPopupMessage('File saved successfully.');
          } catch (error) {
            try {
              console.error("Error in second writeFile call: ", error);
              const baseDirectory = getDirectories().dataDirectory;
              const targetDirectory = `${baseDirectory}`;
              const filePath = `${targetDirectory}/${fileNameWithId}`;
              await writeFile(filePath, blob);
              console.log(`Saving to: ${filePath}`);
              setPopupMessage('File saved successfully.');
            } catch (error) {
              console.error("Error in writeFile call: ", error);
              setPopupMessage(`Failed to save the file: ${error.message || JSON.stringify(error)}`);
            }
          }
        }
      } else {
        // Fallback for non-Cordova environment
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileNameWithId;
        link.click();
        setPopupMessage('File saved successfully!');
      }
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