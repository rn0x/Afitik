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
    const outputFilePath = path.join(outputDir, `${videoFileName}_at_${second}_second.jpeg`);

    const command = `ffmpeg -ss ${second} -i "${videoFilePath}" -frames:v 1 "${outputFilePath}"`;

    try {
        await execPromise(command);
        console.log(`Extracted frame at second ${second}`);
        return outputFilePath;
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

        const previewFilePath = await extractFrameAtSecond(videoFilePath, second, outputDir);
        console.log('Frame extraction completed successfully.');
        return previewFilePath;
    } catch (error) {
        console.error('Error during frame extraction:', error);
        return null;
    }
}

// دالة لقراءة وتحديث ملف JSON
async function updateJsonWithPreviews(jsonFilePath, second) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

        for (const exercise of jsonData.exercises) {
            for (const gender of ['male', 'female']) {
                for (const video of exercise.videos[gender]) {
                    const videoFilePath = video.file_path;
                    const outputDir = path.join(path.dirname(videoFilePath), 'previews');

                    const previewFilePath = await extractSingleFrame(videoFilePath, outputDir, second);
                    if (previewFilePath) {
                        video.preview = previewFilePath;
                    }
                }
            }
        }

        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log('JSON file updated successfully.');
    } catch (error) {
        console.error('Error updating JSON file:', error);
    }
}

// استدعاء الدالة الرئيسية مع المتغيرات المطلوبة
const jsonFilePath = 'path/to/your/exercises.json';
const second = 5; // استخراج صورة عند الثانية الخامسة

updateJsonWithPreviews(jsonFilePath, second);
