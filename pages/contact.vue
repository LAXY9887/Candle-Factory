<template>
  <div class="contact-page">
    <div class="intro-section">
      <h1 class="intro-section-title">聯絡我們</h1>
      <hr class="intro-section-line">
    </div>

    <div class="contact-grid">
      <!-- 聯絡資訊 -->
      <div class="contact-info">
        <h2>重光企業社</h2>
        <p class="company-en">Chong Guang Enterprise</p>

        <div class="info-row">
          <span class="info-icon">📍</span>
          <div>
            <div class="info-label">地址</div>
            <a
              href="https://maps.google.com/?q=彰化市國聖里聖安路220號"
              target="_blank"
              rel="noopener noreferrer"
            >彰化市國聖里聖安路 220 號</a>
          </div>
        </div>

        <div class="info-row">
          <span class="info-icon">📞</span>
          <div>
            <div class="info-label">電話 (公司)</div>
            <a href="tel:+886-4-7372790">04-7372790</a>
          </div>
        </div>

        <div class="info-row">
          <span class="info-icon">📞</span>
          <div>
            <div class="info-label">電話 (住家)</div>
            <a href="tel:+886-4-7279724">04-7279724</a>
          </div>
        </div>

        <div class="info-row">
          <span class="info-icon">🕐</span>
          <div>
            <div class="info-label">營業時間</div>
            <div>週一至週五 09:00 – 18:00</div>
            <div class="info-sub">週六、週日公休</div>
          </div>
        </div>
      </div>

      <!-- Google 地圖 -->
      <div class="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.3349258814933!2d120.5724143!3d24.089714499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346938d8487382dd%3A0xb6730df73287d54f!2zNTAw5b2w5YyW57ij5b2w5YyW5biC6IGW5a6J6LevMjIw6Jmf!5e0!3m2!1szh-TW!2stw!4v1714033139662!5m2!1szh-TW!2stw"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="重光企業社位置"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '聯絡我們 | 重光企業社 | 彰化傳統手工蠟燭工廠',
  description:
    '聯絡重光企業社 - 彰化市國聖里聖安路220號，電話 04-7372790。彰化在地傳統手工蠟燭與斗燭製造工廠。',
  ogTitle: '聯絡我們 - 重光企業社',
  ogDescription: '彰化重光蠟燭廠聯絡資訊、地址、電話與地圖。',
})
</script>

<style scoped>
.contact-page {
  width: 100%;
  padding: 2vw 4vw 4vw;
  box-sizing: border-box;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4vw;
  padding: 2vw 4vw;
}

.contact-info h2 {
  color: rgb(105, 3, 3);
  font-size: 2.5vw;
  margin: 0 0 0.5vw;
}

.company-en {
  font-size: 1.1vw;
  color: #888;
  letter-spacing: 0.1em;
  margin: 0 0 2vw;
}

.info-row {
  display: flex;
  gap: 1vw;
  margin-bottom: 2vw;
  font-size: 1.3vw;
}

.info-icon {
  font-size: 1.5vw;
  flex-shrink: 0;
}

.info-label {
  color: #888;
  font-size: 1vw;
  margin-bottom: 0.3vw;
}

.info-sub {
  color: #888;
  font-size: 1.1vw;
}

.info-row a {
  color: #222;
  font-weight: 500;
}

.info-row a:hover {
  color: rgb(171, 26, 26);
}

.contact-map iframe {
  width: 100%;
  height: 100%;
  min-height: 30vw;
  border: none;
  border-radius: 0.8vw;
  box-shadow: 0 0.3vw 1vw rgba(0, 0, 0, 0.15);
}

@media screen and (max-width: 1000px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 5vw;
  }
  .contact-info h2 { font-size: 5vw; }
  .company-en { font-size: 2.5vw; }
  .info-row { font-size: 3vw; margin-bottom: 4vw; }
  .info-icon { font-size: 3.5vw; }
  .info-label { font-size: 2.2vw; }
  .contact-map iframe { min-height: 60vw; }
}
</style>
