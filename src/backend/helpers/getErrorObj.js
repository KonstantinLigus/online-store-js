export function getError(err) {
  let error = err.message;
  let status = err.status || 404;
  if (err.name === "CastError") {
    error = `item with id: ${err.value} was not found`;
    status = 404;
  }
  if (err.name === "ZodError") {
    status = 400;
    error = { ...err.issues };
  }
  if (
    /\w*[Tt]oken\w*/.test(err.name) ||
    err.name === "UserExistError" ||
    err.name === "WrongUserPassword"
  ) {
    status = 400;
  }
  if (err.name === "UserNotFound") {
    status = 404;
  }

  return { error, status };
}
