import { Metatags, Metatag } from './metatags.js';

document.addEventListener('DOMContentLoaded', async function () {
  const blocks = document.querySelectorAll('code');
  blocks.forEach(block => {
    const code = block.innerHTML;
    block.innerHTML = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  });
})