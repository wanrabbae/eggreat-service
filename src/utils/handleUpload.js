import multer from 'multer'
import AWS from 'aws-sdk'
import fromIni from '@aws-sdk/credential-provider-ini'
import multerS3 from 'multer-s3'

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_SPACE_KEY,
    secretAccessKey: process.env.DO_SPACE_SECRET
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.DO_SPACE_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

// const uploadMultiple = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.DO_SPACE_NAME,
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + '-' + file.originalname);
//         }
//     })
// }).array('files', 7);

export {
    upload,
    // uploadMultiple
}