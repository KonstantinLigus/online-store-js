"use server";

import {
  putArrOfFilesToC3BucketAndGetFileURL,
  putFileToC3BucketAndGetFileURL,
} from "./aws.utils";

export async function addProductSubmitForm(formData) {
  const mainImageURL = await putFileToC3BucketAndGetFileURL(
    formData.get("mainImage"),
  );
  const imagesURLs = await putArrOfFilesToC3BucketAndGetFileURL(
    formData.getAll("images"),
  );
}
