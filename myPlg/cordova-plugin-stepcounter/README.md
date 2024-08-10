# Cordova StepCounter Plugin

<div align="center">

<a href="README-AR.md" style="margin-right: 20px; text-decoration: none;">📝 التوثيق بالعربية</a>
<a href="README.md" style="text-decoration: none;">📝 English Documentation</a> <br>

[![License](https://img.shields.io/badge/license-GPL3.0-blue.svg)](https://github.com/rn0x/cordova-plugin-stepcounter/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/cordova-stepcounter.svg)](https://badge.fury.io/js/cordova-stepcounter)
![VIEWS](https://komarev.com/ghpvc/?username=rn0x-cordova-plugin-stepcounter&label=REPOSITORY+VIEWS&style=for-the-badge)

</div>

## Overview
The Cordova StepCounter Plugin allows you to track steps using the device's step counter sensor. It's designed for Android and can be easily integrated into your Cordova applications.

## Features
- Start and stop step counting.
- Retrieve the current step count.
- Handle permissions automatically.

## Installation

### Adding the Plugin
To install the StepCounter plugin into your Cordova project, use the following command:

```bash
cordova plugin add cordova-stepcounter
```

Alternatively, you can install it directly from the plugin's repository:

```bash
cordova plugin add https://github.com/rn0x/cordova-plugin-stepcounter.git
```

### Removing the Plugin
If you need to remove the plugin from your project, use the following command:

```bash
cordova plugin rm cordova-plugin-stepcounter
```


### Directory Structure

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

## Usage

### JavaScript API
The plugin provides three main methods: `start`, `stop`, and `getStepCount`.

#### Start Step Counting
Start the step counter sensor and begin counting steps.

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

#### Stop Step Counting
Stop the step counter sensor.

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

#### Get Current Step Count
Retrieve the current step count.

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

### React Integration
To use the StepCounter plugin in a React application, you need to ensure that Cordova is properly integrated. Here's an example of how you might use the plugin within a React component.

#### Example React Component

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
            <h1>Step Counter</h1>
            <p>Steps: {stepCount}</p>
            <button onClick={startCounting} disabled={isCounting}>
                Start Counting
            </button>
            <button onClick={stopCounting} disabled={!isCounting}>
                Stop Counting
            </button>
            <button onClick={fetchStepCount}>Get Step Count</button>
        </div>
    );
}

export default StepCounterComponent;
```

### Contributing

#### How to Contribute
We welcome contributions to the Cordova StepCounter Plugin. You can contribute by:

- Reporting bugs and suggesting features through GitHub Issues.
- Submitting pull requests with bug fixes or new features.

#### Development Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/cordova-plugin-stepcounter.git
    cd cordova-plugin-stepcounter
    ```

2. Make your changes and test them locally with your Cordova project.

3. Submit a pull request with a clear description of your changes.

#### Licensing
This plugin is licensed under the GPL 3.0 License. See the `LICENSE` file for more information.

#### Contact
For any questions or feedback, feel free to open an issue on the GitHub repository.
