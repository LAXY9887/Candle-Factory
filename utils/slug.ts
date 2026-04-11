/**
 * 將產品標題轉為可用於 URL 的識別鍵（不做 URL encoding）
 *
 * 設計決策：
 *   回傳解碼狀態的字串（含中文字元），因為：
 *   1. Vue Router 的 <NuxtLink :to="..."> 會自動處理 URL encoding
 *   2. route.params.slug 會自動 decode，所以比對時用原字元最乾淨
 *   3. Google Search Console 現在完全支援中文 URL
 *
 * @example
 *   toSlug('10斤旺來')  // -> '10斤旺來'
 *   toSlug('1號旺來(B)') // -> '1號旺來(b)'
 */
export const toSlug = (title: string): string => {
  return title.replace(/\s+/g, '-').toLowerCase()
}

/**
 * 用於 nuxt.config.ts prerender 的 URL encoded 版本
 */
export const toUrlSlug = (title: string): string => {
  return encodeURIComponent(toSlug(title))
}
