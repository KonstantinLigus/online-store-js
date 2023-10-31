export function getOrderError(error) {
  let status = 404;
  if (error.name === "ZodError") {
    status = 400;
    error = { ...error.issues };
  }
  return { error, status };
}
