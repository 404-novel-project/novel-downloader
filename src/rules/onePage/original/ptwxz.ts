import { mkRuleClass } from "../template";

export const ptwxz = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname:
      document.querySelector("h1")?.innerText.trim().replace('最新章节', '') ?? "",
    author:
      document.querySelector('.list')?.textContent?.split(' \u00A0')[0]?.replace('作者：', '')?.trim() ?? "",
    introDom: document.querySelector<HTMLDivElement>("#intro") ?? undefined,
    introDomPatch: (dom) => dom,
    coverUrl:
      document.location.href.replace(/(https:\/\/www\.piaotia\.com)\/html\/(\d+)\/(\d+)(\/index.html)?\/?$/, '$1/files/article/image/$2/$3/$3s.jpg'),
    getAName: (aElem) => (aElem as HTMLElement).innerText.trim(),
    aList: document.querySelectorAll('ul > li > a'),
    getContent: (dom) => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      delay(1000); // Add 1 second delay before processing each chapter
      return dom.body;
    },
    concurrencyLimit: -400,
    contentPatch: (dom) => {
      const title = dom.querySelector('h1')?.textContent?.trim() ?? '';

      // Find the <table> and <div class='bottomlink'> elements within the provided root element
      const table = dom.querySelector('table');
      const bottomLink = dom.querySelector("div.bottomlink");
    
      // Check if the elements exist
      if (!table || !bottomLink) {
        throw new Error('The required elements are not found in the DOM.');
      }

      // The final HTML content string
      let content = '';
    
      // Process the DOM nodes
      let currentNode = table.nextSibling;
      while (currentNode && currentNode !== bottomLink) {
        // If currentNode is a text node or not a <table> or <div>, process it
        if (currentNode.nodeType === Node.TEXT_NODE || (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.nodeName.toLowerCase() !== 'table' && currentNode.nodeName.toLowerCase() !== 'div')) {
          let textContent = currentNode.textContent || '';
          if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.nodeName.toLowerCase() === 'br') {
            // Replace <br> with newlines
            textContent = '\n';
          }
          
          // Split the text contents at newlines and wrap each line in <p> tags
          textContent.split('\n').forEach((line) => {
            const trimmedLine = line.trim();
            if (trimmedLine && title !== trimmedLine) {
              content += `<p>${trimmedLine}</p>`;
            }
          });
        }
        // Move to the next sibling node
        currentNode = currentNode.nextSibling;
      }
    
      // Create a new div and set its innerHTML to the processed content
      const divElement = document.createElement('div');
      divElement.innerHTML = content;
      
      return divElement;
    }
  });
