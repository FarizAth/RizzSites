/* RizzSites — Live preview loader
   Builds the browser-chrome preview window markup and lazy-loads the
   embedded site with IntersectionObserver. If a site can't be embedded
   (X-Frame-Options / CSP), we fall back to a polished card with a
   "View Live Website" action — never a broken iframe. */

const LOAD_TIMEOUT_MS = 4500;
let sharedObserver = null;

function hostname(url){
  try{ return new URL(url).hostname.replace(/^www\./, ''); }
  catch{ return url; }
}

function monogram(name){
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

export function previewWindowMarkup(project){
  return `
    <div class="preview-window" data-slug="${project.slug}">
      <div class="chrome" aria-hidden="true">
        <span></span><span></span><span></span>
        <div class="chrome-url">${hostname(project.url)}</div>
      </div>
      <div class="preview-frame-wrap" data-url="${project.url}" data-name="${project.name}">
        <div class="preview-placeholder" data-placeholder>
          <div class="spinner" aria-hidden="true"></div>
          <p>Loading live preview&hellip;</p>
        </div>
      </div>
    </div>
  `;
}

function showFallback(wrap, name, url){
  const placeholder = wrap.querySelector('[data-placeholder]');
  if(!placeholder) return;
  placeholder.classList.add('is-fallback');
  placeholder.innerHTML = `
    <div class="preview-monogram" aria-hidden="true">${monogram(name)}</div>
    <p>Live preview isn't available in an embedded frame.</p>
    <a href="${url}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">View Live Website</a>
  `;
}

function loadOne(wrap){
  if(wrap.dataset.loaded === 'true') return;
  wrap.dataset.loaded = 'true';

  const url = wrap.getAttribute('data-url');
  const name = wrap.getAttribute('data-name') || 'this project';
  const placeholder = wrap.querySelector('[data-placeholder]');

  const iframe = document.createElement('iframe');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('title', `Live preview of ${name}`);
  iframe.setAttribute('referrerpolicy', 'no-referrer');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');

  let settled = false;
  const timer = setTimeout(() => {
    if(settled) return;
    settled = true;
    iframe.remove();
    showFallback(wrap, name, url);
  }, LOAD_TIMEOUT_MS);

  iframe.addEventListener('load', () => {
    if(settled) return;
    settled = true;
    clearTimeout(timer);
    iframe.classList.add('is-loaded');
    if(placeholder) placeholder.hidden = true;
  });
  iframe.addEventListener('error', () => {
    if(settled) return;
    settled = true;
    clearTimeout(timer);
    iframe.remove();
    showFallback(wrap, name, url);
  });

  iframe.src = url;
  wrap.appendChild(iframe);
}

export function observePreviews(root = document){
  const wraps = root.querySelectorAll('.preview-frame-wrap:not([data-observed])');
  if(!wraps.length) return;

  if(!sharedObserver){
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          loadOne(entry.target);
          sharedObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.01 });
  }

  wraps.forEach(w => {
    w.setAttribute('data-observed', 'true');
    sharedObserver.observe(w);
  });
}
