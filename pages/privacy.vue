<template>
  <div class="privacy-page">
    <div class="intro-section">
      <h1 class="intro-section-title">隱私權政策</h1>
      <hr class="intro-section-line">
    </div>

    <article class="privacy-content">
      <p class="intro-text">
        重光企業社（以下稱「本網站」）重視您的個人隱私。以下說明本網站蒐集、
        使用與保護訪客資訊的方式。
      </p>

      <section>
        <h2>一、本網站蒐集的資訊</h2>
        <p>
          本網站為純展示性網站，不提供會員註冊、線上購物或意見留言等功能。
          我們僅透過 Google Analytics 4 蒐集以下非個人身分識別資訊，用於了解
          網站使用狀況與改善內容：
        </p>
        <ul>
          <li>瀏覽器類型與版本</li>
          <li>作業系統</li>
          <li>造訪的頁面與停留時間</li>
          <li>來訪時間</li>
          <li>來源網址（Referrer）</li>
          <li>概略地理位置（國家／城市層級，不會追蹤精確位置）</li>
          <li>匿名化的裝置識別碼</li>
        </ul>
        <p>上述資訊經 Google Analytics 匿名化處理，無法用於識別個別使用者身分。</p>
      </section>

      <section>
        <h2>二、Cookie 的使用</h2>
        <p>
          本網站使用 Google Analytics 所設定的 Cookie（<code>_ga</code>、
          <code>_ga_*</code> 系列）以統計訪客行為。
          您可透過瀏覽器設定拒絕 Cookie，但這可能影響部分功能
          （例如頁面瀏覽統計將不計入分析資料）。
        </p>
      </section>

      <section>
        <h2>三、資料的使用目的</h2>
        <ul>
          <li>了解訪客對哪些產品與分類感興趣，以優化網站內容呈現</li>
          <li>分析網站流量來源，改善 SEO 與使用體驗</li>
          <li>不會將資料用於廣告投放或轉售給第三方</li>
        </ul>
      </section>

      <section>
        <h2>四、資料分享與第三方服務</h2>
        <p>本網站使用下列第三方服務：</p>
        <ul>
          <li><strong>Google Analytics 4</strong>（Google LLC）— 流量統計分析</li>
          <li><strong>Google Fonts</strong>（Google LLC）— 字體載入</li>
          <li><strong>Google Maps</strong>（Google LLC）— 地圖嵌入</li>
          <li><strong>Firebase Hosting</strong>（Google LLC）— 網站託管</li>
        </ul>
        <p>
          以上服務均由 Google 提供，其隱私權政策請參閱：
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            https://policies.google.com/privacy
          </a>
        </p>
      </section>

      <section>
        <h2>五、資料保留期限</h2>
        <p>Google Analytics 預設保留訪客資料 14 個月，到期後由 Google 自動刪除。</p>
      </section>

      <section>
        <h2>六、聯絡資訊</h2>
        <p>若您對本網站的隱私權政策有任何疑問，請透過以下方式聯絡：</p>
        <ul>
          <li>電話：<a href="tel:+886-4-7372790">04-7372790</a></li>
          <li>地址：彰化市國聖里聖安路 220 號</li>
        </ul>
      </section>

      <section>
        <h2>七、政策更新</h2>
        <p>本政策可能隨時更新，修訂版本將於此頁面公告，請定期查看。</p>
        <p class="last-updated">最後更新日期：2026-04-11</p>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '隱私權政策 | 重光企業社',
  description: '重光企業社網站隱私權政策，說明本網站如何使用 Google Analytics 蒐集與處理訪客資訊。',
  robots: 'noindex, follow',
})
</script>

<style scoped>
.privacy-page {
  width: 100%;
  padding: 2vw 5vw 5vw;
  box-sizing: border-box;
}

.privacy-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2vw;
}

.intro-text {
  font-size: 1.4vw;
  line-height: 2;
  color: #444;
  margin-bottom: 3vw;
  padding: 1.5vw 2vw;
  background: rgba(105, 3, 3, 0.05);
  border-left: 0.3vw solid rgb(105, 3, 3);
  border-radius: 0.5vw;
}

section {
  margin-bottom: 3vw;
}

section h2 {
  font-size: 2vw;
  color: rgb(105, 3, 3);
  margin: 0 0 1.2vw;
  padding-bottom: 0.6vw;
  border-bottom: 0.1vw solid rgb(105, 3, 3);
}

section p {
  font-size: 1.2vw;
  line-height: 2;
  color: #333;
  margin: 0 0 1vw;
}

section ul {
  padding-left: 2vw;
}

section li {
  font-size: 1.2vw;
  line-height: 2;
  color: #333;
  margin-bottom: 0.5vw;
}

section a {
  color: rgb(171, 26, 26);
  text-decoration: underline;
}

section code {
  background: #f0f0f0;
  padding: 0.2vw 0.5vw;
  border-radius: 0.3vw;
  font-size: 0.95em;
}

.last-updated {
  color: #888;
  font-size: 1.1vw;
  font-style: italic;
}

@media screen and (max-width: 1000px) {
  .intro-text { font-size: 3vw; }
  section h2 { font-size: 4vw; }
  section p, section li { font-size: 2.8vw; }
  .last-updated { font-size: 2.5vw; }
}
</style>
