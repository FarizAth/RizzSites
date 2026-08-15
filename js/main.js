/* RizzSites — Main boot
   Every page calls initPage(pageKey) once. Each imported module checks
   for its own DOM hooks and no-ops if they aren't on the current page,
   so this stays a single, simple entry point site-wide. */

import { renderHeader, renderFooter, initNavBehavior } from '/js/navigation.js';
import { initCursor } from '/js/cursor.js';
import { initScrollReveal, initMagnetic, initScrollProgress, initPageTransition, initHeroTilt, initTextReveal } from '/js/animations.js';
import { renderHomePortfolio, renderWorkPage } from '/js/portfolio.js';
import { renderProjectPage } from '/js/project.js';
import { initFaq } from '/js/faq.js';
import { initContactForm } from '/js/forms.js';

export function initPage(pageKey){
  renderHeader(pageKey);
  renderFooter();
  initNavBehavior();
  initCursor();
  initScrollProgress();
  initPageTransition();

  // Page-specific rendering (each no-ops if its DOM hooks aren't present)
  if(pageKey === 'home') renderHomePortfolio();
  if(pageKey === 'work') renderWorkPage();
  if(pageKey === 'project') renderProjectPage();

  initFaq(document, { singleOpen: pageKey === 'faq' });
  initContactForm();

  // Motion that applies everywhere, run after content is in the DOM
  initTextReveal();
  initScrollReveal();
  initMagnetic();
  initHeroTilt();
}
