"use server";

import { putFileToC3BucketAndGetFileURL } from "./aws.utils";

export async function addProductSubmitForm(formData) {
  const mainImageURL = await putFileToC3BucketAndGetFileURL(
    formData.get("mainImage"),
  );
  console.log(mainImageURL);
  const images = formData.getAll("images");
}
