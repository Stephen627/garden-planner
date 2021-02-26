import * as JSZip from 'jszip';

import { Auth } from './user';
import { db } from './db';
import { storage } from './storage';
import Plant from './database/plant';

export const getImageData = (imageUrl: string): Promise<Blob> => {
    const image: HTMLImageElement = new Image();
    image.crossOrigin = 'Anonymous'
    const promise: Promise<Blob> = new Promise((resolve, reject) => {
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0 );

            canvas.toBlob((blob) => {
                resolve(blob);
            })
        }, false);
    });

    image.src = imageUrl;

    return promise;
}

export const getUserZipFolder = async (): Promise<JSZip> => {
    const uid = Auth.currentUser().uid;
    const zip = new JSZip();
    const images = zip.folder('images');
    const data = await db.get(uid);
    zip.file('data.json', JSON.stringify(data));
    const plantKeys = Object.keys(data.plants);
    for (let i = 0; i < plantKeys.length; i++) {
        const plant: Plant = data.plants[plantKeys[i]];
        if (!plant.icon) {
            return;
        }
        const fileUrl = await storage.get(`${uid}/${plant.icon}`);
        const fileData = await getImageData(fileUrl);

        images.file(plant.icon, fileData);
    }

    if (data.user_details.profile) {
        const profileUrl = await storage.get(`${uid}/profile`);
        const profileData = await getImageData(profileUrl);

        images.file('profile', profileData);
    }
    return zip;

}