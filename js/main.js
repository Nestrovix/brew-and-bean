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


  /* ---------- Home hero: today's board + live opening state ----------
     The board markup ships with a full set of rows, so it is never empty while
     loading; this only swaps in the day's rotation once menu-data is present. */
  (function todaysBoard() {
    const board = $("[data-today-board]");
    const panel = $("[data-openstate]");
    if (!board && !panel) return;

    const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const money = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

    /* ---- the board, driven by menu-data.js ---- */
    if (board && Array.isArray(window.MENU) && window.MENU.length) {
      const shortNote = (desc) => {
        let s = String(desc || "").split(/[.—]/)[0].trim();
        if (s.length > 74) { s = s.slice(0, 74); const sp = s.lastIndexOf(" "); if (sp > 24) s = s.slice(0, sp); s = s.replace(/[,;:\s]+$/, "") + "…"; }
        return s.replace(/[,;:\s]+$/, "");
      };
      const today = new Date();
      const seed = today.getFullYear() * 372 + today.getMonth() * 31 + today.getDate();
      const picks = [];
      (window.MENU_CATEGORIES || []).forEach((cat, i) => {
        const items = window.MENU.filter((m) => m.cat === cat.id);
        if (items.length) picks.push(items[(seed + i * 3) % items.length]);
      });
      const spare = window.MENU.filter((m) => (m.tags || []).indexOf("popular") > -1 && picks.indexOf(m) < 0);
      if (spare.length) picks.push(spare[seed % spare.length]);
      const rows = picks.slice(0, 6);
      if (rows.length) {
        board.innerHTML = rows.map((it) => `
      <li class="tboard__row">
        <span class="tboard__name">${esc(it.name)}</span>
        <span class="tboard__leader" aria-hidden="true"></span>
        <span class="tboard__price tnum">${money(it.price)}</span>
        <span class="tboard__note">${esc(shortNote(it.desc))}</span>
      </li>`).join("");
      }
      const dateEl = $("[data-board-date]");
      if (dateEl) {
        try { dateEl.textContent = today.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }); }
        catch (e) { /* keep the markup fallback */ }
      }
    }

    /* ---- live opening state: real clock vs SITE.hours ---- */
    if (!panel) return;
    const stateEl = $("[data-open-state]", panel), detailEl = $("[data-open-detail]", panel);
    const labelEl = $("[data-open-countlabel]", panel), clockEl = $("[data-open-countdown]", panel);
    const toMin = (t) => { const p = String(t).split(":"); return (+p[0]) * 60 + (+p[1] || 0); };

    /* Every opening session from yesterday to a week out, as absolute instants.
       A close time <= its open time means the session runs past midnight. */
    function sessions(now) {
      const out = [];
      for (let d = -1; d <= 8; d++) {
        const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d);
        const h = (S.hours || {})[DAY_KEYS[day.getDay()]];
        if (!h || !h[0] || !h[1]) continue;
        const midnight = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
        const o = toMin(h[0]), c = toMin(h[1]);
        out.push({ from: new Date(midnight + o * 6e4), to: new Date(midnight + (c <= o ? c + 1440 : c) * 6e4), o: h[0], c: h[1] });
      }
      return out;
    }
    function whenWord(then, now) {
      const a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const days = Math.round((new Date(then.getFullYear(), then.getMonth(), then.getDate()) - a) / 864e5);
      if (days <= 0) return "";
      if (days === 1) return "tomorrow ";
      try { return then.toLocaleDateString(undefined, { weekday: "long" }) + " "; } catch (e) { return ""; }
    }
    function currentState(now) {
      const list = sessions(now);
      for (let i = 0; i < list.length; i++) if (now >= list[i].from && now < list[i].to) return { open: true, at: list[i].to, time: fmt12(list[i].c) };
      for (let i = 0; i < list.length; i++) if (list[i].from > now) return { open: false, at: list[i].from, time: whenWord(list[i].from, now) + fmt12(list[i].o) };
      return null;
    }
    function duration(ms, ticking) {
      const t = Math.max(0, Math.floor(ms / 1000));
      const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s2 = t % 60;
      if (!ticking) return h >= 1 ? `${h} hr ${m} min` : `${m} min`;
      return (h > 0 ? h + "h " : "") + String(m).padStart(2, "0") + "m " + String(s2).padStart(2, "0") + "s";
    }
    function paint() {
      const now = new Date();
      let st = null;
      try { st = currentState(now); } catch (e) { st = null; }
      if (!st) {
        panel.classList.remove("is-closed");
        stateEl.textContent = "Opening hours";
        detailEl.textContent = "— see below";
        labelEl.textContent = "Today";
        clockEl.textContent = "8:00 AM – 11:00 PM";
        return;
      }
      panel.classList.toggle("is-closed", !st.open);
      stateEl.textContent = st.open ? "Open now" : "Closed now";
      detailEl.textContent = (st.open ? "— closes " : "— opens ") + st.time;
      labelEl.textContent = st.open ? "Closes in" : "Opens in";
      clockEl.textContent = duration(st.at - now, !reduceMotion);
    }
    paint();
    if (!reduceMotion) {
      let timer = setInterval(paint, 1000);
      document.addEventListener("visibilitychange", () => {
        clearInterval(timer);
        if (!document.hidden) { paint(); timer = setInterval(paint, 1000); }
      });
    }
  })();

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
