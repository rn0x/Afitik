/**
 * Utility functions for handling file and directory operations using cordova-plugin-file.
 * @module FileUtils
 */

/**
 * Checks if the Cordova file plugin is installed.
 * @throws Will throw an error if the file plugin is not installed.
 */
function checkFilePluginInstalled() {
    if (!window.cordova || !window.cordova.file) {
        throw new Error("Cordova-plugin-file must be installed and activated.");
    }
}

/**
 * Object containing common directory names used for media and files.
 * @type {Object}
 * @property {string} DCIM - Directory for camera images and videos.
 * @property {string} Download - Directory for downloaded files.
 * @property {string} Documents - Directory for documents.
 * @property {string} Movies - Directory for movies and video files.
 * @property {string} Music - Directory for music files.
 * @property {string} Pictures - Directory for picture files.
 * @property {string} Alarms - Directory for alarm tones.
 * @property {string} Ringtones - Directory for ringtones.
 * @property {string} Podcasts - Directory for podcasts.
 * @property {string} Notifications - Directory for notification sounds.
 * @property {string} Audiobooks - Directory for audiobooks.
 */
const COMMON_DIRECTORIES = {
    DCIM: "DCIM",          // Directory for camera images and videos
    Download: "Download",  // Directory for downloaded files
    Documents: "Documents",// Directory for documents
    Movies: "Movies",      // Directory for movies and video files
    Music: "Music",        // Directory for music files
    Pictures: "Pictures",  // Directory for picture files
    Alarms: "Alarms",      // Directory for alarm tones
    Ringtones: "Ringtones",// Directory for ringtones
    Podcasts: "Podcasts",  // Directory for podcasts
    Notifications: "Notifications", // Directory for notification sounds
    Audiobooks: "Audiobooks" // Directory for audiobooks
};


/**
 * Gets the available file system directories.
 * @returns {Object} - An object containing paths to various directories.
 * @property {string} externalDataDirectory - Path to the external data directory.
 * @property {string} dataDirectory - Path to the internal data directory.
 * @property {string} documentsDirectory - Path to the documents directory.
 * @property {string} applicationDirectory - Path to the application directory.
 * @property {string} applicationStorageDirectory - Root directory of the application's sandbox.
 * @property {string} cacheDirectory - Directory for cached data files.
 * @property {string} externalApplicationStorageDirectory - Application space on external storage.
 * @property {string} externalCacheDirectory - Application cache on external storage.
 * @property {string} externalRootDirectory - External storage (SD card) root.
 * @property {string} tempDirectory - Temp directory that the OS can clear at will.
 * @property {string} syncedDataDirectory - Holds app-specific files that should be synced.
 * @property {string} sharedDirectory - Files globally available to all applications.
 */
function getDirectories() {
    checkFilePluginInstalled();
    return {
        externalDataDirectory: window.cordova.file.externalDataDirectory || '',
        dataDirectory: window.cordova.file.dataDirectory || '',
        documentsDirectory: window.cordova.file.documentsDirectory || '',
        applicationDirectory: window.cordova.file.applicationDirectory || '',
        applicationStorageDirectory: window.cordova.file.applicationStorageDirectory || '',
        cacheDirectory: window.cordova.file.cacheDirectory || '',
        externalApplicationStorageDirectory: window.cordova.file.externalApplicationStorageDirectory || '',
        externalCacheDirectory: window.cordova.file.externalCacheDirectory || '',
        externalRootDirectory: window.cordova.file.externalRootDirectory || '',
        tempDirectory: window.cordova.file.tempDirectory || '',
        syncedDataDirectory: window.cordova.file.syncedDataDirectory || '',
        sharedDirectory: window.cordova.file.sharedDirectory || ''
    };
}

/**
 * Resolves the file system URL and returns a file or directory entry.
 * @param {string} path - The full path of the file or directory.
 * @returns {Promise} - A promise that resolves with the file or directory entry.
 * @private
 */
function resolveFileSystemURL(path) {
    checkFilePluginInstalled();
    return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(path, resolve, reject);
    });
}

/**
 * Creates a directory at a specific path.
 * @param {string} dirPath - The full path of the directory.
 * @returns {Promise} - A promise that resolves when the directory is created.
 */
function createDirectory(dirPath) {
    return resolveFileSystemURL(dirPath)
        .catch(() => {
            return new Promise((resolve, reject) => {
                window.resolveLocalFileSystemURL(dirPath.substring(0, dirPath.lastIndexOf('/')), parentDirEntry => {
                    parentDirEntry.getDirectory(dirPath.substring(dirPath.lastIndexOf('/') + 1), { create: true, exclusive: false }, resolve, reject);
                }, reject);
            });
        });
}


/**
 * Ensures that a directory exists, creating it if necessary.
 * @param {string} dirPath - The full path of the directory to check or create.
 * @returns {Promise} - A promise that resolves when the directory exists or has been created.
 */
function ensureDirectory(dirPath) {
    const pathParts = dirPath.split('/');
    let currentPath = '';

    return pathParts.reduce((promise, part) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        return promise.then(() => createDirectory(currentPath));
    }, Promise.resolve());
}

/**
 * Gets the file entry for a given path.
 * @param {string} filePath - The full path of the file.
 * @returns {Promise} - A promise that resolves with the file entry.
 */
function getFileEntry(filePath) {
    const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));
    return ensureDirectory(directoryPath).then(() =>
        resolveFileSystemURL(directoryPath)
            .then(dirEntry => new Promise((resolve, reject) => {
                dirEntry.getFile(filePath.substring(filePath.lastIndexOf('/') + 1), { create: true, exclusive: false }, resolve, reject);
            }))
    );
}

/**
 * Writes data to a file at a specific path.
 * @param {string} filePath - The full path of the file.
 * @param {string|Blob} data - The data to write to the file.
 * @returns {Promise} - A promise that resolves when the write operation is complete.
 */
function writeFile(filePath, data) {
    return getFileEntry(filePath).then(fileEntry => {
        return new Promise((resolve, reject) => {
            fileEntry.createWriter(fileWriter => {
                fileWriter.onwriteend = () => resolve();
                fileWriter.onerror = () => reject(fileWriter.error);
                fileWriter.write(data);
            }, reject);
        });
    });
}

/**
 * Reads data from a file at a specific path.
 * @param {string} filePath - The full path of the file.
 * @returns {Promise<string>} - A promise that resolves with the file content.
 */
function readFile(filePath) {
    return getFileEntry(filePath).then(fileEntry => {
        return new Promise((resolve, reject) => {
            fileEntry.file(file => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(this.result);
                reader.onerror = () => reject(reader.error);
                reader.readAsText(file);
            }, reject);
        });
    });
}

/**
 * Deletes a file at a specific path.
 * @param {string} filePath - The full path of the file to delete.
 * @returns {Promise} - A promise that resolves when the delete operation is complete.
 */
function deleteFile(filePath) {
    return getFileEntry(filePath).then(fileEntry => {
        return new Promise((resolve, reject) => {
            fileEntry.remove(resolve, reject);
        });
    });
}

/**
 * Checks if a file exists at a specific path.
 * @param {string} filePath - The full path of the file to check.
 * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the file exists.
 */
function fileExists(filePath) {
    return getFileEntry(filePath).then(() => true).catch(() => false);
}

/**
 * Gets the path of a file at a specific path.
 * @param {string} filePath - The full path of the file.
 * @returns {Promise<string>} - A promise that resolves with the file path.
 */
function getFilePath(filePath) {
    return getFileEntry(filePath).then(fileEntry => fileEntry.nativeURL);
}



// Export the functions for use in other modules
export {
    writeFile,
    readFile,
    deleteFile,
    fileExists,
    getFilePath,
    getDirectories,
    COMMON_DIRECTORIES
};
