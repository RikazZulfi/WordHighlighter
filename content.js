let wordsList = [];

chrome.storage.sync.get('words', (data) => {
  wordsList = data.words;
  highlightWords();
});

function highlightWords() {
  const bodyText = document.body.innerHTML;
  wordsList.forEach(({ word, color }) => {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    const newText = bodyText.replace(regex, `<span class="highlighted" style="background-color: ${color};" title="${word}">$1</span>`);
    document.body.innerHTML = newText;
  });
}
