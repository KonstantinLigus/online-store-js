export function getError(err) {
  let error = err.message;
  let status = err.status || 500;
  if (err.name === "CastError") {
    error = `item with id: ${err.value} was not found`;
    status = 404;
  }
  if (err.name === "ZodError") {
    status = 400;
    error = { ...err.format() };
  }
  if (err.name === "UserParseError" || err.name === "FieldNotExistError") {
    status = 400;
  }
  if (
    /\w*[Tt]oken\w*/.test(err.name) ||
    err.name === "UserExistError" ||
    err.name === "EmailNotVerifiedError"
  ) {
    error = { email: err.message };
    status = 400;
  }
  if (err.name === "UserNotFoundError") {
    error = { email: err.message };
    status = 404;
  }
  if (
    err.name === "WrongUserPasswordError" ||
    err.name === "PasswordsNotTheSameError"
  ) {
    error = { password: err.message };
    status = 400;
  }

  return { error, status };
}
