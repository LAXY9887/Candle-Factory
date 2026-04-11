/**
 * 產品標題與 URL slug 的對照表
 *
 * 為什麼不用中文字當 slug：
 * Nuxt 3.21 / Nitro 2.13 的 prerender crawler 對包含中文字元的
 * dynamic route 處理有 bug（會回 500）。使用 ASCII slug 既能避開
 * 此問題，URL 也更簡潔，對國際 SEO 與分享友善。
 */

const titleToSlugMap: Record<string, string> = {
  // 佛杯
  '佛杯': 'fobei',

  // 蓮花
  '五號蓮花': '5hao-lianhua',
  '2號立體蓮花': '2hao-liti-lianhua',

  // 旺來
  '5號旺來': '5hao-wanglai',
  '3號旺來': '3hao-wanglai',
  '2號旺來(B)': '2hao-wanglai-b',
  '1號旺來(B)': '1hao-wanglai-b',
  '10斤旺來': '10jin-wanglai',
  '20斤旺來': '20jin-wanglai',

  // 葫蘆
  '5號葫蘆': '5hao-hulu',
  '3號葫蘆': '3hao-hulu',
  '2號葫蘆': '2hao-hulu',
  '1號葫蘆': '1hao-hulu',

  // 斗燭
  '一斤斗燭': '1jin-douzhu',
  '二斤斗燭': '2jin-douzhu',
  '三斤斗燭': '3jin-douzhu',
}

const slugToTitleMap: Record<string, string> = Object.fromEntries(
  Object.entries(titleToSlugMap).map(([title, slug]) => [slug, title]),
)

/**
 * 將產品標題轉為 URL slug
 * @example toSlug('10斤旺來') // -> '10jin-wanglai'
 */
export const toSlug = (title: string): string => {
  const mapped = titleToSlugMap[title]
  if (mapped) return mapped
  // 回退：如果對照表缺漏，用寬容的英數處理（不會破，但非最佳）
  return title
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * 由 slug 反查產品標題
 */
export const fromSlug = (slug: string): string | undefined => {
  return slugToTitleMap[slug]
}
