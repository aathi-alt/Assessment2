/* =========================================================
   AI & AUTOMATION ASSESSMENT — application logic
   ========================================================= */

(function(){
  "use strict";

  /* ---------------- State ---------------- */
  const TOTAL_SECONDS = 20 * 60; // 20-minute overall timer
  let state = {
    studentName: "",
    current: 0,
    answers: {},        // id -> { selectedIndex } or { text }
    secondsLeft: TOTAL_SECONDS,
    timerId: null,
    submitted: false
  };

  /* ---------------- Element refs ---------------- */
  const el = {
    screenStart: document.getElementById("screen-start"),
    screenQuiz: document.getElementById("screen-quiz"),
    screenResult: document.getElementById("screen-result"),

    nameInput: document.getElementById("student-name"),
    startBtn: document.getElementById("start-btn"),
    qCountStat: document.getElementById("stat-qcount"),

    timerRing: document.getElementById("timer-ring"),
    timerText: document.getElementById("timer-text"),
    progressPill: document.getElementById("progress-pill"),

    paletteGrid: document.getElementById("palette-grid"),
    submitSideBtn: document.getElementById("submit-side-btn"),

    qCard: document.getElementById("question-card"),

    prevBtn: document.getElementById("prev-btn"),
    nextBtn: document.getElementById("next-btn"),
    submitBtn: document.getElementById("submit-btn"),

    resultBody: document.getElementById("result-body"),

    confirmModalEl: document.getElementById("confirmModal"),
  };

  const bsConfirmModal = new bootstrap.Modal(el.confirmModalEl);

  /* ---------------- Helpers ---------------- */
  function fmtTime(totalSeconds){
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function showScreen(name){
    [el.screenStart, el.screenQuiz, el.screenResult].forEach(s => s.classList.remove("is-active"));
    if(name === "start") el.screenStart.classList.add("is-active");
    if(name === "quiz") el.screenQuiz.classList.add("is-active");
    if(name === "result") el.screenResult.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function isAnswered(q){
    const a = state.answers[q.id];
    if(!a) return false;
    if(q.type === "mcq") return typeof a.selectedIndex === "number";
    return typeof a.text === "string" && a.text.trim().length > 0;
  }

  function countAnswered(){
    return QUESTIONS.filter(isAnswered).length;
  }

  /* ---------------- Init statics ---------------- */
  function initStartScreen(){
    el.qCountStat.textContent = QUESTIONS.length;
  }

  /* ---------------- Timer ---------------- */
  function startTimer(){
    updateTimerUI();
    state.timerId = setInterval(() => {
      state.secondsLeft--;
      if(state.secondsLeft <= 0){
        state.secondsLeft = 0;
        updateTimerUI();
        clearInterval(state.timerId);
        submitQuiz(true);
        return;
      }
      updateTimerUI();
    }, 1000);
  }

  function updateTimerUI(){
    const pct = Math.max(0, (state.secondsLeft / TOTAL_SECONDS) * 100);
    el.timerRing.style.setProperty("--pct", pct.toFixed(2));
    el.timerText.textContent = fmtTime(state.secondsLeft);
    el.timerRing.classList.toggle("is-low", state.secondsLeft <= 120);
  }

  /* ---------------- Palette ---------------- */
  function renderPalette(){
    el.paletteGrid.innerHTML = "";
    QUESTIONS.forEach((q, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "palette-btn";
      btn.textContent = (i + 1).toString();
      btn.setAttribute("aria-label", `Go to question ${i + 1}`);
      if(isAnswered(q)) btn.classList.add("is-answered");
      if(i === state.current) btn.classList.add("is-current");
      btn.addEventListener("click", () => { state.current = i; render(); });
      el.paletteGrid.appendChild(btn);
    });
  }

  /* ---------------- Question rendering ---------------- */
  function diffTagClass(d){
    return d === "easy" ? "tag-diff-easy" : d === "hard" ? "tag-diff-hard" : "tag-diff-intermediate";
  }

  function renderQuestion(){
    const q = QUESTIONS[state.current];
    const saved = state.answers[q.id];

    let bodyHtml = "";
    if(q.type === "mcq"){
      bodyHtml = `<div class="options-list" role="radiogroup" aria-label="Answer options">`;
      q.options.forEach((opt, i) => {
        const selected = saved && saved.selectedIndex === i;
        bodyHtml += `
          <label class="option-row ${selected ? "is-selected" : ""}" data-index="${i}">
            <input type="radio" name="opt-${q.id}" value="${i}" ${selected ? "checked" : ""}>
            <span class="option-marker">${String.fromCharCode(65 + i)}</span>
            <span class="option-text">${opt}</span>
          </label>`;
      });
      bodyHtml += `</div>`;
    } else {
      const val = saved && saved.text ? saved.text : "";
      bodyHtml = `
        <div class="text-answer-wrap">
          <textarea id="text-answer" placeholder="Type your answer here…">${val.replace(/</g,"&lt;")}</textarea>
          <div class="text-answer-hint">Short-answer / definition / problem-solving — a few sentences is enough.</div>
        </div>`;
    }

    el.qCard.innerHTML = `
      <div class="q-meta-row">
        <span class="tag tag-topic">${q.topic}</span>
        <span class="tag ${diffTagClass(q.difficulty)}">${q.difficulty}</span>
        <span class="tag tag-type">${q.type === "mcq" ? "Multiple choice" : "Written answer"}</span>
      </div>
      <div class="q-text">${state.current + 1}. ${q.question}</div>
      ${bodyHtml}
      <div class="q-nav-row">
        <span class="spacer-note">${countAnswered()} / ${QUESTIONS.length} answered</span>
      </div>
    `;

    if(q.type === "mcq"){
      el.qCard.querySelectorAll(".option-row").forEach(row => {
        row.addEventListener("click", () => {
          const idx = parseInt(row.getAttribute("data-index"), 10);
          state.answers[q.id] = { selectedIndex: idx };
          render();
        });
      });
    } else {
      const ta = document.getElementById("text-answer");
      ta.addEventListener("input", () => {
        state.answers[q.id] = { text: ta.value };
        // live-update palette + progress without a full re-render (keeps focus in textarea)
        renderPalette();
        updateProgressPill();
      });
    }
  }

  function updateProgressPill(){
    el.progressPill.textContent = `Question ${state.current + 1} of ${QUESTIONS.length}`;
  }

  function updateNavButtons(){
    el.prevBtn.disabled = state.current === 0;
    el.nextBtn.classList.toggle("hidden", state.current === QUESTIONS.length - 1);
    el.submitBtn.classList.toggle("hidden", state.current !== QUESTIONS.length - 1);
  }

  function render(){
    renderPalette();
    renderQuestion();
    updateProgressPill();
    updateNavButtons();
  }

  /* ---------------- Grading ---------------- */
  function gradeText(q, rawText){
    const text = (rawText || "").toLowerCase();
    if(!text.trim()) return false;
    const hits = q.keywords.filter(k => text.includes(k.toLowerCase())).length;
    const threshold = Math.min(2, q.keywords.length); // need at least 2 keyword hits (or all, if fewer than 2 keywords)
    return hits >= threshold;
  }

  function gradeAll(){
    const results = [];
    let correctCount = 0;
    const topicTally = {};

    QUESTIONS.forEach(q => {
      const a = state.answers[q.id];
      let correct = false;
      let userAnswerDisplay = "";

      if(q.type === "mcq"){
        const sel = a ? a.selectedIndex : undefined;
        correct = sel === q.answerIndex;
        userAnswerDisplay = typeof sel === "number" ? q.options[sel] : "— No answer given —";
      } else {
        const txt = a ? a.text : "";
        correct = gradeText(q, txt);
        userAnswerDisplay = txt && txt.trim() ? txt.trim() : "— No answer given —";
      }

      if(correct) correctCount++;

      if(!topicTally[q.topic]) topicTally[q.topic] = { correct: 0, total: 0 };
      topicTally[q.topic].total++;
      if(correct) topicTally[q.topic].correct++;

      results.push({
        q, correct, userAnswerDisplay,
        correctAnswerDisplay: q.type === "mcq" ? q.options[q.answerIndex] : q.correctAnswer
      });
    });

    return { results, correctCount, total: QUESTIONS.length, topicTally };
  }

  /* ---------------- Result rendering ---------------- */
  function remarkFor(pct){
    if(pct >= 90) return "Outstanding — you've clearly internalized the material.";
    if(pct >= 75) return "Strong grasp overall, with a few gaps worth revisiting.";
    if(pct >= 50) return "Solid foundation — review the flagged topics below.";
    return "Worth another pass through the material before the next assessment.";
  }

  function renderResults(){
    const { results, correctCount, total, topicTally } = gradeAll();
    const pct = Math.round((correctCount / total) * 100);

    const topicRowsHtml = Object.keys(topicTally).map(topic => {
      const t = topicTally[topic];
      const tp = Math.round((t.correct / t.total) * 100);
      return `
        <div class="topic-row">
          <div class="t-name">${topic}</div>
          <div class="t-bar"><span style="width:${tp}%"></span></div>
          <div class="t-score">${t.correct}/${t.total}</div>
        </div>`;
    }).join("");

    const nameLine = state.studentName ? `<div class="eyebrow" style="margin-bottom:.9rem;">Assessment result — ${state.studentName}</div>` : `<div class="eyebrow" style="margin-bottom:.9rem;">Assessment result</div>`;

    const reviewHtml = results.map((r, i) => `
      <div class="review-item ${r.correct ? "is-correct" : "is-wrong"}" data-aos="fade-up" data-aos-delay="${Math.min(i * 15, 300)}">
        <div class="review-head">
          <span class="review-badge ${r.correct ? "ok" : "no"}">${r.correct ? "✓" : "✕"}</span>
          <div class="review-q">${i + 1}. ${r.q.question}</div>
        </div>
        <div class="review-block">
          <span class="k">Your answer</span>
          <span class="v ${r.correct ? "" : "wrong-answer"}">${escapeHtml(r.userAnswerDisplay)}</span>
        </div>
        ${!r.correct ? `
        <div class="review-block">
          <span class="k">Correct answer</span>
          <span class="v right-answer">${escapeHtml(r.correctAnswerDisplay)}</span>
        </div>` : ``}
        <div class="review-explain"><strong style="color:var(--gold-soft)">Why: </strong>${r.q.explanation}</div>
      </div>
    `).join("");

    el.resultBody.innerHTML = `
      ${nameLine}
      <div class="score-hero" data-aos="fade-up">
        <div class="score-ring" style="--pct:${pct}">
          <div class="score-ring-inner">
            <div class="pct">${pct}%</div>
            <div class="frac">${correctCount} / ${total} correct</div>
          </div>
        </div>
        <div>
          <h2 class="font-display" style="margin:0 0 .3rem;font-weight:600;">Your Score</h2>
          <p class="score-remark">${remarkFor(pct)}</p>
          <div class="topic-breakdown">${topicRowsHtml}</div>
        </div>
      </div>

      <h3 class="review-title font-display">Question-by-question review</h3>
      ${reviewHtml}

      <div class="result-actions">
        <button class="btn-gold" id="retake-btn" type="button">Retake Assessment</button>
      </div>
    `;

    document.getElementById("retake-btn").addEventListener("click", resetQuiz);

    if(window.AOS) AOS.refreshHard();
  }

  function escapeHtml(str){
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------------- Flow control ---------------- */
  function submitQuiz(auto){
    if(state.submitted) return;
    state.submitted = true;
    clearInterval(state.timerId);
    renderResults();
    showScreen("result");
  }

  function resetQuiz(){
    state = {
      studentName: state.studentName,
      current: 0,
      answers: {},
      secondsLeft: TOTAL_SECONDS,
      timerId: null,
      submitted: false
    };
    el.nameInput.value = state.studentName;
    showScreen("start");
  }

  function beginQuiz(){
    state.studentName = el.nameInput.value.trim();
    showScreen("quiz");
    render();
    startTimer();
    if(window.AOS) AOS.refreshHard();
  }

  /* ---------------- Wire up events ---------------- */
  el.startBtn.addEventListener("click", beginQuiz);

  el.prevBtn.addEventListener("click", () => {
    if(state.current > 0){ state.current--; render(); }
  });
  el.nextBtn.addEventListener("click", () => {
    if(state.current < QUESTIONS.length - 1){ state.current++; render(); }
  });

  el.submitBtn.addEventListener("click", () => {
    const answered = countAnswered();
    const unanswered = QUESTIONS.length - answered;
    document.getElementById("confirm-unanswered-line").textContent =
      unanswered === 0
        ? "You've answered every question."
        : `You still have ${unanswered} question${unanswered === 1 ? "" : "s"} unanswered.`;
    bsConfirmModal.show();
  });

  document.getElementById("confirm-submit-btn").addEventListener("click", () => {
    bsConfirmModal.hide();
    submitQuiz(false);
  });

  /* ---------------- Boot ---------------- */
  initStartScreen();
  showScreen("start");
  if(window.AOS) AOS.init({ duration: 650, easing: "ease-out-cubic", once: true });

})();
