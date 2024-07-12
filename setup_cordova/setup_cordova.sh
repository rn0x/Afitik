#!/bin/bash

# هذا السكربت يقوم بتثبيت البرامج التالية:
# 1. Node.js و npm إذا لم يكونا مثبتين.
# 2. Java JDK 17 باستخدام AdoptOpenJDK إذا لم يكن مثبتًا.
# 3. Gradle 7.4.2 إذا لم يكن مثبتًا.
# 4. Android SDK إذا لم يكن مثبتًا.
# 5. Android SDK Platform 34 إذا لم يكن مثبتًا.
# يتأكد السكربت من تشغيله بصلاحيات الجذر (root) قبل البدء في أي عملية تثبيت.

# Ensure the script runs as root
if [ "$EUID" -ne 0 ]; then
  echo "This script requires root privileges. Please run it as root (e.g., using sudo)."
  exit 1
fi

# Function to install Node.js and npm if not already installed
install_nodejs_npm() {
  if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    echo "Node.js or npm is not installed. Installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
    apt-get install -y nodejs
    echo "Node.js and npm installed successfully."
  else
    echo "Node.js and npm are already installed."
  fi
}

# Function to install Java JDK 17 using AdoptOpenJDK
install_java_jdk() {
  if ! java -version 2>&1 | grep -q "17"; then
    echo "Java JDK 17 is not installed. Installing Java JDK 17 using AdoptOpenJDK..."
    apt-get install -y wget
    wget -O /tmp/OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.2%2B8/OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz
    mkdir -p /usr/lib/jvm
    tar -xzf /tmp/OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz -C /usr/lib/jvm
    rm /tmp/OpenJDK17U-jdk_x64_linux_hotspot_17.0.2_8.tar.gz
    update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-17.0.2+8/bin/java 1
    update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk-17.0.2+8/bin/javac 1
    echo "Java JDK 17 installed successfully using AdoptOpenJDK."
  else
    echo "Java JDK 17 is already installed."
  fi
}

# Function to install Gradle 7.4.2
install_gradle() {
  if ! gradle -v 2>&1 | grep -q "7.4.2"; then
    echo "Gradle 7.4.2 is not installed. Installing Gradle 7.4.2..."
    wget -O /tmp/gradle-7.4.2-bin.zip https://services.gradle.org/distributions/gradle-7.4.2-bin.zip
    mkdir -p /opt/gradle
    unzip /tmp/gradle-7.4.2-bin.zip -d /opt/gradle
    rm /tmp/gradle-7.4.2-bin.zip
    ln -s /opt/gradle/gradle-7.4.2/bin/gradle /usr/bin/gradle
    echo "Gradle 7.4.2 installed successfully."
  else
    echo "Gradle 7.4.2 is already installed."
  fi
}

# Function to install Android SDK
install_android_sdk() {
  if [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "ANDROID_SDK_ROOT is not set. Installing Android SDK..."
    wget -O /tmp/commandlinetools-linux.zip https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip
    mkdir -p /usr/lib/android-sdk/cmdline-tools
    unzip /tmp/commandlinetools-linux.zip -d /usr/lib/android-sdk/cmdline-tools
    rm /tmp/commandlinetools-linux.zip
    echo "export ANDROID_SDK_ROOT=/usr/lib/android-sdk" >> /etc/profile
    echo "export PATH=\$PATH:\$ANDROID_SDK_ROOT/cmdline-tools/bin:\$ANDROID_SDK_ROOT/platform-tools" >> /etc/profile
    source /etc/profile
    echo "Android SDK installed and configured successfully."
  else
    echo "ANDROID_SDK_ROOT is already set to: $ANDROID_SDK_ROOT"
    echo "Android SDK is installed."
  fi
}

# Function to install Android SDK Platform 34
install_android_sdk_platform34() {
  if [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "ANDROID_SDK_ROOT is not set. Please set ANDROID_SDK_ROOT to the Android SDK installation directory."
    exit 1
  fi

  if ! $ANDROID_SDK_ROOT/cmdline-tools/bin/sdkmanager --list_installed | grep -q "platforms;android-34"; then
    echo "Android SDK Platform 34 is not installed. Installing Android SDK Platform 34..."
    $ANDROID_SDK_ROOT/cmdline-tools/bin/sdkmanager "platforms;android-34"
    echo "Android SDK Platform 34 installed successfully."
  else
    echo "Android SDK Platform 34 is already installed."
  fi
}

# Main script execution
install_nodejs_npm
install_java_jdk
install_gradle
install_android_sdk
install_android_sdk_platform34
