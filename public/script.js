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

// Load journal entries
function loadLibrary() {
  const notes = JSON.parse(localStorage.getItem('journalLibrary') || "[]");
  library.innerHTML = "";

  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'library-entry';
    div.innerHTML = `
      <span>${note.date}</span><br>
      <div class="note-text">${note.text}</div>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    library.appendChild(div);
  });

  // Delete note
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      notes.splice(idx, 1);
      localStorage.setItem('journalLibrary', JSON.stringify(notes));
      loadLibrary();
    });
  });

  // Edit note
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      const newText = prompt("Edit your note:", notes[idx].text);
      if (newText !== null && newText.trim() !== "") {
        notes[idx].text = newText.trim();
        localStorage.setItem('journalLibrary', JSON.stringify(notes));
        loadLibrary();
      }
    });
  });
}

// Save journal entry
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

// Initialize
newBtn.addEventListener('click', showQuote);
showQuote();
loadLibrary();
