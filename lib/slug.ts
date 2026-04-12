export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function obdCodeToSlug(code: string): string {
  return code.toLowerCase();
}

export function obdSlugToCode(slug: string): string {
  return slug.toUpperCase();
}
