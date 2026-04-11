import productsData from '~/data/products.json'
import type { Category, Product, ProductData, ProductType } from '~/types/product'

/**
 * 產品資料 composable
 *
 * 在 build time 以 import 讀取 JSON，資料被烘焙進靜態 HTML。
 * 所有頁面、組件都應透過此 composable 存取產品資料，不要重複 fetch。
 */
export const useProducts = () => {
  const data = productsData as ProductData

  const categories = data.categories
  const products = data.products

  /** 依 type 取得分類 */
  const getCategoryByType = (type: ProductType): Category | undefined => {
    return categories.find((c) => c.type === type)
  }

  /** 依 type 取得該分類下的所有產品 */
  const getProductsByType = (type: ProductType): Product[] => {
    return products.filter((p) => p.type === type)
  }

  /** 依 slug 取得單一產品 */
  const getProductBySlug = (slug: string): Product | undefined => {
    return products.find((p) => toSlug(p.title) === slug)
  }

  /** 所有產品的 slug 清單（給 prerender 用） */
  const getAllProductSlugs = (): string[] => {
    return products.map((p) => toSlug(p.title))
  }

  return {
    categories,
    products,
    getCategoryByType,
    getProductsByType,
    getProductBySlug,
    getAllProductSlugs,
  }
}
