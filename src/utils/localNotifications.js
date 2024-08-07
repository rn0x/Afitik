/**
 * تحقق مما إذا كانت Cordova متاحة وتحقق من وجود الإضافات المطلوبة.
 */
function checkCordovaAvailability() {
    if (typeof window.cordova === 'undefined' || !window.cordova.plugins || !window.cordova.plugins.notification) {
        throw new Error('يجب تشغيل هذا الكود داخل تطبيق Cordova وبعد استعراض الأجهزة.');
    }
}

/**
 * جدولة إشعار محلي.
 * @param {Object} options - خيارات الإشعار.
 */
export function scheduleLocalNotification(options) {
    checkCordovaAvailability();

    if (!options || typeof options !== 'object') {
        throw new Error('تم تقديم خيارات غير صالحة لجدولة الإشعار.');
    }

    window.cordova.plugins.notification.local.schedule(options);
}

/**
 * تحديث إشعار محلي.
 * @param {number} notificationId - معرف الإشعار.
 * @param {Object} options - الخصائص الجديدة التي تريد تحديثها.
 */
export function updateLocalNotification(notificationId, options) {
    checkCordovaAvailability();

    if (!notificationId || typeof notificationId !== 'number') {
        throw new Error('معرف الإشعار غير صالح.');
    }

    if (!options || typeof options !== 'object') {
        throw new Error('الخيارات المقدمة غير صالحة لتحديث الإشعار.');
    }

    window.cordova.plugins.notification.local.update({
        id: notificationId,
        ...options,
    });
}

/**
 * إلغاء إشعار محلي بواسطة معرف الإشعار.
 * @param {number} notificationId - معرف الإشعار.
 * @param {Function} [callback=()=>{}] - دالة التابعية التي تُستدعى عند الانتهاء من إلغاء الإشعار.
 */
export function cancelLocalNotification(notificationId, callback = () => {}) {
    checkCordovaAvailability();
    window.cordova.plugins.notification.local.cancel(notificationId, callback);
}

/**
 * تحقق مما إذا كان إشعارًا محليًا موجودًا باستخدام معرف الإشعار.
 * @param {number} notificationId - معرف الإشعار.
 * @returns {boolean} - القيمة المعادة تحدد ما إذا كان الإشعار موجودًا أم لا.
 */
export function isLocalNotificationPresent(notificationId) {
    checkCordovaAvailability();
    return window.cordova.plugins.notification.local.isPresent(notificationId);
}

/**
 * تسجيل الحدث للاستماع إلى النقر على الإشعارات المحلية والتحقق من الإجراء المطلوب.
 * @param {Function} callback - دالة التابعية التي تستجيب للحدث.
 */
export function registerLocalNotificationClickEvent(callback) {
    checkCordovaAvailability();
    window.cordova.plugins.notification.local.on('click', (notification) => {
        if (notification.action === 'closeAudio') {
            callback(notification);
        }
    });
}

/**
 * تسجيل الحدث للاستماع إلى النقر على الإشعارات المحلية والتحقق من الإجراء المطلوب.
 * @param {String} actionID - معرف الإجراء أو الحدث.
 * @param {Function} [callback=()=>{}] - دالة التابعية التي تُستدعى عند الضغط على الإشعار.
 */
export function registerLocalNotificationActionEvent(actionID, callback = () => {}) {
    checkCordovaAvailability();
    window.cordova.plugins.notification.local.on(actionID, callback);
}
