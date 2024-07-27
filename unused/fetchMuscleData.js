import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const Afitik = "Afitik";
const maxRetries = 3; // عدد المحاولات القصوى لإعادة التحميل

// التأكد من وجود المجلدات اللازمة
const createDirectories = () => {
    const dirs = [
        'musclewiki/json',
        'musclewiki/male/videos',
        'musclewiki/female/videos',
        'musclewiki/male/bodymaps',
        'musclewiki/female/bodymaps'
    ];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

// حفظ الملفات مع معالجة الأخطاء وإعادة المحاولة
const saveFile = async (url, filePath) => {
    if (fs.existsSync(filePath)) {
        console.log(`File already exists: ${filePath}`);
        return;
    }

    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            fs.writeFileSync(filePath, response.data);
            console.log(`File saved successfully: ${filePath}`);
            return;
        } catch (error) {
            attempts++;
            console.error(`Error downloading file (Attempt ${attempts}/${maxRetries}): ${url}`);
            if (attempts >= maxRetries) {
                console.error(`Failed to download file after ${maxRetries} attempts: ${url}`);
            } else {
                console.log(`Retrying... (${attempts}/${maxRetries})`);
            }
        }
    }
};

// حفظ ملف JSON
const saveJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

createDirectories();

let num = 1;
const musclesJson = `https://musclewiki.com/newapi/muscle/muscles/`;
const resMuscles = await fetch(musclesJson, {
    headers: {
        accept: "*/*",
        "accept-language": "ar-sa",
        "django-language": "ar-sa",
        priority: "u=1, i",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Brave\";v=\"127\", \"Chromium\";v=\"127\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1"
    },
    referrer: "https://musclewiki.com/ar-sa/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include"
}).catch(e => { });
const resMusclesJson = (await resMuscles?.json().catch(e => { })).results;

for (const lop of resMusclesJson) {
    let url = `https://musclewiki.com/newapi/exercise/exercises/?limit=2000&lang=ar&offset=0&category=&status=Published&ordering=-featured_weight&muscles=${lop.id}`;

    const response = await fetch(url, {
        headers: {
            accept: "*/*",
            "accept-language": "ar-sa",
            "django-language": "ar-sa",
            priority: "u=1, i",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Brave\";v=\"127\", \"Chromium\";v=\"127\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1"
        },
        referrer: "https://musclewiki.com/ar-sa/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include"
    }).catch(e => { })
    const responseJson = await response?.json().catch(e => { }) || [];
    const results = responseJson?.results || [];

    const allExercises = [];

    for (const item of results) {
        console.log(`Exercise: ${item?.name_en_us}`);
        const name = item?.name;
        const name_en = item?.name_en_us;
        const name_alternative = item?.name_alternative;
        const slug = item?.slug;
        const description = item?.description;
        const description_en_us = item?.description_en_us;
        const muscles_primary = item?.muscles_primary.map(e => ({
            name: e?.name,
            name_en_us: e?.name_en_us,
            description: e?.description,
            description_en_us: e?.description_en_us,
        }));
        const muscles_secondary = item.muscles_secondary.map(e => ({
            name: e?.name,
            name_en_us: e?.name_en_us,
            description: e?.description,
            description_en_us: e?.description_en_us,
        }));
        const muscles_tertiary = item?.muscles_tertiary.map(e => ({
            name: e?.name,
            name_en_us: e?.name_en_us,
            description: e?.description,
            description_en_us: e?.description_en_us,
        }));
        const muscles = item?.muscles.map(e => ({
            name: e?.name,
            name_en_us: e?.name_en_us,
            description: e?.description,
            description_en_us: e?.description_en_us,
        }));
        const category = {
            name: item?.category?.name,
            name_en: item?.category?.name_en_us,
        };
        const difficulty = {
            name: item?.difficulty?.name,
            name_en: item?.difficulty?.name_en_us,
        };
        const force = {
            name: item?.force?.name,
            name_en: item?.force?.name_en_us,
            description: item?.force?.description,
            description_en_us: item?.force?.description_en_us,
        };
        const grips = {
            name: item?.grips.name,
            name_en: item?.grips?.name_en_us,
            description: item?.grips?.description,
            description_en_us: item?.grips?.description_en_us,
        };

        const long_form_content = {
            male: {
                youtube_link: item?.long_form_content[0]?.youtube_link,
            },
            female: {
                youtube_link: item?.long_form_content[1]?.youtube_link,
            },
        };

        const correct_steps = item?.correct_steps?.map(step => ({
            text: step?.text,
            text_en: step?.text_en_us,
        }));

        const seo_tags = item?.seo_tags;

        const videos = {
            male: item?.male_images?.map(e => ({
                original_video: e?.original_video ? e?.original_video : e?.unbranded_video ? e?.unbranded_video : e?.branded_video,
                file_path: `musclewiki/male/videos/${lop.url_name}-${slug}-${Afitik}.mp4`,
            })),
            female: item?.female_images?.map(e => ({
                original_video: e.original_video ? e?.original_video : e?.unbranded_video ? e?.unbranded_video : e?.branded_video,
                file_path: `musclewiki/female/videos/${lop?.url_name}-${slug}-${Afitik}.mp4`,
            })),
        };

        const body_map = {
            male: {
                front: item?.body_map_images[0]?.front,
                back: item?.body_map_images[0]?.back,
                front_file_path: `musclewiki/male/bodymaps/${lop?.url_name}-${slug}-front-${Afitik}.png`,
                back_file_path: `musclewiki/male/bodymaps/${lop?.url_name}-${slug}-back-${Afitik}.png`,
            },
            female: {
                front: item?.body_map_images[1]?.front,
                back: item?.body_map_images[1]?.back,
                front_file_path: `musclewiki/female/bodymaps/${lop?.url_name}-${slug}-front-${Afitik}.png`,
                back_file_path: `musclewiki/female/bodymaps/${lop?.url_name}-${slug}-back-${Afitik}.png`,
            }
        };

        // حفظ الفيديوهات
        for (const gender in videos) {
            for (const video of videos[gender]) {
                if (video.original_video) {
                    await saveFile(video?.original_video, video?.file_path);
                }
            }
        }

        // حفظ الصور
        for (const gender in body_map) {
            const map = body_map[gender];
            if (map.front) {
                await saveFile(map?.front, map?.front_file_path);
            }
            if (map.back) {
                await saveFile(map?.back, map?.back_file_path);
            }
        }

        // إضافة البيانات إلى القائمة
        allExercises.push({
            name,
            name_en,
            name_alternative,
            slug,
            description,
            description_en_us,
            muscles_primary,
            muscles_secondary,
            muscles_tertiary,
            muscles,
            category,
            difficulty,
            force,
            grips,
            long_form_content,
            correct_steps,
            seo_tags,
            videos,
            body_map
        });
    }

    // حفظ ملف JSON واحد لجميع التمارين
    saveJsonFile(`musclewiki/json/${lop?.url_name}.json`, {
        id: num++,
        name: lop?.name,
        name_en_us: lop?.name_en_us,
        exercises: allExercises
    });

    console.log(`muscleName: ${lop?.name_en_us}`);
}
