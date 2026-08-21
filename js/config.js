/* ============================================================
   BREW & BEAN — Site configuration
   ⚠️  REPLACE the placeholder values below with the real business details.
   Everything marked data-bind in the HTML is filled from here.
   ============================================================ */
window.SITE = {
  name: "Brew & Bean",
  tagline: "Premium Café · Noida",
  // Contact — REPLACE
  phoneDisplay: "+91 98XXX XXXXX",          // shown on site
  phoneTel: "+919800000000",                // used in tel: links (digits only after +)
  whatsapp: "919800000000",                 // WhatsApp number with country code, digits only
  email: "hello@brewandbean.in",
  addressLine1: "[Shop no. & building — replace]",
  addressLine2: "Noida, Uttar Pradesh 201301",
  // Google Maps embed — replace the `q=` with your exact address or Plus Code (no API key needed)
  mapEmbed: "https://maps.google.com/maps?q=Noida%2C%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed",
  mapLink: "https://maps.google.com/?q=Noida%2C%20Uttar%20Pradesh",
  instagram: "https://instagram.com/brewandbean",     // REPLACE
  facebook: "https://facebook.com/brewandbean",        // REPLACE
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
