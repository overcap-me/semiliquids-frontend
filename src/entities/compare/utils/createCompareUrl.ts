export const createCompareUrl = (items): string => {
  const list = new Map<string, string[]>()

  for (const element of items) {
    // fund?.fund?.name is used as a fallback in case fund is not available, (my list).
    const slug = element?.__fund?.slug
    const classSlug = element?.share_class?.slug ?? null

    if (!list.has(slug)) {
      list.set(slug, [classSlug])
    } else if (list.has(slug) && !list.get(slug)?.includes(classSlug)) {
      list.set(slug, [...list.get(slug), classSlug])
    } else {
      list.set(slug, list.get(slug).filter((slug) => slug !== classSlug))
    }
  }

  return Array.from(list.entries())
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`)
    .join('&');
}