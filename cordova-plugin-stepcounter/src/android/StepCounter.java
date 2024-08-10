package com.rn0x.stepcounter;

import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.util.Log;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class StepCounter extends CordovaPlugin implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor stepSensor;
    private CallbackContext callbackContext;
    private int lastStepCount = 0;
    private int totalStepCount = 0;
    private boolean isCounting = false;

    private static final int REQUEST_CODE_PERMISSIONS = 1001;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;

        switch (action) {
            case "start":
                if (checkPermissions()) {
                    startStepCounting();
                } else {
                    requestPermissions();
                }
                return true;
            case "stop":
                stopStepCounting();
                return true;
            case "getStepCount":
                getStepCount(callbackContext);
                return true;
            default:
                return false;
        }
    }

    private void requestPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            cordova.requestPermissions(this, REQUEST_CODE_PERMISSIONS, new String[]{android.Manifest.permission.ACTIVITY_RECOGNITION});
        }
    }

    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted, retry the start action
                startStepCounting();
            } else {
                // Permission denied
                sendError("Permission denied.");
            }
        }
    }

    private void startStepCounting() {
        sensorManager = (SensorManager) cordova.getActivity().getSystemService(Context.SENSOR_SERVICE);
        if (sensorManager == null) {
            sendError("Sensor Manager not available.");
            return;
        }

        stepSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        if (stepSensor != null) {
            sensorManager.registerListener(this, stepSensor, SensorManager.SENSOR_DELAY_UI);
            isCounting = true;
            lastStepCount = 0;
            totalStepCount = 0;
            sendSuccess("Step counting started.");
        } else {
            sendError("Step Counter sensor not available.");
        }
    }

    private void stopStepCounting() {
        Log.d("StepCounter", "stopStepCounting called");
        if (sensorManager != null && stepSensor != null) {
            sensorManager.unregisterListener(this);
            isCounting = false;
            Log.d("StepCounter", "Step counting stopped.");
            sendSuccess("Step counting stopped.");
        } else {
            sendError("Sensor not initialized.");
        }
    }

    private void getStepCount(CallbackContext callbackContext) {
        if (isCounting) {
            callbackContext.success(totalStepCount + lastStepCount);
        } else {
            callbackContext.error("Step counting is not active.");
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_STEP_COUNTER) {
            int currentStepCount = (int) event.values[0];
            totalStepCount = currentStepCount - lastStepCount;
            lastStepCount = currentStepCount; // Update lastStepCount
            if (isCounting && callbackContext != null) {
                callbackContext.success(totalStepCount);
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // No action needed for accuracy changes
    }

    private boolean checkPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            return cordova.getActivity().checkSelfPermission(android.Manifest.permission.ACTIVITY_RECOGNITION) == PackageManager.PERMISSION_GRANTED;
        }
        return true; // Permissions are granted by default for older versions
    }

    private void sendSuccess(String message) {
        if (callbackContext != null) {
            callbackContext.success(message);
            callbackContext = null; // Clear callbackContext after successful response
        } else {
            Log.e("StepCounter", "CallbackContext is null.");
        }
    }

    private void sendError(String message) {
        if (callbackContext != null) {
            callbackContext.error(message);
            callbackContext = null; // Clear callbackContext after error response
        } else {
            Log.e("StepCounter", "CallbackContext is null. Error: " + message);
        }
    }
}