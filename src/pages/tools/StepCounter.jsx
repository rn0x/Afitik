import React, { useState, useEffect, useRef } from 'react';
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import AppBar from "../../components/AppBar.jsx";
import PopupMessage from "../../components/PopupMessage.jsx";
import "../../assets/styles/Tools.css";

// Constants
const FETCH_INTERVAL = 1000; // Time interval for fetching step count (in milliseconds)

const StepCounter = () => {
  const currentUrl = `${window.location.origin}${window.location.pathname}`;

  // Page metadata
  const pageMetadata = {
    title: "عداد الخطوات - تطبيق عافيتك لتحسين اللياقة البدنية",
    description: "تتبع خطواتك اليومية بدقة مع تطبيق عافيتك. احصل على رؤى مفصلة حول نشاطك البدني وساعد في تحقيق أهداف لياقتك.",
    keywords: "عداد الخطوات, تتبع الخطوات, تطبيق لياقة بدنية, عافيتك, تمرين يومي, تطبيق خطوات",
    ogImage: `${window.location.origin}/images/step-counter.jpg`,
    canonicalUrl: currentUrl,
    contentLanguage: "ar",
    author: "مؤسس تطبيق عافيتك",
    analyticsKeywords: "عداد الخطوات, تتبع النشاط, تطبيق عافيتك",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "تطبيق عافيتك - عداد الخطوات لتحسين صحتك",
      "url": currentUrl,
      "description": "صفحة عداد الخطوات في تطبيق عافيتك، حيث يمكنك تتبع نشاطك البدني وتحقيق أهداف لياقتك البدنية."
    }
  };

  // State hooks
  const [steps, setSteps] = useState(0);
  const [error, setError] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [weight, setWeight] = useState(100); // Default weight in kg
  const [duration, setDuration] = useState(0); // Duration in seconds
  const [calories, setCalories] = useState(0);

  const intervalRef = useRef(null);
  const durationRef = useRef(0);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCounting();
    };
  }, []);

  // Recalculate calories when steps or weight change
  useEffect(() => {
    setCalories(calculateCalories(steps, weight));
  }, [steps, weight]);

  // Handle fetching step count at regular intervals
  useEffect(() => {
    if (isCounting) {
      intervalRef.current = setInterval(fetchStepCount, FETCH_INTERVAL);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isCounting]);

  // Handle counting duration
  useEffect(() => {
    if (isCounting) {
      durationRef.current = setInterval(() => {
        setDuration(prevDuration => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(durationRef.current);
      durationRef.current = null;
    }
    return () => clearInterval(durationRef.current);
  }, [isCounting]);

  // Start step counting
  const startCounting = () => {
    if (window.cordova && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.start(
        () => {
          setIsCounting(true);
          setError(null);
          setDuration(0); // Reset duration
        },
        (err) => {
          setError(`Error starting step counting: ${err}`);
          setIsCounting(false);
        }
      );
    } else {
      setError('StepCounter plugin is not available.');
    }
  };

  // Stop step counting
  const stopCounting = () => {
    if (window.cordova && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.stop(
        () => {
          setIsCounting(false);
          setSteps(0);
          setDuration(0); // Reset duration
          setCalories(0); // Reset calories
          setError(null);
        },
        (err) => {
          if (err.includes('Sensor not initialized')) {
            console.log('Step counting is not active. No need to stop.'); // Log message for clarity
            setError(null);
          } else {
            setError(`Error stopping step counting: ${err}`);
          }
        }
      );
    } else {
      setError('StepCounter plugin is not available.');
    }
  };

  // Fetch step count
  const fetchStepCount = () => {
    if (!isCounting) {
      console.log('Step counting is not active. Skipping fetch.'); // Log message for clarity
      return;
    }

    if (window.cordova && window.cordova.plugins.stepCounter) {
      window.cordova.plugins.stepCounter.getStepCount(
        (result) => {
          setSteps(result);
          setError(null);
        },
        (err) => {
          if (err.includes('Step counting is not active')) {
            console.log('Error: Step counting is not active. Skipping fetch.'); // Log message for clarity
            setError(null);
          } else {
            setError(`Error fetching step count: ${err}`);
          }
        }
      );
    } else {
      setError('StepCounter plugin is not available.');
    }
  };

  // Calculate distance in km
  const calculateDistance = (steps) => {
    const stepLength = 0.75; // Average step length in meters
    return (steps * stepLength) / 1000; // Convert to kilometers
  };

  // Calculate calories burned
  const calculateCalories = (steps, weight) => {
    const caloriesPerStep = 0.035 * weight / 1000; // Adjusted calories per step based on weight
    return steps * caloriesPerStep;
  };

  // Toggle step counting
  const handleToggleCounting = () => {
    isCounting ? stopCounting() : startCounting();
  };

  // Close popup message
  const handleClosePopup = () => {
    setError(null);
  };

  // Increment weight
  const incrementWeight = () => {
    setWeight((prevWeight) => Math.min(prevWeight + 1, 300)); // Max weight: 300 kg
  };

  // Decrement weight
  const decrementWeight = () => {
    setWeight((prevWeight) => Math.max(prevWeight - 1, 50)); // Min weight: 50 kg
  };

  return (
    <>
      <SetPageMetadata {...pageMetadata} />
      <StatusBarColor color="#7AB2B2" />
      <AppBar title="عداد الخطوات" backLink="/Tools" />
      <ToggleActiveClass elementId="nvBarHome" isActive={false} />
      <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
      <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
      <ToggleActiveClass elementId="nvBarTools" isActive={true} />
      <ScrollToTop />
      <div id='StepCounterPage'>
        {error && <PopupMessage message={error} onClose={handleClosePopup} />}
        {!error && (
          <>
            <div id='box_steps'>
              <p id='steps'>{steps}</p>
              <p id='steps_title'>خطوة</p>
            </div>

            <button
              id='button_steps'
              onClick={handleToggleCounting}
              style={{ backgroundColor: isCounting ? "#df5656" : "var(--color-7)" }}
            >
              {isCounting ? 'أوقف العد' : 'ابدأ العد'}
            </button>

            <div id='info_box'>
              <p><strong>المدة الزمنية:</strong> {Math.floor(duration / 60)} دقيقة {duration % 60} ثانية</p>
              <p><strong>المسافة المقطوعة:</strong> {calculateDistance(steps).toFixed(2)} كم</p>
              <p><strong>السعرات الحرارية:</strong> {calories.toFixed(2)} سعر حراري</p>
            </div>

            <div id='weight_control'>
              <button onClick={decrementWeight}>-</button>
              <span>الوزن: {weight} كجم</span>
              <button onClick={incrementWeight}>+</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StepCounter;