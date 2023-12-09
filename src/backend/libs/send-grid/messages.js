const { FROM_EMAIL_SEND, EMAIL_VERIFICATION_URL } = process.env;

export function createVerifyEmailMessage({ email, verificationToken }) {
  return {
    from: FROM_EMAIL_SEND,
    to: email,
    subject: "Eco Store email verification",
    html: `<head><style>*{color: green;}</style></head><h3>You are currently sign Up to our site</h3><p>Please, follow this <a href=${EMAIL_VERIFICATION_URL}/${verificationToken}>link</a> to verify your email</p>`,
  };
}
