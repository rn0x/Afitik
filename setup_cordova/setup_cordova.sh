#!/bin/bash

# Function to install Node.js and npm if not already installed
install_nodejs_npm() {
    if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
        echo "Node.js or npm is not installed. Installing Node.js and npm..."
        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo apt-get install -y nodejs
        echo "Node.js and npm installed successfully."
    else
        echo "Node.js and npm are already installed."
    fi
}

# Function to install Java JDK 17
install_java_jdk() {
    if ! java -version 2>&1 | grep "17" > /dev/null; then
        echo "Java JDK 17 is not installed. Installing Java JDK 17..."
        sudo apt-get update
        sudo apt-get install -y openjdk-17-jdk
        echo "Java JDK 17 installed successfully."
    else
        echo "Java JDK 17 is already installed."
    fi
}

# Function to install Gradle 7.4.2
install_gradle() {
    if ! gradle -v | grep "7.4.2" > /dev/null; then
        echo "Gradle 7.4.2 is not installed. Installing Gradle 7.4.2..."
        wget https://services.gradle.org/distributions/gradle-7.4.2-bin.zip -P /tmp
        sudo unzip -d /opt/gradle /tmp/gradle-7.4.2-bin.zip
        sudo ln -s /opt/gradle/gradle-7.4.2/bin/gradle /usr/bin/gradle
        echo "Gradle 7.4.2 installed successfully."
    else
        echo "Gradle 7.4.2 is already installed."
    fi
}

# Function to install Android SDK
install_android_sdk() {
    if [ -z "$ANDROID_SDK_ROOT" ]; then
        echo "ANDROID_SDK_ROOT is not set. Installing Android SDK..."
        mkdir -p $HOME/Android/Sdk
        wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip -O /tmp/cmdline-tools.zip
        unzip /tmp/cmdline-tools.zip -d $HOME/Android/Sdk
        rm /tmp/cmdline-tools.zip
        export ANDROID_SDK_ROOT=$HOME/Android/Sdk
        export ANDROID_HOME=$HOME/Android/Sdk
        echo "ANDROID_SDK_ROOT set to: $ANDROID_SDK_ROOT"
        
        # Install build-tools version 34.0.0
        sdkmanager "build-tools;34.0.0"
        echo "Android SDK installed and configured successfully."
    else
        echo "ANDROID_SDK_ROOT is already set to: $ANDROID_SDK_ROOT"
        echo "Android SDK is installed."
    fi
}

# Function to install Android SDK Platform 34
install_android_sdk_platform34() {
    if sdkmanager --list | grep "platforms;android-34" > /dev/null; then
        echo "Android SDK Platform 34 is already installed."
    else
        echo "Android SDK Platform 34 is not installed. Installing Android SDK Platform 34..."
        sdkmanager "platforms;android-34"
        echo "Android SDK Platform 34 installed successfully."
    fi
}

# Main script execution
install_nodejs_npm
install_java_jdk
install_gradle
install_android_sdk
install_android_sdk_platform34

echo "All required components have been installed and configured successfully."