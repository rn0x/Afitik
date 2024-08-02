import { exec } from 'child_process';
import path from 'path';
import fs from 'fs-extra';

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
async function extractFrameAtSecond(videoFilePath, second, outputDir, folderNameOut) {
    const videoFileName = path.basename(videoFilePath, path.extname(videoFilePath));
    // const outputFilePath = path.join(outputDir, `${videoFileName}_at_${second}_second.png`);
    const outputFilePath = path.join(outputDir, `${videoFileName}.png`);

    if (fs.existsSync(outputFilePath)) {
        console.log(`Preview image already exists for ${videoFilePath}`);
        return `${path.dirname(videoFilePath)}/${folderNameOut}/${videoFileName}.png`;
    }

    // const command = `ffmpeg -ss ${second} -i "${videoFilePath}" -frames:v 1 "${outputFilePath}"`;
    // تحديد حجم الصورة إلى 320x180 بكسل (مستطيل بنسبة 16:9)
    const command = `ffmpeg -ss ${second} -i "${videoFilePath}" -vf scale=320:180 -q:v 2 -frames:v 1 "${outputFilePath}"`;

    try {
        await execPromise(command);
        console.log(`Extracted frame at second ${second}`);
        return `${path.dirname(videoFilePath)}/${folderNameOut}/${videoFileName}.png`;
    } catch (error) {
        console.error(`Error extracting frame at second ${second}:`, error);
        throw error;
    }
}

// الدالة الرئيسية لاستخراج صورة واحدة عند ثانية محددة
async function extractSingleFrame(videoFilePath, outputDir, second, folderNameOut) {
    try {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const previewPath = await extractFrameAtSecond(videoFilePath, second, outputDir, folderNameOut);
        console.log('Frame extraction completed successfully.');
        return previewPath;
    } catch (error) {
        console.error('Error during frame extraction:', error);
        return null;
    }
}


const arr = [
    "Abdominals.json",
    "anterior-deltoid.json",
    "Biceps.json",
    "Calves.json",
    "Chest.json",
    "feet.json",
    "Forearms.json",
    "front-shoulders.json",
    "gastrocnemius.json",
    "Glutes.json",
    "gluteus-maximus.json",
    "groin.json",
    "Hamstrings.json",
    "hands.json",
    "inner-quadricep.json",
    "inner-thigh.json",
    "lateral-deltoid.json",
    "lateral-hamstrings.json",
    "long-head-triceps.json",
    "lower-abdominals.json",
    "lower-trapezius.json",
    "Lowerback.json",
    "medial-hamstrings.json",
    "medial-head-triceps.json",
    "mid-lower-pectoralis.json",
    "neck.json",
    "Obliques.json",
    "outer-quadricep.json",
    "posterior-deltoid.json",
    "Quads.json",
    "rear-shoulders.json",
    "rectus-femoris.json",
    "short-head-bicep.json",
    "Shoulders.json",
    "soleus.json",
    "tibialis.json",
    "traps-middle.json",
    "Traps.json",
    "Triceps.json",
    "upper-abdominals.json",
    "upper-pectoralis.json",
    "upper-trapezius.json",
    "wrist-extensors.json",
    "wrist-flexors.json",
]


for (const lop of arr) {

    const __dirname = path.resolve();
    const fileJsonPath = path.join(__dirname, './musclewiki/json', lop)
    const fileJson = fs.readJSONSync(fileJsonPath);
    const second = 1;
    const folderNameOut = 'previews'


    for (const iterator of fileJson.exercises) {
        try {
            for (const item of iterator.videos.male) {
                const videoFilePath = item.file_path;

                if (videoFilePath) {
                    const outputDir = path.join(__dirname, path.dirname(item.file_path), folderNameOut);
                    const previewPath = await extractSingleFrame(videoFilePath, outputDir, second, folderNameOut);
                    if (previewPath) {
                        item.preview_image = previewPath;
                    }
                }

            }

            for (const item of iterator.videos.female) {
                const videoFilePath = item.file_path;

                if (videoFilePath) {
                    const outputDir = path.join(__dirname, path.dirname(item.file_path), folderNameOut);
                    const previewPath = await extractSingleFrame(videoFilePath, outputDir, second, folderNameOut);
                    if (previewPath) {
                        item.preview_image = previewPath;
                    }
                }

            }

            // تحديث ملف JSON
            fs.writeJSONSync(fileJsonPath, fileJson, { spaces: 2 });

        } catch (error) {
            console.log(error);
        }
    }
}