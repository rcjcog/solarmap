import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // clear placeholder
  block.textContent = '';

  // create wrapper with classes
  const footer = document.createElement('div');
  footer.classList.add('footer');          // main styling hook
  footer.classList.add('footer-wrapper');  // extra wrapper for layout

  // append fragment content inside wrapper
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  // append wrapper to block
  block.append(footer);
}
