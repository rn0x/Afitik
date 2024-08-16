# Afitik

<div align="center">

[Arabic](README.md) || [English](README.EN.md)

![Badge](https://img.shields.io/github/v/release/rn0x/Afitik)

![GitHub all releases](https://img.shields.io/github/downloads/rn0x/Afitik/total?color=blue&label=Total%20Downloads)

<br>

![Logo][logo]

</div>

## 📖 Description

**Afitik** is a comprehensive app designed to help you achieve your health and fitness goals. The app provides a variety of tools and information to assist you in building muscles, improving physical fitness, and maintaining a healthy lifestyle.

## 🏆 Features

- **📚 Muscle Information**: Detailed information about muscles and their divisions.
- **🏋️‍♂️ Custom Workouts**: A variety of exercises with images and videos.
- **🍎 Dietary Plans**: Healthy meal plans to meet your goals.
- **📊 Calculation Tools**: Calculate calories and body mass.
- **🏆 Achievement Tracking**: Monitor your progress in workouts and diet.
- **📅 Workout Schedule**: Organize weekly or monthly workout schedules.
- **🏋️‍♂️ Equipment Information**: Information about different fitness equipment.

<br>

## 📸 Screenshots

| ![Screenshot 1][screen1] | ![Screenshot 2][screen2] |
| :----------------------- | ------------------------ |
| ![Screenshot 3][screen3] | ![Screenshot 4][screen4] |

<br>

## 🛠️ Backend Dependency: FileServeX

The **Afitik** app relies on **FileServeX** for serving images and JSON files. Ensure **[FileServeX](https://github.com/rn0x/FileServeX)** is set up as follows:

- **Base URL**: `http://localhost:7000`
- **Download MuscleWiki Files**: [musclewiki.zip](https://home.i8x.net/files/musclewiki.zip) (Size: 77.4 GB)

Make sure to extract the `musclewiki` directory and place it in the `files` directory on the **FileServeX** server.

`http://localhost:7000/files/musclewiki`

## 📦 Environment Variables (`.env`)

Note: The `keytool.js` script relies on environment variables stored in the `.env` file. Make sure your `.env` file is set up as follows:

- **`STORE_PASSWORD`**:

  - **Description**: The keystore's store password.
  - **Type**: String.

- **`ALIAS`**:

  - **Description**: The alias for the key within the keystore.
  - **Type**: String.

- **`KEY_PASSWORD`**:

  - **Description**: The key password within the keystore.
  - **Type**: String.

- **`DNAME_CN`**:

  - **Description**: Common Name for the entity.
  - **Type**: String.

- **`DNAME_OU`**:

  - **Description**: Organizational Unit.
  - **Type**: String.

- **`DNAME_O`**:

  - **Description**: Organization.
  - **Type**: String.

- **`DNAME_L`**:

  - **Description**: Locality.
  - **Type**: String.

- **`DNAME_S`**:

  - **Description**: State or Province.
  - **Type**: String.

- **`DNAME_C`**:

  - **Description**: Country.
  - **Type**: String.

- **`REACT_APP_API_BASE_URL`**:
  - **Description**: Base URL for API to access **[FileServeX](https://github.com/rn0x/FileServeX)** server.
  - **Type**: String.

## 🚀 Scripts (`scripts`)

Scripts in the `package.json` file define tasks that can be run. Here's an explanation of each script:

- **`server`**:

  - **Description**: Express.js server redirects all requests to index.html for handling routes using React Router.
  - **Usage**: `npm run server`

- **`keytool`**:

  - **Description**: Runs the `keytool.js` script to create a keystore.
  - **Usage**: `npm run keytool`

- **`dev`**:

  - **Description**: Starts the React development environment.
  - **Usage**: `npm run dev`

- **`build`**:

  - **Description**: Builds the application using the `prebuild.js` script and then builds the React project.
  - **Usage**: `npm run build`

- **`android`**:

  - **Description**: Adds the Android platform to the Cordova project.
  - **Usage**: `npm run android`

- **`re-android`**:

  - **Description**: Removes and re-adds the Android platform to the Cordova project.
  - **Usage**: `npm run re-android`

- **`build-apk`**:

  - **Description**: Builds the Android application as an APK.
  - **Usage**: `npm run build-apk`

- **`build-aab`**:

  - **Description**: Builds the Android application as an AAB (Android App Bundle).
  - **Usage**: `npm run build-aab`

- **`device`**:

  - **Description**: Runs the application on a connected Android device.
  - **Usage**: `npm run device`

- **`bu-device`**:

  - **Description**: Builds and runs the application on a connected Android device.
  - **Usage**: `npm run bu-device`

- **`logcat`**:

  - **Description**: Displays `adb logcat` logs.
  - **Usage**: `npm run logcat`

- **`log`**:

  - **Description**: Displays `adb logcat` logs with INFO:CONSOLE filtering.
  - **Usage**: `npm run log`

- **`clean`**:

  - **Description**: Cleans the Cordova project and npm cache.
  - **Usage**: `npm run clean`

- **`rm`**:

  - **Description**: Removes `node_modules`, `platforms`, `plugins`, and `package-lock.json`, then rebuilds the Android project.
  - **Usage**: `npm run rm`

- **`rm-linux`**:

  - **Description**: Performs the same function as `rm` but on Linux systems.
  - **Usage**: `npm run rm-linux`

- **`sync`**:
  - **Description**: Prepares all Cordova platforms.
  - **Usage**: `npm run sync`

## Setting Up Cordova Development Environment 📱

To develop the AFITIK app effectively, it is essential to properly set up the development environment using Cordova. This involves installing the necessary tools and ensuring that all settings are correctly configured for a smooth and trouble-free development experience.

📄 [تثبيت وتهيئة بيئة التطوير لـ Cordova - عربي](/setup_cordova/README.AR.md)  
📄 [Setting Up Cordova Development Environment - English](/setup_cordova/README.md)

## Project Structure

| **File / Folder**  | **Description**                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `myPlg`            | Folder containing project-specific plugins.                                                                                        |
| `platforms`        | Folder containing Cordova files and platforms. (Automatically created)                                                             |
| `plugins`          | Folder containing the Cordova plugins used in the project. (Automatically created)                                                 |
| `public`           | Folder containing public files accessible from the frontend.                                                                       |
| `resources`        | Folder containing various resources for the application.                                                                           |
| `setup_cordova`    | Folder containing Cordova development environment setup files.                                                                     |
| `src`              | Folder containing the application's source code.                                                                                   |
| `unused`           | Folder containing currently unused files and images.                                                                               |
| `www`              | Folder containing files served by the server.                                                                                      |
| `build.json`       | Build configuration file. (Automatically created)                                                                                  |
| `config.xml`       | Cordova configuration file.                                                                                                        |
| `keytool.js`       | Script for creating a keystore for signing applications.                                                                           |
| `LICENSE`          | File containing license details.                                                                                                   |
| `package.json`     | Project definition and Node.js package file.                                                                                       |
| `prebuild.js`      | Script executed before the build process.                                                                                          |
| `README.EN.md`     | Documentation file in English.                                                                                                     |
| `README.md`        | Documentation file in Arabic.                                                                                                      |
| `release.keystore` | Keystore file for signing Android applications. (Automatically created)                                                            |
| `server.mjs`       | Express.js server script that starts the server and redirects all requests to `index.html` for handling routes using React Router. |

[card]: https://PlayBadges.pavi2410.me/badge/full?id=org.i8xnet.afitik
[downloads_badge]: https://PlayBadges.pavi2410.me/badge/downloads?id=org.i8xnet.afitik
[logo]: /unused/logo%20afitik/250px.png
[screen1]: /unused/Screenshot/Screenshot_2024-08-04-06-27-23-959_org.i8xnet.afitik.jpg
[screen2]: /unused/Screenshot/Screenshot_2024-08-04-06-27-31-315_org.i8xnet.afitik.jpg
[screen3]: /unused/Screenshot/Screenshot_2024-08-04-06-27-36-216_org.i8xnet.afitik.jpg
[screen4]: /unused/Screenshot/Screenshot_2024-08-04-06-28-02-818_org.i8xnet.afitik.jpg
[screen5]: /unused/Screenshot/Screenshot_2024-08-04-06-27-41-281_org.i8xnet.afitik.jpg
[screen6]: /unused/Screenshot/Screenshot_2024-08-04-06-27-48-381_org.i8xnet.afitik.jpg
[screen7]: /unused/Screenshot/Screenshot_2024-08-04-06-28-10-741_org.i8xnet.afitik.jpg
