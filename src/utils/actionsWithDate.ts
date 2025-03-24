export const formattedDate = (
  input: string | Date,
  {
    locale = "en-US",
    day,
    month,
    year,
  }: {
    locale?: string | string[];
    day?: string;
    month?: string;
    year?: string;
  },
) => {
  if (input === undefined) {
    return null;
  }

  const _date = new Date(input);

  try {
    return new Intl.DateTimeFormat(locale, {
      day,
      month,
      year,
    }).format(_date);
  } catch (e) {
    return false;
  }
};
