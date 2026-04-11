/**
 * 將產品標題轉為 URL 友善的 slug
 *
 * 為了與舊版相容（舊版用 encodeURIComponent），
 * 產出中文的 URL-safe 編碼。之後若要改用羅馬拼音 slug，
 * 只要改這一個函式即可。
 *
 * @example
 *   toSlug('10斤旺來') // -> '10%E6%96%A4%E6%97%BA%E4%BE%86'
 */
export const toSlug = (title: string): string => {
  return encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())
}

/**
 * slug 反解為可顯示字串
 */
export const fromSlug = (slug: string): string => {
  return decodeURIComponent(slug)
}
