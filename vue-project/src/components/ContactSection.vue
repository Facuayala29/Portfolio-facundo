<template>
  <section class="contact" id="contact">
    <img class="contact__graffiti-svg contact__graffiti-svg--1" src="/graffiti/g01.svg" alt="" aria-hidden="true" draggable="false" loading="lazy" decoding="async" data-reveal="right" data-delay="0.1" />
    <img class="contact__graffiti-svg contact__graffiti-svg--2" src="/graffiti/g03.svg" alt="" aria-hidden="true" draggable="false" loading="lazy" decoding="async" data-reveal="left" data-delay="0.15" />

    <div class="contact__bg" aria-hidden="true">
      <div class="bg-glow bg-glow--1"></div>
      <div class="bg-glow bg-glow--2"></div>
      <div class="bg-noise"></div>
    </div>

    <div class="contact__content">
      <div class="contact__label" data-reveal="up" data-delay="0">
        <span class="bracket red">[</span>
        Get in touch
        <span class="bracket red">]</span>
      </div>

      <h2 class="contact__headline" data-reveal="up" data-delay="0.1">
        <span class="h-line">Let's create</span>
        <span class="h-line">something <em>stunning</em></span>
      </h2>

      <div class="contact__cta" data-reveal="up" data-delay="0.25">
        <a
          href="mailto:facuayala29@gmail.com"
          class="contact__email"
          @mouseenter="emailHover = true"
          @mouseleave="emailHover = false"
        >
          <span class="email-text">facuayala29@gmail.com</span>
          <span class="email-line" :class="{ active: emailHover }"></span>
          <span class="email-arrow" :class="{ active: emailHover }">↗</span>
        </a>
        <p class="contact__avail" data-reveal="up" data-delay="0.45">Available for freelance &amp; full-time · Based in Aarhus, DK</p>
      </div>
    </div>

    <footer class="site-footer" data-reveal="up" data-delay="0.6">
      <div class="footer-icons">
        <a href="https://linkedin.com/in/facundoayala" target="_blank" rel="noopener" class="footer-icon-link" aria-label="LinkedIn">
          <svg viewBox="0 0 139.62 139.36" aria-hidden="true">
            <path fill="#841631" d="M35.07,0l72.85.06c10.39-.08,19.98,2.91,26.17,11.61,5.17,7.28,5.19,14.29,5.37,22.89.51,24.34-.37,48.78,0,73.16-.27,9.7-1.92,17.95-9.52,24.57-6.88,6-14.3,6.85-23.14,7.07H33.28c-10.48-.25-19.2-1.5-26.32-9.89-5.73-6.74-6.43-13.58-6.69-22.13-.75-24.74.37-49.6-.1-74.36.24-9.64,1.26-17.86,8.45-24.89C16.3.59,24.88.19,35.07,0Z"/>
            <path fill="#ece5d3" d="M111.66,111.65h-16.9l.1-30.81c-.17-14.58-21.62-13.44-21.9.55v30.25s-16.81,0-16.81,0v-55.79h15.89v7.94c3.32-4.47,8.56-7.61,14.04-8.64,6.89-1.29,13.66.44,18.94,4.99,3.43,2.95,6.36,9.64,6.65,14.13v37.36Z"/>
            <rect fill="#ece5d3" x="29.27" y="55.86" width="17.27" height="55.79"/>
            <circle fill="#ece5d3" cx="37.88" cy="37.62" r="9.91"/>
          </svg>
        </a>
        <a href="mailto:facuayala29@gmail.com" class="footer-icon-link" aria-label="Email">
          <svg viewBox="0 0 147.92 147.53" aria-hidden="true">
            <ellipse fill="#ece5d3" cx="75.03" cy="73.09" rx="67.57" ry="70.6"/>
            <path fill="#851634" d="M73.96,0C33.1,0,0,33.1,0,73.96c3.88,98.11,144.05,98.08,147.92,0,0-40.86-33.1-73.96-73.96-73.96ZM31.45,38.26h85.03c.97,0,1.89.2,2.75.59l-45.27,43.97L28.69,38.84c.87-.38,1.79-.59,2.75-.59ZM24.66,102.85v-57.79c0-.2,0-.43.03-.64l30.4,29.53-30.4,29.53c-.03-.2-.03-.43-.03-.64ZM116.47,109.66H31.45c-.97,0-1.89-.2-2.75-.61l31.27-30.37,11.63,11.32c.66.64,1.53.97,2.37.97s1.71-.33,2.37-.97l11.63-11.32,31.27,30.37c-.87.41-1.79.61-2.75.61ZM123.26,102.85c0,.2,0,.43-.03.64l-30.4-29.53,30.4-29.53c.08,1.14,0,57.4.03,58.43Z"/>
          </svg>
        </a>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const emailHover = ref(false)
</script>

<style scoped>
.contact__graffiti-svg {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 1;
}
.contact__graffiti-svg--1 {
  width: clamp(520px, 78vw, 1020px);
  bottom: 0%;
  right: -24%;
  transform: rotate(10deg) scaleY(0.9);
  opacity: 0.9;
}
.contact__graffiti-svg--2 {
  width: clamp(440px, 68vw, 880px);
  top: 4%;
  left: -22%;
  transform: rotate(-8deg) scaleX(1.1);
  opacity: 0.88;
}

.contact {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: clip;
  padding: 9rem 2.5rem 0;
  background: var(--black);
}

.contact__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.bg-glow--1 {
  width: 70vw; height: 70vw;
  top: -10%; left: -15%;
  background: radial-gradient(circle, rgba(135,22,51,0.14) 0%, transparent 70%);
}
.bg-glow--2 {
  width: 50vw; height: 50vw;
  bottom: -5%; right: -5%;
  background: radial-gradient(circle, rgba(86,14,33,0.1) 0%, transparent 70%);
}
.bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.contact__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 70%;
  padding-top: 4rem;
}

.contact__label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.3;
  margin-bottom: 2.5rem;
}
.bracket { font-size: 0.9em; }
.red { color: var(--red); }

.contact__headline {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.4vw, 2.6rem);
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
}
.h-line { display: block; }
.h-line em { font-style: normal; color: var(--red); }

.contact__email {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--font-display);
  font-size: clamp(0.9rem, 1.6vw, 1.5rem);
  letter-spacing: 0.02em;
  color: var(--white);
  cursor: none;
  position: relative;
  padding-bottom: 8px;
}
.email-text { transition: opacity 0.3s; }
.contact__email:hover .email-text { opacity: 0.65; }

.email-line {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1.5px;
  background: var(--white);
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.55s var(--ease-out);
}
.email-line.active { transform: scaleX(1); }

.email-arrow {
  font-size: 0.8em;
  opacity: 0;
  transform: translate(-6px, 6px);
  transition: opacity 0.3s, transform 0.4s var(--ease-out);
  color: var(--red);
}
.email-arrow.active { opacity: 1; transform: translate(0, 0); }

.contact__avail {
  margin-top: 1.2rem;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.25;
}

.site-footer {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 1.8rem 0 2.2rem;
  margin-top: auto;
}
.footer-icons {
  display: flex;
  gap: 1.4rem;
  align-items: center;
}
.footer-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  opacity: 0.55;
  cursor: none;
  transition: opacity 0.25s, transform 0.25s var(--ease-out);
}
.footer-icon-link svg {
  width: 36px;
  height: 36px;
}
.footer-icon-link:hover {
  opacity: 1;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .contact__content { max-width: 100%; }
  .site-footer { flex-direction: column; align-items: flex-start; }
}
</style>
