## Installing and Setting Up the Cordova Development Environment 📱

### Setting Up Node.js and npm

#### For Windows:
1. **Check Administrative Privileges:**
   Ensure you run PowerShell as an Administrator:
   ```powershell
   Start-Process powershell -Verb runAs
   ```

2. **Install Node.js and npm:**
   - Download and install [Node.js](https://nodejs.org/dist/v16.0.0/node-v16.0.0-x64.msi) version 16.0.0.
   - Or use Chocolatey to install it:
     ```powershell
     choco install nodejs
     ```

#### For Linux:
1. **Install Node.js and npm:**
   - Use the following command to install Node.js and npm:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```

### Setting Up Java JDK 17 (64-bit) ☕

#### For Windows:
1. **Install Java JDK 17:**
   - Download and install [Java JDK 17](https://github.com/AdoptOpenJDK/openjdk17-binaries/releases/download/jdk-2021-05-07-13-31/OpenJDK-jdk_x64_windows_hotspot_2021-05-06-23-30.zip) from AdoptOpenJDK.
   - Or use Chocolatey to install it:
     ```powershell
     choco install adoptopenjdk --version=17
     ```

2. **Set Environment Variables:**
   - Set `JAVA_HOME` and add the `bin` folder to `PATH`:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Java\jdk-17+20", "User")
     [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);C:\Java\jdk-17+20\bin", "User")
     ```

#### For Linux:
1. **Install Java JDK 17:**
   - Use the following command to install JDK:
     ```bash
     sudo apt update
     sudo apt install openjdk-17-jdk
     ```

### Setting Up Gradle 7.4.2 🛠️

#### For Windows:
1. **Install Gradle 7.4.2:**
   - Download and install [Gradle 7.4.2](https://services.gradle.org/distributions/gradle-7.4.2-bin.zip).
   - Or use Chocolatey to install it:
     ```powershell
     choco install gradle --version=7.4.2
     ```

2. **Set Environment Variables for Gradle:**
   - Set `GRADLE_HOME` and add Gradle to `PATH`:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("GRADLE_HOME", "C:\Gradle\gradle-7.4.2", "User")
     [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);C:\Gradle\gradle-7.4.2\bin", "User")
     ```

#### For Linux:
1. **Install Gradle 7.4.2:**
   - Use the following command to install Gradle:
     ```bash
     sudo apt update
     sudo apt install gradle
     ```

### Setting Up Android SDK 📦

#### For Windows:
1. **Install Android SDK:**
   - Download and install [Android SDK](https://dl.google.com/android/repository/commandlinetools-win-7583922_latest.zip).
   - Or use Chocolatey to install it:
     ```powershell
     choco install android-sdk
     ```

2. **Set Environment Variables for Android SDK:**
   - Set `ANDROID_SDK_ROOT` and `ANDROID_HOME` and add SDK tools to `PATH`:
     ```powershell
     [System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "C:\AndroidSDK", "User")
     [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\AndroidSDK", "User")
     [System.Environment]::SetEnvironmentVariable("Path", "$($env:Path);C:\AndroidSDK\cmdline-tools\bin;C:\AndroidSDK\platform-tools", "User")
     ```

#### For Linux:
1. **Install Android SDK:**
   - Download and install [Android SDK](https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip).
   - Use the following commands to install it:
     ```bash
     sudo mkdir -p /usr/local/android-sdk
     sudo unzip commandlinetools-linux-7583922_latest.zip -d /usr/local/android-sdk
     ```

2. **Set Environment Variables for Android SDK:**
   - Set `ANDROID_SDK_ROOT` and `ANDROID_HOME` and add SDK tools to `PATH`:
     ```bash
     export ANDROID_SDK_ROOT=/usr/local/android-sdk
     export ANDROID_HOME=/usr/local/android-sdk
     export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools
     ```

### Setting Up Android SDK Platform 34 📱

#### For Windows:
1. **Install Android SDK Platform 34:**
   - Use SDK Manager to install Platform 34:
     ```powershell
     sdkmanager --sdk_root="C:\AndroidSDK" "platforms;android-34"
     sdkmanager --sdk_root="C:\AndroidSDK" "build-tools;34.0.0"
     ```

#### For Linux:
1. **Install Android SDK Platform 34:**
   - Use SDK Manager to install Platform 34:
     ```bash
     sdkmanager --sdk_root="/usr/local/android-sdk" "platforms;android-34"
     sdkmanager --sdk_root="/usr/local/android-sdk" "build-tools;34.0.0"
     ```

### Automated Installation Script 🛠️

#### For Windows:
1. **Run the `setup_cordova` Script:**
   - Set the execution policy:
     ```powershell
     Get-ExecutionPolicy
     Set-ExecutionPolicy RemoteSigned
     ./setup_cordova.ps1
     Set-ExecutionPolicy Restricted
     ```

#### For Linux:
1. **Run the `setup_cordova` Script:**
   - Ensure execute permissions:
     ```bash
     chmod +x setup_cordova.sh
     ./setup_cordova.sh
     ```

By following these steps, you will have a properly set up development environment for Cordova on your operating system. 🚀