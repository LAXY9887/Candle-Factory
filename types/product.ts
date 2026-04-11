/**
 * 產品資料型別定義
 * 對應 assets/data/products.json 的結構
 */

/** 產品分類類型代碼 */
export type ProductType = 'Type-1' | 'Type-2' | 'Type-3' | 'Type-4' | 'Type-5'

/** 產品分類（佛杯、蓮花、旺來、葫蘆、斗燭） */
export interface Category {
  /** 分類名稱，如「佛杯」 */
  name: string
  /** 類型代碼，如 "Type-1" */
  type: ProductType
  /** 分類介紹圖片路徑（相對 public/） */
  image: string
  /** 分類介紹文字 */
  description: string
}

/** 單一產品 */
export interface Product {
  /** 商品名稱，如「10斤旺來」 */
  title: string
  /** 分類名稱（與 Category.name 對應） */
  category: string
  /** 類型代碼 */
  type: ProductType
  /** 商品圖片路徑（相對 public/） */
  image: string
  /** 商品敘述 */
  description: string
  /** 價格顯示文字（已由 Python 腳本組合好） */
  price: string
}

/** 產品資料完整結構 */
export interface ProductData {
  categories: Category[]
  products: Product[]
}
