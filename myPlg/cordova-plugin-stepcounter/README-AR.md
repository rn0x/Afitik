# إضافة StepCounter لـ Cordova

<div align="center">

<a href="README-AR.md" style="margin-right: 20px; text-decoration: none;">📝 التوثيق بالعربية</a>
<a href="README.md" style="text-decoration: none;">📝 English Documentation</a> <br>

[![License](https://img.shields.io/badge/license-GPL3.0-blue.svg)](https://github.com/rn0x/cordova-plugin-stepcounter/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/cordova-stepcounter.svg)](https://badge.fury.io/js/cordova-stepcounter)
![VIEWS](https://komarev.com/ghpvc/?username=rn0x-cordova-plugin-stepcounter&label=REPOSITORY+VIEWS&style=for-the-badge)

</div>

## نظرة عامة
إضافة StepCounter لـ Cordova تتيح لك تتبع الخطوات باستخدام مستشعر عداد الخطوات في الجهاز. تم تصميمها خصيصًا لنظام Android ويمكن دمجها بسهولة في تطبيقات Cordova الخاصة بك.

## الميزات
- بدء وإيقاف عد الخطوات.
- استرجاع عدد الخطوات الحالي.
- إدارة الأذونات تلقائيًا.

## التثبيت

### إضافة الإضافة
لتثبيت إضافة StepCounter في مشروع Cordova الخاص بك، استخدم الأمر التالي:

```bash
cordova plugin add cordova-plugin-stepcounter
```

أو يمكنك تثبيتها مباشرة من مستودع الإضافة:

```bash
cordova plugin add https://github.com/rn0x/cordova-plugin-stepcounter.git
```

### إزالة الإضافة
إذا كنت بحاجة إلى إزالة الإضافة من مشروعك، استخدم الأمر التالي:

```bash
cordova plugin rm cordova-plugin-stepcounter
```

### هيكل الدليل

```
cordova-plugin-stepcounter/
├── src/
│   └── android/
│       └── StepCounter.java
├── www/
│   └── StepCounter.js
├── plugin.xml
└── package.json
```

## الاستخدام

### واجهة برمجة التطبيقات (API)
توفر الإضافة ثلاث طرق رئيسية: `start` و `stop` و `getStepCount`.

#### بدء عد الخطوات
ابدأ مستشعر عداد الخطوات وابدأ في عد الخطوات.

```javascript
cordova.plugins.stepCounter.start(
    function(successMessage) {
        console.log(successMessage);
    },
    function(errorMessage) {
        console.error(errorMessage);
    }
);
```

#### إيقاف عد الخطوات
إيقاف مستشعر عداد الخطوات.

```javascript
cordova.plugins.stepCounter.stop(
    function(successMessage) {
        console.log(successMessage);
    },
    function(errorMessage) {
        console.error(errorMessage);
    }
);
```

#### الحصول على عدد الخطوات الحالي
استرجاع عدد الخطوات الحالي.

```javascript
cordova.plugins.stepCounter.getStepCount(
    function(stepCount) {
        console.log("Current step count: " + stepCount);
    },
    function(errorMessage) {
        console.error(errorMessage);
    }
);
```

### دمج React
لاستخدام إضافة StepCounter في تطبيق React، يجب التأكد من أن Cordova متكامل بشكل صحيح. إليك مثال على كيفية استخدام الإضافة داخل مكون React.

#### مثال على مكون React

```javascript
import React, { useEffect, useState } from 'react';

function StepCounterComponent() {
    const [stepCount, setStepCount] = useState(0);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        document.addEventListener("deviceready", onDeviceReady, false);
        return () => {
            document.removeEventListener("deviceready", onDeviceReady, false);
        };
    }, []);

    const onDeviceReady = () => {
        console.log("Device is ready");
    };

    const startCounting = () => {
        cordova.plugins.stepCounter.start(
            (successMessage) => {
                console.log(successMessage);
                setIsCounting(true);
            },
            (errorMessage) => {
                console.error(errorMessage);
            }
        );
    };

    const stopCounting = () => {
        cordova.plugins.stepCounter.stop(
            (successMessage) => {
                console.log(successMessage);
                setIsCounting(false);
            },
            (errorMessage) => {
                console.error(errorMessage);
            }
        );
    };

    const fetchStepCount = () => {
        cordova.plugins.stepCounter.getStepCount(
            (count) => {
                setStepCount(count);
            },
            (errorMessage) => {
                console.error(errorMessage);
            }
        );
    };

    return (
        <div>
            <h1>عداد الخطوات</h1>
            <p>الخطوات: {stepCount}</p>
            <button onClick={startCounting} disabled={isCounting}>
                ابدأ العد
            </button>
            <button onClick={stopCounting} disabled={!isCounting}>
                توقف عن العد
            </button>
            <button onClick={fetchStepCount}>احصل على عدد الخطوات</button>
        </div>
    );
}

export default StepCounterComponent;
```

### المساهمة

#### كيفية المساهمة
نرحب بالمساهمات في إضافة StepCounter لـ Cordova. يمكنك المساهمة عن طريق:

- الإبلاغ عن الأخطاء واقتراح الميزات من خلال قضايا GitHub.
- تقديم طلبات السحب مع إصلاحات الأخطاء أو الميزات الجديدة.

#### إعداد بيئة التطوير
1. استنساخ المستودع:
    ```bash
    git clone https://github.com/rn0x/cordova-plugin-stepcounter.git
    cd cordova-plugin-stepcounter
    ```

2. قم بإجراء التغييرات واختبارها محليًا مع مشروع Cordova الخاص بك.

3. قدم طلب سحب مع وصف واضح لتغييراتك.

#### الترخيص
هذه الإضافة مرخصة بموجب ترخيص GPL 3.0. انظر ملف [`LICENSE`](/LICENSE) لمزيد من المعلومات.

#### التواصل
لأي استفسارات أو تعليقات، لا تتردد في فتح قضية على مستودع GitHub.