const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

export const sanitizeHTML = html => {
  const { window } = new JSDOM('');
  const DOMPurify = createDOMPurify(window);

  DOMPurify.addHook('afterSanitizeAttributes', node => {
    if (node.hasAttribute('id')) {
      const nodeId = node.getAttribute('id');

      if (nodeId === 'templateHeader' || nodeId === 'templateFooter') {
        node.textContent = '';
        node.removeAttribute('style');
      }
    }
  });
  return DOMPurify.sanitize(html);
};
