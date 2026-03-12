import { fetchPlaceholders } from '../../scripts/placeholders.js';
 
export default async function decorate(block) {
  console.log("countryslider block", block);

  if (block.children.length >= 1) {
    const [blockContainer] = [...block.children];
    blockContainer.className = 'countryslider-container';

    const [blockList] = [...blockContainer.children];
    blockList.className = 'countryslider-list';

    
    const listItems = [...blockList.children];
    listItems.forEach(item => {
      blockList.append(item.cloneNode(true));
    });
  }
}
