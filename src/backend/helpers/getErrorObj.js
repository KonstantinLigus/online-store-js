export function getError(err) {
  let error = err.message;
  let status = err.status || 404;
  if (err.name === "CastError") {
    error = `item with id: ${err.value} was not found`;
  }
  if (err.name === "ZodError") {
    status = 400;
    error = { ...err.issues };
  }
  return { error, status };
}
