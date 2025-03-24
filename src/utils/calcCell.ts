// TODO: Add tests for this function

export const cellWithPostfix = (value: string | null, postfix: string) => {
  if (value === 'N/A') {
    return null
  }

  if (value && postfix) {
    return `${value}${postfix}`;
  } else if (value && !postfix) {
    return value;
  } else {
    return null;
  }

}

export const cellWithPrefix = (value: string | null, prefix: string) => {
  if (value === 'N/A') {
    return null
  }

  if (value && prefix) {
    return `${prefix}${value}`;
  } else if (value && !prefix) {
    return value;
  } else {
    return null;
  }
}
