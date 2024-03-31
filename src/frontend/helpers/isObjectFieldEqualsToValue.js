export const isObjectFieldEqualsToValue = (obj, value) => {
  for (const field of Object.values(obj)) {
    if (field === value) return true;
  }
  return false;
};
