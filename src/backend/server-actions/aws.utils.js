import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  STORE_ITEMS_PHOTOS,
  AWS_REGION,
} = process.env;

const client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function putFileToC3BucketAndGetFileURL(file) {
  const fileToArrayBuffer = await file.arrayBuffer();
  const input = {
    Body: fileToArrayBuffer,
    Bucket: STORE_ITEMS_PHOTOS,
    Key: file.name,
    ContentType: file.type,
  };
  const command = new PutObjectCommand(input);
  const response = await client.send(command);
  if ((response.$metadata.httpStatusCode = 200)) {
    return `https://${STORE_ITEMS_PHOTOS}.s3.eu-north-1.amazonaws.com/${file.name}`;
  }
}

export async function putArrOfFilesToC3BucketAndGetFileURL(arrOfFiles) {
  const arrOfURLsPromises = arrOfFiles.map(file =>
    putFileToC3BucketAndGetFileURL(file),
  );
  return Promise.all(arrOfURLsPromises);
}
