// B1 English — Quiz Controller (Trinity GESE Grade 5)
// Rewritten to match Life in the UK course architecture
(function(){
"use strict";

var STORAGE_KEY = "b1English";
var QUIZ_SIZE = 10;
var PASS_MARK = 70;

var state = {
  lang: "fa",
  view: "home", // home, quiz, speaking, guide, results, study
  mode: "grammar", // grammar, vocabulary
  questions: [],
  currentIndex: 0,
  answers: {},
  score: 0,
  filter: null,
  difficultyFilter: null,
  speakingIndex: 0,
  speakingViewed: [],
  guideRead: [],
  history: [],
  totalAttempts: 0,
  bestScore: 0,
  passed: 0,
  promptsViewed: 0
};

function t(key){ return state.lang === "fa" ? key + "Fa" : key + "En"; }

// ===== DATA HELPERS =====
function getGrammarInfo(){
  return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.grammarInfo) || {};
}
function getTopicInfo(){
  return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.topicInfo) || {};
}
function getGrammarQuestions(){
  return (window.B1_ENGLISH_DATA && window.B1_ENGLISH_DATA.grammarQuestions) || [];
}
function getVocabQuestions(){
  return (window.B1_ENGLISH_DATA && window.B1_ENGLISH_DATA.vocabularyQuestions) || [];
}
function getSpeakingPrompts(){
  return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.speakingPrompts) || [];
}
function getTopicGuide(){
  return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.topicGuide) || [];
}

// ===== PERSISTENCE =====
function save(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({
    history: state.history, totalAttempts: state.totalAttempts,
    bestScore: state.bestScore, passed: state.passed, lang: state.lang,
    speakingViewed: state.speakingViewed, guideRead: state.guideRead,
    promptsViewed: state.promptsViewed
  })); }catch(e){}
}

function load(){
  try{
    var d = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(d){
      state.history = d.history || [];
      state.totalAttempts = d.totalAttempts || 0;
      state.bestScore = d.bestScore || 0;
      state.passed = d.passed || 0;
      if(d.lang) state.lang = d.lang;
      state.speakingViewed = d.speakingViewed || [];
      state.guideRead = d.guideRead || [];
      state.promptsViewed = d.promptsViewed || 0;
    }
  }catch(e){}
}

// ===== UTILS =====
function shuffle(arr){
  var a = arr.slice();
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function getDiffLabel(d){
  var m = { easy: { fa: "آسان", en: "Easy" }, medium: { fa: "متوسط", en: "Medium" }, hard: { fa: "سخت", en: "Hard" } };
  return m[d] ? m[d][state.lang] : d;
}

function getDiffColor(d){
  return d === "easy" ? "#00b894" : d === "medium" ? "#fdcb6e" : "#d63031";
}

// ===== QUIZ LOGIC =====
function startQuiz(mode, filter, diff){
  state.mode = mode || "grammar";
  state.filter = filter || null;
  state.difficultyFilter = diff || null;
  var pool = [];

  if(state.mode === "grammar"){
    pool = getGrammarQuestions();
    if(state.filter) pool = pool.filter(function(q){ return q.grammar === state.filter; });
  } else {
    pool = getVocabQuestions();
    if(state.filter) pool = pool.filter(function(q){ return q.topic === state.filter; });
  }

  if(state.difficultyFilter){
    pool = pool.filter(function(q){ return q.difficulty === state.difficultyFilter; });
  }

  if(pool.length < QUIZ_SIZE){
    if(state.mode === "grammar") pool = getGrammarQuestions();
    else pool = getVocabQuestions();
  }

  state.questions = shuffle(pool).slice(0, QUIZ_SIZE);
  state.currentIndex = 0;
  state.answers = {};
  state.score = 0;
  state.view = "quiz";
  render();
}

function handleAnswer(optionId){
  if(state.answers[state.currentIndex]) return;
  var q = state.questions[state.currentIndex];
  state.answers[state.currentIndex] = optionId;
  if(optionId === q.correctOption) state.score++;

  if(state.currentIndex < state.questions.length - 1){
    setTimeout(function(){ state.currentIndex++; render(); }, 400);
  } else {
    state.totalAttempts++;
    if(state.score > state.bestScore) state.bestScore = state.score;
    var pct = Math.round((state.score / state.questions.length) * 100);
    if(pct >= PASS_MARK) state.passed++;
    state.history.unshift({
      date: new Date().toISOString(),
      score: state.score,
      total: state.questions.length,
      pct: pct,
      passed: pct >= PASS_MARK,
      mode: state.mode,
      filter: state.filter
    });
    if(state.history.length > 50) state.history = state.history.slice(0, 50);
    save();
    setTimeout(function(){ state.view = "results"; render(); }, 600);
  }
  render();
}

// ===== SPEAKING =====
function startSpeaking(){
  state.view = "speaking";
  state.speakingIndex = 0;
  render();
}

function navigateSpeaking(dir){
  var prompts = getSpeakingPrompts();
  var idx = state.speakingIndex + dir;
  if(idx < 0 || idx >= prompts.length) return;
  state.speakingIndex = idx;
  markPromptViewed(state.speakingIndex);
  render();
}

function markPromptViewed(idx){
  if(state.speakingViewed.indexOf(idx) === -1){
    state.speakingViewed.push(idx);
    state.promptsViewed = state.speakingViewed.length;
    save();
  }
}

// ===== GUIDE =====
function toggleGuideSection(idx){
  var i = state.guideRead.indexOf(idx);
  if(i === -1){
    state.guideRead.push(idx);
    save();
  }
  var el = document.getElementById("guide-body-" + idx);
  var hdr = document.getElementById("guide-hdr-" + idx);
  if(el) el.classList.toggle("open");
  if(hdr) hdr.classList.toggle("open");
  var card = document.getElementById("guide-card-" + idx);
  if(card) card.classList.toggle("open");
  var btn = document.getElementById("guide-mark-" + idx);
  if(btn){
    if(state.guideRead.indexOf(idx) !== -1){
      btn.textContent = state.lang === "fa" ? "✓ خوانده شد" : "✓ Read";
      btn.classList.add("done");
    }
  }
}

// ===== NAV =====
function nav(view){ state.view = view; render(); }

function toggleLang(){
  state.lang = state.lang === "fa" ? "en" : "fa";
  save(); render();
}

// ===== RENDER =====
function render(){
  var app = document.getElementById("app");
  if(!app) return;
  switch(state.view){
    case "home": app.innerHTML = renderHome(); break;
    case "study": app.innerHTML = renderStudy(); break;
    case "quiz": app.innerHTML = renderQuiz(); break;
    case "speaking": app.innerHTML = renderSpeaking(); break;
    case "guide": app.innerHTML = renderGuide(); break;
    case "results": app.innerHTML = renderResults(); break;
  }
  bindEvents();
  updateProgress();
}

function updateProgress(){
  var el = document.getElementById("progress-bar");
  if(!el) return;
  if(state.view === "quiz"){
    var pct = ((state.currentIndex) / state.questions.length) * 100;
    el.style.width = pct + "%";
    el.style.display = "block";
    var cnt = document.getElementById("progress-count");
    if(cnt) cnt.textContent = (state.currentIndex + 1) + "/" + state.questions.length;
  } else {
    el.style.display = "none";
  }
}

// ===== HEADER (Life in the UK pattern) =====
function renderHeader(){
  var isFA = state.lang === "fa";
  return '<header class="app-header">' +
    '<div class="header-left">' +
    '<button id="btn-home" class="icon-btn">&#9664;</button>' +
    '</div>' +
    '<div class="header-center">' +
    '<h1 class="header-title">' + (isFA ? "آمادگی آزمون B1" : "B1 English Test Prep") + '</h1>' +
    '</div>' +
    '<div class="header-right">' +
    '<button id="btn-lang" class="lang-toggle">' + (isFA ? "EN" : "فا") + '</button>' +
    '</div>' +
    '</header>';
}

// ===== HOME VIEW (Life in the UK pattern) =====
function renderHome(){
  var isFA = state.lang === "fa";
  var grammarQs = getGrammarQuestions();
  var vocabQs = getVocabQuestions();
  var prompts = getSpeakingPrompts();
  var gInfo = getGrammarInfo();
  var tInfo = getTopicInfo();
  var passRate = state.totalAttempts > 0 ? Math.round((state.passed / state.totalAttempts) * 100) : 0;
  var totalQs = grammarQs.length + vocabQs.length;

  // Count by category/topic
  var grammarCats = {};
  for(var i = 0; i < grammarQs.length; i++){
    var g = grammarQs[i].grammar;
    if(!grammarCats[g]) grammarCats[g] = 0;
    grammarCats[g]++;
  }
  var vocabTopics = {};
  for(var j = 0; j < vocabQs.length; j++){
    var v = vocabQs[j].topic;
    if(!vocabTopics[v]) vocabTopics[v] = 0;
    vocabTopics[v]++;
  }

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';
  html += '<main class="container">';

  // Stats bar (4 cards like Life in the UK)
  html += '<div class="stats-bar">' +
    '<div class="stat-card"><div class="stat-num">' + totalQs + '</div><div class="stat-label">' + (isFA ? "سوال" : "Questions") + '</div></div>' +
    '<div class="stat-card"><div class="stat-num">' + QUIZ_SIZE + '</div><div class="stat-label">' + (isFA ? "سوال هر آزمون" : "Per Quiz") + '</div></div>' +
    '<div class="stat-card"><div class="stat-num">' + state.totalAttempts + '</div><div class="stat-label">' + (isFA ? "تلاش" : "Attempts") + '</div></div>' +
    '<div class="stat-card"><div class="stat-num">' + passRate + '%</div><div class="stat-label">' + (isFA ? "نرخ قبولی" : "Pass Rate") + '</div></div>' +
    '</div>';

  // Quick Start
  html += '<section class="section"><h2 class="section-title">' + (isFA ? "شروع سریع" : "Quick Start") + '</h2>' +
    '<div class="quick-start">' +
    '<button id="btn-quiz-all" class="btn btn-primary btn-large">' + (isFA ? "آزمون تصادفی ۱۰ سوالی" : "Random 10-Question Quiz") + '</button>' +
    '</div></section>';

  // Mode Filter (3 cards like Life in the UK topic filter)
  html += '<section class="section"><h2 class="section-title">' + (isFA ? "آزمون بر اساس حالت" : "Quiz by Mode") + '</h2>' +
    '<div class="mode-grid">' +
    '<button data-mode="grammar" class="mode-card" style="border-color:#4361ee">' +
    '<div class="mode-icon" style="background:#4361ee15;color:#4361ee">📝</div>' +
    '<div class="mode-info"><div class="mode-title">' + (isFA ? "آزمون گرامر" : "Grammar Quiz") + '</div>' +
    '<div class="mode-meta">' + grammarQs.length + ' ' + (isFA ? "سوال" : "questions") + '</div></div></button>' +

    '<button data-mode="vocabulary" class="mode-card" style="border-color:#e84393">' +
    '<div class="mode-icon" style="background:#e8439315;color:#e84393">📚</div>' +
    '<div class="mode-info"><div class="mode-title">' + (isFA ? "آزمون واژگان" : "Vocabulary Quiz") + '</div>' +
    '<div class="mode-meta">' + vocabQs.length + ' ' + (isFA ? "سوال" : "questions") + '</div></div></button>' +

    '<button id="btn-speaking-home" class="mode-card" style="border-color:#00b894">' +
    '<div class="mode-icon" style="background:#00b89415;color:#00b894">🗣</div>' +
    '<div class="mode-info"><div class="mode-title">' + (isFA ? "آمادگی صحبت" : "Speaking Prep") + '</div>' +
    '<div class="mode-meta">' + prompts.length + ' ' + (isFA ? "پامپت" : "prompts") + ' · ' + state.promptsViewed + ' ' + (isFA ? "دیده شده" : "viewed") + '</div></div></button>' +
    '</div></section>';

  // Grammar Category Grid (like Life in the UK topic grid)
  html += '<section class="section"><h2 class="section-title">' + (isFA ? "دسته‌بندی گرامر" : "Grammar Categories") + '</h2>' +
    '<div class="topic-grid">';
  var gKeys = Object.keys(gInfo);
  for(var gi = 0; gi < gKeys.length; gi++){
    var gk = gKeys[gi];
    var gdata = gInfo[gk];
    html += '<button data-quiz="grammar" data-filter="' + gk + '" class="topic-card topic-filter-btn" style="border-color:' + gdata.color + '">' +
      '<div class="topic-name">' + (isFA ? gdata.fa : gdata.en) + '</div>' +
      '<div class="topic-count">' + (grammarCats[gk] || 0) + ' ' + (isFA ? "سوال" : "qs") + '</div>' +
      '</button>';
  }
  html += '</div></section>';

  // Vocab Topic Grid (like Life in the UK topic grid)
  html += '<section class="section"><h2 class="section-title">' + (isFA ? "موضوعات واژگان" : "Vocabulary Topics") + '</h2>' +
    '<div class="topic-grid">';
  var tKeys = Object.keys(tInfo);
  for(var ti = 0; ti < tKeys.length; ti++){
    var tk = tKeys[ti];
    var tdata = tInfo[tk];
    html += '<button data-quiz="vocabulary" data-filter="' + tk + '" class="topic-card topic-filter-btn" style="border-color:' + tdata.color + '">' +
      '<div class="topic-name">' + (isFA ? tdata.fa : tdata.en) + '</div>' +
      '<div class="topic-count">' + (vocabTopics[tk] || 0) + ' ' + (isFA ? "سوال" : "qs") + '</div>' +
      '</button>';
  }
  html += '</div></section>';

  // Difficulty Filter (like Life in the UK)
  html += '<section class="section"><h2 class="section-title">' + (isFA ? "آزمون بر اساس سختی" : "Quiz by Difficulty") + '</h2>' +
    '<div class="diff-grid">' +
    '<button data-diff="easy" class="diff-card diff-btn" style="border-color:#00b894"><div>' + getDiffLabel("easy") + '</div></button>' +
    '<button data-diff="medium" class="diff-card diff-btn" style="border-color:#fdcb6e"><div>' + getDiffLabel("medium") + '</div></button>' +
    '<button data-diff="hard" class="diff-card diff-btn" style="border-color:#d63031"><div>' + getDiffLabel("hard") + '</div></button>' +
    '</div></section>';

  // Study Mode (like Life in the UK)
  html += '<section class="section"><h2 class="section-title">' + (isFA ? "مطالعه آزاد" : "Study Mode") + '</h2>' +
    '<div class="quick-start">' +
    '<button id="btn-study" class="btn btn-secondary btn-large">' + (isFA ? "مشاهده همه سوالات و پاسخ‌ها" : "View All Questions and Answers") + '</button>' +
    '</div></section>';

  // History (like Life in the UK)
  if(state.history.length > 0){
    html += '<section class="section"><h2 class="section-title">' + (isFA ? "تاریخچه" : "History") + '</h2>' +
      '<div class="history-list">';
    var show = Math.min(state.history.length, 10);
    for(var h = 0; h < show; h++){
      var item = state.history[h];
      var dd = new Date(item.date);
      var dateStr = dd.toLocaleDateString(isFA ? "fa-IR" : "en-GB");
      var modeLabel = item.mode === "grammar" ? (isFA ? "گرامر" : "Grammar") : (isFA ? "واژگان" : "Vocab");
      html += '<div class="history-item ' + (item.passed ? "passed" : "failed") + '">' +
        '<div><div class="hist-score">' + item.score + '/' + item.total + '</div>' +
        '<div class="hist-mode">' + modeLabel + '</div></div>' +
        '<div><div class="hist-pct">' + item.pct + '%</div>' +
        '<div class="hist-date">' + dateStr + '</div></div></div>';
    }
    html += '</div></section>';
  }

  html += '<footer class="credit">' + (isFA ? "ساخته شده توسط نیما حکیم‌مانی" : "Crafted by Nima Hakimmaani") + '</footer>';
  html += '</main>';
  return html;
}

// ===== STUDY VIEW (Life in the UK pattern) =====
function renderStudy(){
  var isFA = state.lang === "fa";
  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';
  html += '<main class="container">';
  html += '<div class="study-header"><button id="btn-back-study" class="btn btn-secondary">' + (isFA ? "بازگشت" : "Back") + '</button></div>';

  // Grammar questions
  var grammarQs = getGrammarQuestions();
  var gInfo = getGrammarInfo();
  html += '<h2 class="section-title" style="margin-bottom:12px">' + (isFA ? "سوالات گرامر" : "Grammar Questions") + '</h2>';
  var currentCat = "";
  for(var i = 0; i < grammarQs.length; i++){
    var q = grammarQs[i];
    if(q.grammar !== currentCat){
      currentCat = q.grammar;
      var gi = gInfo[currentCat] || {};
      html += '<div class="study-topic-divider" style="background:' + (gi.color || "#4361ee") + '">' +
        '<span>' + (isFA ? (gi.fa || currentCat) : (gi.en || currentCat)) + '</span></div>';
    }
    html += renderStudyQuestion(q, i + 1);
  }

  // Vocabulary questions
  var vocabQs = getVocabQuestions();
  var tInfo = getTopicInfo();
  html += '<h2 class="section-title" style="margin-top:24px;margin-bottom:12px">' + (isFA ? "سوالات واژگان" : "Vocabulary Questions") + '</h2>';
  var currentTopic = "";
  for(var j = 0; j < vocabQs.length; j++){
    var vq = vocabQs[j];
    if(vq.topic !== currentTopic){
      currentTopic = vq.topic;
      var ti = tInfo[currentTopic] || {};
      html += '<div class="study-topic-divider" style="background:' + (ti.color || "#e84393") + '">' +
        '<span>' + (isFA ? (ti.fa || currentTopic) : (ti.en || currentTopic)) + '</span></div>';
    }
    html += renderStudyQuestion(vq, grammarQs.length + j + 1);
  }

  html += '</main>';
  return html;
}

function renderStudyQuestion(q, num){
  var isFA = state.lang === "fa";
  var html = '<div class="study-card">' +
    '<div class="study-q-num">' + num + '</div>' +
    '<div class="study-question">' + q[t("question")] + '</div>' +
    '<div class="study-question-en en-text">' + q.questionEn + '</div>' +
    '<div class="study-options">';
  var optLabels = { a: "A", b: "B", c: "C", d: "D" };
  for(var k = 0; k < q.options.length; k++){
    var opt = q.options[k];
    var isCorrect = opt.id === q.correctOption;
    html += '<div class="study-option ' + (isCorrect ? "correct" : "") + '">' +
      '<span class="opt-label">' + optLabels[opt.id] + '</span> ' +
      '<span>' + opt[t("text")] + '</span>' +
      (isFA ? '<span class="en-text" style="font-size:0.8em;color:#888;margin-right:6px"> ' + opt.textEn + '</span>' : '') +
      '</div>';
  }
  html += '</div>' +
    '<div class="study-explanation">' + q[t("explanation")] + '</div>' +
    '</div>';
  return html;
}

// ===== QUIZ VIEW (Life in the UK pattern) =====
function renderQuiz(){
  var isFA = state.lang === "fa";
  var q = state.questions[state.currentIndex];
  if(!q) return renderHeader() + '<main class="container"><p>' + (isFA ? "خطا" : "Error") + '</p></main>';

  var idx = state.currentIndex;
  var total = state.questions.length;
  var answered = state.answers[idx];
  var isCorrect = answered === q.correctOption;

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div>' +
    '<span id="progress-count" class="progress-count">' + (idx + 1) + '/' + total + '</span></div>';

  html += '<main class="container">' +
    '<div class="quiz-card">' +
    '<div class="quiz-meta">' +
    '<span class="quiz-num">' + (isFA ? "سوال " : "Question ") + (idx + 1) + '</span>';

  // Mode label
  var modeLabel = state.mode === "grammar" ? (isFA ? "گرامر" : "Grammar") : (isFA ? "واژگان" : "Vocabulary");
  var modeColor = state.mode === "grammar" ? "#4361ee" : "#e84393";
  html += '<span class="quiz-topic" style="color:' + modeColor + '">' + modeLabel + '</span>';

  // Category/topic badge
  if(state.mode === "grammar"){
    var gInfo = getGrammarInfo();
    var gi = gInfo[q.grammar];
    if(gi) html += '<span class="quiz-topic" style="color:' + gi.color + '">' + (isFA ? gi.fa : gi.en) + '</span>';
  } else {
    var tInfo = getTopicInfo();
    var ti = tInfo[q.topic];
    if(ti) html += '<span class="quiz-topic" style="color:' + ti.color + '">' + (isFA ? ti.fa : ti.en) + '</span>';
  }

  // Difficulty badge
  html += '<span class="quiz-diff" style="color:' + getDiffColor(q.difficulty) + '">' + getDiffLabel(q.difficulty) + '</span>';
  html += '</div>';

  // Question text
  html += '<div class="quiz-question">' + q[t("question")] + '</div>' +
    '<div class="quiz-question-en en-text">' + q.questionEn + '</div>';

  // Options (Life in the UK quiz-option pattern)
  html += '<div class="quiz-options">';
  var optLabels = { a: "A", b: "B", c: "C", d: "D" };
  for(var i = 0; i < q.options.length; i++){
    var opt = q.options[i];
    var cls = "quiz-option";
    if(answered){
      if(opt.id === q.correctOption) cls += " correct";
      else if(opt.id === answered && !isCorrect) cls += " wrong";
    }
    html += '<button data-opt="' + opt.id + '" class="' + cls + '">' +
      '<span class="opt-label">' + optLabels[opt.id] + '</span>' +
      '<span class="opt-text">' + opt[t("text")] +
      (state.lang === "fa" ? '<span class="en-text"> ' + opt.textEn + '</span>' : '') +
      '</span></button>';
  }
  html += '</div>';

  // Feedback (Life in the UK quiz-feedback pattern)
  if(answered){
    html += '<div class="quiz-feedback">' +
      '<div class="feedback-icon">' + (isCorrect ? "✓" : "✗") + '</div>' +
      '<div class="feedback-text">' + (isCorrect ? (isFA ? "آفرین! پاسخ درست است." : "Correct!") : (isFA ? "پاسخ اشتباه بود." : "Incorrect!")) + '</div>' +
      '<div class="feedback-explanation">' + q[t("explanation")] +
      '<div class="feedback-explanation-en en-text">' + q.explanationEn + '</div></div>' +
      '</div>';
  }

  html += '</div></main>';
  return html;
}

// ===== SPEAKING VIEW (styled consistently with Life in the UK header/progress pattern) =====
function renderSpeaking(){
  var isFA = state.lang === "fa";
  var prompts = getSpeakingPrompts();
  if(prompts.length === 0) return renderHeader() + '<main class="container"><p>' + (isFA ? "داده‌ای یافت نشد" : "No data") + '</p></main>';

  var p = prompts[state.speakingIndex];
  if(!p) state.speakingIndex = 0;
  p = prompts[state.speakingIndex];

  var tInfo = getTopicInfo();
  var topicData = tInfo[p.topic] || {};
  var topicColor = topicData.color || "#4361ee";
  var topicIcon = topicData.icon || "💬";
  var topicName = isFA ? (topicData.fa || p.topic) : (topicData.en || p.topic);

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';

  html += '<main class="container">';

  // Nav bar
  html += '<div class="speaking-nav">' +
    '<button class="speaking-nav-btn" id="sp-prev"' + (state.speakingIndex === 0 ? " disabled" : "") + '>' + (isFA ? "قبلی" : "Prev") + '</button>' +
    '<span class="speaking-counter">' + (state.speakingIndex + 1) + '/' + prompts.length + '</span>' +
    '<button class="speaking-nav-btn" id="sp-next"' + (state.speakingIndex === prompts.length - 1 ? " disabled" : "") + '>' + (isFA ? "بعدی" : "Next") + '</button></div>';

  // Prompt card
  html += '<div class="speaking-card">';
  html += '<span class="speaking-topic-tag" style="background:' + topicColor + '15;color:' + topicColor + '">' + topicIcon + ' ' + topicName + '</span>';
  html += '<div class="speaking-prompt">' + p.promptFa + '</div>';
  html += '<div class="speaking-prompt-en en-text">' + p.promptEn + '</div>';

  // Reveal button
  var isRevealed = state.speakingViewed.indexOf(state.speakingIndex) !== -1;
  html += '<button class="reveal-answer-btn' + (isRevealed ? " revealed" : "") + '" id="sp-reveal">' +
    (isRevealed ? (isFA ? "✓ پاسخ نمونه نمایش داده شد" : "✓ Model answer shown") : (isFA ? "👁 نمایش پاسخ نمونه" : "👁 Show Model Answer")) + '</button>';

  // Model answer
  html += '<div class="model-answer' + (isRevealed ? " visible" : "") + '" id="sp-answer">';
  html += '<div class="model-answer-label">' + (isFA ? "پاسخ نمونه:" : "Model Answer:") + '</div>';
  html += '<div class="model-answer-text">' + p.modelAnswerEn + '</div>';
  html += '<div class="model-answer-text-fa">' + p.modelAnswerFa + '</div></div>';

  // Tips
  html += '<div class="speaking-tips">';
  html += '<div class="speaking-tips-title">' + (isFA ? "نکات گرامری و صحبت:" : "Grammar & Speaking Tips:") + '</div>';
  html += '<ul class="speaking-tips-list">';
  var tipsArr = isFA ? (p.tipsFa || p.tips) : p.tips;
  for(var i = 0; i < tipsArr.length; i++){
    html += '<li class="en-text">' + tipsArr[i] + '</li>';
  }
  html += '</ul></div>';

  html += '</div>';

  // Part/difficulty info
  var diffInfo = getDiffLabel(p.difficulty);
  html += '<div style="text-align:center;margin-top:8px;font-size:12px;color:#888;">' +
    (isFA ? "بخش" : "Part") + ' ' + p.part + ' · ' + diffInfo + '</div>';

  html += '</main>';
  return html;
}

// ===== GUIDE VIEW (styled consistently) =====
function renderGuide(){
  var isFA = state.lang === "fa";
  var guides = getTopicGuide();

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';
  html += '<main class="container">';

  html += '<h2 class="section-title">' + (isFA ? "راهنمای آمادگی آزمون" : "Exam Preparation Guide") + '</h2>';
  html += '<div style="font-size:14px;color:#555;line-height:1.8;margin-bottom:20px">' +
    (isFA ? "راهنمای کامل برای آمادگی آزمون B1 صحبت و شنیدار. هر بخش را باز کنید و نکات مهم را مطالعه کنید." : "Complete guide for B1 Speaking & Listening exam preparation. Open each section and study the key tips.") + '</div>';

  for(var i = 0; i < guides.length; i++){
    var g = guides[i];
    var isRead = state.guideRead.indexOf(i) !== -1;
    var isOpen = isRead;

    html += '<div class="guide-card' + (isOpen ? " open" : "") + '" id="guide-card-' + i + '">';
    html += '<button class="guide-header' + (isOpen ? " open" : "") + '" id="guide-hdr-' + i + '" data-guide="' + i + '">' +
      '<span class="guide-icon">📖</span>' +
      '<div class="guide-info"><div class="guide-name">' + g[t("title")] + '</div>' +
      '<div class="guide-name-en">' + g.titleEn + '</div></div>' +
      (isRead ? '<span class="guide-read-badge">✓</span>' : '') +
      '<span class="guide-arrow">▼</span></button></div>';

    html += '<div class="guide-body' + (isOpen ? " open" : "") + '" id="guide-body-' + i + '">';
    html += '<div class="guide-desc">' + g[t("desc")] + '</div>';
    html += '<div class="guide-desc-en en-text">' + g.descEn + '</div>';
    html += '<ul class="guide-tips-list">';
    var tipsArr = isFA ? (g.tipsFa || g.tips) : g.tips;
    for(var j = 0; j < tipsArr.length; j++){
      html += '<li class="en-text">💡 ' + tipsArr[j] + '</li>';
    }
    html += '</ul>';
    html += '<button class="guide-mark-btn' + (isRead ? " done" : "") + '" id="guide-mark-' + i + '" data-guide="' + i + '">' +
      (isRead ? (isFA ? "✓ خوانده شد" : "✓ Read") : (isFA ? "علامت‌گذاری به عنوان خوانده شده" : "Mark as Read")) + '</button>';
    html += '</div>';
  }

  html += '</main>';
  return html;
}

// ===== RESULTS VIEW (Life in the UK pattern) =====
function renderResults(){
  var isFA = state.lang === "fa";
  var pct = Math.round((state.score / state.questions.length) * 100);
  var passed = pct >= PASS_MARK;

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';
  html += '<main class="container">';

  html += '<div class="results-card ' + (passed ? "passed" : "failed") + '">' +
    '<div class="results-icon">' + (passed ? "🎉" : "😔") + '</div>' +
    '<div class="results-title">' + (passed ? (isFA ? "تبریک! قبول شدید" : "Congratulations! Passed") : (isFA ? "متأسفانه قبول نشدید" : "Unfortunately, Failed")) + '</div>' +
    '<div class="results-score"><span class="score-big">' + state.score + '</span><span class="score-sep">/</span><span>' + state.questions.length + '</span></div>' +
    '<div class="results-pct">' + pct + '%</div>' +
    '<div class="results-bar"><div class="results-bar-fill" style="width:' + pct + '%;background:' + (passed ? "#00b894" : "#d63031") + '"></div></div>' +
    '<div class="results-pass-mark">' + (isFA ? "نمره قبولی: " + PASS_MARK + "%" : "Pass mark: " + PASS_MARK + "%") + '</div>' +
    '</div>';

  html += '<div class="results-actions">' +
    '<button id="btn-retry" class="btn btn-primary btn-large">' + (isFA ? "تلاش مجدد" : "Try Again") + '</button>' +
    '<button id="btn-home-results" class="btn btn-secondary btn-large">' + (isFA ? "صفحه اصلی" : "Home") + '</button>' +
    '</div>';

  // Answer Summary
  html += '<div class="answer-summary">';
  for(var i = 0; i < state.questions.length; i++){
    var q = state.questions[i];
    var ans = state.answers[i];
    var correct = ans === q.correctOption;
    html += '<div class="summary-item ' + (correct ? "correct" : "wrong") + '">' +
      '<span class="sum-num">' + (i + 1) + '</span>' +
      '<span class="sum-icon">' + (correct ? "✓" : "✗") + '</span>' +
      '</div>';
  }
  html += '</div>';

  html += '</main>';
  return html;
}

// ===== EVENTS (Life in the UK pattern) =====
function bindEvents(){
  var el = function(id){ return document.getElementById(id); };

  // Back arrow (home button)
  var bh = el("btn-home");
  if(bh) bh.onclick = function(){ state.view = "home"; render(); };

  // Lang toggle
  var bl = el("btn-lang");
  if(bl) bl.onclick = toggleLang;

  // Quick start quiz
  var bq = el("btn-quiz-all");
  if(bq) bq.onclick = function(){ startQuiz("grammar", null, null); };

  // Study mode
  var bs = el("btn-study");
  if(bs) bs.onclick = function(){ state.view = "study"; render(); };

  // Back from study
  var bbs = el("btn-back-study");
  if(bbs) bbs.onclick = function(){ state.view = "home"; render(); };

  // Speaking from home
  var bsp = el("btn-speaking-home");
  if(bsp) bsp.onclick = function(){ startSpeaking(); };

  // Mode cards
  var modeBtns = document.querySelectorAll("[data-mode]");
  for(var m = 0; m < modeBtns.length; m++){
    modeBtns[m].onclick = function(){ startQuiz(this.dataset.mode, null, null); };
  }

  // Topic filter buttons (grammar + vocab)
  var tBtns = document.querySelectorAll(".topic-filter-btn");
  for(var i = 0; i < tBtns.length; i++){
    tBtns[i].onclick = function(){
      var mode = this.dataset.quiz;
      var filter = this.dataset.filter;
      startQuiz(mode, filter, null);
    };
  }

  // Difficulty buttons
  var dBtns = document.querySelectorAll(".diff-btn");
  for(var j = 0; j < dBtns.length; j++){
    dBtns[j].onclick = function(){ startQuiz("grammar", null, this.dataset.diff); };
  }

  // Quiz options
  var qOpts = document.querySelectorAll(".quiz-option");
  for(var k = 0; k < qOpts.length; k++){
    qOpts[k].onclick = function(){ handleAnswer(this.dataset.opt); };
  }

  // Speaking nav
  var spPrev = el("sp-prev");
  if(spPrev) spPrev.onclick = function(){ navigateSpeaking(-1); };
  var spNext = el("sp-next");
  if(spNext) spNext.onclick = function(){ navigateSpeaking(1); };
  var spReveal = el("sp-reveal");
  if(spReveal) spReveal.onclick = function(){ markPromptViewed(state.speakingIndex); render(); };

  // Guide sections
  var guideHeaders = document.querySelectorAll("[data-guide]");
  for(var g = 0; g < guideHeaders.length; g++){
    guideHeaders[g].onclick = function(){ toggleGuideSection(parseInt(this.dataset.guide)); };
  }

  // Results
  var retry = el("btn-retry");
  if(retry) retry.onclick = function(){ startQuiz(state.mode, state.filter, state.difficultyFilter); };
  var homeR = el("btn-home-results");
  if(homeR) homeR.onclick = function(){ state.view = "home"; render(); };
}

// ===== INIT =====
function init(){
  load();
  render();
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
