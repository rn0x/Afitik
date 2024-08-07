/**
 * تأكد من تثبيت الإضافة بعد استعراض الأجهزة
 */
function checkCordovaPluginInstalled() {
    if (!window.cordova || !window.cordova.plugins || !window.cordova.plugins.backgroundMode) {
        throw new Error('This code must be run within the Cordova application and after browsing the devices.');
    }
}

/**
 * تفعيل وضع الخلفية.
 */
export function enableBackgroundMode() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.enable();
}

/**
 * تعطيل وضع الخلفية.
 */
export function disableBackgroundMode() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.disable();
}

/**
 * تحقق مما إذا كان وضع الخلفية نشطًا.
 * @returns {boolean}
 */
export function isBackgroundModeActive() {
    checkCordovaPluginInstalled();
    return window.cordova.plugins.backgroundMode.isActive();
}

/**
 * تسجيل مستمع لأحداث وضع الخلفية.
 * @param {string} event - اسم الحدث.
 * @param {Function} callback - الدالة التابعية التي تستجيب للحدث.
 */
export function onBackgroundModeEvent(event, callback) {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.on(event, callback);
}

/**
 * إزالة مستمع لأحداث وضع الخلفية.
 * @param {string} event - اسم الحدث.
 * @param {Function} callback - الدالة التابعية التي تستجيب للحدث.
 */
export function offBackgroundModeEvent(event, callback) {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.un(event, callback);
}

/**
 * نقل التطبيق إلى الخلفية.
 */
export function moveToBackground() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.moveToBackground();
}

/**
 * نقل التطبيق إلى الواجهة.
 */
export function moveToForeground() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.moveToForeground();
}

/**
 * تجاوز زر العودة لنقل التطبيق إلى الخلفية بدلاً من إغلاقه.
 */
export function overrideBackButton() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.overrideBackButton();
}

/**
 * استبعاد التطبيق من قائمة المهام الأخيرة.
 */
export function excludeFromTaskList() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.excludeFromTaskList();
}

/**
 * طلب تعطيل تحسينات البطارية
 * ستعرض هذه الطريقة مطالبة إذن للمستخدم (فقط إذا لم يتم منح التطبيق إذنًا) لتجاهل التحسين.
 */
export function disableBatteryOptimizations() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.disableBatteryOptimizations();
}

/**
 * التحقق مما إذا كانت الشاشة مطفأة.
 * @param {Function} callback - الدالة التابعية التي تستجيب للحالة.
 */
export function isScreenOff(callback) {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.isScreenOff(callback);
}

/**
 * إيقاظ الشاشة.
 */
export function wakeUp() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.wakeUp();
}

/**
 * إيقاظ الشاشة وفتح القفل.
 */
export function unlock() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.unlock();
}

/**
 * تعيين الإعدادات الافتراضية للإشعار.
 * @param {Object} options - خيارات الإشعار.
 */
export function setNotificationDefaults(options) {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.setDefaults(options);
}

/**
 * تعديل الإشعار الحالي.
 * @param {Object} options - خيارات الإشعار.
 */
export function configureNotification(options) {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.configure(options);
}

/**
 * تشغيل الوضع الصامت.
 * في الوضع الصامت ، لن يعرض المكون الإضافي إشعارًا - وهو ليس الافتراضي. كن على علم بأن Android يوصي بإضافة إشعار وإلا قد يوقف نظام التشغيل التطبيق مؤقتًا.
 */
export function enableSilentMode() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.setDefaults({ silent: true });
}

/**
 * تعطيل تحسينات WebView.
 */
export function disableWebViewOptimizations() {
    checkCordovaPluginInstalled();
    window.cordova.plugins.backgroundMode.disableWebViewOptimizations();
}