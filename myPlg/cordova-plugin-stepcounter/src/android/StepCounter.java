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
    private int lastStepCount = -1;
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
                startStepCounting();
            } else {
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
            sensorManager.registerListener(this, stepSensor, SensorManager.SENSOR_DELAY_NORMAL);
            isCounting = true;
            lastStepCount = -1;
            totalStepCount = 0;
            sendSuccess("Step counting started.");
        } else {
            sendError("Step Counter sensor not available.");
        }
    }

    private void stopStepCounting() {
        if (sensorManager != null && stepSensor != null) {
            sensorManager.unregisterListener(this);
            isCounting = false;
            sendSuccess("Step counting stopped.");
        } else {
            sendError("Sensor not initialized.");
        }
    }

    private void getStepCount(CallbackContext callbackContext) {
        if (isCounting) {
            callbackContext.success(totalStepCount);
        } else {
            callbackContext.error("Step counting is not active.");
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_STEP_COUNTER) {
            int currentStepCount = (int) event.values[0];

            if (lastStepCount == -1) {
                lastStepCount = currentStepCount;
                return;
            }

            // حساب الفرق بين الخطوات الحالية والماضية
            int stepsSinceLastUpdate = currentStepCount - lastStepCount;

            // تحقق من اختلاف عدد الخطوات
            if (stepsSinceLastUpdate < 0) {
                // التعامل مع حالة تجاوز الأرقام
                stepsSinceLastUpdate = 0;
            }

            // تحديث العدد الإجمالي
            totalStepCount += stepsSinceLastUpdate;
            lastStepCount = currentStepCount; 

            if (isCounting && callbackContext != null) {
                callbackContext.success(totalStepCount);
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // لا حاجة للإجراءات عند تغيير الدقة
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
            callbackContext = null;
        } else {
            Log.e("StepCounter", "CallbackContext is null.");
        }
    }

    private void sendError(String message) {
        if (callbackContext != null) {
            callbackContext.error(message);
            callbackContext = null;
        } else {
            Log.e("StepCounter", "CallbackContext is null. Error: " + message);
        }
    }
}