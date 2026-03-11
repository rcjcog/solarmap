import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer block
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Load the footer fragment (footer.plain.html)
  const fragment = await loadFragment('/footer');

  // Clear any placeholder content
  block.textContent = '';

  // Wrap the fragment content
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  while (fragment.firstElementChild) {
    footerWrapper.append(fragment.firstElementChild);
  }

  block.append(footerWrapper);

  // Example: add a class to links for styling
  const links = block.querySelectorAll('a');
  links.forEach((link) => {
    link.classList.add('footer-link');
  });

  // Example: log social icon clicks
  const socials = block.querySelectorAll('.footer-social a');
  socials.forEach((social) => {
    social.addEventListener('click', () => {
      console.log(`Social link clicked: ${social.href}`);
    });
  });
}
