/* RizzSites — Project detail template
   One reusable page (project/index.html) rendered from data/projects.js
   based on the ?slug= query parameter. */

import { getProjectBySlug, getRelatedProjects, CATEGORY_LABELS } from '/data/projects.js';
import { previewWindowMarkup, observePreviews } from '/js/previews.js';
import { initScrollReveal } from '/js/animations.js';

function relatedCardMarkup(project){
  return `
    <article class="project-card" data-slug="${project.slug}">
      ${project.specWork ? '<span class="tag tag-gold spec-badge">Spec Work</span>' : ''}
      ${previewWindowMarkup(project)}
      <div class="project-info">
        <h3>${project.name}</h3>
        <p class="industry">${project.industry}</p>
        <div class="project-actions">
          <a href="/project/?slug=${project.slug}" class="btn btn-outline btn-sm">Explore Project</a>
        </div>
      </div>
    </article>
  `;
}

export function renderProjectPage(){
  const slug = new URLSearchParams(window.location.search).get('slug');
  const project = slug ? getProjectBySlug(slug) : null;
  const wrap = document.getElementById('projectRoot');
  const unavailable = document.getElementById('projectUnavailable');

  if(!project){
    if(wrap) wrap.hidden = true;
    if(unavailable) unavailable.hidden = false;
    document.title = 'Project unavailable | RizzSites';
    return;
  }

  if(unavailable) unavailable.hidden = true;
  if(wrap) wrap.hidden = false;

  document.title = `${project.name} | RizzSites Portfolio`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute('content', `${project.name}: ${project.description}`);

  const setText = (id, text) => { const el = document.getElementById(id); if(el) el.textContent = text; };
  const setHTML = (id, html) => { const el = document.getElementById(id); if(el) el.innerHTML = html; };

  setText('breadcrumbCurrent', project.name);
  setHTML('projectSpecBadge', project.specWork
    ? '<span class="tag tag-gold">Spec Work &middot; Concept Project</span>'
    : '<span class="tag tag-accent">Client Project</span>');
  setText('projectName', project.name);
  setText('projectDescription', project.description);
  setText('metaIndustry', project.industry);
  setText('metaCategory', CATEGORY_LABELS[project.category]);
  setText('metaType', project.specWork ? 'Spec Work' : 'Client Project');
  setHTML('projectPreview', previewWindowMarkup(project));

  const liveBtn = document.getElementById('viewLiveBtn');
  if(liveBtn) liveBtn.setAttribute('href', project.url);
  const urlLabel = document.getElementById('metaUrl');
  if(urlLabel) urlLabel.textContent = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const related = getRelatedProjects(project, 3);
  const relatedGrid = document.getElementById('relatedGrid');
  if(relatedGrid) relatedGrid.innerHTML = related.map(relatedCardMarkup).join('');

  observePreviews(document);
  initScrollReveal();
}
