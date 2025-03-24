export const toKebabCase = (input: string): string => {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s]/g, "") // Remove special characters (anything that's not a word character or space)
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};
