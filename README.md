# عافيتك | Afitik

<div align="center">

![Badge](https://img.shields.io/github/v/release/rn0x/Afitik)

![GitHub all releases](https://img.shields.io/github/downloads/rn0x/Afitik/total?color=blue&label=Total%20Downloads)

<br>

![Logo][logo]

</div>

## 📖 الوصف

**عافيتك** هو تطبيق شامل يهدف إلى مساعدتك في تحقيق أهدافك الصحية والرياضية. يقدم التطبيق مجموعة متنوعة من الأدوات والمعلومات لمساعدتك في بناء العضلات، تحسين لياقتك البدنية، والحفاظ على نمط حياة صحي.

## 🏆 الميزات

- **📚 تعريف بالعضلات**: معلومات شاملة عن العضلات وتقسيماتها.
- **🏋️‍♂️ تمارين مخصصة**: مجموعة متنوعة من التمارين بالصورة والفيديو.
- **🍎 أنظمة غذائية**: خطط غذائية صحية لتحقيق أهدافك.
- **📊 أدوات حساب**: حساب السعرات الحرارية وكتلة الجسم.
- **🏆 تتبع الإنجازات**: متابعة تقدمك في التمارين والنظام الغذائي.
- **📅 جدول تمارين**: تنظيم جدول تمارين أسبوعي أو شهري.
- **🏋️‍♂️ تعريف بالأجهزة الرياضية**: معلومات عن الأجهزة الرياضية المختلفة.

<br>

## 📸 صور الشاشة

| ![1][1] | ![1-dark][1-dark] |
| :----------------------- | ------------------------ |
| ![2][2] | ![2-dark][2-dark] |
| ![3][3] | ![3-dark][3-dark] |
| ![4][4] | ![4-dark][4-dark] |
| ![5][5] | ![5-dark][5-dark] |
| ![6][6] | ![6-dark][6-dark] |
| ![7][7] | ![7-dark][7-dark] |
| ![8][8] | ![8-dark][8-dark] |
| ![9][9] | ![9-dark][9-dark] |
| ![10][10] | ![10-dark][10-dark] |

<br>

## 🛠️ التبعية الخلفية: FileServeX

تطبيق **عافيتك** يعتمد على **[FileServeX](https://github.com/rn0x/FileServeX)** لتقديم الصور وملفات JSON. تأكد من إعداد **FileServeX** بالشكل التالي:

- **العنوان الأساسي**: `http://localhost:7000`
- **تنزيل ملفات MuscleWiki**: [musclewiki.zip](https://home.i8x.net/files/musclewiki.zip) (الحجم: 77.4 جيجابايت)

تأكد من استخراج دليل `musclewiki` ووضعه في دليل `files` على خادم **FileServeX**.

`http://localhost:7000/files/musclewiki`

## 📦 متغيرات البيئة (`.env`)

ملاحظة: ملف `keytool.js` يعتمد على متغيرات بيئية تُحفظ في ملف `.env`. تأكد من إعداد ملف `.env` بالشكل التالي:

- **`STORE_PASSWORD`**:

  - **الوصف**: كلمة مرور المتجر (store password) للـ keystore.
  - **النوع**: سلسلة نصية (string).

- **`PORT_SERVER_EXPRESS`**:

  - **الوصف**: رقم المنفذ الذي يستخدمه خادم Express.
  - **النوع**: سلسلة نصية (string).

- **`ALIAS`**:

  - **الوصف**: الاسم المستعار (alias) للمفتاح داخل الـ keystore.
  - **النوع**: سلسلة نصية (string).

- **`KEY_PASSWORD`**:

  - **الوصف**: كلمة مرور المفتاح (key password) داخل الـ keystore.
  - **النوع**: سلسلة نصية (string).

- **`DNAME_CN`**:

  - **الوصف**: الاسم الشائع (Common Name) للكيان.
  - **النوع**: سلسلة نصية (string).

- **`DNAME_OU`**:

  - **الوصف**: وحدة التنظيم (Organizational Unit).
  - **النوع**: سلسلة نصية (string).

- **`DNAME_O`**:

  - **الوصف**: المؤسسة (Organization).
  - **النوع**: سلسلة نصية (string).

- **`DNAME_L`**:

  - **الوصف**: المدينة (Locality).
  - **النوع**: سلسلة نصية (string).

- **`DNAME_S`**:

  - **الوصف**: الولاية أو المقاطعة (State).
  - **النوع**: سلسلة نصية (string).

- **`DNAME_C`**:

  - **الوصف**: البلد (Country).
  - **النوع**: سلسلة نصية (string).

- **`REACT_APP_API_BASE_URL`**:
  - **الوصف**: عنوان الرئيسي API للوصول إلى خادم **[FileServeX](https://github.com/rn0x/FileServeX)**.
  - **النوع**: سلسلة نصية (string).

## 🚀 السكربتات (`scripts`)

تحدد السكربتات في ملف `package.json` المهام التي يمكن تنفيذها. فيما يلي شرح لكل سكربت:

- **`server`**:

  - **الوصف**: يقوم بتشغيل خادم Express.js الذي يعيد توجيه جميع الطلبات إلى `index.html`، مما يتيح معالجة الروابط باستخدام React Router. يُستخدم هذا الأمر لتشغيل الموقع الإلكتروني المحلي.
  - **الاستخدام**: `npm run server`

- **`keytool`**:

  - **الوصف**: يقوم بتشغيل السكربت `keytool.js` لإنشاء keystore.
  - **الاستخدام**: `npm run keytool`

- **`dev`**:

  - **الوصف**: يبدأ بيئة تطوير React.
  - **الاستخدام**: `npm run dev`

- **`build`**:

  - **الوصف**: يبني التطبيق باستخدام سكربت `prebuild.js` ثم يبني مشروع React.
  - **الاستخدام**: `npm run build`

- **`android`**:

  - **الوصف**: يضيف منصة Android إلى مشروع Cordova.
  - **الاستخدام**: `npm run android`

- **`re-android`**:

  - **الوصف**: يزيل ويعيد إضافة منصة Android إلى مشروع Cordova.
  - **الاستخدام**: `npm run re-android`

- **`build-apk`**:

  - **الوصف**: يبني تطبيق Android على شكل APK.
  - **الاستخدام**: `npm run build-apk`

- **`build-aab`**:

  - **الوصف**: يبني تطبيق Android على شكل AAB (Android App Bundle).
  - **الاستخدام**: `npm run build-aab`

- **`device`**:

  - **الوصف**: يشغل التطبيق على جهاز Android متصل.
  - **الاستخدام**: `npm run device`

- **`bu-device`**:

  - **الوصف**: يبني التطبيق ويشغله على جهاز Android متصل.
  - **الاستخدام**: `npm run bu-device`

- **`logcat`**:

  - **الوصف**: يعرض سجلات `adb logcat`.
  - **الاستخدام**: `npm run logcat`

- **`log`**:

  - **الوصف**: يعرض سجلات `adb logcat` مع تصفية لرسائل INFO:CONSOLE.
  - **الاستخدام**: `npm run log`

- **`clean`**:

  - **الوصف**: ينظف مشروع Cordova وذاكرة التخزين المؤقت لـ npm.
  - **الاستخدام**: `npm run clean`

- **`rm`**:

  - **الوصف**: يزيل مجلدات `node_modules` و`platforms` و`plugins` وملف `package-lock.json`، ثم يعيد بناء مشروع Android.
  - **الاستخدام**: `npm run rm`

- **`rm-linux`**:

  - **الوصف**: يقوم بنفس وظيفة السكربت `rm` ولكن على أنظمة Linux.
  - **الاستخدام**: `npm run rm-linux`

- **`sync`**:
  - **الوصف**: يحضر جميع منصات Cordova.
  - **الاستخدام**: `npm run sync`

## تثبيت وتهيئة بيئة التطوير لـ Cordova 📱

لتطوير تطبيق AFITIK بكفاءة، تحتاج إلى إعداد بيئة التطوير بشكل صحيح باستخدام Cordova. يشمل ذلك تثبيت الأدوات اللازمة والتأكد من أن جميع الإعدادات جاهزة لضمان تجربة تطوير سلسة وخالية من المشاكل.

📄 [تثبيت وتهيئة بيئة التطوير لـ Cordova - عربي](/setup_cordova/README.AR.md)  
📄 [Setting Up Cordova Development Environment - English](/setup_cordova/README.md)

## هيكل المشروع

| **الملف / المجلد** | **الوصف**                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `myPlg`            | مجلد يحتوي على الإضافات الخاصة بالمشروع.                                                                         |
| `platforms`        | مجلد يحتوي على ملفات ومنصات Cordova. (يتم إنشاؤه تلقائيًا)                                                       |
| `plugins`          | مجلد يحتوي على إضافات Cordova المستخدمة في المشروع. (يتم إنشاؤه تلقائيًا)                                        |
| `public`           | مجلد يحتوي على ملفات عامة يمكن الوصول إليها من الواجهة.                                                          |
| `resources`        | مجلد يحتوي على الموارد المختلفة للتطبيق.                                                                         |
| `setup_cordova`    | مجلد يحتوي على ملفات إعداد بيئة تطوير Cordova.                                                                   |
| `src`              | مجلد يحتوي على الشيفرات المصدرية للتطبيق.                                                                        |
| `unused`           | مجلد يحتوي على الملفات والصور غير المستخدمة حاليًا.                                                              |
| `www`              | مجلد يحتوي على الملفات التي يتم تقديمها من الخادم.                                                               |
| `build.json`       | ملف إعدادات البناء للتطبيق. (يتم إنشاؤه تلقائيًا)                                                                |
| `config.xml`       | ملف إعدادات Cordova.                                                                                             |
| `keytool.js`       | سكربت لإنشاء keystore لتوقيع التطبيقات.                                                                          |
| `LICENSE`          | ملف يحتوي على تفاصيل الترخيص.                                                                                    |
| `package.json`     | ملف تعريف المشروع وحزم Node.js.                                                                                  |
| `prebuild.js`      | سكربت يتم تنفيذه قبل عملية البناء.                                                                               |
| `README.EN.md`     | ملف توثيق باللغة الإنجليزية.                                                                                     |
| `README.md`        | ملف توثيق باللغة العربية.                                                                                        |
| `release.keystore` | ملف keystore لتوقيع تطبيقات Android. (يتم إنشاؤه تلقائيًا)                                                       |
| `server.mjs`       | سكربت خادم Express.js يشغل الخادم ويعيد توجيه جميع الطلبات إلى index.html لمعالجة الروابط باستخدام React Router. |



![10](/unused/cordova_react.png)

[card]: https://PlayBadges.pavi2410.me/badge/full?id=org.i8xnet.afitik
[downloads_badge]: https://PlayBadges.pavi2410.me/badge/downloads?id=org.i8xnet.afitik
[logo]: /unused/logo%20afitik/250px.png
[1]: /unused/Screenshot/1.png
[1-dark]: /unused/Screenshot/1-dark.png
[2]: /unused/Screenshot/2.png
[2-dark]: /unused/Screenshot/2-dark.png
[3]: /unused/Screenshot/3.png
[3-dark]: /unused/Screenshot/3-dark.png
[4]: /unused/Screenshot/4.png
[4-dark]: /unused/Screenshot/4-dark.png
[5]: /unused/Screenshot/5.png
[5-dark]: /unused/Screenshot/5-dark.png
[6]: /unused/Screenshot/6.png
[6-dark]: /unused/Screenshot/6-dark.png
[7]: /unused/Screenshot/7.png
[7-dark]: /unused/Screenshot/7-dark.png
[8]: /unused/Screenshot/8.png
[8-dark]: /unused/Screenshot/8-dark.png
[9]: /unused/Screenshot/9.png
[9-dark]: /unused/Screenshot/9-dark.png
[10]: /unused/Screenshot/10.png
[10-dark]: /unused/Screenshot/10-dark.png