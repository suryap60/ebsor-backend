export const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, "-");