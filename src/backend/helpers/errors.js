export class UserExistError extends Error {
  name = "UserExistError";
  constructor(email) {
    super(`Email: ${email} have already exist!`);
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
    super("Email was not verified!");
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

export class UserParseError extends Error {
  name = "UserParseError";
  constructor(error) {
    super();
    this.message = error;
  }
}

export class FieldNotExistError extends Error {
  name = "FieldNotExistError";
  constructor(message) {
    super(message);
  }
}
