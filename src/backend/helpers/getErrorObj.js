export function getError(err) {
  let error = err.message;
  let status = err.status || 404;
  if (err.name === "ZodError") {
    status = 400;
    error = { ...err.issues };
  }
  return { error, status };
}
