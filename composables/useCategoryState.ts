import type { ProductType } from '~/types/product'

/**
 * 分類切換狀態管理
 *
 * 使用 URL query 而不是 localStorage，好處：
 * - URL 可分享、可書籤
 * - SEO 友善（?category=Type-3 的頁面也會被 crawl）
 * - SSG 下仍能正常運作
 */
export const useCategoryState = (defaultType: ProductType = 'Type-3') => {
  const route = useRoute()
  const router = useRouter()

  const currentType = computed<ProductType>({
    get: () => {
      const query = route.query.category as ProductType | undefined
      return query ?? defaultType
    },
    set: (val: ProductType) => {
      router.replace({ query: { ...route.query, category: val } })
    },
  })

  return { currentType }
}
