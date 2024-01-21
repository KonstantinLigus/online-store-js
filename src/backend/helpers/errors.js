export class UserExistError extends Error {
  name = "UserExistError";
  constructor(email) {
    super(`email: ${email} have already exist!`);
  }
}

export class UserNotFoundError extends Error {
  name = "UserNotFoundError";
  constructor() {
    super("Wrong email!");
  }
}

export class WrongUserPasswordError extends Error {
  name = "WrongUserPasswordError";
  constructor() {
    super("Wrong password!");
  }
}

export class EmailNotVerifiedError extends Error {
  name = "EmailNotVerifiedError";
  constructor() {
    super("email was not verified!");
  }
}

export class UserNotExistError extends Error {
  name = "UserNotExistError";
  constructor() {
    super("User doesn't exist!");
  }
}

export class PasswordsNotTheSameError extends Error {
  name = "PasswordsNotTheSameError";
  constructor() {
    super("Passwords don't the same!");
  }
}

export class ParseError extends Error {
  name = "ParseError";
  constructor(error) {
    super();
    this.message = error;
  }
}
