import React, { useState } from "react";
import html2canvas from "html2canvas";
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
  const [popupMessage, setPopupMessage] = useState("");
  
  const handleCapture = async () => {
    if (!captureRef || !captureRef.current) {
      console.error("Invalid reference provided for the element.");
      return;
    }

    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
      });

      const img = canvas.toDataURL("image/png");
      const blob = await fetch(img).then(res => res.blob());

      if (window.cordova) {
        const fileSystemURL = window.cordova.file.externalRootDirectory;
        window.resolveLocalFileSystemURL(fileSystemURL, (directoryEntry) => {
          directoryEntry.getDirectory('Download', { create: true, exclusive: false }, (downloadDir) => {
            downloadDir.getDirectory('Afitik', { create: true, exclusive: false }, (dir) => {
              dir.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
                fileEntry.createWriter((fileWriter) => {
                  fileWriter.onwriteend = () => {
                    setPopupMessage(`File saved successfully! File path: ${fileEntry.toURL()}`);
                  };

                  fileWriter.onerror = (error) => {
                    console.error('Write error:', error);
                    setPopupMessage('Failed to save file.');
                  };

                  fileWriter.write(blob);
                }, (error) => {
                  console.error('Error creating file writer:', error);
                  setPopupMessage('Failed to save file.');
                });
              }, (error) => {
                console.error('Error getting file:', error);
                setPopupMessage('Failed to save file.');
              });
            }, (error) => {
              console.error('Error getting Afitik directory:', error);
              setPopupMessage('Failed to create Afitik directory.');
            });
          }, (error) => {
            console.error('Error getting Download directory:', error);
            setPopupMessage('Failed to create Download directory.');
          });
        }, (error) => {
          console.error('Error resolving local file system URL:', error);
          setPopupMessage('Failed to resolve file system URL.');
        });
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      
        // setPopupMessage(`File saved successfully!`);
      }
    } catch (error) {
      console.error("An error occurred while capturing the image:", error);
      setPopupMessage('An error occurred while capturing the image.');
    }
  };

  return (
    <>
      <button onClick={handleCapture} className={className}>
        {buttonText}
      </button>
      {popupMessage && (
        <PopupMessage message={popupMessage} onClose={() => setPopupMessage("")} />
      )}
    </>
  );
};

export default ScreenshotCapture;
