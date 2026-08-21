/* ============================================================
   BREW & BEAN — Site configuration
   ⚠️  REPLACE the placeholder values below with the real business details.
   Everything marked data-bind in the HTML is filled from here.
   ============================================================ */
window.SITE = {
  name: "Brew & Bean",
  tagline: "Premium Café · Noida",
  // Contact — REPLACE
  phoneDisplay: "+91 00000 00000",          // shown on site
  phoneTel: "+910000000000",                // used in tel: links (digits only after +)
  whatsapp: "910000000000",                 // WhatsApp number with country code, digits only
  email: "hello@brewandbean.example",
  addressLine1: "[Demo address — not a real location]",
  addressLine2: "Noida, Uttar Pradesh",
  instagram: "https://example.com/",                  // demo link — no real account
  facebook: "https://example.com/",                    // demo link — no real account
  // Opening hours — 24h format, used for the "Open now" badge and reservation time slots
  hours: {
    mon: ["08:00","23:00"], tue: ["08:00","23:00"], wed: ["08:00","23:00"], thu: ["08:00","23:00"],
    fri: ["08:00","23:30"], sat: ["08:00","23:30"], sun: ["08:00","23:00"]
  },
  hoursLabel: [
    ["Mon – Thu", "8:00 AM – 11:00 PM"],
    ["Fri – Sat", "8:00 AM – 11:30 PM"],
    ["Sunday",    "8:00 AM – 11:00 PM"]
  ],
  reservation: { minGuests: 1, maxGuests: 12, slotMinutes: 30, lastSeatingMinutesBeforeClose: 60 }
};
