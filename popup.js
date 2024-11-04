document.getElementById('addWord').addEventListener('click', () => {
  const wordInput = document.getElementById('word');
  const colorInput = document.getElementById('color');

  const word = wordInput.value.trim();
  const color = colorInput.value;

  if (word) {
    chrome.storage.sync.get('words', (data) => {
      const words = data.words || [];
      words.push({ word, color });
      chrome.storage.sync.set({ words }, () => {
        wordInput.value = '';
        colorInput.value = '#FFFF00';
        displayWords();
      });
    });
  }
});

function displayWords() {
  chrome.storage.sync.get('words', (data) => {
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';
    data.words.forEach(({ word, color }) => {
      const li = document.createElement('li');
      li.textContent = `${word} - ${color}`;
      wordList.appendChild(li);
    });
  });
}

document.addEventListener('DOMContentLoaded', displayWords);
