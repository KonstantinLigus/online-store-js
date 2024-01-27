export class UserExistError extends Error {
  status = 400;
  message;
  constructor(email) {
    super();
    this.message = { email: `email ${email} have already exist!` };
  }
}

export class UserNotFoundError extends Error {
  status = 404;
  message;
  constructor() {
    super();
    this.message = { email: "Wrong email!" };
  }
}

export class WrongUserPasswordError extends Error {
  status = 400;
  message;
  constructor() {
    super();
    this.message = { password: "Wrong password!" };
  }
}

export class EmailNotVerifiedError extends Error {
  status = 400;
  message;
  constructor() {
    super();
    this.message = { email: "email was not verified!" };
  }
}

export class UserNotExistError extends Error {
  status = 404;
  constructor() {
    super("User doesn't exist!");
  }
}

export class PasswordsNotTheSameError extends Error {
  status = 400;
  message;
  constructor() {
    super();
    this.message = { password: "Passwords don't match!" };
  }
}

export class ParseError extends Error {
  status = 400;
  message;
  constructor(error) {
    super();
    let errObj = error.flatten();
    errObj =
      errObj.formErrors.length > 0 ? errObj.formErrors : errObj.fieldErrors;
    this.message = errObj;
  }
}

export class FieldNotExistError extends Error {
  status = 400;
  constructor(message) {
    super(message);
  }
}

export class UpdateOrderError extends Error {
  status = 400;
  constructor() {
    super("Empty order id or updated fields!");
  }
}

export class WrongIdError extends Error {
  status = 400;
  constructor() {
    super("Wrong id!");
  }
}

export class UserNotAuthorizedError extends Error {
  status = 400;
  constructor() {
    super("Not authorized!");
  }
}
