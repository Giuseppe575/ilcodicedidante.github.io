(function () {
  'use strict';
  const key = 'rilievo:marketing-consent';
  const version = '2026-10-31';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const banner = document.getElementById('cookie-banner');
  let allowed = false;
  let loaded = false;

  function readChoice() {
    try {
      const choice = JSON.parse(localStorage.getItem(key));
      const age = Date.now() - choice.timestamp;
      return choice.version === version && Number.isFinite(age) && age >= 0 && age < lifetime &&
        ['accepted', 'rejected'].includes(choice.choice) ? choice.choice : null;
    } catch { return null; }
  }
  function loadPixel() {
    if (!allowed || loaded) return;
    loaded = true;
    const fbq = window.fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
    window._fbq = fbq; fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
    fbq('consent', 'grant');
    fbq('init', '1717791173002936');
    fbq('track', 'PageView');
    const script = document.createElement('script');
    script.async = true; script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  function removeMarketingCookies() {
    for (const name of ['_fbp', '_fbc']) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      for (const domain of [location.hostname, 'ilcodicedidante.it', '.ilcodicedidante.it']) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
      }
    }
  }
  function choose(choice) {
    const wasLoaded = loaded;
    allowed = choice === 'accepted';
    try { localStorage.setItem(key, JSON.stringify({ choice, timestamp: Date.now(), version })); } catch { /* Session choice still applies. */ }
    banner.hidden = true;
    if (allowed) loadPixel();
    else {
      if (window.fbq) window.fbq('consent', 'revoke');
      removeMarketingCookies();
      // A fresh page also unloads any already-loaded vendor code.
      if (wasLoaded) location.reload();
    }
  }
  document.getElementById('accept-marketing').addEventListener('click', () => choose('accepted'));
  document.getElementById('reject-marketing').addEventListener('click', () => choose('rejected'));
  document.getElementById('cookie-preferences').addEventListener('click', () => { banner.hidden = false; });
  window.rilievoLead = () => { if (allowed && window.fbq) window.fbq('track', 'Lead'); };
  const saved = readChoice();
  allowed = saved === 'accepted';
  banner.hidden = saved !== null;
  if (allowed) loadPixel();
})();
