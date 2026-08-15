/* RizzSites — Motion controller
   Scroll reveals, magnetic buttons, scroll progress bar, and a light
   page-transition on internal navigation. Every effect checks
   prefers-reduced-motion before doing anything. */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  if(!items.length) return;

  if(prefersReducedMotion){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // Stagger siblings that share a parent with [data-reveal-group]
  const groups = document.querySelectorAll('[data-reveal-group]');
  groups.forEach(group => {
    const children = group.querySelectorAll('[data-reveal]');
    children.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${Math.min(i * 90, 450)}ms`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
}

export function initMagnetic(){
  if(prefersReducedMotion) return;
  const magnets = document.querySelectorAll('.magnetic');
  const strength = 0.28;

  magnets.forEach(el => {
    let rect;
    const onEnter = () => { rect = el.getBoundingClientRect(); };
    const onMove = (e) => {
      if(!rect) rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };
    const onLeave = () => { el.style.transform = 'translate(0,0)'; };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });
}

export function initScrollProgress(){
  const bar = document.getElementById('scrollProgress');
  if(!bar) return;
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? scrolled / height : 0;
    bar.style.transform = `scaleX(${pct})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

export function initHeroTilt(){
  if(prefersReducedMotion) return;
  const stack = document.querySelector('.hero-visual');
  if(!stack) return;
  const frames = stack.querySelectorAll('.browser-frame');
  if(!frames.length) return;

  stack.addEventListener('mousemove', (e) => {
    const rect = stack.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frames.forEach((f, i) => {
      const depth = (i + 1) * 4;
      f.style.transform = `rotateY(${x * depth}deg) rotateX(${-y * depth}deg)`;
    });
  });
  stack.addEventListener('mouseleave', () => {
    frames.forEach(f => { f.style.transform = ''; });
  });
}

/* Lightweight page transition: fade the outgoing view on internal link clicks.
   Purely cosmetic — does not block actual navigation. */
export function initPageTransition(){
  if(prefersReducedMotion) return;
  const overlay = document.getElementById('pageTransition');
  if(!overlay) return;

  requestAnimationFrame(() => {
    overlay.classList.add('is-active');
    requestAnimationFrame(() => {
      overlay.classList.add('is-leaving');
    });
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if(!link) return;
    const href = link.getAttribute('href');
    if(!href || href.startsWith('#') || link.target === '_blank' || link.hasAttribute('download')) return;
    if(link.origin && link.origin !== window.location.origin) return;
    if(e.metaKey || e.ctrlKey || e.shiftKey) return;

    e.preventDefault();
    overlay.classList.remove('is-leaving');
    overlay.classList.add('is-active');
    setTimeout(() => { window.location.href = href; }, 320);
  });
}

export function initTextReveal(){
  document.querySelectorAll('.text-reveal').forEach(el => {
    if(!el.querySelector('.text-reveal-inner')){
      const inner = document.createElement('span');
      inner.className = 'text-reveal-inner';
      inner.innerHTML = el.innerHTML;
      el.innerHTML = '';
      el.appendChild(inner);
    }
  });
  initScrollReveal();
}
