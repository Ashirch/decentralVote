

const CONFIG = require("../config/config");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: CONFIG.AWS.ACCESS_KEY,
    secretAccessKey: CONFIG.AWS.SECRET_KEY,
    region: "eu-north-1",
    signatureVersion: "v4"
});


const uploadIntoS3Bucket = (fileName, subBucket ,bucket, body, user_id = "") => {
    return new Promise(function (resolve, reject) {
        const fileExtension = fileName.substr(fileName.lastIndexOf(".") + 1);
        let extension = "";
        if (fileExtension === "PNG" || fileExtension === "png") {
          extension = ".png";
        } else if (fileExtension === "jpg") {
          extension = ".jpg";
        } else if (fileExtension === "gif") {
          extension = ".gif";
        } else if (fileExtension === "webp") {
          extension = ".webp";
        }else if (fileExtension === "pdf") {
            extension = ".pdf";
          }
        const now = new Date();
        const filename = user_id + now.getDate() + now.getDay() + now.getFullYear() + extension;
        const keyName = subBucket + "/" + filename;
        s3.upload(
            {
                Bucket: bucket,
                Key: keyName,
                Body: body,
                ServerSideEncryption: "aws:kms"
            },
            function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
        );
    });
};
const generateAWSPresignedUrl = async (bucket, key) => {
    const signedUrlExpireSeconds = 86400 * 7; // 7 day
    const params = {
        Bucket: bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
        ResponseContentDisposition: 'attachment'
    };
    let url = s3.getSignedUrl("getObject", params);
    return url;
};


module.exports = {
    uploadIntoS3Bucket,
    generateAWSPresignedUrl
}



