import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from partials import head, header, footer, page_hero
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def write(name, html): open(os.path.join(ROOT, name), "w", encoding="utf-8").write(html); print("wrote", name)

LD = '''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"CafeOrCoffeeShop","name":"Brew & Bean","image":"https://brewandbean.vercel.app/assets/og-image.png","url":"https://brewandbean.vercel.app/","telephone":"+91-98XXX-XXXXX","priceRange":"₹₹","servesCuisine":["Coffee","Café","Breakfast","Bakery"],"address":{"@type":"PostalAddress","streetAddress":"[Replace with street address]","addressLocality":"Noida","addressRegion":"Uttar Pradesh","postalCode":"201301","addressCountry":"IN"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Sunday"],"opens":"08:00","closes":"23:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":["Friday","Saturday"],"opens":"08:00","closes":"23:30"}],"acceptsReservations":"True","sameAs":["https://example.com/"]}
</script>'''

# ============================ HOME ============================
home = head("Brew & Bean — Premium Café in Noida | Specialty Coffee, All-Day Breakfast",
            "Brew & Bean is a premium café in Noida serving specialty coffee, artisan desserts and all-day breakfast. Reserve a table or order on WhatsApp.",
            "", LD) + header() + '''
<main id="main">
<!-- 2. HERO -->
<section class="hero" aria-label="Welcome">
  <div class="hero__media"><img src="assets/images/hero-home.svg" alt="Brew &amp; Bean café interior with warm light and a fresh latte on the counter" width="1920" height="1080" fetchpriority="high"></div>
  <div class="hero__overlay"></div>
  <div class="container hero__content">
    <span class="eyebrow reveal">Premium café · Noida</span>
    <h1 class="reveal d1">Slow mornings, <em>serious</em> coffee.</h1>
    <p class="lead reveal d2">Single-origin espresso, house-baked pastries and an all-day breakfast — in a warm, light-filled room made for lingering.</p>
    <div class="hero__actions reveal d3">
      <a class="btn btn--primary btn--lg" href="reservations.html">Reserve a Table</a>
      <a class="btn btn--outline-light btn--lg" href="menu.html">Explore the Menu</a>
    </div>
    <div class="hero__meta reveal d3">
      <div><b data-open-badge class="open-badge">Open today</b>Opening hours</div>
      <div><b><span data-bind="addressLine2">Noida, Uttar Pradesh</span></b>Find us</div>
      <div><b>Specialty · All-day breakfast</b>What we do</div>
    </div>
  </div>
  <div class="scroll-cue" aria-hidden="true">Scroll</div>
</section>

<!-- 3. SIGNATURE COFFEE -->
<section class="section section--cream" id="signature">
  <div class="container">
    <div class="section-head split reveal">
      <div><span class="eyebrow">Signature coffee</span><h2>Three cups we're known for</h2></div>
      <a class="link-arrow" href="menu.html#coffee">Full coffee menu <svg class="ic"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="sig-grid">
      <article class="sig-card reveal"><div class="frame"><img src="assets/images/signature-1.svg" alt="Noida Sunrise — honey cinnamon latte" loading="lazy" width="800" height="1000"></div>
        <div class="sig-card__body"><span class="num">No. 01</span><h3>Noida Sunrise</h3><p>Honey–cinnamon latte with a double shot and a whisper of orange zest.</p><span class="price tnum">₹290</span></div></article>
      <article class="sig-card reveal d1"><div class="frame"><img src="assets/images/signature-2.svg" alt="Midnight Roast — single-origin pour-over" loading="lazy" width="800" height="1000"></div>
        <div class="sig-card__body"><span class="num">No. 02</span><h3>Midnight Roast</h3><p>Slow pour-over of our darkest single-origin. Cocoa, plum, a long clean finish.</p><span class="price tnum">₹310</span></div></article>
      <article class="sig-card reveal d2"><div class="frame"><img src="assets/images/signature-3.svg" alt="Salted Caramel Cold Brew" loading="lazy" width="800" height="1000"></div>
        <div class="sig-card__body"><span class="num">No. 03</span><h3>Salted Caramel Cold Brew</h3><p>18-hour cold brew, house caramel, flaky sea salt. Dangerously easy to drink.</p><span class="price tnum">₹320</span></div></article>
    </div>
  </div>
</section>

<!-- 4. POPULAR MENU -->
<section class="section section--dark" id="popular">
  <div class="container">
    <div class="section-head split reveal">
      <div><span class="eyebrow">Popular right now</span><h2>Guest favourites</h2><p class="muted">The plates and cups that leave the counter fastest.</p></div>
      <a class="link-arrow" href="menu.html">See the full menu <svg class="ic"><use href="#i-arrow"/></svg></a>
    </div>
    <div class="menu-grid" data-popular-menu></div>
  </div>
</section>

<!-- 5. ABOUT OUR CAFÉ -->
<section class="section section--cream" id="about">
  <div class="container">
    <div class="split">
      <div class="split__media reveal">
        <div class="frame"><img src="assets/images/about-1.svg" alt="Inside Brew &amp; Bean — warm timber, soft light and the espresso bar" loading="lazy" width="1200" height="900"></div>
        <div class="frame frame--tall"><img src="assets/images/about-2.svg" alt="Freshly roasted coffee beans" loading="lazy" width="900" height="1200"></div>
      </div>
      <div class="split__body reveal d1">
        <span class="eyebrow">About our café</span>
        <h2>A neighbourhood café with a roaster's obsession</h2>
        <p>Brew &amp; Bean began as a small espresso bar and a simple idea: coffee this good shouldn't need a special occasion. We source seasonal single-origin lots, roast in small batches, and bake everything on the menu in our own kitchen each morning.</p>
        <p>The room is built for lingering — big windows, quiet corners, good playlists and people who remember your order.</p>
        <blockquote class="quote">"We wanted a place that feels like the best room in a friend's house — with much better coffee."<cite>Founder, Brew &amp; Bean</cite></blockquote>
        <a class="btn btn--dark" href="about.html">Our story</a>
      </div>
    </div>
  </div>
</section>

<!-- 6. WHY CHOOSE US -->
<section class="section section--espresso" id="why">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">Why Brew &amp; Bean</span><h2>Small details, made daily</h2></div>
    <div class="why-grid">
      <div class="why reveal"><div class="why__icon"><svg class="ic"><use href="#i-leaf"/></svg></div><h3>Single-origin beans</h3><p>Seasonal lots from small farms, roasted in small batches for peak freshness.</p></div>
      <div class="why reveal d1"><div class="why__icon"><svg class="ic"><use href="#i-croissant"/></svg></div><h3>Baked in-house</h3><p>Croissants, tarts and breads come out of our own oven every morning.</p></div>
      <div class="why reveal d2"><div class="why__icon"><svg class="ic"><use href="#i-cup"/></svg></div><h3>All-day breakfast</h3><p>Eggs, pancakes and granola bowls from open to close. No cut-off times.</p></div>
      <div class="why reveal d3"><div class="why__icon"><svg class="ic"><use href="#i-wifi"/></svg></div><h3>Work-friendly</h3><p>Fast Wi-Fi, plenty of plug points and a quiet back room for long sessions.</p></div>
    </div>
  </div>
</section>

<!-- 7. SPECIAL OFFERS -->
<section class="section section--cream-2" id="offers">
  <div class="container">
    <div class="section-head split reveal"><div><span class="eyebrow">Special offers</span><h2>Good reasons to come by</h2></div><span class="muted" style="font-size:.85rem">Offers change seasonally — ask our team</span></div>
    <div class="offers-grid">
      <a class="offer reveal" href="menu.html#breakfast"><img src="assets/images/offer-1.svg" alt="" loading="lazy" width="1000" height="700"><div class="offer__body"><span class="offer__badge">Weekdays · 8–11 AM</span><h3>Breakfast combo</h3><p>Any breakfast plate + a flat white or chai at a combo price.</p><small>Mon–Fri only</small></div></a>
      <a class="offer reveal d1" href="menu.html#coffee"><img src="assets/images/offer-2.svg" alt="" loading="lazy" width="1000" height="700"><div class="offer__body"><span class="offer__badge">Daily · 3–6 PM</span><h3>Cold brew happy hour</h3><p>Buy one cold brew, get the second one on us.</p><small>Dine-in only</small></div></a>
      <a class="offer reveal d2" href="contact.html"><img src="assets/images/offer-3.svg" alt="" loading="lazy" width="1000" height="700"><div class="offer__body"><span class="offer__badge">Loyalty</span><h3>Every 10th coffee free</h3><p>Pick up a stamp card at the counter — no app, no sign-up.</p><small>Ask at the counter</small></div></a>
    </div>
  </div>
</section>

<!-- 8. GALLERY -->
<section class="section section--cream" id="gallery">
  <div class="container--wide">
    <div class="container"><div class="section-head split reveal"><div><span class="eyebrow">Gallery</span><h2>The room, the cups, the light</h2></div><a class="link-arrow" href="gallery.html">View full gallery <svg class="ic"><use href="#i-arrow"/></svg></a></div></div>
    <div class="gallery-grid">
      <figure class="g-item big reveal" data-cat="Interiors"><img src="assets/images/gallery-1.svg" alt="Main room at golden hour" loading="lazy"><figcaption>Interiors</figcaption></figure>
      <figure class="g-item reveal" data-cat="Coffee"><img src="assets/images/gallery-2.svg" alt="Latte art close-up" loading="lazy"><figcaption>Coffee</figcaption></figure>
      <figure class="g-item reveal" data-cat="Food"><img src="assets/images/gallery-3.svg" alt="Shakshuka and sourdough" loading="lazy"><figcaption>Food</figcaption></figure>
      <figure class="g-item tall reveal" data-cat="Moments"><img src="assets/images/gallery-4.svg" alt="Friends sharing dessert" loading="lazy"><figcaption>Moments</figcaption></figure>
      <figure class="g-item reveal" data-cat="Coffee"><img src="assets/images/gallery-6.svg" alt="Pour-over station" loading="lazy"><figcaption>Coffee</figcaption></figure>
      <figure class="g-item reveal" data-cat="Interiors"><img src="assets/images/gallery-5.svg" alt="Window seat" loading="lazy"><figcaption>Interiors</figcaption></figure>
    </div>
  </div>
</section>

<!-- 9. CUSTOMER REVIEWS -->
<section class="section section--cream-2" id="reviews">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">Customer reviews</span><h2>What guests say</h2></div>
    <div class="reviews-grid">
      <article class="review reveal"><div class="review__stars" aria-label="5 out of 5 stars">★★★★★</div><p>"The flat white is the best I've had in Noida — and the almond croissant is worth the trip on its own."</p><footer><b>Guest review</b>Google · sample</footer></article>
      <article class="review reveal d1"><div class="review__stars" aria-label="5 out of 5 stars">★★★★★</div><p>"Quiet, warm, great light for working. Staff remembered my order by the second visit."</p><footer><b>Guest review</b>Google · sample</footer></article>
      <article class="review reveal d2"><div class="review__stars" aria-label="5 out of 5 stars">★★★★★</div><p>"Booked a table for six on a Sunday — seamless on WhatsApp, and the big breakfast did not disappoint."</p><footer><b>Guest review</b>Google · sample</footer></article>
    </div>
    <p class="sample-note center">Sample reviews for layout — replace with real Google reviews before launch.</p>
  </div>
</section>

<!-- 10. TABLE RESERVATION CTA -->
<section class="cta-band" id="reserve">
  <img src="assets/images/hero-reservations.svg" alt="" loading="lazy" width="1920" height="800">
  <div class="container reveal">
    <span class="eyebrow">Reservations</span>
    <h2>Your table is waiting</h2>
    <p class="lead">Book in under a minute — we'll confirm on WhatsApp. Groups of up to 12; for larger parties, call us.</p>
    <div class="hero__actions"><a class="btn btn--primary btn--lg" href="reservations.html">Reserve a Table</a><a class="btn btn--outline-light btn--lg" data-href="whatsapp" data-wa-text="Hi Brew & Bean! I'd like to reserve a table." href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> Book on WhatsApp</a></div>
  </div>
</section>

<!-- 11. INSTAGRAM -->
<section class="section section--cream" id="instagram">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">@brewandbean</span><h2>Follow the daily pour</h2></div>
    <div class="insta-grid reveal">
      <a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram post 1"><img src="assets/images/insta-1.svg" alt="" loading="lazy"><svg class="ic"><use href="#i-instagram"/></svg></a>
      <a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram post 2"><img src="assets/images/insta-2.svg" alt="" loading="lazy"><svg class="ic"><use href="#i-instagram"/></svg></a>
      <a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram post 3"><img src="assets/images/insta-3.svg" alt="" loading="lazy"><svg class="ic"><use href="#i-instagram"/></svg></a>
      <a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram post 4"><img src="assets/images/insta-4.svg" alt="" loading="lazy"><svg class="ic"><use href="#i-instagram"/></svg></a>
      <a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram post 5"><img src="assets/images/insta-5.svg" alt="" loading="lazy"><svg class="ic"><use href="#i-instagram"/></svg></a>
      <a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram post 6"><img src="assets/images/insta-6.svg" alt="" loading="lazy"><svg class="ic"><use href="#i-instagram"/></svg></a>
    </div>
    <p class="center mt-3"><a class="link-arrow" data-href="instagram" href="#" target="_blank" rel="noopener">Follow us on Instagram <svg class="ic"><use href="#i-arrow"/></svg></a></p>
  </div>
</section>

<!-- 12. LOCATION -->
<section class="section section--cream-2" id="location">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Find us</span><h2>Come say hello</h2></div>
    <div class="location reveal">
      <div class="location__map"><iframe data-map-embed src="about:blank" title="Map — Brew &amp; Bean, Noida" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
      <div class="location__info">
        <div class="info-row"><div class="why__icon"><svg class="ic"><use href="#i-pin"/></svg></div><div><h3>Address</h3><address><span data-bind="addressLine1">[Address]</span><br><span data-bind="addressLine2">Noida, Uttar Pradesh</span></address><a class="link-arrow mt-1" data-href="map" href="#" target="_blank" rel="noopener">Get directions <svg class="ic"><use href="#i-arrow"/></svg></a></div></div>
        <div class="info-row"><div class="why__icon"><svg class="ic"><use href="#i-clock"/></svg></div><div><h3>Opening hours</h3><span data-open-badge class="open-badge mt-1">Open today</span><div class="hours mt-2" data-hours></div></div></div>
        <div class="info-row"><div class="why__icon"><svg class="ic"><use href="#i-phone"/></svg></div><div><h3>Call or WhatsApp</h3><p><a data-href="tel" href="#"><span data-bind="phoneDisplay">+91 00000 00000</span></a></p><a class="btn btn--whatsapp mt-2" data-href="whatsapp" href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> Chat on WhatsApp</a></div></div>
      </div>
    </div>
  </div>
</section>
</main>
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"><button class="lightbox__btn lightbox__close" aria-label="Close"><svg class="ic"><use href="#i-x"/></svg></button><button class="lightbox__btn lightbox__prev" aria-label="Previous image"><svg class="ic"><use href="#i-left"/></svg></button><img src="" alt=""><button class="lightbox__btn lightbox__next" aria-label="Next image"><svg class="ic"><use href="#i-right"/></svg></button><div class="lightbox__caption"></div></div>
''' + footer() + '''
</body></html>'''
write("index.html", home)

# ============================ MENU ============================
menu = head("Menu — Brew & Bean Café, Noida | Coffee, Tea, Desserts, Snacks, Breakfast",
            "Browse the full Brew & Bean menu — specialty coffee, loose-leaf teas, house-baked desserts, snacks and all-day breakfast. Search dishes and filter by category.", "menu.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-menu.svg","Our menu","Coffee, tea &amp; things baked this morning","Search any dish or filter by category. Prices include taxes; milk alternatives at no extra charge.","Menu") + '''
<div class="menu-controls" role="search">
  <div class="container">
    <div class="chips" data-menu-chips aria-label="Menu categories"></div>
    <div class="search"><label class="sr-only" for="menu-search">Search the menu</label><input id="menu-search" type="search" placeholder="Search dishes — e.g. latte, veg, cold…" autocomplete="off" data-menu-search><svg class="ic"><use href="#i-search"/></svg></div>
    <span class="muted tnum" data-menu-count style="font-size:.85rem;white-space:nowrap"></span>
  </div>
</div>
<div class="section--cream" data-menu-root aria-live="polite" style="padding-block:1rem 3rem"></div>
<section class="cta-band"><img src="assets/images/hero-reservations.svg" alt="" loading="lazy"><div class="container"><span class="eyebrow">Hungry already?</span><h2>Reserve a table</h2><p class="lead">Or message us on WhatsApp for takeaway orders.</p><div class="hero__actions"><a class="btn btn--primary btn--lg" href="reservations.html">Reserve a Table</a><a class="btn btn--outline-light btn--lg" data-href="whatsapp" data-wa-text="Hi Brew & Bean! I'd like to place a takeaway order." href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> Order on WhatsApp</a></div></div></section>
</main>
''' + footer() + '''<script src="js/menu.js"></script></body></html>'''
write("menu.html", menu)

# ============================ ABOUT ============================
about = head("About Us — Brew & Bean Café, Noida", "The story behind Brew & Bean — a neighbourhood café in Noida built around small-batch roasting, in-house baking and slow mornings.", "about.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-about.svg","About us","Built around a roaster's obsession","A small espresso bar that grew into a neighbourhood café — without losing the small-batch habits.","About") + '''
<section class="section section--cream">
  <div class="container">
    <div class="split">
      <div class="split__body reveal"><span class="eyebrow">Our story</span><h2>It started with one grinder and a very good idea</h2>
        <p>Brew &amp; Bean opened as a six-seat espresso bar with a single grinder and a borrowed oven. The idea was simple: coffee this good shouldn't need a special occasion. Word spread, the room grew, and the habits stayed — seasonal single-origin lots, small-batch roasting, everything baked in-house each morning.</p>
        <p>Today the café is a neighbourhood living room: big windows, quiet corners, long tables for working and small ones for talking. The playlists are good. The people remember your order.</p>
        <p class="muted" style="font-size:.85rem">[Founder name, opening year and origin story — replace with the real version.]</p></div>
      <div class="split__media reveal d1"><div class="frame"><img src="assets/images/about-1.svg" alt="The main room at Brew &amp; Bean" loading="lazy" width="1200" height="900"></div><div class="frame frame--tall"><img src="assets/images/about-2.svg" alt="Green coffee beans before roasting" loading="lazy" width="900" height="1200"></div></div>
    </div>
    <div class="timeline reveal">
      <div><b>Year 1</b><p>Six-seat espresso bar opens. One grinder, one oven.</p></div>
      <div><b>Year 2</b><p>First in-house roast. Seasonal single-origins join the menu.</p></div>
      <div><b>Year 3</b><p>Moved to the current room — and added the all-day breakfast.</p></div>
      <div><b>Today</b><p>A full bakery kitchen, table reservations and a very loyal neighbourhood.</p></div>
    </div>
  </div>
</section>
<section class="section section--dark">
  <div class="container">
    <div class="section-head center reveal"><span class="eyebrow">What we believe</span><h2>Three simple rules</h2></div>
    <div class="values-grid">
      <div class="value reveal" style="background:var(--mocha);border-color:var(--line-dark);color:var(--on-dark)"><div class="num">01</div><h3>Fresh beats fancy</h3><p style="color:var(--on-dark-muted)">Roasted this week, baked this morning, brewed to order. Freshness is the whole recipe.</p></div>
      <div class="value reveal d1" style="background:var(--mocha);border-color:var(--line-dark);color:var(--on-dark)"><div class="num">02</div><h3>Know the farm</h3><p style="color:var(--on-dark-muted)">Every coffee on the board names its origin. We pay fairly and buy seasonally.</p></div>
      <div class="value reveal d2" style="background:var(--mocha);border-color:var(--line-dark);color:var(--on-dark)"><div class="num">03</div><h3>Nobody's rushed</h3><p style="color:var(--on-dark-muted)">Stay an hour or a whole afternoon. The Wi-Fi's fast and the refills are friendly.</p></div>
    </div>
  </div>
</section>
<section class="section section--cream">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">The team</span><h2>The people behind the bar</h2><p class="muted">Replace with real team photos, names and roles.</p></div>
    <div class="team-grid">
      <div class="team reveal"><div class="frame"><img src="assets/images/team-1.svg" alt="Portrait — Founder &amp; Head Roaster" loading="lazy"></div><h3>[Name]</h3><p>Founder &amp; Head Roaster</p></div>
      <div class="team reveal d1"><div class="frame"><img src="assets/images/team-2.svg" alt="Portrait — Head Barista" loading="lazy"></div><h3>[Name]</h3><p>Head Barista</p></div>
      <div class="team reveal d2"><div class="frame"><img src="assets/images/team-3.svg" alt="Portrait — Pastry Chef" loading="lazy"></div><h3>[Name]</h3><p>Pastry Chef</p></div>
    </div>
  </div>
</section>
<section class="cta-band"><img src="assets/images/hero-home.svg" alt="" loading="lazy"><div class="container"><span class="eyebrow">Visit us</span><h2>Come for the espresso, stay for the light</h2><div class="hero__actions"><a class="btn btn--primary btn--lg" href="reservations.html">Reserve a Table</a><a class="btn btn--outline-light btn--lg" href="contact.html">Get directions</a></div></div></section>
</main>
''' + footer() + '''</body></html>'''
write("about.html", about)

# ============================ GALLERY ============================
cats = ["Interiors","Coffee","Food","Moments","Interiors","Coffee","Food","Moments","Coffee","Interiors","Food","Moments"]
spans = ["big","","","tall","","span-2","","","tall","","span-2",""]
items = "".join(f'<figure class="g-item {spans[i]} reveal" data-cat="{cats[i]}"><img src="assets/images/gallery-{i+1}.svg" alt="{cats[i]} — gallery image {i+1}" loading="lazy"><figcaption>{cats[i]}</figcaption></figure>' for i in range(12))
gallery = head("Gallery — Brew & Bean Café, Noida", "A look inside Brew & Bean — the room, the coffee, the food and the moments in between.", "gallery.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-gallery.svg","Gallery","The room, the cups, the light","Tap any image to view it full-size. Swipe or use arrow keys to browse.","Gallery") + '''
<section class="section section--cream">
  <div class="container--wide">
    <div class="container"><div class="chips reveal" data-gallery-filters aria-label="Filter gallery" style="margin-bottom:1.75rem"><button class="chip" data-filter="all" aria-pressed="true">All</button><button class="chip" data-filter="Interiors" aria-pressed="false">Interiors</button><button class="chip" data-filter="Coffee" aria-pressed="false">Coffee</button><button class="chip" data-filter="Food" aria-pressed="false">Food</button><button class="chip" data-filter="Moments" aria-pressed="false">Moments</button></div></div>
    <div class="gallery-grid">''' + items + '''</div>
  </div>
</section>
<section class="section section--cream-2"><div class="container"><div class="section-head center reveal"><span class="eyebrow">@brewandbean</span><h2>More on Instagram</h2></div><div class="insta-grid reveal">''' + "".join(f'<a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram post {i}"><img src="assets/images/insta-{i}.svg" alt="" loading="lazy"><svg class="ic"><use href="#i-instagram"/></svg></a>' for i in range(1,7)) + '''</div></div></section>
</main>
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"><button class="lightbox__btn lightbox__close" aria-label="Close"><svg class="ic"><use href="#i-x"/></svg></button><button class="lightbox__btn lightbox__prev" aria-label="Previous image"><svg class="ic"><use href="#i-left"/></svg></button><img src="" alt=""><button class="lightbox__btn lightbox__next" aria-label="Next image"><svg class="ic"><use href="#i-right"/></svg></button><div class="lightbox__caption"></div></div>
''' + footer() + '''
</body></html>'''
write("gallery.html", gallery)

# ============================ RESERVATIONS ============================
res = head("Reserve a Table — Brew & Bean Café, Noida", "Book a table at Brew & Bean in Noida. Choose your date, time and party size — we confirm on WhatsApp.", "reservations.html") + header() + '''
<main id="main">''' + page_hero("assets/images/hero-reservations.svg","Reservations","Reserve your table","Groups of up to 12. We confirm every booking on WhatsApp within a few hours.","Reservations") + '''
<section class="section section--cream">
  <div class="container">
    <div class="res-layout">
      <div class="res-card reveal">
        <h2>Book a table</h2>
        <p>Fields marked <span style="color:var(--error)">*</span> are required.</p>
        <form id="reservation-form" class="form" novalidate>
          <div class="honeypot" aria-hidden="true"><label for="r-company">Company</label><input id="r-company" name="company" tabindex="-1" autocomplete="off"></div>
          <div class="form__row">
            <div class="field"><label for="r-name">Full name <span class="req">*</span></label><input id="r-name" name="name" type="text" autocomplete="name" placeholder="Your name" data-validate="required name"><span class="field__error" role="alert"></span></div>
            <div class="field"><label for="r-phone">Mobile number <span class="req">*</span></label><input id="r-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="98765 43210" data-validate="required phone"><span class="field__error" role="alert"></span><span class="field__hint">We'll confirm on this number via WhatsApp.</span></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="r-date">Date <span class="req">*</span></label><input id="r-date" name="date" type="date" data-validate="date"><span class="field__error" role="alert"></span></div>
            <div class="field"><label for="r-time">Time <span class="req">*</span></label><select id="r-time" name="time" data-validate="select"><option value="">Select a time</option></select><span class="field__error" role="alert"></span></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="r-guests">Guests <span class="req">*</span></label><div class="guest-stepper"><button type="button" data-step="-1" aria-label="Fewer guests">−</button><input id="r-guests" name="guests" type="number" min="1" max="12" value="2" data-validate="required"><button type="button" data-step="1" aria-label="More guests">+</button></div><span class="field__error" role="alert"></span><span class="field__hint" id="large-party" hidden>For more than 12 guests, please call us — we'll arrange a private table.</span></div>
            <div class="field"><label for="r-occasion">Occasion</label><select id="r-occasion" name="occasion"><option value="">Just coffee</option><option>Birthday</option><option>Anniversary</option><option>Business meeting</option><option>Date</option><option>Other</option></select></div>
          </div>
          <div class="field"><label for="r-notes">Special requests</label><textarea id="r-notes" name="notes" placeholder="Window seat, high chair, allergies, a cake on the table…"></textarea></div>
          <div class="form__status" role="status" aria-live="polite"></div>
          <button class="btn btn--primary btn--lg btn--block" type="submit">Confirm reservation</button>
          <p class="field__hint center">Submitting opens WhatsApp with your booking details pre-filled — just hit send.</p>
        </form>
        <div id="reservation-success" class="success-panel" role="status" aria-live="polite">
          <div class="check"><svg class="ic"><use href="#i-check"/></svg></div>
          <h3>Almost done!</h3>
          <p>We've opened WhatsApp with your booking details. Send the message and we'll confirm shortly.</p>
          <dl></dl>
          <div class="hero__actions" style="justify-content:center"><a class="btn btn--whatsapp" data-wa-confirm href="#" target="_blank" rel="noopener"><svg class="ic"><use href="#i-whatsapp"/></svg> Open WhatsApp</a><button class="btn btn--outline-dark" type="button" data-edit>Edit details</button></div>
        </div>
      </div>
      <aside class="aside-card reveal d1">
        <div><span class="eyebrow" style="color:var(--caramel-2)">Good to know</span><h3 class="mt-1">Before you book</h3></div>
        <ul class="bullets"><li>Tables are held for 15 minutes past the booking time.</li><li>Groups of 8+ may be seated across two tables.</li><li>Walk-ins always welcome, subject to availability.</li><li>Celebrating? Tell us in special requests — cakes from outside are welcome.</li></ul>
        <div><h3 style="font-size:1.15rem">Opening hours</h3><div class="hours mt-2" data-hours></div></div>
        <div><span data-open-badge class="open-badge">Open today</span></div>
        <a class="btn btn--outline-light" data-href="tel" href="#"><svg class="ic"><use href="#i-phone"/></svg> Call to book instead</a>
      </aside>
    </div>
  </div>
</section>
</main>
''' + footer(sticky=False) + '''<script src="js/forms.js"></script><script>document.body.classList.add("no-sticky")</script></body></html>'''
write("reservations.html", res)

# ============================ CONTACT ============================
contact = head("Contact — Brew & Bean Café, Noida", "Get in touch with Brew & Bean — address, opening hours, phone, WhatsApp and a quick contact form.", "contact.html", LD) + header() + '''
<main id="main">''' + page_hero("assets/images/hero-contact.svg","Contact","We'd love to hear from you","Questions, feedback, catering or a private event — drop us a line.","Contact") + '''
<section class="section section--cream">
  <div class="container">
    <div class="contact-layout">
      <div class="reveal">
        <span class="eyebrow">Reach us</span><h2 class="mt-2">Visit, call or write</h2>
        <div class="contact-cards mt-4">
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-pin"/></svg></div><div><h3>Address</h3><p><span data-bind="addressLine1">[Address]</span><br><span data-bind="addressLine2">Noida, Uttar Pradesh</span></p><a class="link-arrow mt-1" data-href="map" href="#" target="_blank" rel="noopener">Get directions <svg class="ic"><use href="#i-arrow"/></svg></a></div></div>
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-phone"/></svg></div><div><h3>Phone &amp; WhatsApp</h3><a class="val" data-href="tel" href="#"><span data-bind="phoneDisplay">+91 00000 00000</span></a><a class="val" data-href="whatsapp" href="#" target="_blank" rel="noopener">Chat on WhatsApp →</a></div></div>
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-mail"/></svg></div><div><h3>Email</h3><a class="val" data-href="mail" href="#"><span data-bind="email">hello@brewandbean.example</span></a><p>For catering &amp; private events</p></div></div>
          <div class="contact-card"><div class="why__icon"><svg class="ic"><use href="#i-clock"/></svg></div><div><h3>Opening hours</h3><span data-open-badge class="open-badge mt-1">Open today</span><div class="hours mt-2" data-hours style="max-width:320px"></div></div></div>
        </div>
        <div class="socials mt-4"><a data-href="instagram" href="#" target="_blank" rel="noopener" aria-label="Instagram"><svg class="ic"><use href="#i-instagram"/></svg></a><a data-href="facebook" href="#" target="_blank" rel="noopener" aria-label="Facebook"><svg class="ic"><use href="#i-facebook"/></svg></a><a data-href="whatsapp" href="#" target="_blank" rel="noopener" aria-label="WhatsApp"><svg class="ic"><use href="#i-whatsapp"/></svg></a></div>
      </div>
      <div class="res-card reveal d1">
        <h2>Send a message</h2><p>We reply within a few hours during opening times.</p>
        <form id="contact-form" class="form" novalidate>
          <div class="honeypot" aria-hidden="true"><label for="c-company">Company</label><input id="c-company" name="company" tabindex="-1" autocomplete="off"></div>
          <div class="form__row">
            <div class="field"><label for="c-name">Name <span class="req">*</span></label><input id="c-name" name="name" type="text" autocomplete="name" placeholder="Your name" data-validate="required name"><span class="field__error" role="alert"></span></div>
            <div class="field"><label for="c-phone">Mobile <span class="req">*</span></label><input id="c-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="98765 43210" data-validate="required phone"><span class="field__error" role="alert"></span></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" data-validate="email"><span class="field__error" role="alert"></span></div>
            <div class="field"><label for="c-topic">Topic <span class="req">*</span></label><select id="c-topic" name="topic" data-validate="select"><option value="">Choose…</option><option>General enquiry</option><option>Feedback</option><option>Catering / bulk order</option><option>Private event</option><option>Careers</option></select><span class="field__error" role="alert"></span></div>
          </div>
          <div class="field"><label for="c-message">Message <span class="req">*</span></label><textarea id="c-message" name="message" placeholder="How can we help?" data-validate="required min10"></textarea><span class="field__error" role="alert"></span></div>
          <div class="form__status" role="status" aria-live="polite"></div>
          <button class="btn btn--primary btn--lg btn--block" type="submit">Send message</button>
        </form>
      </div>
    </div>
  </div>
</section>
<section class="location__map" style="min-height:420px"><iframe data-map-embed src="about:blank" title="Map — Brew &amp; Bean, Noida" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen style="width:100%;height:460px;border:0"></iframe></section>
</main>
''' + footer() + '''<script src="js/forms.js"></script></body></html>'''
write("contact.html", contact)

# ============================ PRIVACY (minimal) ============================
priv = head("Privacy Policy — Brew & Bean", "How Brew & Bean handles the information you share through this website.", "privacy.html", '<meta name="robots" content="noindex">') + header() + '''
<main id="main">''' + page_hero("assets/images/hero-contact.svg","Legal","Privacy policy","Plain-English summary of how we handle your information.","Privacy") + '''
<section class="section section--cream"><div class="container" style="max-width:760px">
<p class="muted" style="font-size:.85rem">[Template — have this reviewed and completed before launch.]</p>
<h2 class="mt-4" style="font-size:1.8rem">What we collect</h2><p class="mt-2">When you reserve a table or contact us, you share your name, phone number and optionally your email and message. Submissions are sent to us via WhatsApp (and, if configured, our booking email) so we can respond to you.</p>
<h2 class="mt-4" style="font-size:1.8rem">How we use it</h2><p class="mt-2">Only to manage your booking or reply to your enquiry. We don't sell or share your details with third parties for marketing.</p>
<h2 class="mt-4" style="font-size:1.8rem">Cookies &amp; analytics</h2><p class="mt-2">This site does not set tracking cookies by default. If analytics are enabled, they are anonymised. Embedded maps are served by Google and subject to Google's privacy policy.</p>
<h2 class="mt-4" style="font-size:1.8rem">Contact</h2><p class="mt-2">Questions about your data? Email <a data-href="mail" href="#" style="text-decoration:underline"><span data-bind="email">hello@brewandbean.example</span></a>.</p>
</div></section></main>
''' + footer() + '''</body></html>'''
write("privacy.html", priv)
print("done")
