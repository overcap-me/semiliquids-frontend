function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}


export const normalizeFieldToArray = (obj, fields) => {
  fields.forEach(field => {
    if (obj.hasOwnProperty(field)) {
      obj[field] = ensureArray(obj[field]);
    }
  });
  return obj;
}