/* ============================================================
   BREW & BEAN — Forms: reservation + contact
   Validation · error/success/loading states · submit behaviour
   Submit = opens WhatsApp with a pre-filled message (works with no backend)
   + optional POST to a backend endpoint (see README → "Connect a backend")
   ============================================================ */
(function () {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxx" or your API route — leave "" to use WhatsApp-only

  const rules = {
    required: (v) => v.trim() !== "" || "This field is required.",
    name: (v) => /^[\p{L} .'-]{2,60}$/u.test(v.trim()) || "Enter a valid name.",
    phone: (v) => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/\s|-/g, "")) || "Enter a valid 10-digit Indian mobile number.",
    email: (v) => v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a valid email address.",
    date: (v) => { if (!v) return "Pick a date."; const d = new Date(v + "T00:00"); const t = new Date(); t.setHours(0,0,0,0); return d >= t || "Please choose today or a future date."; },
    select: (v) => v !== "" || "Please choose an option.",
    min10: (v) => v.trim().length >= 10 || "Please write at least 10 characters."
  };

  function validateField(field) {
    const input = $("input,select,textarea", field); if (!input) return true;
    const list = (input.dataset.validate || "").split(" ").filter(Boolean);
    let err = "";
    for (const r of list) { const res = rules[r] ? rules[r](input.value) : true; if (res !== true) { err = res; break; } }
    field.classList.toggle("is-invalid", !!err);
    const e = $(".field__error", field); if (e) e.textContent = err;
    input.setAttribute("aria-invalid", err ? "true" : "false");
    return !err;
  }
  function wire(form) {
    $$(".field", form).forEach((f) => {
      const i = $("input,select,textarea", f);
      i?.addEventListener("blur", () => validateField(f));
      i?.addEventListener("input", () => { if (f.classList.contains("is-invalid")) validateField(f); });
    });
  }
  function validateForm(form) {
    let ok = true, first = null;
    $$(".field", form).forEach((f) => { if (!validateField(f)) { ok = false; first = first || f; } });
    if (first) $("input,select,textarea", first).focus();
    return ok;
  }
  async function post(payload) {
    if (!ENDPOINT) return { ok: true, skipped: true };
    try { const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) }); return { ok: r.ok }; }
    catch (e) { return { ok: false }; }
  }
  const busy = (btn, on, label) => { btn.setAttribute("aria-busy", String(on)); btn.disabled = on; btn.innerHTML = on ? `<span class="spinner"></span> ${label}` : btn.dataset.label; };

  /* ================= RESERVATION ================= */
  const rf = $("#reservation-form");
  if (rf) {
    wire(rf);
    const date = $("#r-date"), time = $("#r-time"), guests = $("#r-guests");
    // min date today, max +60 days
    const today = new Date(); const iso = (d) => d.toISOString().slice(0, 10);
    date.min = iso(today); const max = new Date(today); max.setDate(max.getDate() + 60); date.max = iso(max);
    // time slots from opening hours (per selected weekday)
    function buildSlots() {
      const d = date.value ? new Date(date.value + "T00:00") : new Date();
      const key = ["sun","mon","tue","wed","thu","fri","sat"][d.getDay()];
      const [o, c] = S.hours[key]; const step = S.reservation.slotMinutes, last = S.reservation.lastSeatingMinutesBeforeClose;
      const toM = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
      const isToday = date.value === iso(new Date()); const nowM = new Date().getHours() * 60 + new Date().getMinutes();
      let html = `<option value="">Select a time</option>`;
      for (let m = toM(o); m <= toM(c) - last; m += step) {
        if (isToday && m < nowM + 45) continue;
        const hh = String(Math.floor(m / 60)).padStart(2, "0"), mm = String(m % 60).padStart(2, "0");
        html += `<option value="${hh}:${mm}">${window.fmt12(`${hh}:${mm}`)}</option>`;
      }
      const prev = time.value; time.innerHTML = html; if ([...time.options].some((o) => o.value === prev)) time.value = prev;
    }
    buildSlots(); date.addEventListener("change", buildSlots);
    // guest stepper
    $$("[data-step]", rf).forEach((b) => b.addEventListener("click", () => {
      const v = Math.min(S.reservation.maxGuests, Math.max(S.reservation.minGuests, (+guests.value || 1) + +b.dataset.step)); guests.value = v;
      $("#large-party").hidden = v < S.reservation.maxGuests;
    }));
    guests.addEventListener("input", () => { $("#large-party").hidden = +guests.value < S.reservation.maxGuests; });

    rf.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form__status", rf); status.className = "form__status";
      if ($("#r-company").value) return; // honeypot
      if (!validateForm(rf)) { status.textContent = "Please fix the highlighted fields."; status.classList.add("is-error"); return; }
      const btn = $("button[type=submit]", rf); btn.dataset.label = btn.dataset.label || btn.innerHTML; busy(btn, true, "Reserving…");
      const data = Object.fromEntries(new FormData(rf).entries());
      const pretty = { Name: data.name, Phone: data.phone, Date: new Date(data.date + "T00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }), Time: window.fmt12(data.time), Guests: data.guests, Occasion: data.occasion || "—", Notes: data.notes || "—" };
      const res = await post({ type: "reservation", ...data });
      await new Promise((r) => setTimeout(r, 600));
      busy(btn, false);
      if (!res.ok) { status.textContent = "Something went wrong. Please call us or try WhatsApp."; status.classList.add("is-error"); return; }
      // WhatsApp message
      const msg = `🍽️ Table reservation — ${S.name}\n\nName: ${pretty.Name}\nPhone: ${pretty.Phone}\nDate: ${pretty.Date}\nTime: ${pretty.Time}\nGuests: ${pretty.Guests}\nOccasion: ${pretty.Occasion}\nNotes: ${pretty.Notes}`;
      const wa = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
      // success panel
      const panel = $("#reservation-success");
      $("dl", panel).innerHTML = Object.entries(pretty).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
      $("[data-wa-confirm]", panel).href = wa;
      rf.hidden = true; panel.classList.add("is-visible"); panel.scrollIntoView({ behavior: "smooth", block: "center" });
      $("[data-edit]", panel).onclick = () => { panel.classList.remove("is-visible"); rf.hidden = false; rf.scrollIntoView({ behavior: "smooth", block: "start" }); };
      window.open(wa, "_blank", "noopener");
    });
  }

  /* ================= CONTACT ================= */
  const cf = $("#contact-form");
  if (cf) {
    wire(cf);
    cf.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form__status", cf); status.className = "form__status";
      if ($("#c-company").value) return;
      if (!validateForm(cf)) { status.textContent = "Please fix the highlighted fields."; status.classList.add("is-error"); return; }
      const btn = $("button[type=submit]", cf); btn.dataset.label = btn.dataset.label || btn.innerHTML; busy(btn, true, "Sending…");
      const data = Object.fromEntries(new FormData(cf).entries());
      const res = await post({ type: "contact", ...data });
      await new Promise((r) => setTimeout(r, 600));
      busy(btn, false);
      if (!res.ok) { status.textContent = "Couldn't send right now — please WhatsApp or call us."; status.classList.add("is-error"); return; }
      const msg = `✉️ Message via website — ${S.name}\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "—"}\nTopic: ${data.topic}\n\n${data.message}`;
      const wa = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
      cf.reset(); status.innerHTML = `Thanks, ${data.name.split(" ")[0]}! We've opened WhatsApp with your message — hit send and we'll reply within a few hours. <a href="${wa}" target="_blank" rel="noopener" style="text-decoration:underline">Open WhatsApp again</a>`; status.classList.add("is-success");
      window.open(wa, "_blank", "noopener");
    });
  }

  // tiny spinner style
  const st = document.createElement("style"); st.textContent = `.spinner{display:inline-block;width:16px;height:16px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:sp .7s linear infinite;vertical-align:-3px}@keyframes sp{to{transform:rotate(360deg)}}`; document.head.appendChild(st);
})();
