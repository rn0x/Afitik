// utils/foregroundService.js

/**
 * تأكد من تثبيت الإضافة بعد استعراض الأجهزة
 */
function checkForegroundServicePluginInstalled() {
    if (!window.cordova || !window.cordova.plugins || !window.cordova.plugins.foregroundService) {
        throw new Error('You must install and activate the cordova.plugins.foregroundService add-on.');
    }
}

/**
 * تشغيل خدمة المقدمة.
 * @param {Object} options - خيارات الخدمة.
 */
export function startForegroundService(options) {
    checkForegroundServicePluginInstalled();
    const defaultOptions = {
        id: '71717',
        title: 'Foreground Service',
        text: 'Service is running',
        icon: 'icon',
        importance: 2,
        delay: 0,
        button: false,
        buttonText: 'Stop service',
        buttonCallback: 'stopService',
        // أي إعدادات إضافية تحتاجها
    };
    const serviceOptions = { ...defaultOptions, ...options };

    window.cordova.plugins.foregroundService.start(serviceOptions);
}

/**
 * إيقاف خدمة المقدمة.
 */
export function stopForegroundService() {
    checkForegroundServicePluginInstalled();
    window.cordova.plugins.foregroundService.stop();
}
