export const standartSearchParams = <T extends Record<string, unknown>>(searchParams: T): URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        urlSearchParams.append(key, v);
      }
    } else {
      urlSearchParams.append(key, value as string);
    }
  }

  return urlSearchParams;
};
