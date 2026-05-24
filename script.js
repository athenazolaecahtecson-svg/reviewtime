/* =============================================
   BLOOM STUDY — style.css
   Theme: White, #4A90D9 blue, black, #F5C842 yellow
   Fonts: Baloo 2 (headings), Nunito (body)
============================================= */

:root {
  --blue: #4A90D9;
  --blue-light: #7bb3e8;
  --blue-dark: #2d6faa;
  --yellow: #F5C842;
  --yellow-light: #fff3b0;
  --white: #ffffff;
  --bg: #f7f3ff;
  --bg2: #eef6ff;
  --black: #1a1a2e;
  --gray: #6b7280;
  --gray-light: #f1f5f9;
  --pink: #ff8fab;
  --green: #52b788;
  --red: #e63946;
  --shadow: 0 4px 24px rgba(74,144,217,0.13);
  --shadow-lg: 0 8px 40px rgba(74,144,217,0.2);
  --radius: 20px;
  --radius-sm: 12px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Nunito', sans-serif;
  background: var(--bg);
  color: var(--black);
  min-height: 100vh;
  overflow-x: hidden;
  cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><text y='26' font-size='24'>🌸</text></svg>") 12 12, auto;
}

h1, h2, h3, .logo, .home-card-label, .login-title {
  font-family: 'Baloo 2', sans-serif;
}

/* =============================================
   PETAL BACKGROUND
============================================= */
.petal-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.petal {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.18;
  animation: fall linear infinite;
  user-select: none;
}

@keyframes fall {
  0%   { transform: translateY(-60px) rotate(0deg); opacity: 0.18; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}

/* =============================================
   SCREENS
============================================= */
.screen {
  display: none;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}
.screen.active { display: flex; flex-direction: column; }

/* =============================================
   LOGIN SCREEN
============================================= */
#loginScreen {
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eef6ff 0%, #fff3f8 50%, #fffff0 100%);
  padding: 1rem;
}

.login-card {
  background: var(--white);
  border-radius: 28px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
  border: 2px solid rgba(74,144,217,0.12);
  position: relative;
  overflow: visible;
  animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both;
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.85) translateY(30px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.login-flowers {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.flower-deco {
  font-size: 2rem;
  animation: sway 2.5s ease-in-out infinite;
}
.flower-deco.big { font-size: 2.8rem; animation-delay: 0.5s; }
.flower-deco:last-child { animation-delay: 1s; }

@keyframes sway {
  0%, 100% { transform: rotate(-8deg); }
  50%       { transform: rotate(8deg); }
}

.login-title {
  text-align: center;
  font-size: 2.2rem;
  color: var(--blue);
  line-height: 1.1;
}

.login-sub {
  text-align: center;
  color: var(--gray);
  margin-bottom: 1.8rem;
  font-size: 0.95rem;
}

.input-group {
  margin-bottom: 1.1rem;
}
.input-group label {
  display: block;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: var(--black);
}
.input-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #d1e8f7;
  border-radius: var(--radius-sm);
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  background: var(--bg2);
}
.input-group input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(74,144,217,0.15);
  background: #fff;
}

.error-msg {
  color: var(--red);
  font-size: 0.85rem;
  font-weight: 700;
  min-height: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}



/* =============================================
   TOP BAR
============================================= */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--white);
  box-shadow: 0 2px 12px rgba(74,144,217,0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: 1.3rem;
  color: var(--blue);
  font-weight: 800;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--gray);
}

.btn-logout {
  background: none;
  border: 2px solid var(--blue);
  color: var(--blue);
  border-radius: 20px;
  padding: 0.3rem 0.9rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
}
.btn-logout:hover { background: var(--blue); color: #fff; }

.btn-back {
  background: none;
  border: none;
  color: var(--blue);
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}
.btn-back:hover { background: var(--bg2); }

.progress-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--blue);
  background: var(--bg2);
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
}

/* =============================================
   HOME SCREEN
============================================= */
.home-main {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.welcome-banner {
  text-align: center;
  margin-bottom: 2.5rem;
  animation: slideDown 0.6s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.welcome-banner h1 {
  font-size: 2rem;
  color: var(--blue);
  line-height: 1.2;
}
.welcome-sub {
  font-size: 1.1rem;
  color: var(--gray);
  margin-top: 0.5rem;
}

/* ---- FLOWER CHARACTERS ---- */
.flowers-row {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  padding: 1rem 0;
}

.flower-char {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: floatUp 0.7s cubic-bezier(.34,1.56,.64,1) both;
}
.flower-char:nth-child(1) { animation-delay: 0.1s; }
.flower-char:nth-child(2) { animation-delay: 0.2s; }
.flower-char:nth-child(3) { animation-delay: 0.3s; }
.flower-char:nth-child(4) { animation-delay: 0.4s; }
.flower-char:nth-child(5) { animation-delay: 0.5s; }

@keyframes floatUp {
  from { opacity: 0; transform: translateY(30px) scale(0.7); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.flower-icon {
  font-size: 3rem;
  animation: bobble 3s ease-in-out infinite;
  cursor: default;
  filter: drop-shadow(0 4px 8px rgba(74,144,217,0.2));
  transition: transform 0.2s;
}
.flower-icon:hover { transform: scale(1.3) rotate(15deg) !important; }
.flower-icon.big { font-size: 4rem; }

@keyframes bobble {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50%       { transform: translateY(-10px) rotate(5deg); }
}
.flower-char:nth-child(2) .flower-icon { animation-delay: -0.6s; }
.flower-char:nth-child(3) .flower-icon { animation-delay: -1.2s; }
.flower-char:nth-child(4) .flower-icon { animation-delay: -1.8s; }
.flower-char:nth-child(5) .flower-icon { animation-delay: -2.4s; }

/* Speech bubbles */
.speech-bubble {
  background: var(--white);
  border: 2px solid var(--blue-light);
  border-radius: 16px;
  padding: 0.45rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--black);
  white-space: nowrap;
  box-shadow: 0 2px 12px rgba(74,144,217,0.12);
  position: relative;
}
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--blue-light);
}
.speech-bubble.center::after { left: 50%; }
.speech-bubble.right::after { left: 70%; }

/* ---- HOME BUTTONS ---- */
.home-btns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin: 0 auto;
  max-width: 600px;
}

.home-card {
  background: var(--white);
  border: 2px solid rgba(74,144,217,0.15);
  border-radius: var(--radius);
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
  text-align: center;
  box-shadow: var(--shadow);
  font-family: 'Nunito', sans-serif;
}
.home-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-lg);
  border-color: var(--blue);
  background: linear-gradient(135deg, #fff 60%, #eef6ff);
}
.home-card-icon { font-size: 3rem; margin-bottom: 0.5rem; }
.home-card-label {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--blue);
  margin-bottom: 0.3rem;
}
.home-card-desc { font-size: 0.85rem; color: var(--gray); }

/* =============================================
   BUTTONS
============================================= */
.btn-primary {
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.8rem;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.34,1.56,.64,1);
  box-shadow: 0 3px 14px rgba(74,144,217,0.35);
  white-space: nowrap;
}
.btn-primary:hover {
  background: var(--blue-dark);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 20px rgba(74,144,217,0.4);
}
.btn-primary.full { width: 100%; }
.btn-primary.big  { padding: 0.9rem 2.5rem; font-size: 1.1rem; }

.btn-secondary {
  background: var(--white);
  color: var(--blue);
  border: 2px solid var(--blue);
  border-radius: 50px;
  padding: 0.65rem 1.5rem;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover { background: var(--bg2); transform: translateY(-2px); }
.btn-secondary.full { width: 100%; }

.btn-danger {
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.7rem 1.8rem;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-danger:hover { background: #c1121f; transform: translateY(-2px); }

.mt { margin-top: 0.8rem; }

/* =============================================
   FLASHCARD LIST SCREEN
============================================= */
.fc-main {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.fc-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.fc-header-row h2 { font-size: 1.6rem; color: var(--blue); }

.sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
}

.set-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.4rem;
  border: 2px solid rgba(74,144,217,0.12);
  box-shadow: var(--shadow);
  transition: all 0.2s cubic-bezier(.34,1.56,.64,1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.set-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--blue), var(--yellow));
}
.set-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--blue);
}
.set-card-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: 0.3rem;
}
.set-card-count {
  font-size: 0.82rem;
  color: var(--gray);
  margin-bottom: 1rem;
}
.set-card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn-small {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  border: 2px solid;
  transition: all 0.15s;
}
.btn-sm-blue { border-color: var(--blue); color: var(--blue); background: none; }
.btn-sm-blue:hover { background: var(--blue); color: #fff; }
.btn-sm-yellow { border-color: var(--yellow); color: #b8860b; background: none; }
.btn-sm-yellow:hover { background: var(--yellow); color: #000; }
.btn-sm-red { border-color: var(--red); color: var(--red); background: none; }
.btn-sm-red:hover { background: var(--red); color: #fff; }

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--gray);
  grid-column: 1/-1;
}
.empty-state .empty-icon { font-size: 4rem; margin-bottom: 1rem; }
.empty-state p { font-size: 1rem; }

/* =============================================
   CREATE / EDIT SET SCREEN
============================================= */
.create-main {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.set-name-row { margin-bottom: 1.5rem; }
.set-name-input {
  width: 100%;
  padding: 0.85rem 1.2rem;
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  border: 2px solid var(--blue-light);
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: var(--white);
}
.set-name-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(74,144,217,0.15);
}

.cards-edit-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-editor {
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.2rem;
  border: 2px solid rgba(74,144,217,0.15);
  box-shadow: var(--shadow);
  position: relative;
}
.card-editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}
.card-num {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--blue);
  background: var(--bg2);
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
}
.card-type-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gray);
  background: var(--gray-light);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}
.card-editor textarea,
.card-editor input[type="text"] {
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 2px solid #e0edf8;
  border-radius: var(--radius-sm);
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 0.5rem;
  background: var(--bg2);
}
.card-editor textarea:focus,
.card-editor input[type="text"]:focus {
  border-color: var(--blue);
  background: #fff;
}
.mc-options { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.3rem; }
.mc-option-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.mc-option-row input[type="text"] { flex: 1; margin-bottom: 0; }
.mc-option-row input[type="radio"] { width: 18px; height: 18px; accent-color: var(--green); cursor: pointer; flex-shrink: 0; }
.mc-option-label { font-size: 0.8rem; font-weight: 700; color: var(--gray); width: 14px; }
.correct-hint { font-size: 0.75rem; color: var(--green); font-weight: 700; }

.add-card-btns {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.save-row { text-align: center; margin-bottom: 0.5rem; }
.save-msg { text-align: center; font-weight: 700; font-size: 0.9rem; color: var(--green); min-height: 1.2rem; }

/* =============================================
   STUDY (FLIP) SCREEN
============================================= */
.study-main {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.flashcard-wrap { perspective: 1000px; }

.flashcard {
  width: min(420px, 90vw);
  height: 260px;
  cursor: pointer;
  transition: transform 0.15s;
}
.flashcard:hover { transform: scale(1.02); }
.flashcard:active { transform: scale(0.98); }

.flashcard-inner {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(.4,0,.2,1);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}
.flashcard-inner.flipped { transform: rotateY(180deg); }

.flashcard-front,
.flashcard-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
}
.flashcard-front {
  background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dark) 100%);
  color: #fff;
}
.flashcard-back {
  background: linear-gradient(135deg, var(--yellow) 0%, #f0b429 100%);
  color: var(--black);
  transform: rotateY(180deg);
}

.flip-hint { color: var(--gray); font-size: 0.85rem; text-align: center; margin-top: 0.5rem; }

.study-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* =============================================
   EXAM SCREEN
============================================= */
.exam-main {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#examContent { width: 100%; }

.exam-question-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  border: 2px solid rgba(74,144,217,0.12);
  margin-bottom: 1.5rem;
  animation: slideIn 0.3s ease both;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(30px); }
  to   { opacity: 1; transform: translateX(0); }
}

.exam-q-label {
  font-size: 0.8rem;
  color: var(--blue);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}
.exam-q-text {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--black);
  margin-bottom: 1.5rem;
}

/* MC Options */
.exam-mc-options { display: flex; flex-direction: column; gap: 0.7rem; }
.exam-mc-btn {
  background: var(--bg2);
  border: 2px solid #d1e8f7;
  border-radius: var(--radius-sm);
  padding: 0.85rem 1.2rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  display: flex;
  gap: 0.7rem;
  align-items: center;
}
.exam-mc-btn:hover:not(:disabled) { border-color: var(--blue); background: #eef6ff; transform: translateX(4px); }
.exam-mc-btn.correct { background: #d8f3dc; border-color: var(--green); color: #1b4332; }
.exam-mc-btn.wrong   { background: #ffe5e5; border-color: var(--red); color: #7f1d1d; }
.exam-mc-btn:disabled { cursor: default; transform: none; }
.option-letter {
  background: var(--blue);
  color: #fff;
  width: 26px; height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
}
.exam-mc-btn.correct .option-letter { background: var(--green); }
.exam-mc-btn.wrong   .option-letter { background: var(--red); }

/* Definition answer input */
.exam-def-input {
  width: 100%;
  padding: 0.85rem 1.2rem;
  border: 2px solid #d1e8f7;
  border-radius: var(--radius-sm);
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  outline: none;
  transition: border-color 0.2s;
  background: var(--bg2);
  margin-bottom: 0.8rem;
}
.exam-def-input:focus { border-color: var(--blue); background: #fff; }
.exam-def-input.correct { border-color: var(--green); background: #d8f3dc; }
.exam-def-input.wrong   { border-color: var(--red); background: #ffe5e5; }

/* Feedback section */
.exam-feedback {
  text-align: center;
  padding: 1.5rem;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 1.2rem;
  animation: popIn 0.4s cubic-bezier(.34,1.56,.64,1) both;
}
.feedback-flower { font-size: 4.5rem; animation: bounceFlower 0.6s cubic-bezier(.34,1.56,.64,1); }
@keyframes bounceFlower {
  0%   { transform: scale(0) rotate(-20deg); }
  60%  { transform: scale(1.3) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.feedback-correct .feedback-title { font-family: 'Baloo 2', sans-serif; font-size: 1.8rem; color: var(--green); font-weight: 800; }
.feedback-wrong .feedback-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 2rem;
  color: var(--red);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  animation: shake 0.5s ease;
}
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%,60% { transform: translateX(-8px); }
  40%,80% { transform: translateX(8px); }
}

.feedback-sub { font-size: 0.95rem; color: var(--gray); margin-top: 0.3rem; }

.reveal-btn {
  background: var(--yellow);
  border: none;
  border-radius: 50px;
  padding: 0.7rem 1.5rem;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 0.8rem;
  transition: all 0.2s;
  color: var(--black);
  box-shadow: 0 2px 10px rgba(245,200,66,0.4);
}
.reveal-btn:hover { background: #f0b429; transform: scale(1.05); }

.revealed-answer {
  background: var(--yellow-light);
  border: 2px dashed var(--yellow);
  border-radius: var(--radius-sm);
  padding: 0.9rem 1.2rem;
  margin-top: 0.8rem;
  font-weight: 800;
  font-size: 1rem;
  color: #7a5c00;
}

.next-btn-wrap { text-align: center; }

/* Score screen */
.score-screen {
  text-align: center;
  padding: 2rem 1rem;
  animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both;
}
.score-flower { font-size: 5rem; margin-bottom: 0.5rem; }
.score-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--blue);
  margin-bottom: 0.5rem;
}
.score-number {
  font-family: 'Baloo 2', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--black);
  line-height: 1;
  margin-bottom: 0.3rem;
}
.score-sub { font-size: 1.1rem; color: var(--gray); margin-bottom: 1.5rem; }
.score-msg { font-size: 1.3rem; font-weight: 700; color: var(--blue); margin-bottom: 1.5rem; }

/* =============================================
   MODALS
============================================= */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26,26,46,0.55);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}
.modal-overlay.hidden { display: none; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-box {
  background: var(--white);
  border-radius: 24px;
  padding: 2rem;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  animation: popIn 0.35s cubic-bezier(.34,1.56,.64,1) both;
  text-align: center;
}
.modal-box h2 { font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--black); }
.modal-flower { font-size: 3rem; margin-bottom: 0.5rem; }
.modal-desc { color: var(--gray); font-size: 0.95rem; margin-bottom: 1.2rem; }
.modal-btns { display: flex; gap: 0.7rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem; }

.exam-sets-list { display: flex; flex-direction: column; gap: 0.7rem; margin: 1rem 0; }
.exam-set-btn {
  background: var(--bg2);
  border: 2px solid #d1e8f7;
  border-radius: var(--radius-sm);
  padding: 0.85rem 1.2rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  font-size: 0.95rem;
  transition: all 0.2s;
  color: var(--black);
}
.exam-set-btn:hover { border-color: var(--blue); background: #eef6ff; transform: translateX(5px); }

/* =============================================
   RESPONSIVE
============================================= */
@media (max-width: 600px) {
  .welcome-banner h1 { font-size: 1.5rem; }
  .home-btns { grid-template-columns: 1fr; }
  .flowers-row { gap: 0.8rem; }
  .flower-icon { font-size: 2.2rem; }
  .flower-icon.big { font-size: 3rem; }
  .speech-bubble { font-size: 0.7rem; padding: 0.35rem 0.7rem; }
  .fc-header-row { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
  .add-card-btns { flex-direction: column; }
  .top-bar { padding: 0.8rem 1rem; }
  .logo { font-size: 1.1rem; }
  .flashcard { height: 200px; }
}

@media (max-width: 400px) {
  .login-card { padding: 2rem 1.2rem; }
  .login-title { font-size: 1.8rem; }
}

/* =============================================
   SCROLLBAR
============================================= */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--blue-light); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--blue); }

/* =============================================
   SELECTION
============================================= */
::selection { background: rgba(74,144,217,0.25); color: var(--black); }
