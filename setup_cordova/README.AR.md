## تثبيت وتهيئة بيئة التطوير لـ Cordova 📱

### إعداد Node.js و npm

#### لنظام Windows:
1. **التحقق من الصلاحيات الإدارية:**
   تأكد من تشغيل PowerShell كمسؤول:
   ```powershell
   Start-Process powershell -Verb runAs
   ```

2. **تثبيت Node.js و npm:**
   - قم بتنزيل وتثبيت [Node.js](https://nodejs.org/dist/v16.0.0/node-v16.0.0-x64.msi) بإصدار 16.0.0.
   - أو استخدم Chocolatey لتثبيته:
     ```powershell
     choco install nodejs
     ```

#### لنظام Linux:
1. **تثبيت Node.js و npm:**
   - استخدم الأمر التالي لتثبيت Node.js و npm:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```

### إعداد Java JDK 17 (64-bit) ☕

#### لنظام Windows:
1. **تثبيت Java JDK 17:**
   - قم بتنزيل وتثبيت [Java JDK 17](https://github.com/AdoptOpenJDK/openjdk17-binaries/releases/download/jdk-2021-05-07-13-31/OpenJDK-jdk_x64_windows_hotspot_2021-05-06-23-30.zip) من AdoptOpenJDK.
   - أو استخدم Chocolatey لتثبيته:
     ```powershell
     choco install adoptopenjdk --version=17
     ```

2. **إعداد المتغيرات البيئية:**
   - قم بإعداد `JAVA_HOME` وإضافة مجلد `bin` إلى `PATH`:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Java\jdk-17+20", "User")
     [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);C:\Java\jdk-17+20\bin", "User")
     ```

#### لنظام Linux:
1. **تثبيت Java JDK 17:**
   - استخدم الأمر التالي لتثبيت JDK:
     ```bash
     sudo apt update
     sudo apt install openjdk-17-jdk
     ```

### إعداد Gradle 7.4.2 🛠️

#### لنظام Windows:
1. **تثبيت Gradle 7.4.2:**
   - قم بتنزيل وتثبيت [Gradle 7.4.2](https://services.gradle.org/distributions/gradle-7.4.2-bin.zip).
   - أو استخدم Chocolatey لتثبيته:
     ```powershell
     choco install gradle --version=7.4.2
     ```

2. **إعداد المتغيرات البيئية لـ Gradle:**
   - قم بإعداد `GRADLE_HOME` وإضافة Gradle إلى `PATH`:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("GRADLE_HOME", "C:\Gradle\gradle-7.4.2", "User")
     [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);C:\Gradle\gradle-7.4.2\bin", "User")
     ```

#### لنظام Linux:
1. **تثبيت Gradle 7.4.2:**
   - استخدم الأمر التالي لتثبيت Gradle:
     ```bash
     sudo apt update
     sudo apt install gradle
     ```

### إعداد Android SDK 📦

#### لنظام Windows:
1. **تثبيت Android SDK:**
   - قم بتنزيل وتثبيت [Android SDK](https://dl.google.com/android/repository/commandlinetools-win-7583922_latest.zip).
   - أو استخدم Chocolatey لتثبيته:
     ```powershell
     choco install android-sdk
     ```

2. **إعداد المتغيرات البيئية لـ Android SDK:**
   - إعداد `ANDROID_SDK_ROOT` و `ANDROID_HOME` وإضافة أدوات SDK إلى `PATH`:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "C:\AndroidSDK", "User")
     [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\AndroidSDK", "User")
     [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);C:\AndroidSDK\cmdline-tools\bin;C:\AndroidSDK\platform-tools", "User")
     ```

#### لنظام Linux:
1. **تثبيت Android SDK:**
   - قم بتنزيل وتثبيت [Android SDK](https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip).
   - استخدم الأوامر التالية لتثبيته:
     ```bash
     sudo mkdir -p /usr/local/android-sdk
     sudo unzip commandlinetools-linux-7583922_latest.zip -d /usr/local/android-sdk
     ```

2. **إعداد المتغيرات البيئية لـ Android SDK:**
   - إعداد `ANDROID_SDK_ROOT` و `ANDROID_HOME` وإضافة أدوات SDK إلى `PATH`:
     ```bash
     export ANDROID_SDK_ROOT=/usr/local/android-sdk
     export ANDROID_HOME=/usr/local/android-sdk
     export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools
     ```

### إعداد Android SDK Platform 34 📱

#### لنظام Windows:
1. **تثبيت Android SDK Platform 34:**
   - استخدم SDK Manager لتثبيت Platform 34:
     ```powershell
     sdkmanager --sdk_root="C:\AndroidSDK" "platforms;android-34"
     sdkmanager --sdk_root="C:\AndroidSDK" "build-tools;34.0.0"
     ```

#### لنظام Linux:
1. **تثبيت Android SDK Platform 34:**
   - استخدم SDK Manager لتثبيت Platform 34:
     ```bash
     sdkmanager --sdk_root="/usr/local/android-sdk" "platforms;android-34"
     sdkmanager --sdk_root="/usr/local/android-sdk" "build-tools;34.0.0"
     ```

### سكربت التثبيت التلقائي 🛠️

#### لنظام Windows:
1. **تشغيل السكربت `setup_cordova`:**
   - اضبط سياسة التنفيذ:
     ```powershell
     Get-ExecutionPolicy
     Set-ExecutionPolicy RemoteSigned
     ./setup_cordova.ps1
     Set-ExecutionPolicy Restricted
     ```

#### لنظام Linux:
1. **تشغيل السكربت `setup_cordova`:**
   - تأكد من صلاحيات التشغيل:
     ```bash
     chmod +x setup_cordova.sh
     ./setup_cordova.sh
     ```

باتباع هذه الخطوات، ستتمكن من إعداد بيئة التطوير الخاصة بـ Cordova بشكل سليم على نظام التشغيل الذي تستخدمه. 🚀