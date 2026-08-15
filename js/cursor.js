/* RizzSites — Custom cursor
   Tasteful dot + ring cursor for desktop pointer devices only.
   Disabled automatically on touch devices and reduced-motion. */

export function initCursor(){
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!isFinePointer || prefersReducedMotion) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  const root = document.getElementById('cursor-root') || document.body;
  root.appendChild(dot);
  root.appendChild(ring);
  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function loop(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  const hoverSelector = 'a, button, .filter-btn, .project-card, input, textarea, select, [role="button"]';
  const viewSelector = '.project-card, .featured-preview, .browser-frame';

  document.addEventListener('mouseover', (e) => {
    const viewTarget = e.target.closest(viewSelector);
    const hoverTarget = e.target.closest(hoverSelector);
    ring.classList.toggle('is-view', !!viewTarget);
    ring.classList.toggle('is-hover', !!hoverTarget && !viewTarget);
  });
  document.addEventListener('mouseout', (e) => {
    if(!e.relatedTarget){
      ring.classList.remove('is-hover', 'is-view');
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}
