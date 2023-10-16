"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const { AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY } = process.env;

const client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function addProductSubmitForm(formData) {
  const mainImage = formData.get("mainImage");
  const mainImageArrayBuffer = await mainImage.arrayBuffer();
  const input = {
    Body: mainImageArrayBuffer,
    Bucket: "store-items-photos",
    Key: "onion.webp",
  };
  const command = new PutObjectCommand(input);
  const response = await client.send(command);
  console.log(response);
}
