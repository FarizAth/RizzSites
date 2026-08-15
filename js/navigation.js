/* RizzSites — Navigation
   Renders the shared header, mobile menu, and footer into every page,
   and wires up scroll state + mobile toggle behavior. */

const NAV_LINKS = [
  { label: 'Work', href: '/work/' },
  { label: 'Services', href: '/services/' },
  { label: 'Process', href: '/process/' },
  { label: 'About', href: '/about/' },
];

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];

function isActive(href, page){
  const map = {
    home: '/', work: '/work/', services: '/services/', process: '/process/',
    about: '/about/', faq: '/faq/', contact: '/contact/', project: '/project/',
  };
  return map[page] === href;
}

export function renderHeader(page){
  const host = document.getElementById('site-header');
  if(!host) return;

  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${isActive(l.href, page) ? 'is-active' : ''}">${l.label}</a>`
  ).join('');

  host.className = 'site-header';
  host.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="brand" aria-label="RizzSites home">
        <span class="brand-mark">*</span>RizzSites
      </a>
      <nav class="nav-links" aria-label="Primary">
        ${links}
      </nav>
      <div class="nav-actions">
        <a href="/contact/" class="btn btn-primary btn-sm nav-cta magnetic">Start a Project</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;

  const mobileHost = document.getElementById('mobile-menu-root');
  if(mobileHost){
    const mLinks = MOBILE_LINKS.map((l, i) =>
      `<li><a href="${l.href}" class="${isActive(l.href, page) ? 'is-active' : ''}" style="transition-delay:${i * 40}ms">${l.label}</a></li>`
    ).join('');
    mobileHost.innerHTML = `
      <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Mobile menu">
        <ul>${mLinks}</ul>
        <a href="/contact/" class="btn btn-primary mobile-cta">Start a Project</a>
        <div class="mobile-menu-foot">
          <span>hello@rizzsites.com</span>
        </div>
      </div>
    `;
  }
}

export function renderFooter(){
  const host = document.getElementById('site-footer');
  if(!host) return;

  const year = new Date().getFullYear();

  host.innerHTML = `
    <div class="container-wide">
      <div class="footer-top">
        <div class="footer-col footer-brand">
          <a href="/" class="brand"><span class="brand-mark">*</span>RizzSites</a>
          <p>A premium website design and development studio for businesses that want to look as good as they perform.</p>
        </div>
        <div class="footer-col">
          <h5>Navigate</h5>
          <ul>
            <li><a href="/work/">Work</a></li>
            <li><a href="/services/">Services</a></li>
            <li><a href="/process/">Process</a></li>
            <li><a href="/about/">About</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Studio</h5>
          <ul>
            <li><a href="/faq/">FAQ</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/contact/">Start a Project</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Get in touch</h5>
          <ul>
            <li><a href="mailto:hello@rizzsites.com">hello@rizzsites.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${year} RizzSites. All rights reserved.</span>
        <span>Premium websites for businesses.</span>
      </div>
    </div>
  `;
}

export function initNavBehavior(){
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');

  const onScroll = () => {
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if(toggle && menu){
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeMenu();
    });
  }
}
