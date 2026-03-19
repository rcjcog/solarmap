import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  footer.classList.add('footer');          // add wrapper class
  footer.classList.add('footer-wrapper');  // optional extra class for grid/flex
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
