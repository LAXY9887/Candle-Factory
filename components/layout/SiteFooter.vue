<template>
  <footer class="site-footer">
    <div class="site-footer-main">
      <!-- 1. 品牌區塊 -->
      <div class="footer-col brand-col">
        <div class="brand-logo">
          <img src="/image/Logo.png" alt="重光企業社 Logo">
        </div>
        <p class="brand-name">重光企業社</p>
        <p class="brand-name-en">CHONG GUANG</p>
        <p class="brand-intro">
          彰化重光企業社，專業手工蠟燭與傳統斗燭製造，為拜拜、祭祀、節慶點亮光明，傳承傳統信仰文化。
        </p>
      </div>

      <!-- 2. 網站導覽 -->
      <nav class="footer-col nav-col" aria-label="頁尾網站導覽">
        <h3 class="footer-col-title">網站導覽</h3>
        <ul>
          <li><NuxtLink to="/">首頁</NuxtLink></li>
          <li><NuxtLink to="/intro">工廠介紹</NuxtLink></li>
          <li><NuxtLink to="/#targetElement">產品專區</NuxtLink></li>
          <li class="nav-sub"><NuxtLink to="/?category=Type-1">├ 佛杯</NuxtLink></li>
          <li class="nav-sub"><NuxtLink to="/?category=Type-2">├ 蓮花</NuxtLink></li>
          <li class="nav-sub"><NuxtLink to="/?category=Type-3">├ 旺來</NuxtLink></li>
          <li class="nav-sub"><NuxtLink to="/?category=Type-4">├ 葫蘆</NuxtLink></li>
          <li class="nav-sub"><NuxtLink to="/?category=Type-5">└ 斗燭</NuxtLink></li>
          <li><NuxtLink to="/contact">聯絡我們</NuxtLink></li>
        </ul>
      </nav>

      <!-- 3. 聯絡資訊 -->
      <div class="footer-col contact-col">
        <h3 class="footer-col-title">聯絡資訊</h3>

        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">📍</span>
          <div class="contact-text">
            <span class="contact-label">地址</span>
            <a
              class="contact-value"
              href="https://maps.google.com/?q=彰化市國聖里聖安路220號"
              target="_blank"
              rel="noopener noreferrer"
            >彰化市國聖里聖安路 220 號</a>
          </div>
        </div>

        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">📞</span>
          <div class="contact-text">
            <span class="contact-label">電話 (公司)</span>
            <a class="contact-value" href="tel:+886-4-7372790">04-7372790</a>
          </div>
        </div>

        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">📞</span>
          <div class="contact-text">
            <span class="contact-label">電話 (住家)</span>
            <a class="contact-value" href="tel:+886-4-7279724">04-7279724</a>
          </div>
        </div>

        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">🕐</span>
          <div class="contact-text">
            <span class="contact-label">營業時間</span>
            <span class="contact-value">週一至週五 09:00 – 18:00</span>
            <span class="contact-value" style="color: rgb(120, 120, 120)">週六、週日公休</span>
          </div>
        </div>
      </div>

      <!-- 4. Google 地圖 -->
      <div class="footer-col map-col">
        <h3 class="footer-col-title">位置</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.3349258814933!2d120.5724143!3d24.089714499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346938d8487382dd%3A0xb6730df73287d54f!2zNTAw5b2w5YyW57ij5b2w5YyW5biC6IGW5a6J6LevMjIw6Jmf!5e0!3m2!1szh-TW!2stw!4v1714033139662!5m2!1szh-TW!2stw"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="重光企業社位置"
        ></iframe>
      </div>
    </div>

    <!-- 底部版權列 -->
    <div class="site-footer-bottom">
      <span class="copyright">© {{ currentYear }} 重光企業社 · Chong Guang 版權所有</span>
      <div class="footer-bottom-links">
        <NuxtLink to="/privacy">隱私權政策</NuxtLink>
      </div>
      <span class="footer-credit">Made in Changhua, Taiwan</span>
    </div>

    <!-- LocalBusiness 結構化資料 (SEO) -->
    <component :is="'script'" type="application/ld+json" v-html="localBusinessJsonLd" />
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const localBusinessJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://candle-factory-website.web.app#localbusiness',
  name: '重光企業社',
  alternateName: 'Chong Guang Enterprise',
  image: 'https://candle-factory-website.web.app/image/Logo.png',
  url: 'https://candle-factory-website.web.app',
  telephone: ['+886-4-7372790', '+886-4-7279724'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '國聖里聖安路220號',
    addressLocality: '彰化市',
    addressRegion: '彰化縣',
    postalCode: '500',
    addressCountry: 'TW',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 24.089714,
    longitude: 120.572414,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$',
  description: '彰化重光企業社 — 傳承傳統手工蠟燭與斗燭製作工藝，專供拜拜、祭祀、宗教儀式所需蠟燭。',
})
</script>
