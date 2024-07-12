# Function to ensure script runs as admin
function Ensure-RunAsAdmin {
    if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Write-Host "This script requires administrator privileges. Please run it as an administrator."
        Exit
    }
}

# Function to install Node.js and npm if not already installed
function Install-Nodejs-Npm {
    $nodejsDir = "$env:ProgramFiles\nodejs"
    if (!(Test-Path "$nodejsDir\node.exe") -or !(Test-Path "$nodejsDir\npm.cmd")) {
        Write-Host "Node.js or npm is not installed. Installing Node.js and npm..."
        $nodejsUrl = "https://nodejs.org/dist/v16.0.0/node-v16.0.0-x64.msi"
        $nodejsInstaller = "$env:TEMP\nodejs-installer.msi"
        
        if (!(Test-Path $nodejsInstaller)) {
            Invoke-WebRequest -Uri $nodejsUrl -OutFile $nodejsInstaller
        }
        
        Start-Process msiexec.exe -ArgumentList "/i `"$nodejsInstaller`" /quiet /qn /norestart" -Wait
        Remove-Item $nodejsInstaller
        Write-Host "Node.js and npm installed successfully."
    }
    else {
        Write-Host "Node.js and npm are already installed."
    }
}

# Function to install Java JDK 17 (64-bit)
function Install-Java-JDK {
    $javaDir = "C:\Java"
    $jdkExpectedDir = Join-Path -Path $javaDir -ChildPath "jdk-17+20"

    # Check if JDK 17 directory exists
    if (Test-Path $jdkExpectedDir) {
        Write-Host "Java JDK 17 (64-bit) is already installed in $($jdkExpectedDir)."
        return
    }

    # If JDK 17 is not installed, proceed with installation
    Write-Host "Java JDK 17 (64-bit) is not installed. Installing Java JDK 17 (64-bit)..."
    $jdkUrl = "https://github.com/AdoptOpenJDK/openjdk17-binaries/releases/download/jdk-2021-05-07-13-31/OpenJDK-jdk_x64_windows_hotspot_2021-05-06-23-30.zip"
    $jdkZip = "$env:TEMP\OpenJDK-jdk_x64_windows_hotspot_2021-05-06-23-30.zip"
    
    if (!(Test-Path $jdkZip)) {
        Invoke-WebRequest -Uri $jdkUrl -OutFile $jdkZip
    }
    
    Expand-Archive -Path $jdkZip -DestinationPath $javaDir -Force
    Remove-Item $jdkZip

    $extractedJdkDir = Get-ChildItem -Path $javaDir | Where-Object { $_.PSIsContainer -and $_.Name -match "^jdk-17.*" } | Select-Object -First 1

    if ($extractedJdkDir) {
        Write-Host "Java JDK 17 (64-bit) installed successfully in $($extractedJdkDir.FullName)."
        $jdkDir = $extractedJdkDir.FullName
    } else {
        Write-Host "Failed to find the extracted JDK directory."
        return
    }

    $javaHome = [System.Environment]::GetEnvironmentVariable("JAVA_HOME", "User")
    if (-not $javaHome) {
        [System.Environment]::SetEnvironmentVariable("JAVA_HOME", $jdkDir, "User")
        Write-Host "JAVA_HOME set to: $($jdkDir)"
    } else {
        Write-Host "JAVA_HOME is already set to: $($javaHome)"
    }

    $currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
    if (-not ($currentPath -like "*$jdkDir\bin*")) {
        [System.Environment]::SetEnvironmentVariable("Path", "$currentPath;$jdkDir\bin", "User")
        Write-Host "Added JDK bin directory to PATH."
    } else {
        Write-Host "JDK bin directory is already in PATH."
    }
}

# Function to install Gradle 7.4.2
function Install-Gradle {
    $gradleDir = "C:\Gradle\gradle-7.4.2"
    $gradleInstallDir = "C:\Gradle"
    if (!(Test-Path $gradleDir)) {
        Write-Host "Gradle 7.4.2 is not installed. Installing Gradle 7.4.2..."
        $gradleUrl = "https://services.gradle.org/distributions/gradle-7.4.2-bin.zip"
        $gradleZip = "$env:TEMP\gradle-7.4.2-bin.zip"
        
        if (!(Test-Path $gradleZip)) {
            Invoke-WebRequest -Uri $gradleUrl -OutFile $gradleZip
        }
        
        if (!(Test-Path $gradleInstallDir)) {
            New-Item -ItemType Directory -Path $gradleInstallDir -Force
        }
        
        Expand-Archive -Path $gradleZip -DestinationPath $gradleInstallDir -Force
        Remove-Item $gradleZip

        $gradleHome = [System.Environment]::GetEnvironmentVariable("GRADLE_HOME", "User")
        if (-not $gradleHome) {
            [System.Environment]::SetEnvironmentVariable("GRADLE_HOME", $gradleDir, "User")
            Write-Host "GRADLE_HOME set to: $($gradleDir)"
        } else {
            Write-Host "GRADLE_HOME is already set to: $($gradleHome)"
        }

        if (-not ($currentPath -like "*$gradleDir\bin*")) {
            [System.Environment]::SetEnvironmentVariable("Path", "$currentPath;$gradleDir\bin", "User")
            Write-Host "Added Gradle bin directory to PATH."
        } else {
            Write-Host "Gradle bin directory is already in PATH."
        }
        Write-Host "Gradle 7.4.2 installed successfully."
    }
    else {
        Write-Host "Gradle 7.4.2 is already installed."
    }
}

function Install-Android-SDK {
    $sdkDir = "C:\AndroidSDK"
    $androidSdkRoot = [System.Environment]::GetEnvironmentVariable("ANDROID_SDK_ROOT", "User")
    $androidHome = [System.Environment]::GetEnvironmentVariable("ANDROID_HOME", "User")

    if (-not $androidSdkRoot) {
        Write-Host "ANDROID_SDK_ROOT is not set. Installing Android SDK..."
        $sdkToolsUrl = "https://dl.google.com/android/repository/commandlinetools-win-7583922_latest.zip"
        $sdkToolsZip = "$env:TEMP\sdk-tools.zip"
        
        if (!(Test-Path $sdkToolsZip)) {
            Invoke-WebRequest -Uri $sdkToolsUrl -OutFile $sdkToolsZip
        }
        
        if (!(Test-Path $sdkDir)) {
            New-Item -ItemType Directory -Path $sdkDir -Force
        }
        
        Expand-Archive -Path $sdkToolsZip -DestinationPath $sdkDir -Force
        Remove-Item $sdkToolsZip

        [System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $sdkDir, "User")
        Write-Host "ANDROID_SDK_ROOT set to: $($sdkDir)"

        # Adding ANDROID_HOME to PATH
        if (-not $androidHome) {
            [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkDir, "User")
            Write-Host "ANDROID_HOME set to: $($sdkDir)"
        } else {
            Write-Host "ANDROID_HOME is already set to: $($androidHome)"
        }

        # Adding platform-tools and SDK tools directories to PATH
        $currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
        if (-not ($currentPath -like "*$sdkDir\cmdline-tools\bin*")) {
            [System.Environment]::SetEnvironmentVariable("Path", "$currentPath;$sdkDir\cmdline-tools\bin;$sdkDir\platform-tools", "User")
            Write-Host "Added SDK tools directory to PATH."
        } else {
            Write-Host "SDK tools directory is already in PATH."
        }

        # Install Android build tools version 34.0.0
        $sdkManagerPath = "$sdkDir\cmdline-tools\bin\sdkmanager.bat"
        if (!(Test-Path $sdkManagerPath)) {
            Write-Host "Android SDK is not installed properly. Please reinstall Android SDK."
            Exit
        }

        $buildToolsInstalled = & $sdkManagerPath --list_installed | Select-String "build-tools;34.0.0"
        if (!$buildToolsInstalled) {
            Write-Host "Android build tools version 34.0.0 is not installed. Installing..."
            & $sdkManagerPath "build-tools;34.0.0" --sdk_root=$sdkDir --install
            
            $buildToolsInstalled = & $sdkManagerPath --list_installed | Select-String "build-tools;34.0.0"
            if ($buildToolsInstalled) {
                Write-Host "Android build tools version 34.0.0 installed successfully."
                
                # Adding build-tools to PATH
                $buildToolsDir = "$sdkDir\build-tools\34.0.0"
                if (-not ($currentPath -like "*$buildToolsDir*")) {
                    [System.Environment]::SetEnvironmentVariable("Path", "$currentPath;$buildToolsDir", "User")
                    Write-Host "Added build-tools directory to PATH."
                } else {
                    Write-Host "Build-tools directory is already in PATH."
                }
            } else {
                Write-Host "Failed to install Android build tools version 34.0.0."
            }
        } else {
            Write-Host "Android build tools version 34.0.0 is already installed."
        }

        Write-Host "Android SDK installed and configured successfully."
    }
    else {
        Write-Host "ANDROID_SDK_ROOT is already set to: $($androidSdkRoot)"
        Write-Host "Android SDK is installed."
    }
}
# Function to install Android SDK Platform 34
function Install-Android-SDK-Platform34 {
    $androidSDKPath = "C:\AndroidSDK"
    $sdkManagerPath = "$androidSDKPath\cmdline-tools\bin\sdkmanager.bat"
    $javaHome = [System.Environment]::GetEnvironmentVariable("JAVA_HOME", "User")
    if (-not $javaHome) {
        Write-Host "JAVA_HOME is not set. Please set JAVA_HOME to JDK installation directory before continuing."
        Exit
    }

    if (!(Test-Path $sdkManagerPath)) {
        Write-Host "Android SDK is not installed. Please install Android SDK using Android Studio or manual installation."
        Exit
    }

    $platform33Installed = & $sdkManagerPath --list_installed | Select-String "platforms;android-34"
    if (!$platform33Installed) {
        Write-Host "Android SDK Platform 34 is not installed. Installing Android SDK Platform 34..."
        & $sdkManagerPath "platforms;android-34" --sdk_root=$androidSDKPath --install
        
        $platform33Installed = & $sdkManagerPath --list_installed | Select-String "platforms;android-34"
        if ($platform33Installed) {
            Write-Host "Android SDK Platform 34 installed successfully."
        } else {
            Write-Host "Failed to install Android SDK Platform 34."
        }
    } else {
        Write-Host "Android SDK Platform 34 is already installed."
    }
}

# Main script execution
Ensure-RunAsAdmin
Install-Nodejs-Npm
Install-Java-JDK
Install-Gradle
Install-Android-SDK
Install-Android-SDK-Platform34