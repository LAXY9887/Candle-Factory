# 重光企業社 - 蠟燭工廠網站

彰化重光企業社的形象網站，展示傳統手工蠟燭與斗燭產品。

- **線上網址**：https://candle-factory-website.web.app
- **技術**：靜態網站（HTML / CSS / Vanilla JS）
- **部署平台**：Firebase Hosting

---

## 專案結構

```
WebSiteProject_Candle/
├── .firebase/                  # Firebase 部署快取
├── .firebaserc                 # Firebase 專案綁定 (candle-factory-website)
├── firebase.json               # Hosting 設定（快取標頭、rewrites）
├── Assets/                     # 原始素材（設計稿、原圖）
│   └── data/
│       └── 產品清單.csv        # 【產品資料來源】UTF-8 with BOM
├── scripts/
│   └── update_products.py      # CSV → JSON 的更新腳本
├── public/                     # 【Firebase 部署目標】
│   ├── index.html              # 首頁
│   ├── intro_page.html         # 工廠介紹
│   ├── contact_us_page.html    # 聯絡我們
│   ├── product_infoCard.json   # 產品資料（由腳本從 CSV 生成）
│   ├── css/
│   ├── javascripts/
│   └── image/
└── README.md
```

---

## 產品資料管理流程

網站的產品資訊採用 **CSV → JSON → 網頁動態渲染** 的單向流程，不使用資料庫。

```
Assets/data/產品清單.csv
        │
        │  python scripts/update_products.py
        ▼
public/product_infoCard.json
        │
        │  瀏覽器 fetch
        ▼
網頁 JS 動態渲染
 ├─ 分類按鈕
 ├─ 產品介紹區塊
 └─ 資訊卡
```

### CSV 欄位說明

`Assets/data/產品清單.csv`

| 欄位 | 說明 | 範例 |
|------|------|------|
| 編號 | 流水號 | 1 |
| 商品名稱 | 品名（用於顯示） | 10斤旺來 |
| 分類 | 產品分類名稱 | 旺來 |
| 類型代碼 | 對應分類的內部代碼 | Type-3 |
| 每箱包裝規格 | 每箱入數 | 3對入 |
| 每箱價格 | 整箱價格，無則填 `-` | 1400 |
| 單個零售價 | 零售價，無則填 `-` | 500 |
| 圖片路徑 | 相對於 `public/` 的圖片路徑 | image/10 pineapple info.jpg |
| 敘述 | 產品簡介文字 | 青磚白瓦間... |
| 備註 | 額外備註，無則填 `-` | 另有黃色需預先訂購 |

### 更新產品資料

1. 編輯 `Assets/data/產品清單.csv`（可用 Excel / VSCode / 任何文字編輯器）
2. 執行腳本生成新的 JSON：
   ```bash
   python scripts/update_products.py
   ```
3. 確認 `public/product_infoCard.json` 已更新
4. 部署（見下方）

### 分類介紹的修改

分類（佛杯、蓮花、旺來、葫蘆、斗燭）的介紹文字與圖片存在 `public/product_infoCard.json` 的 `categories` 區段。

腳本不會覆寫這個區段，所以如需修改分類介紹，**直接編輯 JSON** 的 `categories` 區段即可：

```json
{
    "categories": [
        {
            "name": "佛杯",
            "type": "Type-1",
            "image": "image/cup candle intro.png",
            "description": "..."
        }
    ],
    "products": [ ... ]
}
```

---

## 部署流程

### 前置需求

- 已安裝 [Firebase CLI](https://firebase.google.com/docs/cli)
- 已以擁有專案權限的 Google 帳號登入：
  ```bash
  firebase login
  ```

### 檢查狀態

```bash
firebase login:list          # 確認登入帳號
firebase projects:list       # 確認專案（應有 candle-factory-website (current)）
```

### 部署到正式環境

在專案根目錄執行：

```bash
firebase deploy --only hosting
```

成功後會顯示：
```
Hosting URL: https://candle-factory-website.web.app
```

### 預覽部署（不影響正式環境）

```bash
firebase hosting:channel:deploy preview
```

會產生一個暫時的預覽 URL。

---

## 快取策略

`firebase.json` 中已設定檔案的快取標頭：

| 檔案類型 | Cache-Control | 說明 |
|---------|--------------|------|
| `.html` `.json` `.js` `.css` | `no-cache` | 每次向伺服器確認版本（不是不快取，304 可重用） |
| `.jpg` `.png` `.gif` `.ico` `.webp` | `max-age=604800`（7 天） | 圖片長期快取省流量 |

這樣使用者更新網站內容後，**不需手動清除瀏覽器快取** 就能看到最新版。

---

## 本地預覽

```bash
firebase serve --only hosting
```

預設於 `http://localhost:5000` 開啟。

---

## 網站架構說明

### 動態渲染

所有產品相關 UI（分類按鈕、介紹區塊、資訊卡）都由 JS 從 JSON 動態生成，HTML 只保留容器。

**主要 JS 檔案：**

| 檔案 | 職責 |
|------|------|
| `infoCard_generation.js` | 從 JSON 生成分類按鈕、產品介紹區塊、資訊卡；設定分類切換；處理跨頁跳轉狀態 |
| `hidden_menu_list_function.js` | 右側隱藏選單及產品列表 |
| `handle_page_switch.js` | 從別頁跳轉到產品專區時的滾動行為 |
| `imageWall_behavior.js` | 首頁照片牆切換 |
| `flickering_op.js` | 開場動畫（蠟燭火焰） |
| `draw_diamond.js` | 裝飾用菱形繪製 |
| `scroll_to_target.js` | 點擊按鈕滾動至指定元素 |

### 分類代碼對應

| 分類 | 類型代碼 | Intro 區塊 ID |
|------|---------|--------------|
| 佛杯 | Type-1 | Type-1-intro |
| 蓮花 | Type-2 | Type-2-intro |
| 旺來 | Type-3 | Type-3-intro |
| 葫蘆 | Type-4 | Type-4-intro |
| 斗燭 | Type-5 | Type-5-intro |

Intro ID 以 `類型代碼-intro` 模式自動生成，新增分類時不需改任何 JS 檔。

---

## 聯絡資訊

- 公司：重光企業社
- 地址：彰化市國聖里聖安路 220 號
- 電話(公司)：04-7372790
- 電話(住家)：04-7279724
