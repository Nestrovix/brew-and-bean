/* ============================================================
   BREW & BEAN — Menu page: category filter + live search
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = $("[data-menu-root]"); if (!root || !window.MENU) return;
  const chips = $("[data-menu-chips]"), search = $("[data-menu-search]"), count = $("[data-menu-count]");
  let cat = "all", q = "";

  // build chips
  chips.innerHTML = [`<button class="chip" data-cat="all" aria-pressed="true">All</button>`]
    .concat(window.MENU_CATEGORIES.map((c) => `<button class="chip" data-cat="${c.id}" aria-pressed="false">${c.label}</button>`)).join("");

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function render() {
    const nq = norm(q.trim());
    // word-start match: "latte" → "Caramel Latte" ✓, "Platter" ✗ ; "choc" → "Chocolate" ✓
    const re = nq ? new RegExp("(^|[^a-z0-9])" + esc(nq)) : null;
    const match = (m) => (cat === "all" || m.cat === cat) && (!re || re.test(norm(`${m.name} ${m.desc} ${m.tags.join(" ")}`)));
    const cats = window.MENU_CATEGORIES.filter((c) => cat === "all" || c.id === cat);
    let total = 0, html = "";
    cats.forEach((c) => {
      const items = window.MENU.filter((m) => m.cat === c.id && match(m));
      if (!items.length) return;
      total += items.length;
      html += `<section class="menu-section" id="${c.id}" aria-labelledby="h-${c.id}">
        <div class="container">
          <div class="menu-section__head"><div><h2 id="h-${c.id}">${c.label}</h2><p class="muted" style="margin-top:.25rem;font-size:.95rem">${c.blurb}</p></div><span class="tnum">${items.length} item${items.length > 1 ? "s" : ""}</span></div>
          <div class="menu-grid">${items.map(window.renderMenuCard).join("")}</div>
        </div></section>`;
    });
    root.innerHTML = html || `<div class="container"><div class="empty"><h3>No dishes match “${q}”</h3><p>Try “latte”, “veg”, “cold” or pick a category above.</p><button class="btn btn--outline-dark mt-3" data-clear>Clear search</button></div></div>`;
    if (count) count.textContent = `${total} item${total === 1 ? "" : "s"}`;
    $("[data-clear]", root)?.addEventListener("click", () => { search.value = ""; q = ""; render(); search.focus(); });
  }

  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    cat = b.dataset.cat;
    $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    render();
    b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  });
  let t; search.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { q = search.value; render(); }, 120); });
  search.addEventListener("keydown", (e) => { if (e.key === "Escape") { search.value = ""; q = ""; render(); } });

  // deep-link: menu.html#desserts (also when hash changes while already on the page)
  function applyHash(scroll) {
    const h = location.hash.replace("#", "");
    if (h && window.MENU_CATEGORIES.some((c) => c.id === h)) {
      cat = h; $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === h)));
      render();
      if (scroll) setTimeout(() => $("#" + h)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    } else render();
  }
  applyHash(true);
  addEventListener("hashchange", () => applyHash(true));
})();
