/* =============================================
   BLOOM STUDY — app.js
   All logic: auth, flashcards, exam mode
============================================= */

// ── ACCOUNTS ──────────────────────────────────
const ACCOUNTS = {
  "tinay":     "tinapay",
  "khol":       "khulangot",
  "venice":     "babyv",
  "deng":      "mesisol",
  "ekang":     "mesimaria",
  "whandajoy": "whandajoybiceps"
};

const MAX_SETS  = 10;
const MAX_CARDS = 100;

// ── STATE ──────────────────────────────────────
let currentUser   = null;
let currentSets   = [];
let editingSetIdx = null;   // null = new set, number = editing existing
let cardEditors   = [];     // array of { type, q, a / options, correct }

let studySetIdx   = 0;
let studyCardIdx  = 0;
let isFlipped     = false;

let examSet       = null;
let examSetIdx2   = 0;      // index of active exam set
let examCards     = [];     // shuffled
let examIdx       = 0;
let examScore     = 0;
let revealVisible = false;

// ── PETAL BACKGROUND ──────────────────────────
const PETALS = ['🌸','🌺','🌼','🌷','🌻','💮','🏵️'];
function spawnPetals() {
  const bg = document.getElementById('petalBg');
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
    el.style.left     = Math.random() * 100 + '%';
    el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    el.style.animationDuration  = (8 + Math.random() * 14) + 's';
    el.style.animationDelay     = (-Math.random() * 20) + 's';
    el.style.opacity = (0.1 + Math.random() * 0.12);
    bg.appendChild(el);
  }
}
spawnPetals();

// ── SCREEN ROUTER ─────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');

  if (id === 'flashcardScreen') renderSetsList();
  if (id === 'homeScreen') {
    document.getElementById('headerUsername').textContent = '🌸 ' + currentUser;
  }
}

// ── AUTH ───────────────────────────────────────
function doLogin() {
  const u = document.getElementById('loginUser').value.trim().toLowerCase();
  const p = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');
  errEl.textContent = '';

  if (!ACCOUNTS[u]) { errEl.textContent = '❌ Hindi kilala ang username!'; return; }
  if (ACCOUNTS[u] !== p) { errEl.textContent = '❌ Mali ang password!'; return; }

  currentUser = u;
  loadUserSets();
  document.getElementById('fcUsername').textContent = '🌸 ' + u;
  showScreen('homeScreen');
}

function logout() {
  currentUser = null;
  currentSets = [];
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginError').textContent = '';
  showScreen('loginScreen');
}

// Enter key on login
document.getElementById('loginPass').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});
document.getElementById('loginUser').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('loginPass').focus();
});

// ── STORAGE ───────────────────────────────────
function storageKey() { return 'bloomstudy_' + currentUser; }

function loadUserSets() {
  const raw = localStorage.getItem(storageKey());
  currentSets = raw ? JSON.parse(raw) : [];
}

function saveUserSets() {
  localStorage.setItem(storageKey(), JSON.stringify(currentSets));
}

// ── FLASHCARD LIST ────────────────────────────
function renderSetsList() {
  const grid = document.getElementById('setsList');
  grid.innerHTML = '';

  if (!currentSets.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌱</div>
        <p>Wala pang sets! Gumawa na ng isa. 🌸</p>
      </div>`;
    return;
  }

  currentSets.forEach((set, i) => {
    const card = document.createElement('div');
    card.className = 'set-card';
    card.innerHTML = `
      <div class="set-card-title">📚 ${escHtml(set.name)}</div>
      <div class="set-card-count">${set.cards.length} card${set.cards.length !== 1 ? 's' : ''}</div>
      <div class="set-card-actions">
        <button class="btn-small btn-sm-blue" onclick="studySet(${i})">📖 Study</button>
        <button class="btn-small btn-sm-yellow" onclick="editSet(${i})">✏️ Edit</button>
        <button class="btn-small btn-sm-red" onclick="askDelete(${i})">🗑️ Delete</button>
      </div>`;
    grid.appendChild(card);
  });
}

// ── CREATE / EDIT SET ─────────────────────────
function showCreateSet() {
  if (currentSets.length >= MAX_SETS) {
    showModal('limitModal');
    return;
  }
  editingSetIdx = null;
  cardEditors   = [];
  document.getElementById('setNameInput').value = '';
  document.getElementById('cardsList').innerHTML = '';
  document.getElementById('saveMsg').textContent = '';
  document.getElementById('createSetTitle').textContent = '✨ New Set';
  showScreen('createSetScreen');
}

function editSet(idx) {
  editingSetIdx = idx;
  const set = currentSets[idx];
  cardEditors   = JSON.parse(JSON.stringify(set.cards));
  document.getElementById('setNameInput').value = set.name;
  document.getElementById('saveMsg').textContent = '';
  document.getElementById('createSetTitle').textContent = '✏️ Edit Set';
  renderCardEditors();
  showScreen('createSetScreen');
}

function addCard(type) {
  if (cardEditors.length >= MAX_CARDS) {
    alert('Maximum na ang cards! (100 max)');
    return;
  }
  if (type === 'definition') {
    cardEditors.push({ type: 'definition', q: '', a: '' });
  } else {
    cardEditors.push({ type: 'mc', q: '', options: ['','','',''], correct: 0 });
  }
  renderCardEditors();
  // Scroll to bottom
  setTimeout(() => {
    const list = document.getElementById('cardsList');
    list.lastElementChild && list.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

function removeCard(idx) {
  cardEditors.splice(idx, 1);
  renderCardEditors();
}

function renderCardEditors() {
  const list = document.getElementById('cardsList');
  list.innerHTML = '';
  cardEditors.forEach((card, i) => {
    const div = document.createElement('div');
    div.className = 'card-editor';

    if (card.type === 'definition') {
      div.innerHTML = `
        <div class="card-editor-header">
          <span class="card-num">Card ${i + 1}</span>
          <div style="display:flex;gap:.5rem;align-items:center">
            <span class="card-type-badge">Word / Definition</span>
            <button class="btn-small btn-sm-red" onclick="removeCard(${i})">✕</button>
          </div>
        </div>
        <textarea rows="2" placeholder="Word / Term / Question"
          oninput="cardEditors[${i}].q=this.value">${escHtml(card.q)}</textarea>
        <textarea rows="2" placeholder="Definition / Answer"
          oninput="cardEditors[${i}].a=this.value">${escHtml(card.a)}</textarea>`;
    } else {
      const opts = card.options;
      div.innerHTML = `
        <div class="card-editor-header">
          <span class="card-num">Card ${i + 1}</span>
          <div style="display:flex;gap:.5rem;align-items:center">
            <span class="card-type-badge">Multiple Choice</span>
            <button class="btn-small btn-sm-red" onclick="removeCard(${i})">✕</button>
          </div>
        </div>
        <textarea rows="2" placeholder="Question"
          oninput="cardEditors[${i}].q=this.value">${escHtml(card.q)}</textarea>
        <div class="mc-options">
          <p class="correct-hint">● Mark the correct answer</p>
          ${['A','B','C','D'].map((ltr, oi) => `
            <div class="mc-option-row">
              <span class="mc-option-label">${ltr}</span>
              <input type="text" placeholder="Option ${ltr}"
                value="${escHtml(opts[oi] || '')}"
                oninput="cardEditors[${i}].options[${oi}]=this.value"/>
              <input type="radio" name="correct_${i}" ${card.correct === oi ? 'checked' : ''}
                onchange="cardEditors[${i}].correct=${oi}"/>
            </div>`).join('')}
        </div>`;
    }
    list.appendChild(div);
  });
}

function saveSet() {
  const name = document.getElementById('setNameInput').value.trim();
  const msgEl = document.getElementById('saveMsg');
  msgEl.style.color = 'var(--red)';

  if (!name) { msgEl.textContent = '⚠️ Bigyan muna ng pangalan ang set!'; return; }
  if (!cardEditors.length) { msgEl.textContent = '⚠️ Mag-add muna ng kahit isang card!'; return; }

  // Validate cards
  for (let i = 0; i < cardEditors.length; i++) {
    const c = cardEditors[i];
    if (!c.q.trim()) { msgEl.textContent = `⚠️ Card ${i+1}: walang question!`; return; }
    if (c.type === 'definition' && !c.a.trim()) {
      msgEl.textContent = `⚠️ Card ${i+1}: walang answer!`; return;
    }
    if (c.type === 'mc') {
      const filled = c.options.filter(o => o.trim()).length;
      if (filled < 2) { msgEl.textContent = `⚠️ Card ${i+1}: at least 2 options required!`; return; }
    }
  }

  const setObj = { name, cards: JSON.parse(JSON.stringify(cardEditors)) };

  if (editingSetIdx !== null) {
    currentSets[editingSetIdx] = setObj;
  } else {
    if (currentSets.length >= MAX_SETS) { showModal('limitModal'); return; }
    currentSets.push(setObj);
  }
  saveUserSets();

  msgEl.style.color = 'var(--green)';
  msgEl.textContent = '✅ Saved! ' + (editingSetIdx !== null ? 'Set updated!' : 'Bagong set na!');

  setTimeout(() => showScreen('flashcardScreen'), 900);
}

// ── DELETE SET ────────────────────────────────
let pendingDeleteIdx = null;
function askDelete(idx) {
  pendingDeleteIdx = idx;
  document.getElementById('deleteSetName').textContent = '"' + currentSets[idx].name + '"';
  showModal('deleteModal');
}
function confirmDelete() {
  if (pendingDeleteIdx !== null) {
    currentSets.splice(pendingDeleteIdx, 1);
    saveUserSets();
    pendingDeleteIdx = null;
  }
  closeModal('deleteModal');
  renderSetsList();
}

// ── STUDY (FLIP) MODE ─────────────────────────
function studySet(idx) {
  studySetIdx  = idx;
  studyCardIdx = 0;
  isFlipped    = false;
  const set = currentSets[idx];
  document.getElementById('studySetTitle').textContent = '📖 ' + set.name;
  renderStudyCard();
  showScreen('studyScreen');
}

function renderStudyCard() {
  const set   = currentSets[studySetIdx];
  const card  = set.cards[studyCardIdx];
  const inner = document.getElementById('studyCardInner');
  const front = document.getElementById('studyFront');
  const back  = document.getElementById('studyBack');

  isFlipped = false;
  inner.classList.remove('flipped');

  document.getElementById('studyProgress').textContent =
    (studyCardIdx + 1) + ' / ' + set.cards.length;

  if (card.type === 'definition') {
    front.innerHTML = `<div>${escHtml(card.q)}</div>`;
    back.innerHTML  = `<div>${escHtml(card.a)}</div>`;
  } else {
    front.innerHTML = `<div>${escHtml(card.q)}</div>`;
    const correct   = card.options[card.correct] || '(no answer set)';
    back.innerHTML  = `<div><small style="opacity:.7;font-size:.8em">Correct Answer</small><br/>${escHtml(correct)}</div>`;
  }
}

function flipCard() {
  isFlipped = !isFlipped;
  document.getElementById('studyCardInner').classList.toggle('flipped', isFlipped);
}

function nextStudyCard() {
  const set = currentSets[studySetIdx];
  if (studyCardIdx < set.cards.length - 1) {
    studyCardIdx++;
    renderStudyCard();
  }
}
function prevStudyCard() {
  if (studyCardIdx > 0) { studyCardIdx--; renderStudyCard(); }
}

// ── EXAM MODE ─────────────────────────────────
function showExamPicker() {
  const list = document.getElementById('examSetsList');
  list.innerHTML = '';
  if (!currentSets.length) {
    list.innerHTML = '<p style="color:var(--gray);text-align:center">Wala pang sets! Gumawa muna. 🌱</p>';
  } else {
    currentSets.forEach((set, i) => {
      const btn = document.createElement('button');
      btn.className = 'exam-set-btn';
      btn.innerHTML = `📚 ${escHtml(set.name)} <span style="color:var(--gray);font-size:.82rem">(${set.cards.length} cards)</span>`;
      btn.onclick = () => { closeModal('examPickerModal'); startExam(i); };
      list.appendChild(btn);
    });
  }
  showModal('examPickerModal');
}

function startExam(idx) {
  examSet    = currentSets[idx];
  examSetIdx2 = idx;
  examCards  = shuffle([...examSet.cards]);
  examIdx   = 0;
  examScore = 0;
  document.getElementById('examSetTitle').textContent = '📝 ' + examSet.name;
  renderExamCard();
  showScreen('examScreen');
}

function exitExam() {
  showScreen('homeScreen');
}

function renderExamCard() {
  const content = document.getElementById('examContent');
  updateExamProgress();

  if (examIdx >= examCards.length) {
    showScoreScreen();
    return;
  }

  const card = examCards[examIdx];
  revealVisible = false;

  if (card.type === 'definition') {
    content.innerHTML = `
      <div class="exam-question-card">
        <div class="exam-q-label">Question ${examIdx + 1}</div>
        <div class="exam-q-text">${escHtml(card.q)}</div>
        <input class="exam-def-input" id="examDefInput" type="text"
          placeholder="Type your answer here..." autocomplete="off"/>
        <div style="text-align:center">
          <button class="btn-primary" onclick="submitDefAnswer()">Submit Answer ✨</button>
        </div>
      </div>`;
    document.getElementById('examDefInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') submitDefAnswer();
    });
  } else {
    // Multiple choice
    const opts = card.options;
    const letters = ['A','B','C','D'];
    const optHtml = opts.map((opt, i) => opt.trim() ? `
      <button class="exam-mc-btn" id="mcOpt${i}" onclick="submitMCAnswer(${i})">
        <span class="option-letter">${letters[i]}</span>
        ${escHtml(opt)}
      </button>` : '').join('');

    content.innerHTML = `
      <div class="exam-question-card">
        <div class="exam-q-label">Question ${examIdx + 1}</div>
        <div class="exam-q-text">${escHtml(card.q)}</div>
        <div class="exam-mc-options">${optHtml}</div>
      </div>`;
  }
}

function submitMCAnswer(chosenIdx) {
  const card = examCards[examIdx];
  const btns = document.querySelectorAll('.exam-mc-btn');
  btns.forEach(b => b.disabled = true);

  const isCorrect = chosenIdx === card.correct;
  if (isCorrect) examScore++;

  // Highlight
  btns.forEach((btn, i) => {
    if (i === card.correct) btn.classList.add('correct');
    else if (i === chosenIdx && !isCorrect) btn.classList.add('wrong');
  });

  showExamFeedback(isCorrect, card.options[card.correct]);
}

function submitDefAnswer() {
  const input   = document.getElementById('examDefInput');
  const answer  = input ? input.value.trim() : '';
  const card    = examCards[examIdx];
  if (!answer) return;

  const isCorrect = normalizeAnswer(answer) === normalizeAnswer(card.a);
  if (isCorrect) examScore++;

  if (input) {
    input.disabled = true;
    input.classList.add(isCorrect ? 'correct' : 'wrong');
  }

  showExamFeedback(isCorrect, card.a);
}

function normalizeAnswer(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function showExamFeedback(isCorrect, correctAnswer) {
  const content = document.getElementById('examContent');

  let feedbackHtml;
  if (isCorrect) {
    feedbackHtml = `
      <div class="exam-feedback feedback-correct">
        <div class="feedback-flower">🌺</div>
        <div class="feedback-title">Tama! Galing mo! 🌟</div>
        <div class="feedback-sub">Ang galing-galing mo talaga!</div>
      </div>`;
  } else {
    feedbackHtml = `
      <div class="exam-feedback feedback-wrong">
        <div class="feedback-flower">🥀</div>
        <div class="feedback-title">WRONG! Bobo 💀</div>
        <div class="feedback-sub" id="revealContainer">
          <button class="reveal-btn" onclick="revealAnswer('${escAttr(correctAnswer)}')">
            Click here to show the right answer, para alam mong tanga ka 🌚
          </button>
        </div>
      </div>`;
  }

  const feedbackDiv = document.createElement('div');
  feedbackDiv.innerHTML = feedbackHtml;
  content.appendChild(feedbackDiv);

  // Next button
  const nextWrap = document.createElement('div');
  nextWrap.className = 'next-btn-wrap';
  nextWrap.id = 'nextBtnWrap';
  nextWrap.innerHTML = isCorrect
    ? `<button class="btn-primary" onclick="nextExamCard()">Next → 🌸</button>`
    : `<div id="nextAfterReveal"></div>`;
  content.appendChild(nextWrap);
}

function revealAnswer(ans) {
  const container = document.getElementById('revealContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="revealed-answer">✅ Tamang sagot: ${escHtml(ans)}</div>`;
  const nextDiv = document.getElementById('nextAfterReveal');
  if (nextDiv) {
    nextDiv.innerHTML = `<button class="btn-primary" style="margin-top:.8rem" onclick="nextExamCard()">Next → 🌸</button>`;
  }
}

function nextExamCard() {
  examIdx++;
  renderExamCard();
}

function updateExamProgress() {
  const total = examCards.length;
  document.getElementById('examProgress').textContent =
    examIdx < total ? (examIdx + 1) + ' / ' + total : '✅ Done!';
}

function showScoreScreen() {
  const total   = examCards.length;
  const pct     = Math.round((examScore / total) * 100);
  let flower, msg;

  if (pct === 100) {
    flower = '🌺'; msg = 'PERFECT! Hindi ka bobo! Mahal kita! 💙';
  } else if (pct >= 80) {
    flower = '🌸'; msg = 'Galing mo! Almost perfect! 🌟';
  } else if (pct >= 60) {
    flower = '🌼'; msg = 'Okay lang! Mag-aral pa ulit! 📚';
  } else if (pct >= 40) {
    flower = '🌷'; msg = 'Kaya mo pa! Try mo ulit! 💪';
  } else {
    flower = '🥀'; msg = 'Grabe ka talaga... Mag-aral ka na. 💀';
  }

  document.getElementById('examContent').innerHTML = `
    <div class="score-screen">
      <div class="score-flower">${flower}</div>
      <div class="score-title">Tapos na! 🎉</div>
      <div class="score-number">${examScore} / ${total}</div>
      <div class="score-sub">${pct}% ang score mo</div>
      <div class="score-msg">${msg}</div>
      <div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
        <button class="btn-primary" onclick="startExam(examSetIdx2)">🔄 Try Again</button>
        <button class="btn-secondary" onclick="showScreen('homeScreen')">🏠 Home</button>
      </div>
    </div>`;
}

// ── MODAL HELPERS ─────────────────────────────
function showModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.add('hidden');
  });
});

// ── UTILITIES ─────────────────────────────────
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// (all already in global scope as regular functions)

// ── INIT ──────────────────────────────────────
showScreen('loginScreen');
