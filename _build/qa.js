// QA harness — serves the folder over http (so relative paths/iframes behave like prod) and tests everything
const { chromium } = require('/home/claude/webcloudnest/node_modules/playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = '/home/claude/sites/brew-and-bean';
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.woff2':'font/woff2', '.png':'image/png', '.xml':'application/xml', '.txt':'text/plain' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (fs.existsSync(f) && fs.statSync(f).isFile()) { res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); }
  else { res.writeHead(404); res.end('404'); }
}).listen(4173);
const BASE = 'http://localhost:4173/';
const PAGES = ['index.html','menu.html','about.html','gallery.html','reservations.html','contact.html','privacy.html'];
const VIEWPORTS = [[1440,900,'desktop'],[1024,768,'laptop'],[820,1180,'tablet'],[390,844,'mobile'],[360,740,'small']];
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const report = { errors: [], broken: [], overflow: [], missingAssets: [], checks: {} };
  // 1. every page × viewport: console errors, 404 assets, overflow
  for (const pg of PAGES) {
    for (const [w,h,name] of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      page.on('pageerror', e => report.errors.push(`${pg}@${name}: ${e.message}`));
      page.on('response', r => { if (r.status() >= 400 && !r.url().includes('google')) report.missingAssets.push(`${pg}: ${r.status()} ${r.url().replace(BASE,'')}`); });
      await page.goto(BASE + pg, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      if (ov) report.overflow.push(`${pg}@${name}`);
      if (name === 'desktop') {
        // internal links resolve
        const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
        for (const h of hrefs) {
          if (!h || h.startsWith('http') || h.startsWith('mailto') || h.startsWith('tel') || h === '#') continue;
          const [file, hash] = h.split('#'); const target = file || pg;
          if (!fs.existsSync(path.join(ROOT, target))) report.broken.push(`${pg}: ${h}`);
          else if (hash && file && file !== pg) { const html = fs.readFileSync(path.join(ROOT, target), 'utf8'); if (!html.includes(`id="${hash}"`) && !['coffee','tea','desserts','snacks','breakfast'].includes(hash)) report.broken.push(`${pg}: ${h} (anchor)`); }
          else if (hash && (!file || file === pg)) { const ok = await page.$(`#${hash}`); if (!ok) report.broken.push(`${pg}: #${hash}`); }
        }
        // data binding worked (no raw placeholders of href="#" on bound links)
        const unbound = await page.$$eval('[data-href]', as => as.filter(a => a.getAttribute('href') === '#').length);
        report.checks[`${pg} unbound-links`] = unbound;
        // a11y basics
        const a11y = await page.evaluate(() => ({
          h1: document.querySelectorAll('h1').length,
          imgsNoAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length,
          inputsNoLabel: [...document.querySelectorAll('input:not([type=hidden]),select,textarea')].filter(el => !el.id || !document.querySelector(`label[for="${el.id}"]`)).length,
          title: document.title.length > 10, meta: !!document.querySelector('meta[name=description]'), lang: document.documentElement.lang
        }));
        report.checks[`${pg} a11y`] = a11y;
      }
      await page.close();
    }
  }
  // 2. interactions
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', e => report.errors.push('interact: ' + e.message));
  await p.goto(BASE + 'index.html', { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  report.checks.headerTransparentTop = await p.evaluate(() => !document.querySelector('.site-header').classList.contains('is-scrolled'));
  await p.evaluate(() => { document.documentElement.style.scrollBehavior='auto'; scrollTo(0, 600); }); await p.waitForTimeout(200);
  report.checks.headerSolidOnScroll = await p.evaluate(() => document.querySelector('.site-header').classList.contains('is-scrolled'));
  report.checks.popularMenuCards = await p.$$eval('[data-popular-menu] .menu-card', c => c.length);
  report.checks.openBadge = await p.$eval('[data-open-badge]', e => e.textContent);
  report.checks.hoursRendered = await p.$eval('[data-hours]', e => e.children.length);
  report.checks.waLink = await p.$eval('.whatsapp-float', a => a.href.startsWith('https://wa.me/'));
  // lightbox on home
  await p.click('.g-item'); await p.waitForTimeout(300);
  report.checks.lightboxOpens = await p.$eval('.lightbox', l => l.classList.contains('is-open'));
  await p.keyboard.press('ArrowRight'); await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  report.checks.lightboxCloses = await p.$eval('.lightbox', l => !l.classList.contains('is-open'));
  // menu page: filter + search
  await p.goto(BASE + 'menu.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  report.checks.menuAllCount = await p.$$eval('.menu-card', c => c.length);
  await p.click('.chip[data-cat="desserts"]'); await p.waitForTimeout(300);
  report.checks.menuDessertsCount = await p.$$eval('.menu-card', c => c.length);
  await p.click('.chip[data-cat="all"]'); await p.fill('#menu-search', 'latte'); await p.waitForTimeout(400);
  report.checks.menuSearchLatte = await p.$$eval('.menu-card', c => c.map(x => x.querySelector('h3').textContent));
  await p.fill('#menu-search', 'zzzz'); await p.waitForTimeout(400);
  report.checks.menuEmptyState = !!(await p.$('.empty'));
  await p.goto(BASE + 'menu.html#desserts', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  report.checks.menuDeepLink = await p.$eval('.chip[aria-pressed="true"]', c => c.dataset.cat);
  // gallery filter
  await p.goto(BASE + 'gallery.html', { waitUntil: 'networkidle' });
  await p.click('[data-gallery-filters] .chip[data-filter="Coffee"]'); await p.waitForTimeout(200);
  report.checks.galleryFilterCoffee = await p.$$eval('.g-item:not([hidden])', c => c.length);
  // reservation validation
  await p.goto(BASE + 'reservations.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
  report.checks.timeSlots = await p.$$eval('#r-time option', o => o.length);
  await p.click('#reservation-form button[type=submit]'); await p.waitForTimeout(300);
  report.checks.resEmptyBlocked = await p.$$eval('#reservation-form .field.is-invalid', f => f.length);
  await p.fill('#r-name', 'QA Tester'); await p.fill('#r-phone', '9876543210');
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0,10);
  await p.fill('#r-date', tomorrow); await p.waitForTimeout(200);
  await p.selectOption('#r-time', { index: 3 });
  await p.click('[data-step="1"]'); 
  report.checks.guestStepper = await p.$eval('#r-guests', i => i.value);
  await p.context().route('https://wa.me/**', r => r.abort()); // don't actually open
  p.on('popup', pp => pp.close());
  await p.click('#reservation-form button[type=submit]'); await p.waitForTimeout(1200);
  report.checks.resSuccessPanel = await p.$eval('#reservation-success', s => s.classList.contains('is-visible'));
  report.checks.resSummaryRows = await p.$$eval('#reservation-success dt', d => d.length);
  // contact validation
  await p.goto(BASE + 'contact.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
  await p.fill('#c-phone', '12345'); await p.click('#contact-form button[type=submit]'); await p.waitForTimeout(300);
  report.checks.contactPhoneInvalid = await p.$eval('#c-phone', i => i.closest('.field').classList.contains('is-invalid'));
  // mobile nav
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  m.on('pageerror', e => report.errors.push('mobile: ' + e.message));
  await m.goto(BASE + 'index.html', { waitUntil: 'networkidle' }); await m.waitForTimeout(300);
  report.checks.mobileStickyReserve = await m.$eval('.sticky-reserve', s => getComputedStyle(s).display !== 'none');
  report.checks.menuGridMobileCols = await m.evaluate(() => getComputedStyle(document.querySelector('[data-popular-menu]')).gridTemplateColumns.split(' ').length);
  await m.click('.nav__toggle'); await m.waitForTimeout(400);
  report.checks.mobileNavOpens = await m.$eval('.mobile-nav', n => n.classList.contains('is-open'));
  await m.keyboard.press('Escape'); await m.waitForTimeout(300);
  report.checks.mobileNavEscape = await m.$eval('.mobile-nav', n => !n.classList.contains('is-open'));
  // tap targets
  report.checks.smallTapTargets = await m.$$eval('a.btn, button, .nav__toggle, .chip, .whatsapp-float', els => els.filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.height < 42 || r.width < 42); }).map(e => e.className).slice(0,5));
  // screenshots
  fs.mkdirSync(ROOT + '/_build/shots', { recursive: true });
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const pg of PAGES.slice(0,6)) { await d.goto(BASE + pg, { waitUntil: 'networkidle' }); await d.waitForTimeout(500); await d.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'))); await d.screenshot({ path: `${ROOT}/_build/shots/${pg.replace('.html','')}-desktop.png`, fullPage: pg === 'index.html' ? false : false }); }
  await d.goto(BASE + 'index.html', { waitUntil: 'networkidle' }); await d.waitForTimeout(400); await d.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  await d.screenshot({ path: `${ROOT}/_build/shots/index-full.png`, fullPage: true });
  await m.goto(BASE + 'index.html', { waitUntil: 'networkidle' }); await m.waitForTimeout(400); await m.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  await m.screenshot({ path: `${ROOT}/_build/shots/index-mobile.png`, fullPage: true });
  await m.goto(BASE + 'menu.html', { waitUntil: 'networkidle' }); await m.waitForTimeout(400);
  await m.screenshot({ path: `${ROOT}/_build/shots/menu-mobile.png` });
  await browser.close(); server.close();
  console.log(JSON.stringify(report, null, 1));
})();
