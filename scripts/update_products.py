"""
從 Assets/data/產品清單.csv 讀取產品資料，
更新 public/product_infoCard.json 的 products 區段。
categories 區段保持不變。

使用方式：
    python scripts/update_products.py
"""

import csv
import json
import os

# 路徑
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(BASE_DIR, "Assets", "data", "產品清單.csv")
JSON_PATH = os.path.join(BASE_DIR, "public", "product_infoCard.json")


def read_csv(path):
    """嘗試讀取 CSV，自動偵測編碼"""
    for encoding in ["utf-8-sig", "utf-8", "big5", "cp950"]:
        try:
            with open(path, "r", encoding=encoding) as f:
                reader = csv.DictReader(f)
                rows = list(reader)
                if rows:
                    return rows
        except (UnicodeDecodeError, UnicodeError):
            continue
    raise RuntimeError(f"無法讀取 CSV：{path}")


def read_existing_json(path):
    """讀取現有 JSON，取得 categories 等不由 CSV 管理的區段"""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def build_product(row):
    """將 CSV 一列轉成 JSON 產品物件"""
    name = row["商品名稱"].strip()
    category = row["分類"].strip()
    type_code = row["類型代碼"].strip()
    spec = row["每箱包裝規格"].strip()
    box_price = row["每箱價格"].strip()
    unit_price = row["單個零售價"].strip()
    image = row["圖片路徑"].strip()
    description = row["敘述"].strip()
    note = row["備註"].strip()

    # 組合價格顯示文字
    price_parts = []
    if box_price and box_price != "-":
        price_parts.append(f"1 箱 {spec} {box_price} 元")
    if unit_price and unit_price != "-":
        price_parts.append(f"單個 {unit_price} 元")
    if not price_parts:
        price_parts.append(f"1 箱 {spec}")

    # 備註併入價格顯示
    if note and note != "-":
        price_parts.append(note)

    price_text = ", ".join(price_parts)

    return {
        "title": name,
        "category": category,
        "type": type_code,
        "image": image,
        "description": description,
        "price": price_text,
    }


def main():
    # 讀取現有 JSON，保留 categories
    existing = read_existing_json(JSON_PATH)
    categories = existing.get("categories", [])

    if not categories:
        print("警告：現有 JSON 中沒有 categories 區段，將只輸出 products。")

    # 從 CSV 建立產品列表
    rows = read_csv(CSV_PATH)
    products = [build_product(row) for row in rows]

    # 組合輸出
    output = {
        "categories": categories,
        "products": products,
    }

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=4)

    print(f"已更新 {JSON_PATH}")
    print(f"  categories: {len(categories)} 筆 (保留不動)")
    print(f"  products:   {len(products)} 筆 (從 CSV 更新)")
    for p in products:
        print(f"    - {p['title']}: {p['price']}")


if __name__ == "__main__":
    main()
