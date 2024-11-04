function highlightWords() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const words = wordsList.map(({ word, color }) => ({
    regex: new RegExp(`\\b(${word})\\b`, 'gi'),
    color,
  }));

  let node;
  while (node = walker.nextNode()) {
    let text = node.nodeValue;
    let newHTML = text;

    words.forEach(({ regex, color }) => {
      newHTML = newHTML.replace(regex, `<span class="highlighted" style="background-color: ${color};" title="$1">$1</span>`);
    });

    if (newHTML !== text) {
      const span = document.createElement('span');
      span.innerHTML = newHTML;
      node.parentNode.replaceChild(span, node);
    }
  }
}
