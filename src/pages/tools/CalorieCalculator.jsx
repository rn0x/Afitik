import React, { useState, useRef } from 'react';
import { FaWalking, FaSwimmer, FaRunning, FaAppleAlt, FaHeartbeat } from 'react-icons/fa';
import SetPageMetadata from "../../components/SetPageMetadata.jsx";
import StatusBarColor from "../../components/StatusBarColor.jsx";
import AppBar from "../../components/AppBar.jsx";
import ToggleActiveClass from "../../components/ToggleActiveClass.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import ScreenshotCapture from "../../components/ScreenshotCapture.jsx";
import ImageWithSkeleton from "../../components/ImageWithSkeleton.jsx";

const CalorieCalculator = () => {
    const captureRef = useRef(null);
    const currentUrl = window.location.origin + window.location.pathname;
    const pageMetadata = {
        title: "حاسبة السعرات الحرارية - تطبيق عافيتك",
        description: "استخدم حاسبة السعرات الحرارية لحساب احتياجاتك اليومية من الطاقة بناءً على عمرك، وزنك، طولك، ومستوى نشاطك البدني. استمتع بنصائح صحية للوصول إلى أهدافك.",
        keywords: "حاسبة السعرات الحرارية, حساب السعرات, كتلة الجسم, وزن مثالي, صحة, لياقة, تطبيق عافيتك",
        ogImage: `${window.location.origin}/calorie-calculator.jpg`,
        canonicalUrl: currentUrl,
        contentLanguage: "ar",
        author: "مؤسس تطبيق عافيتك",
        analyticsKeywords: "حاسبة السعرات, صحة, لياقة, حساب السعرات الحرارية, تطبيق عافيتك",
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "تطبيق عافيتك",
            "url": currentUrl
        }
    };

    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        activityLevel: 'sedentary',
    });

    const [formErrors, setFormErrors] = useState({});
    const [calories, setCalories] = useState(null);
    const [bmi, setBmi] = useState(null);
    const [weightCategory, setWeightCategory] = useState('');
    const [idealWeight, setIdealWeight] = useState(null);
    const [suggestedCalories, setSuggestedCalories] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setFormErrors({
            ...formErrors,
            [e.target.name]: '',
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.age || isNaN(parseInt(formData.age))) errors.age = 'العمر مطلوب ويجب أن يكون رقمًا';
        if (!formData.weight || isNaN(parseInt(formData.weight))) errors.weight = 'الوزن مطلوب ويجب أن يكون رقمًا';
        if (!formData.height || isNaN(parseInt(formData.height))) errors.height = 'الطول مطلوب ويجب أن يكون رقمًا';

        return errors;
    };

    const calculateCalories = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const { age, gender, weight, height, activityLevel } = formData;

        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        const activityFactors = {
            sedentary: 1.2,
            lightly_active: 1.375,
            moderately_active: 1.55,
            very_active: 1.725,
            extra_active: 1.9,
        };

        const finalCalories = bmr * activityFactors[activityLevel];
        setCalories(finalCalories.toFixed(2));

        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(1));

        let category = '';
        if (bmiValue < 18.5) {
            category = 'نقص الوزن';
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            category = 'وزن طبيعي';
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            category = 'زيادة الوزن';
        } else if (bmiValue >= 30 && bmiValue < 34.9) {
            category = 'السمنة من الدرجة الأولى';
        } else if (bmiValue >= 35 && bmiValue < 39.9) {
            category = 'السمنة من الدرجة الثانية';
        } else {
            category = 'السمنة من الدرجة الثالثة';
        }
        setWeightCategory(category);

        const idealWeightValue = 22.5 * (heightInMeters * heightInMeters);
        setIdealWeight(idealWeightValue.toFixed(2));

        const idealBmr = 10 * idealWeightValue + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        const finalSuggestedCalories = idealBmr * activityFactors[activityLevel];
        setSuggestedCalories(finalSuggestedCalories.toFixed(2));
    };

    return (
        <>
            <SetPageMetadata {...pageMetadata} />
            <StatusBarColor color="#7AB2B2" />
            <AppBar title="حاسبة السعرات الحرارية" backLink="/Tools" />
            <ToggleActiveClass elementId="nvBarHome" isActive={false} />
            <ToggleActiveClass elementId="nvBarExercises" isActive={false} />
            <ToggleActiveClass elementId="nvBarNutrition" isActive={false} />
            <ToggleActiveClass elementId="nvBarTools" isActive={true} />

            <ScrollToTop />

            <div id='CalorieCalculatorPage'>
                <div id='Calculator'>
                    <h2>حاسبة السعرات الحرارية</h2>

                    <div>
                        <label>العمر (بالسنوات):<span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="ادخل عمرك"
                        />
                        {formErrors.age && <span style={{ color: 'red', fontSize: '11px' }}>{formErrors.age}</span>}
                    </div>

                    <div>
                        <label>الجنس: <span style={{ color: 'red' }}>*</span> </label>
                        <select name="gender" value={formData.gender} onChange={handleChange} style={{ marginLeft: '10px' }}>
                            <option value="male">ذكر</option>
                            <option value="female">أنثى</option>
                        </select>
                    </div>

                    <div>
                        <label>الوزن (بالكيلوغرام): <span style={{ color: 'red', fontSize: '11px' }}>*</span> </label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            style={{ marginLeft: '10px' }}
                            placeholder="ادخل وزنك بالكيلوغرام"
                        />
                        {formErrors.weight && <span style={{ color: 'red', fontSize: '11px' }}>{formErrors.weight}</span>}
                    </div>

                    <div>
                        <label>الطول (بالسنتيمتر): <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            style={{ marginLeft: '10px' }}
                            placeholder="ادخل طولك بالسنتيمتر"
                        />
                        {formErrors.height && <span style={{ color: 'red', fontSize: '11px' }}>{formErrors.height}</span>}
                    </div>

                    <div>
                        <label>مستوى النشاط: <span style={{ color: 'red' }}>*</span> </label>
                        <select
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                            style={{ marginLeft: '10px' }}
                        >
                            <option value="sedentary">خامل او كثير الجلوس</option>
                            <option value="lightly_active">نشاط خفيف 1-3 مرات في الأسبوع</option>
                            <option value="moderately_active">نشاط متوسط الشدة 3-5 مرات في الأسبوع</option>
                            <option value="very_active">نشاط عالي جداً 6-7 مرات في الأسبوع</option>
                            <option value="extra_active">نشاط عالي للغاية أو ممارسة رياضة يومية مجهدة</option>
                        </select>
                    </div>

                    <button onClick={calculateCalories} id='calculate-calories-btn' title='حساب السعرات' aria-label="calorie-calculator">
                        حساب السعرات
                    </button>

                    {bmi && (
                        <div id='boxOutput' ref={captureRef}>
                            {calories && (
                                <div id='caloriesOutput'>
                                    <p><span style={{ color: 'red' }}>النتيجة</span>: أنت تستهلك بمعدل <span style={{ color: 'red' }}>{calories}</span> سعرات حرارية في اليوم</p>
                                </div>
                            )}
                            <div id="healthMetrics" style={{ marginTop: '30px' }}>
                                <div id="bmiSection">
                                    <h3>كتلة الجسم (BMI)</h3>
                                    <p>قيمة الـ <span style={{ color: 'red' }}>(BMI)</span>: <span style={{ color: 'red' }}>{bmi}</span></p>
                                    <p>التصنيف: <span style={{ color: 'red' }}>{weightCategory}</span></p>
                                </div>
                                <div id="currentCaloriesSection">
                                    <h3>السعرات الحرارية الحالية</h3>
                                    <p>السعرات: <span style={{ color: 'red' }}>{calories} سعرة حرارية</span></p>
                                </div>
                                <div id="idealWeightSection">
                                    <h3>الوزن المثالي</h3>
                                    <p>الوزن المثالي: <span style={{ color: 'red' }}>{idealWeight} كجم</span></p>
                                    <p>السعرات اليومية المقترحة للوصول إلى الوزن المثالي: <span style={{ color: 'red' }}>{suggestedCalories} سعرة حرارية</span></p>
                                </div>
                            </div>
                            <ScreenshotCapture
                                captureRef={captureRef}
                                fileName="my_capture.png"
                                id="ScreenshotCaptureButton"
                            />
                        </div>
                    )}
                </div>

                {/* نصائح صحية */}
                <div id="healthTips">
                    <ImageWithSkeleton
                        src="/images/bmi.jpg"
                        alt="قياس معدل السمنة"
                        aria-label="obesity-rate-measurement"
                        onMouseDown={(e) => e.preventDefault()}
                        draggable="false"
                    />
                    <h3><FaHeartbeat style={{ color: '#e74c3c' }} /> نصائح صحية:</h3>
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        <li><FaAppleAlt style={{ color: '#2ecc71', marginRight: '10px' }} /> يتغير احتياجك من السعرات الحرارية بتغير نشاطك البدني أو بتغير وزنك.</li>
                        <li><FaAppleAlt style={{ color: '#2ecc71', marginRight: '10px' }} /> تناول أطعمة صحية قليلة الملح والسكر والدهون.</li>
                        <li><FaWalking style={{ color: '#3498db', marginRight: '10px' }} /> مارس النشاط البدني:</li>
                        <li><FaWalking style={{ color: '#3498db', marginRight: '10px' }} /> 150 دقيقة في الأسبوع من الأنشطة الهوائية معتدلة الشدة مثل: (المشي السريع أو ركوب الدراجة أو السباحة).</li>
                        <li><FaRunning style={{ color: '#e67e22', marginRight: '10px' }} /> أو 75 دقيقة من الأنشطة الهوائية عالية الشدة بالأسبوع مثل: (الجري أو لعب كرة القدم).</li>
                        <li><FaSwimmer style={{ color: '#9b59b6', marginRight: '10px' }} /> أو دمج بين النشاط معتدل ومرتفع الشدة.</li>
                        <li><FaAppleAlt style={{ color: '#2ecc71', marginRight: '10px' }} /> إذا كنت ترغب في خسارة أو زيادة نصف كيلوغرام (0.5 كجم) في الأسبوع، يجب أن تقلل أو تضيف 500 سعرة حرارية إلى أو من مجموع السعرات الحرارية التي تستهلكها يومياً.</li>
                        <li><FaAppleAlt style={{ color: '#2ecc71', marginRight: '10px' }} /> إذا كنت ترغب في خسارة أو زيادة كيلوغرام واحد (1 كجم) في الأسبوع، يجب أن تقلل أو تضيف 1000 سعرة حرارية إلى أو من مجموع السعرات الحرارية التي تستهلكها يومياً.</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CalorieCalculator;