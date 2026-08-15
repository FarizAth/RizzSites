/* RizzSites — Portfolio rendering
   Builds project cards from data/projects.js for the homepage and the
   full Work page, plus the client-side category filter system. */

import { PROJECTS, CATEGORIES, CATEGORY_LABELS } from '/data/projects.js';
import { previewWindowMarkup, observePreviews } from '/js/previews.js';
import { initScrollReveal } from '/js/animations.js';

const ARROW = `<svg class="btn-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function projectCardMarkup(project, delay = 0){
  return `
    <article class="project-card" data-category="${project.category}" data-slug="${project.slug}" data-reveal="scale" style="--reveal-delay:${delay}ms">
      ${project.specWork ? '<span class="tag tag-gold spec-badge">Spec Work</span>' : ''}
      ${previewWindowMarkup(project)}
      <div class="project-info">
        <div class="project-info-top">
          <div>
            <h3>${project.name}</h3>
            <p class="industry">${project.industry}</p>
          </div>
        </div>
        <p class="desc">${project.description}</p>
        <div class="project-actions">
          <a href="/project/?slug=${project.slug}" class="btn btn-outline btn-sm">Explore Project</a>
          <a href="${project.url}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">View Website ${ARROW}</a>
        </div>
      </div>
    </article>
  `;
}

function featuredCardMarkup(project, index){
  return `
    <div class="featured-card" data-reveal="fade">
      <div class="featured-preview">
        ${previewWindowMarkup(project)}
      </div>
      <div class="featured-copy">
        <p class="index mono">0${index + 1} &middot; ${CATEGORY_LABELS[project.category]}</p>
        <h3>${project.name}</h3>
        <p class="lede" style="margin-top:12px">${project.description}</p>
        <div class="project-actions" style="margin-top:24px">
          <a href="/project/?slug=${project.slug}" class="btn btn-outline btn-sm">Explore Project</a>
          <a href="${project.url}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">View Website ${ARROW}</a>
        </div>
      </div>
    </div>
  `;
}

/** Homepage: a small featured showcase + a preview wall grid. */
export function renderHomePortfolio(){
  const featuredHost = document.getElementById('featuredWork');
  const wallHost = document.getElementById('portfolioWall');
  const specHost = document.getElementById('specWorkGrid');
  if(featuredHost){
    const featured = PROJECTS.filter(p => !p.specWork).slice(0, 3);
    featuredHost.innerHTML = featured.map((p, i) => featuredCardMarkup(p, i)).join('');
  }
  if(wallHost){
    const wall = PROJECTS.filter(p => !p.specWork).slice(3, 9);
    wallHost.innerHTML = wall.map((p, i) => projectCardMarkup(p, i * 60)).join('');
  }
  if(specHost){
    const spec = PROJECTS.filter(p => p.specWork);
    specHost.innerHTML = spec.map((p, i) => projectCardMarkup(p, i * 60)).join('');
  }
  observePreviews(document);
  initScrollReveal();
}

/** Work page: the full 23-project portfolio with instant client-side filters. */
export function renderWorkPage(){
  const grid = document.getElementById('workGrid');
  const filterBar = document.getElementById('filterBar');
  const emptyState = document.getElementById('workEmpty');
  if(!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => projectCardMarkup(p, (i % 6) * 60)).join('');
  observePreviews(document);
  initScrollReveal();

  if(!filterBar) return;

  filterBar.innerHTML = CATEGORIES.map(c => {
    const count = c.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === c.id).length;
    return `<button class="filter-btn ${c.id === 'all' ? 'is-active' : ''}" data-filter="${c.id}" aria-pressed="${c.id === 'all'}">
      ${c.label} <span class="filter-count">${count}</span>
    </button>`;
  }).join('');

  const cards = Array.from(grid.querySelectorAll('.project-card'));
  const buttons = Array.from(filterBar.querySelectorAll('.filter-btn'));

  function applyFilter(filterId){
    let visibleCount = 0;
    cards.forEach(card => {
      const match = filterId === 'all' || card.dataset.category === filterId;
      if(match){
        visibleCount++;
        card.hidden = false;
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.94)';
        window.setTimeout(() => { card.hidden = true; }, 220);
      }
    });
    if(emptyState) emptyState.hidden = visibleCount !== 0;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(btn.dataset.filter);
    });
  });

  cards.forEach(card => {
    card.style.transition = 'opacity 220ms ease, transform 220ms ease';
  });
}
