/* ============================================================
   BREW & BEAN — shared behaviours
   header · mobile nav · data-binding from config · reveal · lightbox ·
   popular menu (home) · WhatsApp links · open-now badge · footer year
   ============================================================ */
(function () {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Bind business data from config.js ---------- */
  const waUrl = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text || `Hi ${S.name}! I'd like to know more.`)}`;
  $$("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (key in S && typeof S[key] === "string") el.textContent = S[key];
  });
  $$("[data-href]").forEach((el) => {
    const k = el.dataset.href;
    if (k === "tel") el.href = `tel:${S.phoneTel}`;
    else if (k === "mail") el.href = `mailto:${S.email}`;
    else if (k === "whatsapp") el.href = waUrl(el.dataset.waText);
    else if (k === "instagram") el.href = S.instagram;
    else if (k === "facebook") el.href = S.facebook;
  });
  $$("[data-hours]").forEach((box) => {
    box.innerHTML = (S.hoursLabel || []).map(([d, h]) => `<div><span>${d}</span><b>${h}</b></div>`).join("");
  });

  /* ---------- Open-now badge ---------- */
  $$("[data-open-badge]").forEach((b) => {
    try {
      const now = new Date();
      const key = ["sun","mon","tue","wed","thu","fri","sat"][now.getDay()];
      const [o, c] = S.hours[key];
      const mins = now.getHours() * 60 + now.getMinutes();
      const toM = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
      const open = mins >= toM(o) && mins < toM(c);
      b.textContent = open ? `Open now · closes ${fmt12(c)}` : `Closed now · opens ${fmt12(o)}`;
      b.classList.toggle("closed", !open);
    } catch (e) { b.textContent = "See opening hours"; }
  });
  function fmt12(t) { const [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; const hh = ((h + 11) % 12) + 1; return `${hh}:${String(m).padStart(2,"0")} ${ap}`; }
  window.fmt12 = fmt12;

  /* ---------- Header: transparent → solid on scroll ---------- */
  const header = $(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", scrollY > 40);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = $(".nav__toggle"), drawer = $(".mobile-nav");
  if (toggle && drawer) {
    const setOpen = (open) => {
      drawer.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
      if (open) { header.classList.add("is-scrolled"); $("a", drawer)?.focus({ preventScroll: true }); }
      else { onScroll(); toggle.focus({ preventScroll: true }); }
    };
    toggle.addEventListener("click", () => setOpen(!drawer.classList.contains("is-open")));
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) setOpen(false); });
    matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Current page in nav ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  $$(".nav__links a, .mobile-nav__links a").forEach((a) => {
    const target = (a.getAttribute("href") || "").split("#")[0] || "index.html";
    if (target === here) a.setAttribute("aria-current", "page");
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add("in"));

  /* ---------- Menu board row renderer (shared) ---------- */
  const rupee = (n) => `₹${n.toLocaleString("en-IN")}`;
  window.renderMenuCard = (item) => `
    <li class="board-item reveal in" data-id="${item.id}">
      <div class="board-item__line">
        <h3 class="board-item__name">${item.name}</h3>
        <span class="board-item__dots" aria-hidden="true"></span>
        <span class="board-item__price tnum">${rupee(item.price)}</span>
      </div>
      <p class="board-item__desc">${item.desc}</p>
      <div class="board-item__tags">${(item.tags || []).filter(t => t !== "popular").map(t => `<span class="tag">${t}</span>`).join("")}${(item.tags || []).includes("popular") ? `<span class="tag tag--hot">Popular</span>` : ""}</div>
    </li>`;

  /* ---------- Home: popular menu ---------- */
  const popular = $("[data-popular-menu]");
  if (popular && window.MENU) {
    popular.innerHTML = window.MENU.filter((m) => m.tags.includes("popular")).slice(0, 6).map(window.renderMenuCard).join("");
  }

  /* ---------- Lightbox (gallery) ---------- */
  const lb = $(".lightbox");
  if (lb) {
    const img = $("img", lb), cap = $(".lightbox__caption", lb);
    let items = [], idx = 0;
    const collect = () => { items = $$(".g-item:not([hidden])"); };
    const show = (i) => {
      collect(); if (!items.length) return;
      idx = (i + items.length) % items.length;
      const src = items[idx].dataset.full || $("img", items[idx]).src;
      img.src = src; img.alt = $("img", items[idx]).alt; cap.textContent = `${idx + 1} / ${items.length} · ${$("figcaption", items[idx])?.textContent || ""}`;
    };
    const open = (i) => { show(i); lb.classList.add("is-open"); document.body.classList.add("nav-open"); $(".lightbox__close", lb).focus(); };
    const close = () => { lb.classList.remove("is-open"); document.body.classList.remove("nav-open"); };
    document.addEventListener("click", (e) => {
      const it = e.target.closest(".g-item"); if (it) { collect(); open(items.indexOf(it)); }
    });
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__prev", lb).addEventListener("click", () => show(idx - 1));
    $(".lightbox__next", lb).addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(idx - 1); if (e.key === "ArrowRight") show(idx + 1);
    });
    // swipe
    let x0 = null;
    lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  /* ---------- Gallery filter ---------- */
  const gFilters = $("[data-gallery-filters]");
  if (gFilters) {
    gFilters.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", gFilters).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      const f = b.dataset.filter;
      $$(".g-item").forEach((it) => { it.hidden = !(f === "all" || it.dataset.cat === f); });
    });
  }

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
