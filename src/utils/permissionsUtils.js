/**
 * استرجاع قائمة الأذونات المهمة المتاحة من Cordova.
 * @returns {Promise<Object>} - تعود بوعد يحتوي على كائن يمثل الأذونات المهمة المتاحة، حيث تكون المفاتيح هي أسماء الأذونات والقيم هي الأذونات نفسها.
 * @throws {Error} - إذا كان مكون Cordova غير متاح أو إذا كان عدم توفر أذونات.
 */
export function PERMISSIONS() {
    return new Promise((resolve, reject) => {
        if (typeof window.cordova === 'undefined' || !window.cordova.plugins.permissions) {
            reject(new Error('Cordova permissions plugin is not available.'));
            return;
        }

        const permissions = {
            SYSTEM_ALERT_WINDOW: window.cordova.plugins.permissions.SYSTEM_ALERT_WINDOW,
            READ_MEDIA_IMAGES: window.cordova.plugins.permissions.READ_MEDIA_IMAGES,
            READ_MEDIA_VIDEO: window.cordova.plugins.permissions.READ_MEDIA_VIDEO,
            READ_EXTERNAL_STORAGE: window.cordova.plugins.permissions.READ_EXTERNAL_STORAGE,
            WRITE_EXTERNAL_STORAGE: window.cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE,
            RECEIVE_BOOT_COMPLETED: window.cordova.plugins.permissions.RECEIVE_BOOT_COMPLETED,
            SCHEDULE_EXACT_ALARM: window.cordova.plugins.permissions.SCHEDULE_EXACT_ALARM,
            WAKE_LOCK: window.cordova.plugins.permissions.WAKE_LOCK,
            FOREGROUND_SERVICE: window.cordova.plugins.permissions.FOREGROUND_SERVICE,
            FOREGROUND_SERVICE_DATA_SYNC: window.cordova.plugins.permissions.FOREGROUND_SERVICE_DATA_SYNC,
            FOREGROUND_SERVICE_MEDIA_PLAYBACK: window.cordova.plugins.permissions.FOREGROUND_SERVICE_MEDIA_PLAYBACK,
            POST_NOTIFICATIONS: window.cordova.plugins.permissions.POST_NOTIFICATIONS,
            INTERNET: window.cordova.plugins.permissions.INTERNET,
            ACCESS_NETWORK_STATE: window.cordova.plugins.permissions.ACCESS_NETWORK_STATE,
            ACTIVITY_RECOGNITION: window.cordova.plugins.permissions.ACTIVITY_RECOGNITION,
            ACCESS_FINE_LOCATION: window.cordova.plugins.permissions.ACCESS_FINE_LOCATION,
            ACCESS_COARSE_LOCATION: window.cordova.plugins.permissions.ACCESS_COARSE_LOCATION,
            ACCESS_BACKGROUND_LOCATION: window.cordova.plugins.permissions.ACCESS_BACKGROUND_LOCATION,
            CAMERA: window.cordova.plugins.permissions.CAMERA,
            RECORD_AUDIO: window.cordova.plugins.permissions.RECORD_AUDIO,
            CALL_PHONE: window.cordova.plugins.permissions.CALL_PHONE,
            READ_CALL_LOG: window.cordova.plugins.permissions.READ_CALL_LOG,
            WRITE_CALL_LOG: window.cordova.plugins.permissions.WRITE_CALL_LOG,
            READ_CONTACTS: window.cordova.plugins.permissions.READ_CONTACTS,
            WRITE_CONTACTS: window.cordova.plugins.permissions.WRITE_CONTACTS,
            GET_ACCOUNTS: window.cordova.plugins.permissions.GET_ACCOUNTS,
            USE_CREDENTIALS: window.cordova.plugins.permissions.USE_CREDENTIALS,
            READ_SMS: window.cordova.plugins.permissions.READ_SMS,
            RECEIVE_SMS: window.cordova.plugins.permissions.RECEIVE_SMS,
            SEND_SMS: window.cordova.plugins.permissions.SEND_SMS,
            READ_PHONE_STATE: window.cordova.plugins.permissions.READ_PHONE_STATE,
            MODIFY_PHONE_STATE: window.cordova.plugins.permissions.MODIFY_PHONE_STATE,
            READ_PHONE_NUMBERS: window.cordova.plugins.permissions.READ_PHONE_NUMBERS,
            BROADCAST_STICKY: window.cordova.plugins.permissions.BROADCAST_STICKY,
            REQUEST_INSTALL_PACKAGES: window.cordova.plugins.permissions.REQUEST_INSTALL_PACKAGES,
            ACCESS_MEDIA_LOCATION: window.cordova.plugins.permissions.ACCESS_MEDIA_LOCATION,
            VIBRATE: window.cordova.plugins.permissions.VIBRATE
        };

        resolve(permissions);
    });
}

/**
 * التحقق مما إذا كان لدى التطبيق إذن معين.
 * @param {string} permission - اسم الإذن.
 * @returns {Promise<boolean>} - تعود بالقيمة الصحيحة إذا كان الإذن ممنوحًا، خلاف ذلك تعود بالقيمة غير الصحيحة.
 */
export function hasPermission(permission) {
    return new Promise((resolve, reject) => {
        if (typeof window.cordova === 'undefined' || !window.cordova.plugins.permissions) {
            reject(new Error('Cordova permissions plugin is not available.'));
            return;
        }

        window.cordova.plugins.permissions.checkPermission(permission, (status) => {
            resolve(status.hasPermission);
        }, reject);
    });
}

/**
 * طلب إذن معين من المستخدم.
 * @param {string} permission - اسم الإذن.
 * @returns {Promise<boolean>} - تعود بالقيمة الصحيحة إذا تم منح الإذن، خلاف ذلك تعود بالقيمة غير الصحيحة.
 */
export function requestPermission(permission) {
    return new Promise((resolve, reject) => {
        if (typeof window.cordova === 'undefined' || !window.cordova.plugins.permissions) {
            reject(new Error('Cordova permissions plugin is not available.'));
            return;
        }

        window.cordova.plugins.permissions.requestPermission(permission, (status) => {
            resolve(status.hasPermission);
        }, reject);
    });
}

/**
 * التحقق من مجموعة من الأذونات وطلبها إذا لم تكن ممنوحة.
 * @param {string[]} permissions - قائمة الأذونات.
 * @returns {Promise<boolean>} - تعود بالقيمة الصحيحة إذا كانت جميع الأذونات ممنوحة، خلاف ذلك تعود بالقيمة غير الصحيحة.
 */
export function checkAndRequestPermissions(permissions) {
    return new Promise((resolve, reject) => {
        if (typeof window.cordova === 'undefined' || !window.cordova.plugins.permissions) {
            reject(new Error('Cordova permissions plugin is not available.'));
            return;
        }

        window.cordova.plugins.permissions.hasPermission(permissions, (status) => {
            if (status.hasPermission) {
                resolve(true);
            } else {
                window.cordova.plugins.permissions.requestPermissions(permissions, (status) => {
                    resolve(status.hasPermission);
                }, reject);
            }
        }, reject);
    });
}
