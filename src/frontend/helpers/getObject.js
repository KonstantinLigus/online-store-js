export const getObject = fields => {
  const obj = {};
  fields.forEach(field => Object.assign(obj, { [field]: "" }));
  return obj;
};
