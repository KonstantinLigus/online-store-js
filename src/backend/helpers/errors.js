export class userExistError extends Error {
  constructor(email) {
    super.message = `Email: ${email} have already exist`;
  }
  name = "userExistError";
}
