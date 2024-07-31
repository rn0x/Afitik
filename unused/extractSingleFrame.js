import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

// دالة لاستدعاء الأوامر باستخدام الوعد
function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout || stderr);
            }
        });
    });
}

// دالة لاستخراج صورة معاينة عند ثانية محددة
async function extractFrameAtSecond(videoFilePath, second, outputDir) {
    const videoFileName = path.basename(videoFilePath, path.extname(videoFilePath));
    const outputFilePath = path.join(outputDir, `${videoFileName}_at_${second}_second.png`);

    const command = `ffmpeg -ss ${second} -i "${videoFilePath}" -frames:v 1 "${outputFilePath}"`;

    try {
        await execPromise(command);
        console.log(`Extracted frame at second ${second}`);
    } catch (error) {
        console.error(`Error extracting frame at second ${second}:`, error);
        throw error;
    }
}

// الدالة الرئيسية لاستخراج صورة واحدة عند ثانية محددة
async function extractSingleFrame(videoFilePath, outputDir, second) {
    try {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        await extractFrameAtSecond(videoFilePath, second, outputDir);
        console.log('Frame extraction completed successfully.');
    } catch (error) {
        console.error('Error during frame extraction:', error);
    }
}

// استدعاء الدالة الرئيسية مع المتغيرات المطلوبة
const videoFilePath = 'path/to/your/video.mp4';
const outputDir = 'path/to/output/directory';
const second = 5; // استخراج صورة عند الثانية الخامسة

extractSingleFrame(videoFilePath, outputDir, second);
