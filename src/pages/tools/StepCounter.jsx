import React, { useState, useEffect, useRef } from 'react';

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [error, setError] = useState(null);
  const [isCounting, setIsCounting] = useState(false); // Start with false and try to start counting
  const intervalRef = useRef(null); // To hold the interval ID

  useEffect(() => {
    // Try to start counting steps automatically when the component mounts
    startCounting();

    // Cleanup function to clear interval when component unmounts or counting stops
    return () => {
      stopCounting();
    };
  }, []); // Empty dependency array to run only on mount

  const startCounting = () => {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.start(
        () => {
          console.log('Step counting started');
          setError(null); // Clear any previous errors
          setIsCounting(true); // Set counting status to true
          fetchStepCount(); // Fetch step count immediately
          // Set interval to update step count regularly
          intervalRef.current = setInterval(fetchStepCount, 2000); // Update every 2 seconds
        },
        (err) => {
          console.error(`Error starting step counting: ${err}`);
          setError(`Error starting step counting: ${err}`);
          setIsCounting(false); // Ensure counting is set to false on error
        }
      );
    } else {
      setError('StepCounter plugin is not available.');
      setIsCounting(false); // Ensure counting is set to false if plugin is not available
    }
  };

  const stopCounting = () => {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.stop(
        () => {
          console.log('Step counting stopped');
          setError(null); // Clear any previous errors
          setIsCounting(false); // Set counting status to false
          setSteps(0);
          // Clear interval to stop updating step count
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        },
        (err) => {
          console.error(`Error stopping step counting: ${err}`);
          setError(`Error stopping step counting: ${err}`);
        }
      );
    } else {
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
      setError('StepCounter plugin is not available.');
    }
  };

  const handleToggleCounting = () => {
    if (isCounting) {
      stopCounting();
    } else {
      startCounting();
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleToggleCounting} style={style}>
        {isCounting ? 'Stop Counting' : 'Start Counting'}
      </button>
      <p>Steps: {steps}</p>
    </div>
  );
};

export default StepCounter;
