export function getNotFoundOrderError(error) {
  return { error, status: 404 };
}
