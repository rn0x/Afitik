
# تثبيت بيئة التطوير

تثبيت وتهيئة بيئة التطوير لـ كوردوفا `CORDOVA`

## Node.js و npm

1. **التحقق من الصلاحيات الإدارية:**
   تأكد من تشغيل الأمر كمسؤول باستخدام PowerShell:

   ```powershell
   Start-Process powershell -Verb runAs
   ```

2. **تثبيت Node.js و npm:**
   قم بتنزيل وتثبيت Node.js و npm من [nodejs.org](https://nodejs.org/dist/v16.0.0/node-v16.0.0-x64.msi) بإصدار 16.0.0.

   ```powershell
   choco install nodejs
   ```

   **ملاحظة:** يجب تحديد المسار الصحيح لتثبيت Node.js وإضافته إلى المتغيرات البيئية إذا لزم الأمر.

## Java JDK 17 (64-bit)

1. **تثبيت Java JDK 17:**
   قم بتنزيل وتثبيت [Java JDK 17](https://github.com/AdoptOpenJDK/openjdk17-binaries/releases/download/jdk-2021-05-07-13-31/OpenJDK-jdk_x64_windows_hotspot_2021-05-06-23-30.zip) من AdoptOpenJDK.

   ```powershell
   choco install adoptopenjdk --version=17
   ```

2. **إعداد المتغيرات البيئية:**
   قم بإعداد `JAVA_HOME` وإضافة مجلد `bin` إلى `PATH`.

   ```powershell
   [System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Java\jdk-17+20", "User")
   ```

   **ملاحظة:** تأكد من تعديل مسار JDK إلى المسار الفعلي حيث تم تثبيت Java JDK.

## Gradle 7.4.2

1. **تثبيت Gradle 7.4.2:**
   قم بتنزيل وتثبيت Gradle 7.4.2 من [gradle.org](https://services.gradle.org/distributions/gradle-7.4.2-bin.zip).

   ```powershell
   choco install gradle --version=7.4.2
   ```

2. **إعداد المتغيرات البيئية لـ Gradle:**
   إضافة `GRADLE_HOME` إلى `PATH`.

   ```powershell
   [System.Environment]::SetEnvironmentVariable("GRADLE_HOME", "C:\Gradle\gradle-7.4.2", "User")
   ```

   **ملاحظة:** تأكد من تعديل مسار Gradle إلى المسار الفعلي حيث تم تثبيت Gradle.

## Android SDK

1. **تثبيت Android SDK:**

   قم بتنزيل وتثبيت [Android SDK](https://dl.google.com/android/repository/commandlinetools-win-7583922_latest.zip) من موقع المطورين الرسمي لـ Android.

   ```powershell
   choco install android-sdk
   ```

2. **إعداد المتغيرات البيئية لـ Android SDK:**

   إعداد `ANDROID_SDK_ROOT` و `ANDROID_HOME`

   وإضافة أدوات SDK `cmdline-tools` إلى `PATH`

   ```powershell
   [System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "C:\AndroidSDK", "User")
   ```

   ```powershell
   [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\AndroidSDK", "User")
   ```

   ```powershell
   [System.Environment]::SetEnvironmentVariable("Path", "$([System.Environment]::GetEnvironmentVariable('Path', 'User'));C:\AndroidSDK\cmdline-tools\bin;", "User")
   ```

   **ملاحظة:** تأكد من تعديل مسار Android SDK إلى المسار الفعلي حيث تم تثبيته.

## Android SDK Platform 34

1. **تثبيت Android SDK Platform 34:**
   قم بتثبيت Platform 34 باستخدام SDK Manager.

   ```powershell
   sdkmanager "platforms;android-34"
   ```

2. **تكوين المتغيرات البيئية لـ Android SDK Platform:**
   إضافة مجلدات `platform-tools` وأدوات SDK إلى `PATH`.

   ```powershell
   [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);C:\AndroidSDK\platform-tools;", "User")
   ```

   **ملاحظة:** تأكد من تعديل مسارات Android SDK إلى المسارات الفعلية حيث تم تثبيتها.

----

قم بتشغيل السكربت `setup_cordova.ps1` لتثبيت التلقائي للمتطلبات واضافة متغيرات البيئة 

```powershell
./setup_cordova.ps1
```