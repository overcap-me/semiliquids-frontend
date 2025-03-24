const BASE = "BASE";

export const lastSegment = (url: string, slug?: string) => {
  const segment = url.split("/").pop();

  return segment === slug ? BASE : segment;
};
