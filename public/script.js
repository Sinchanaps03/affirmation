const quotes = [
  "Believe in yourself.",
  "You are stronger than you think.",
  "Every day is a second chance.",
  "Mistakes are proof that you are trying.",
  "Dream big and dare to fail.",
  "Positive mind. Positive vibes. Positive life.",
  "Progress, not perfection.",
  "You are capable of amazing things.",
  "Your potential is limitless.",
  "Small steps every day lead to big results."
];

const quoteEl = document.getElementById('quote');
const newBtn = document.getElementById('newQuote');
const journal = document.getElementById('journal');
const saveBtn = document.getElementById('saveJournal');
const charCount = document.getElementById('charCount');
const library = document.getElementById('library');

// Show random affirmation
function showQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.style.opacity = 0;
  setTimeout(() => {
    quoteEl.textContent = quotes[randomIndex];
    quoteEl.style.opacity = 1;
  }, 300);
}

// Update character count
journal.addEventListener('input', () => {
  charCount.textContent = journal.value.length + " characters";
});

// Load journal entries from localStorage
function loadLibrary() {
  const notes = JSON.parse(localStorage.getItem('journalLibrary') || "[]");
  library.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'library-entry';
    div.innerHTML = `<span>${note.date}</span><br>${note.text}`;
    library.appendChild(div);
  });
}

// Save journal entry to localStorage
saveBtn.addEventListener('click', () => {
  const text = journal.value.trim();
  if (!text) {
    alert("Cannot save empty note!");
    return;
  }
  const notes = JSON.parse(localStorage.getItem('journalLibrary') || "[]");
  notes.unshift({ date: new Date().toLocaleString(), text });
  localStorage.setItem('journalLibrary', JSON.stringify(notes));
  journal.value = "";
  charCount.textContent = "0 characters";
  loadLibrary();
});

newBtn.addEventListener('click', showQuote);
showQuote();
loadLibrary();