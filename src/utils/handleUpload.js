import multer from 'multer'
import AWS from 'aws-sdk'
import { randomString } from './functions.js';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ap-southeast-3"
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});

function handleUpload(file) {
    return new Promise((resolve, reject) => {
        let filesplit = file.originalname.split('.')
        let fileExt = filesplit[filesplit.length - 1]
        let fileName = "EGGREAT-" + randomString(7) + "." + fileExt

        const params = {
            Bucket: 'eggreat-service',
            Key: fileName,
            Body: file.buffer,
            ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error(err);
                reject('Error uploading file');
            } else {
                resolve(data);
            }
        });
    });
}

export {
    upload,
    handleUpload,
}