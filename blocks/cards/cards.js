import { createOptimizedPicture } from '../../scripts/aem.js';
 
export default function decorate(block) {
 
 
const container =
    block.closest('.cards-container') ||         // if already wrapped
    block.closest('.section') ||                // Franklin/EDS sections
    block.parentElement;                        // fallback
 
  if (container) {
    // Ensure base class exists
    container.classList.add('cards-container');
 
    // If this container already has an id, keep it (prevents duplicates on re-runs)
    if (!container.dataset.cardsId) {
      // Find the smallest available index to keep classes unique across the page
      let i = 1;
      while (document.querySelector(`.cards-container--${i}`)) i++;
     
      // Store and apply
      container.dataset.cardsId = String(i);
      container.classList.add(`cards-container--${i}`);
    }
  }
 
 
 
 
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = (div.children.length === 1) ? 'cards-card-button' : 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}