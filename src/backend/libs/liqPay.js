import crypto from "crypto";

const { LIQ_PAY_PUBLIC_KEY, LIQ_PAY_PRIVATE_KEY } = process.env;

function createHashedStr(str) {
  if (typeof str !== "string") {
    throw new Error("createHashStr input parameter must be a string");
  }

  const sha1 = crypto.createHash("sha1");
  sha1.update(str);
  return sha1.digest("base64");
}

function createBase64Str(obj) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

export function createDataAndSignatureObj(params) {
  params.public_key = LIQ_PAY_PUBLIC_KEY;
  params.language = "uk";
  params.version = 3;
  params.action = "pay";
  const data = createBase64Str(params);
  const signature = createHashedStr(
    LIQ_PAY_PRIVATE_KEY + data + LIQ_PAY_PRIVATE_KEY,
  );
  return { data, signature };
}
