/* RizzSites — FAQ accordion
   Accessible expand/collapse, one open at a time on the dedicated
   FAQ page, independent toggles on the homepage preview. */

export function initFaq(root = document, { singleOpen = true } = {}){
  const items = root.querySelectorAll('.faq-item');
  if(!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    if(!btn || !panel) return;

    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      if(singleOpen){
        items.forEach(other => {
          if(other !== item){
            other.classList.remove('is-open');
            other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
            const otherPanel = other.querySelector('.faq-a');
            if(otherPanel) otherPanel.style.maxHeight = null;
          }
        });
      }

      if(isOpen){
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}
