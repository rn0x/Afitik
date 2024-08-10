import React, { useState, useEffect } from 'react';
import { MdWarning, MdPlayArrow, MdStop } from 'react-icons/md';

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [error, setError] = useState(null);
  const [isCordova, setIsCordova] = useState(false);
  const [isPluginInstalled, setIsPluginInstalled] = useState(false);

  useEffect(() => {
    // Check if Cordova is available and the plugin is installed
    if (window.cordova) {
      setIsCordova(true);
      if (window.cordova.plugins && window.cordova.plugins.stepCounter) {
        setIsPluginInstalled(true);
      } else {
        setIsPluginInstalled(false);
      }
    } else {
      setIsCordova(false);
      setIsPluginInstalled(false);
    }
  }, []);

  const startCounting = () => {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.start(
        () => {
          console.log('Step counting started');
          setError(null); // Clear any previous errors
          // Update step count every second
          const intervalId = setInterval(() => {
            fetchStepCount();
          }, 1000);
          return () => clearInterval(intervalId);
        },
        (err) => {
          console.error(`Error starting step counting: ${err}`);
          setError(`Error starting step counting: ${err}`);
        }
      );
    } else {
      console.error('StepCounter plugin is not available.');
      setError('StepCounter plugin is not available.');
    }
  };

  const stopCounting = () => {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.stop(
        () => {
          console.log('Step counting stopped');
          setError(null); // Clear any previous errors
        },
        (err) => {
          console.error(`Error stopping step counting: ${err}`);
          setError(`Error stopping step counting: ${err}`);
        }
      );
    } else {
      console.error('StepCounter plugin is not available.');
      setError('StepCounter plugin is not available.');
    }
  };

  const fetchStepCount = () => {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.getStepCount(
        (result) => {
          console.log("Result:", result);
          setSteps(result);
          setError(null); // Clear any previous errors
        },
        (err) => {
          console.error(`Error fetching step count: ${err}`);
          setError(`Error fetching step count: ${err}`);
        }
      );
    } else {
      console.error('StepCounter plugin is not available.');
      setError('StepCounter plugin is not available.');
    }
  };

  const warningStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    fontSize: '18px',
    color: 'red',
    border: '1px solid red',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    margin: '20px',
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const startButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  const stopButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  const stepsDisplayStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20px',
    color: '#333',
  };

  return (
    <div style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto", }}>
      <p style={stepsDisplayStyle}>{steps}</p>
      {!isCordova && (
        <div style={warningStyle}>
          <MdWarning style={{ fontSize: '30px', marginRight: '10px' }} />
          <p>Your application is running in the browser or the Cordova environment is not set up properly.</p>
        </div>
      )}
      {isCordova && !isPluginInstalled && (
        <div style={warningStyle}>
          <MdWarning style={{ fontSize: '30px', marginRight: '10px' }} />
          <p>The StepCounter plugin is not installed.</p>
        </div>
      )}
      {isCordova && isPluginInstalled && (
        <>
          <button onClick={startCounting} style={startButtonStyle}>
            <MdPlayArrow style={{ fontSize: '20px', marginRight: '10px' }} />
            Start Counting
          </button>
          <button onClick={stopCounting} style={stopButtonStyle}>
            <MdStop style={{ fontSize: '20px', marginRight: '10px' }} />
            Stop Counting
          </button>
        </>
      )}
    </div>
  );
};

export default StepCounter;
