export const formDataToObject = (formData: FormData) => {
  const obj: Record<string, unknown> = {};
  formData?.forEach((value, key) => {
    if (obj[key]) {
      obj[key] = [].concat(obj[key], value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
};