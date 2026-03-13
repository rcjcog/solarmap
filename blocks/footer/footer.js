export default async function decorate(block) {
  // ── DA.LIVE SINGLE ROW STRUCTURE ──────────────────────────
  // Correct da.live authoring = 1 row with 4 columns
  // EDS converts this to:
  // <div class="footer block">
  //   <div>                        ← single row
  //     <div>Our Address...</div>  ← col 1
  //     <div>Quick Link...</div>   ← col 2
  //     <div>Our Service...</div>  ← col 3
  //     <div>Logo + Brand...</div> ← col 4
  //   </div>
  // </div>

  // Get all rows
  const allRows = [...block.querySelectorAll(':scope > div')];

  // Find the row that has 4 columns (the content row)
  let contentRow = null;
  for (const row of allRows) {
    const cells = row.querySelectorAll(':scope > div');
    if (cells.length >= 4) {
      contentRow = row;
      break;
    }
  }

  // Fallback: use first row if no 4-col row found
  if (!contentRow) contentRow = allRows[0];

  if (!contentRow) return; // nothing to render

  const cells = [...contentRow.querySelectorAll(':scope > div')];
  const [col0, col1, col2, col3] = cells;

  // ── ADDRESS COLUMN ────────────────────────────────────────
  if (col0) {
    col0.classList.add('footer-col', 'footer-address');
    const heading = col0.querySelector('h1,h2,h3,h4,strong');
    if (heading) {
      const el = heading.closest('p') || heading;
      el.classList.add('footer-col-title');
    }
    col0.querySelectorAll('p:not(.footer-col-title)').forEach((p) => {
      p.classList.add('footer-address-item');
    });
  }

  // ── QUICK LINKS COLUMN ────────────────────────────────────
  if (col1) {
    col1.classList.add('footer-col', 'footer-quick-links');
    const heading = col1.querySelector('h1,h2,h3,h4,strong');
    if (heading) {
      const el = heading.closest('p') || heading;
      el.classList.add('footer-col-title');
    }
    col1.querySelectorAll('ul').forEach((ul) => ul.classList.add('footer-links-list'));
    col1.querySelectorAll('a').forEach((a) => a.classList.add('footer-nav-link'));
  }

  // ── SERVICES COLUMN ───────────────────────────────────────
  if (col2) {
    col2.classList.add('footer-col', 'footer-services');
    const heading = col2.querySelector('h1,h2,h3,h4,strong');
    if (heading) {
      const el = heading.closest('p') || heading;
      el.classList.add('footer-col-title');
    }
    col2.querySelectorAll('ul').forEach((ul) => ul.classList.add('footer-links-list'));
    col2.querySelectorAll('a').forEach((a) => a.classList.add('footer-nav-link'));
  }

  // ── BRAND COLUMN ──────────────────────────────────────────
  if (col3) {
    col3.classList.add('footer-col', 'footer-brand');

    // Handle logo image from da.live
    const img = col3.querySelector('img');
    if (img) {
      img.classList.add('footer-brand-img');
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'footer-brand-logo';
      img.parentNode?.insertBefore(imgWrapper, img);
      imgWrapper.appendChild(img);
    }

    // Style brand description paragraphs
    col3.querySelectorAll('p').forEach((p) => {
      if (!p.querySelector('img')) {
        p.classList.add('footer-brand-desc');
      }
    });

    // Add social icons
    const socialsDiv = document.createElement('div');
    socialsDiv.className = 'footer-socials';
    socialsDiv.innerHTML = `
      <a href="https://facebook.com"  class="footer-social-btn" aria-label="Facebook">f</a>
      <a href="https://twitter.com"   class="footer-social-btn" aria-label="Twitter">&#120143;</a>
      <a href="https://instagram.com" class="footer-social-btn" aria-label="Instagram">&#128247;</a>
    `;
    col3.appendChild(socialsDiv);
  }

  // ── ASSEMBLE ──────────────────────────────────────────────
  const footerInner = document.createElement('div');
  footerInner.className = 'footer-inner';
  [col0, col1, col2, col3].forEach((col) => {
    if (col) footerInner.appendChild(col);
  });

  const bottomBar = document.createElement('div');
  bottomBar.className = 'footer-bottom';
  bottomBar.innerHTML = `<p>© ${new Date().getFullYear()} Solarmap. All Rights Reserved.</p>`;

  block.innerHTML = '';
  block.append(footerInner, bottomBar);
}