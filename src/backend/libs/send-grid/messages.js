export function createVerifyEmailMessage({ emailForVerify, linkForVerify }) {
  return {
    from: process.env.FROM_EMAIL_SEND,
    to: emailForVerify,
    subject: "Eco Store email verification",
    html: `<head><style>*{font-size: 14px;}</style></head><h3>You are currently sign Up to our site<h3><p>Please, follow this <a href=${linkForVerify}>link</a> to verify your email</p>`,
  };
}
