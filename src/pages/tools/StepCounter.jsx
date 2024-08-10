import React, { useState } from 'react';

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [error, setError] = useState(null);

  const startCounting = () => {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.start(
        () => {
          console.log('Step counting started');
          setError(null); // Clear any previous errors
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
      console.log("lllllllllllllllllll");
      
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

  const style = {
    display: "block",
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto"
  };

  return (
    <div>
      <h1>Step Counter</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={startCounting} style={style}>Start Counting</button>
      <button onClick={stopCounting} style={style}>Stop Counting</button>
      <button onClick={fetchStepCount} style={style}>Fetch Step Count</button>
      <p>Steps: {steps}</p>
    </div>
  );
};

export default StepCounter;