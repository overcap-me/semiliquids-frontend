export const currentTab = <T>(list: T[], slug: string): T | undefined => {
  try {
    return list?.find((item: T) => item.share_class.slug === slug);
  } catch (error) {
    console.error(error);
  }
};
