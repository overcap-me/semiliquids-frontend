function isCurrencySupported(currencyCode?: string) {
  try {
    // Try formatting a number with the given currency code
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(1);
    return true; // If no error, currency is supported
  } catch (error) {
    return false; // If an error is thrown, currency is not supported
  }
}

export const calcValueWithCurrency = (
  input: string | number,
  {
    locale = "en-US",
    currency = "USD",
    ...props
  },
) => {
  return Number.parseFloat(input) && isCurrencySupported(currency)
    ? new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      ...props
    }).format(input)
    : null;
};


export const roundUpTo = (input: string) => {

  if (Number.isNaN(Number.parseFloat(input))) {
    return null;
  }

  return Math.ceil(Number.parseFloat(input));
}
