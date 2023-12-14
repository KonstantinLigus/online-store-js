export class UserExistError extends Error {
  name = "userExistError";
  constructor(email) {
    super(`Email: ${email} have already exist!`);
  }
}

export class UserNotFoundError extends Error {
  name = "userNotFoundError";
  constructor() {
    super("Wrong email!");
  }
}

export class WrongUserPasswordError extends Error {
  name = "wrongUserPasswordError";
  constructor() {
    super("Wrong password!");
  }
}

export class EmailNotVerifiedError extends Error {
  name = "emailNotVerifiedError";
  constructor() {
    super("Email was not verified!");
  }
}

export class UserNotExistError extends Error {
  name = "userNotExistError";
  constructor() {
    super("User doesn't exist!");
  }
}
