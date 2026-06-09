// ===== B1 ENGLISH APP — Trinity GESE Grade 5 =====
// DOM-based views matching car course architecture
(function(){
"use strict";

var STORAGE_KEY = "b1English";
var QUIZ_SIZE = 10;
var PASS_MARK = 70;

// =============================================
// STATE
// =============================================
var state = {
  lang: "fa",
  view: "home",
  mode: "grammar",
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

// =============================================
// DOM HELPERS
// =============================================
function $(sel){ return document.querySelector(sel); }
function $$(sel){ return document.querySelectorAll(sel); }

// =============================================
// DATA HELPERS
// =============================================
function t(key){ return state.lang === "fa" ? key + "Fa" : key + "En"; }
function getGrammarInfo(){ return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.grammarInfo) || {}; }
function getTopicInfo(){ return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.topicInfo) || {}; }
function getGrammarQuestions(){ return (window.B1_ENGLISH_DATA && window.B1_ENGLISH_DATA.grammarQuestions) || []; }
function getVocabQuestions(){ return (window.B1_ENGLISH_DATA && window.B1_ENGLISH_DATA.vocabularyQuestions) || []; }
function getSpeakingPrompts(){ return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.speakingPrompts) || []; }
function getTopicGuide(){ return (window.B1_SPEAKING_DATA && window.B1_SPEAKING_DATA.topicGuide) || []; }

// =============================================
// PERSISTENCE
// =============================================
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

// =============================================
// UTILS
// =============================================
function shuffle(arr){
  var a = arr.slice();
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function getDiffLabel(d){
  var m = { easy: { fa: "\u0622\u0633\u0627\u0646", en: "Easy" }, medium: { fa: "\u0645\u062A\u0648\u0633\u0637", en: "Medium" }, hard: { fa: "\u0633\u062E\u062A", en: "Hard" } };
  return m[d] ? m[d][state.lang] : d;
}

function getDiffColor(d){
  return d === "easy" ? "#00b894" : d === "medium" ? "#fdcb6e" : "#d63031";
}

function isFA(){ return state.lang === "fa"; }

function optLabels(){
  return { a: "A", b: "B", c: "C", d: "D" };
}

// =============================================
// VIEW MANAGEMENT
// =============================================
function showView(name){
  $$(".view").forEach(function(v){ v.classList.remove("active"); });
  var target = $("#" + name + "View");
  if(target) target.classList.add("active");
  state.view = name;
  window.scrollTo(0, 0);
  updateBottomNav(name);
  updateHeaderProgress();
}

// =============================================
// BOTTOM NAV
// =============================================
function updateBottomNav(active){
  var map = {
    home: "navHome", quiz: "navQuiz", speaking: "navSpeaking",
    guide: "navGuide", study: "navStudy", progress: "navProgress"
  };
  var activeId = map[active] || "navHome";
  $$(".bottom-nav-item").forEach(function(btn){
    btn.classList.toggle("active", btn.id === activeId);
  });
}

// =============================================
// HEADER PROGRESS
// =============================================
function updateHeaderProgress(){
  var el = $("#progressText");
  if(!el) return;
  // Calculate overall progress: (prompts viewed + guide read) / (total prompts + total guides)
  var prompts = getSpeakingPrompts();
  var guides = getTopicGuide();
  var total = prompts.length + guides.length;
  if(total === 0){ el.textContent = "0%"; return; }
  var done = state.speakingViewed.length + state.guideRead.length;
  var pct = Math.min(100, Math.round((done / total) * 100));
  el.textContent = pct + "%";
}

// =============================================
// LANGUAGE FLAGS
// =============================================
function toggleLang(){
  state.lang = state.lang === "fa" ? "en" : "fa";
  save();
  // Update flag active states
  var fa = $("#langFa");
  var en = $("#langEn");
  if(fa) fa.classList.toggle("active", state.lang === "fa");
  if(en) en.classList.toggle("active", state.lang === "en");
  // Re-render current view
  renderCurrentView();
}

// =============================================
// RENDER CURRENT VIEW
// =============================================
function renderCurrentView(){
  switch(state.view){
    case "home": showHome(); break;
    case "quiz": showQuizView(); break;
    case "speaking": showSpeakingView(); break;
    case "guide": showGuideView(); break;
    case "study": showStudyView(); break;
    case "progress": showProgressView(); break;
    default: showHome(); break;
  }
}

// =============================================
// INIT
// =============================================
function init(){
  load();
  showHome();
  bindGlobalEvents();
  updateHeaderProgress();
  // Set initial flag states
  var fa = $("#langFa");
  var en = $("#langEn");
  if(fa) fa.classList.toggle("active", state.lang === "fa");
  if(en) en.classList.toggle("active", state.lang === "en");
}

// =============================================
// BIND GLOBAL EVENTS
// =============================================
function bindGlobalEvents(){
  // Brand click -> home
  var brand = $("#brandBtn");
  if(brand) brand.addEventListener("click", function(){ showView("home"); showHome(); });

  // Lang flags
  var fa = $("#langFa");
  var en = $("#langEn");
  if(fa) fa.addEventListener("click", function(){ state.lang = "fa"; save(); updateFlags(); renderCurrentView(); });
  if(en) en.addEventListener("click", function(){ state.lang = "en"; save(); updateFlags(); renderCurrentView(); });

  // Bottom nav
  $$(".bottom-nav-item[data-target]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var target = this.dataset.target;
      if(target === "quiz"){
        // Start a random quiz
        startQuiz("grammar", null, null);
      } else if(target === "speaking"){
        state.speakingIndex = 0;
        showView("speaking");
        showSpeakingView();
      } else if(target === "guide"){
        showView("guide");
        showGuideView();
      } else {
        showView(target);
        renderCurrentView();
      }
    });
  });
}

function updateFlags(){
  var fa = $("#langFa");
  var en = $("#langEn");
  if(fa) fa.classList.toggle("active", state.lang === "fa");
  if(en) en.classList.toggle("active", state.lang === "en");
  updateHeaderProgress();
}

// =============================================
// HOME VIEW
// =============================================
function showHome(){
  var grammarQs = getGrammarQuestions();
  var vocabQs = getVocabQuestions();
  var prompts = getSpeakingPrompts();
  var gInfo = getGrammarInfo();
  var tInfo = getTopicInfo();
  var passRate = state.totalAttempts > 0 ? Math.round((state.passed / state.totalAttempts) * 100) : 0;
  var totalQs = grammarQs.length + vocabQs.length;

  // Update stats
  var sq = $("#statQuestions");
  if(sq) sq.textContent = totalQs;
  var sa = $("#statAttempts");
  if(sa) sa.textContent = state.totalAttempts;
  var sp = $("#statPassRate");
  if(sp) sp.textContent = passRate + "%";

  // Update section headings
  var gh = $("#grammarHeading");
  if(gh) gh.textContent = isFA() ? "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC \u06AF\u0631\u0627\u0645\u0631" : "Grammar Categories";
  var vh = $("#vocabHeading");
  if(vh) vh.textContent = isFA() ? "\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0648\u0627\u0698\u06AF\u0627\u0646" : "Vocabulary Topics";
  var dh = $("#diffHeading");
  if(dh) dh.textContent = isFA() ? "\u0633\u0637\u062D \u0633\u062E\u062A\u06CC" : "Difficulty Level";

  // Quick actions (3 mode cards)
  renderQuickActions(grammarQs, vocabQs, prompts);

  // Grammar category grid
  renderGrammarGrid(grammarQs, gInfo);

  // Vocab topic grid
  renderVocabGrid(vocabQs, tInfo);

  // Difficulty section
  renderDifficultySection();

  // History section
  renderHistorySection();

  updateHeaderProgress();
}

// =============================================
// QUICK ACTIONS
// =============================================
function renderQuickActions(grammarQs, vocabQs, prompts){
  var qa = $("#quickActions");
  if(!qa) return;
  qa.innerHTML =
    '<div class="quick-actions">' +
      '<button class="quick-action-btn" id="qaGrammar">' +
        '<span class="quick-action-icon">\uD83D\uDCDD</span>' +
        '<span class="quick-action-label">' + (isFA() ? "\u0622\u0632\u0645\u0648\u0646 \u06AF\u0631\u0627\u0645\u0631" : "Grammar Quiz") + '</span>' +
        '<span class="quick-action-label-en">' + grammarQs.length + ' ' + (isFA() ? "\u0633\u0648\u0627\u0644" : "questions") + '</span>' +
      '</button>' +
      '<button class="quick-action-btn" id="qaVocab">' +
        '<span class="quick-action-icon">\uD83D\uDCDA</span>' +
        '<span class="quick-action-label">' + (isFA() ? "\u0622\u0632\u0645\u0648\u0646 \u0648\u0627\u0698\u06AF\u0627\u0646" : "Vocab Quiz") + '</span>' +
        '<span class="quick-action-label-en">' + vocabQs.length + ' ' + (isFA() ? "\u0633\u0648\u0627\u0644" : "questions") + '</span>' +
      '</button>' +
      '<button class="quick-action-btn" id="qaSpeaking">' +
        '<span class="quick-action-icon">\uD83D\uDDE3</span>' +
        '<span class="quick-action-label">' + (isFA() ? "\u0622\u0645\u0627\u062F\u06AF\u06CC \u0635\u062D\u0628\u062A" : "Speaking Prep") + '</span>' +
        '<span class="quick-action-label-en">' + prompts.length + ' ' + (isFA() ? "\u067E\u0631\u0648\u0645\u067E\u062A" : "prompts") + '</span>' +
      '</button>' +
    '</div>';

  var bg = $("#qaGrammar");
  var bv = $("#qaVocab");
  var bs = $("#qaSpeaking");
  if(bg) bg.addEventListener("click", function(){ startQuiz("grammar", null, null); });
  if(bv) bv.addEventListener("click", function(){ startQuiz("vocabulary", null, null); });
  if(bs) bs.addEventListener("click", function(){
    state.speakingIndex = 0;
    showView("speaking");
    showSpeakingView();
  });
}

// =============================================
// GRAMMAR CATEGORY GRID
// =============================================
function renderGrammarGrid(grammarQs, gInfo){
  var grid = $("#grammarGrid");
  if(!grid) return;
  grid.innerHTML = "";

  // Count questions per category
  var cats = {};
  for(var i = 0; i < grammarQs.length; i++){
    var g = grammarQs[i].grammar;
    if(!cats[g]) cats[g] = 0;
    cats[g]++;
  }

  var keys = Object.keys(gInfo);
  for(var j = 0; j < keys.length; j++){
    var k = keys[j];
    var data = gInfo[k];
    var card = document.createElement("div");
    card.className = "cat-card";
    card.innerHTML =
      '<div class="cat-icon" style="background:' + data.color + '15">' + (data.icon || "\uD83D\uDCDD") + '</div>' +
      '<div class="cat-info">' +
        '<div class="cat-title">' + (isFA() ? data.fa : data.en) + '</div>' +
        '<div class="cat-title-en">' + (isFA() ? data.en : data.fa) + '</div>' +
        '<div class="cat-meta">' + (cats[k] || 0) + ' ' + (isFA() ? "\u0633\u0648\u0627\u0644" : "questions") + '</div>' +
      '</div>';
    (function(key){
      card.addEventListener("click", function(){ startQuiz("grammar", key, null); });
    })(k);
    grid.appendChild(card);
  }
}

// =============================================
// VOCAB TOPIC GRID
// =============================================
function renderVocabGrid(vocabQs, tInfo){
  var grid = $("#vocabGrid");
  if(!grid) return;
  grid.innerHTML = "";

  var topics = {};
  for(var i = 0; i < vocabQs.length; i++){
    var v = vocabQs[i].topic;
    if(!topics[v]) topics[v] = 0;
    topics[v]++;
  }

  var keys = Object.keys(tInfo);
  for(var j = 0; j < keys.length; j++){
    var k = keys[j];
    var data = tInfo[k];
    var card = document.createElement("div");
    card.className = "cat-card";
    card.innerHTML =
      '<div class="cat-icon" style="background:' + data.color + '15">' + (data.icon || "\uD83D\uDCDA") + '</div>' +
      '<div class="cat-info">' +
        '<div class="cat-title">' + (isFA() ? data.fa : data.en) + '</div>' +
        '<div class="cat-title-en">' + (isFA() ? data.en : data.fa) + '</div>' +
        '<div class="cat-meta">' + (topics[k] || 0) + ' ' + (isFA() ? "\u0633\u0648\u0627\u0644" : "questions") + '</div>' +
      '</div>';
    (function(key){
      card.addEventListener("click", function(){ startQuiz("vocabulary", key, null); });
    })(k);
    grid.appendChild(card);
  }
}

// =============================================
// DIFFICULTY SECTION
// =============================================
function renderDifficultySection(){
  var section = $("#difficultySection");
  if(!section) return;
  section.innerHTML =
    '<div class="diff-grid">' +
      '<div class="diff-card" data-diff="easy" style="border-color:#00b894">' + getDiffLabel("easy") + '</div>' +
      '<div class="diff-card" data-diff="medium" style="border-color:#fdcb6e">' + getDiffLabel("medium") + '</div>' +
      '<div class="diff-card" data-diff="hard" style="border-color:#d63031">' + getDiffLabel("hard") + '</div>' +
    '</div>';

  $$("#difficultySection .diff-card").forEach(function(btn){
    btn.addEventListener("click", function(){ startQuiz("grammar", null, this.dataset.diff); });
  });
}

// =============================================
// HISTORY SECTION
// =============================================
function renderHistorySection(){
  var section = $("#historySection");
  if(!section) return;
  if(state.history.length === 0){ section.innerHTML = ""; return; }

  var html = '<div class="history-list">';
  var show = Math.min(state.history.length, 10);
  for(var i = 0; i < show; i++){
    var item = state.history[i];
    var dd = new Date(item.date);
    var dateStr = dd.toLocaleDateString(isFA() ? "fa-IR" : "en-GB");
    var modeLabel = item.mode === "grammar" ? (isFA() ? "\u06AF\u0631\u0627\u0645\u0631" : "Grammar") : (isFA() ? "\u0648\u0627\u0698\u06AF\u0627\u0646" : "Vocab");
    html += '<div class="history-item ' + (item.passed ? "passed" : "failed") + '">' +
      '<div><div class="hist-score">' + item.score + '/' + item.total + '</div>' +
      '<div class="hist-mode">' + modeLabel + '</div></div>' +
      '<div><div class="hist-pct">' + item.pct + '%</div>' +
      '<div class="hist-date">' + dateStr + '</div></div></div>';
  }
  html += '</div>';
  section.innerHTML = html;
}

// =============================================
// QUIZ LOGIC
// =============================================
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
  showView("quiz");
  showQuizView();
}

function handleAnswer(optionId){
  if(state.answers[state.currentIndex]) return;
  var q = state.questions[state.currentIndex];
  state.answers[state.currentIndex] = optionId;
  if(optionId === q.correctOption) state.score++;

  // Show feedback immediately
  renderQuizOptions(q);

  if(state.currentIndex < state.questions.length - 1){
    var nextBtn = $(".quiz-next");
    if(nextBtn){
      nextBtn.textContent = isFA() ? "\u0628\u0639\u062F\u06CC \u0640> / Next" : "\u0628\u0639\u062F\u06CC \u0640> / Next";
      nextBtn.classList.add("visible");
      nextBtn.onclick = function(){
        state.currentIndex++;
        showQuizView();
      };
    }
  } else {
    // Last question — finish
    setTimeout(function(){ finishQuiz(); }, 800);
  }
}

function finishQuiz(){
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
  renderQuizResult();
}

// =============================================
// QUIZ VIEW
// =============================================
function showQuizView(){
  var q = state.questions[state.currentIndex];
  if(!q) return;
  var container = $("#quizContainer");
  if(!container) return;

  var idx = state.currentIndex;
  var total = state.questions.length;
  var pctProgress = ((idx) / total) * 100;

  var modeLabel = state.mode === "grammar" ? (isFA() ? "\u06AF\u0631\u0627\u0645\u0631" : "Grammar") : (isFA() ? "\u0648\u0627\u0698\u06AF\u0627\u0646" : "Vocabulary");
  var modeColor = state.mode === "grammar" ? "#4361ee" : "#e84393";

  var html = '<div class="quiz-progress">' +
    '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + pctProgress + '%"></div></div>' +
    '<span class="quiz-progress-text">' + (idx + 1) + '/' + total + '</span>' +
  '</div>';

  html += '<div class="quiz-card">';
  html += '<div class="quiz-meta">';
  html += '<span class="quiz-num">' + (isFA() ? "\u0633\u0648\u0627\u0644 " : "Question ") + (idx + 1) + '</span>';
  html += '<span class="quiz-topic" style="color:' + modeColor + '">' + modeLabel + '</span>';

  // Category/topic badge
  if(state.mode === "grammar"){
    var gInfo = getGrammarInfo();
    var gi = gInfo[q.grammar];
    if(gi) html += '<span class="quiz-topic" style="color:' + gi.color + '">' + (isFA() ? gi.fa : gi.en) + '</span>';
  } else {
    var tInfo = getTopicInfo();
    var ti = tInfo[q.topic];
    if(ti) html += '<span class="quiz-topic" style="color:' + ti.color + '">' + (isFA() ? ti.fa : ti.en) + '</span>';
  }
  html += '<span class="quiz-diff" style="color:' + getDiffColor(q.difficulty) + '">' + getDiffLabel(q.difficulty) + '</span>';
  html += '</div>';

  // Question text
  html += '<div class="quiz-q-text">' + q[t("question")] + '</div>';
  html += '<div class="quiz-q-en en-text">' + q.questionEn + '</div>';

  // Options
  html += '<div class="quiz-options" id="quizOptions">';
  var labels = optLabels();
  for(var i = 0; i < q.options.length; i++){
    var opt = q.options[i];
    html += '<button class="quiz-opt" data-opt="' + opt.id + '">' +
      '<span class="quiz-opt-letter">' + labels[opt.id] + '</span>' +
      '<span>' + opt[t("text")] + '</span>' +
      (isFA() ? '<span class="en-text">' + opt.textEn + '</span>' : '') +
    '</button>';
  }
  html += '</div>';

  // Feedback placeholder
  html += '<div class="quiz-feedback" id="quizFeedback" style="display:none"></div>';

  // Next button (hidden until answered)
  html += '<button class="quiz-next" id="quizNextBtn">Next</button>';

  html += '</div>';

  container.innerHTML = html;

  // Bind option clicks
  $$(".quiz-opt").forEach(function(btn){
    btn.addEventListener("click", function(){ handleAnswer(this.dataset.opt); });
  });

  // Back button
  var backBtn = $("#quizBackBtn");
  if(backBtn){
    backBtn.onclick = function(){ showView("home"); showHome(); };
  }
}

function renderQuizOptions(q){
  var answered = state.answers[state.currentIndex];
  var isCorrect = answered === q.correctOption;

  // Update option styles
  $$(".quiz-opt").forEach(function(btn){
    var optId = btn.dataset.opt;
    btn.style.pointerEvents = "none";
    if(optId === q.correctOption) btn.classList.add("correct");
    else if(optId === answered && !isCorrect) btn.classList.add("wrong");
  });

  // Show feedback
  var fb = $("#quizFeedback");
  if(fb){
    fb.style.display = "block";
    fb.innerHTML =
      '<div class="quiz-feedback-icon">' + (isCorrect ? "\u2713" : "\u2717") + '</div>' +
      '<div class="quiz-feedback-text">' + (isCorrect ? (isFA() ? "\u0622\u0641\u0631\u06CC\u0646! \u067E\u0627\u0633\u062E \u062F\u0631\u0633\u062A \u0627\u0633\u062A." : "Correct!") : (isFA() ? "\u067E\u0627\u0633\u062E \u0627\u0634\u062A\u0628\u0627\u0647 \u0628\u0648\u062F." : "Incorrect!")) + '</div>' +
      '<div class="quiz-feedback-explanation">' + q[t("explanation")] +
      '<div class="quiz-feedback-explanation-en en-text">' + q.explanationEn + '</div></div>';
  }
}

function renderQuizResult(){
  var container = $("#quizContainer");
  if(!container) return;

  var pct = Math.round((state.score / state.questions.length) * 100);
  var passed = pct >= PASS_MARK;
  var barColor = passed ? "#00b894" : "#d63031";

  var html = '<div class="quiz-result">';
  html += '<div class="quiz-result-icon">' + (passed ? "\uD83C\uDF89" : "\uD83D\uDE14") + '</div>';
  html += '<div class="quiz-result-score">' + state.score + '/' + state.questions.length + '</div>';
  html += '<div class="quiz-result-label">' + pct + '%</div>';
  html += '<div class="quiz-result-message">' + (passed ? (isFA() ? "\u062A\u0628\u0631\u06CC\u06A9! \u0642\u0628\u0648\u0644 \u0634\u062F\u06CC\u062F" : "Passed! Well done") : (isFA() ? "\u0645\u062A\u0623\u0633\u0641\u0627\u0646\u0647 \u0642\u0628\u0648\u0644 \u0646\u0634\u062F\u06CC\u062F" : "Failed. Try again")) + '</div>';
  html += '<div class="quiz-result-bar"><div class="quiz-result-bar-fill" style="width:' + pct + '%;background:' + barColor + '"></div></div>';
  html += '<div class="quiz-result-pass-mark">' + (isFA() ? "\u0646\u0645\u0631\u0647 \u0642\u0628\u0648\u0644\u06CC: " + PASS_MARK + "%" : "Pass mark: " + PASS_MARK + "%") + '</div>';

  // Answer summary
  html += '<div class="answer-summary">';
  for(var i = 0; i < state.questions.length; i++){
    var q = state.questions[i];
    var ans = state.answers[i];
    var correct = ans === q.correctOption;
    html += '<div class="summary-item ' + (correct ? "correct" : "wrong") + '">' + (i + 1) + (correct ? "\u2713" : "\u2717") + '</div>';
  }
  html += '</div>';

  html += '<div class="quiz-result-actions">';
  html += '<button class="quiz-result-btn primary" id="btnRetry">' + (isFA() ? "\u062A\u0644\u0627\u0634 \u0645\u062C\u062F\u062F" : "Try Again") + '</button>';
  html += '<button class="quiz-result-btn secondary" id="btnHomeResult">' + (isFA() ? "\u0635\u0641\u062D\u0647 \u0627\u0635\u0644\u06CC" : "Home") + '</button>';
  html += '</div>';
  html += '</div>';

  container.innerHTML = html;

  var retry = $("#btnRetry");
  if(retry) retry.addEventListener("click", function(){ startQuiz(state.mode, state.filter, state.difficultyFilter); });
  var homeBtn = $("#btnHomeResult");
  if(homeBtn) homeBtn.addEventListener("click", function(){ showView("home"); showHome(); });
}

// =============================================
// SPEAKING VIEW
// =============================================
function showSpeakingView(){
  var container = $("#speakingContainer");
  if(!container) return;
  var prompts = getSpeakingPrompts();
  if(prompts.length === 0){
    container.innerHTML = '<p style="text-align:center;padding:40px;color:#888">' + (isFA() ? "\u062F\u0627\u062F\u0647\u200C\u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F" : "No data") + '</p>';
    return;
  }

  var p = prompts[state.speakingIndex];
  if(!p) state.speakingIndex = 0;
  p = prompts[state.speakingIndex];

  var tInfo = getTopicInfo();
  var topicData = tInfo[p.topic] || {};
  var topicColor = topicData.color || "#4361ee";
  var topicIcon = topicData.icon || "\uD83D\uDCAC";
  var topicName = isFA() ? (topicData.fa || p.topic) : (topicData.en || p.topic);

  var isRevealed = state.speakingViewed.indexOf(state.speakingIndex) !== -1;

  var html = '<div class="speaking-nav">' +
    '<button class="speaking-nav-btn" id="spPrev"' + (state.speakingIndex === 0 ? " disabled" : "") + '>' + (isFA() ? "\u0642\u0628\u0644\u06CC" : "Prev") + '</button>' +
    '<span class="speaking-counter">' + (state.speakingIndex + 1) + '/' + prompts.length + '</span>' +
    '<button class="speaking-nav-btn" id="spNext"' + (state.speakingIndex === prompts.length - 1 ? " disabled" : "") + '>' + (isFA() ? "\u0628\u0639\u062F\u06CC" : "Next") + '</button>' +
  '</div>';

  html += '<div class="speaking-card">';
  html += '<span class="speaking-topic-tag" style="background:' + topicColor + '15;color:' + topicColor + '">' + topicIcon + ' ' + topicName + '</span>';
  html += '<div class="speaking-prompt">' + p.promptFa + '</div>';
  html += '<div class="speaking-prompt-en en-text">' + p.promptEn + '</div>';

  // Reveal button
  html += '<button class="reveal-answer-btn' + (isRevealed ? " revealed" : "") + '" id="spReveal">' +
    (isRevealed ? (isFA() ? "\u2713 \u067E\u0627\u0633\u062E \u0646\u0645\u0648\u0646\u0647 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0634\u062F" : "\u2713 Model answer shown") : (isFA() ? "\uD83D\uDC41 \u0646\u0645\u0627\u06CC\u0634 \u067E\u0627\u0633\u062E \u0646\u0645\u0648\u0646\u0647" : "\uD83D\uDC41 Show Model Answer")) + '</button>';

  // Model answer
  html += '<div class="model-answer' + (isRevealed ? " visible" : "") + '">' +
    '<div class="model-answer-label">' + (isFA() ? "\u067E\u0627\u0633\u062E \u0646\u0645\u0648\u0646\u0647:" : "Model Answer:") + '</div>' +
    '<div class="model-answer-text">' + p.modelAnswerEn + '</div>' +
    '<div class="model-answer-text-fa">' + p.modelAnswerFa + '</div></div>';

  // Tips
  html += '<div class="speaking-tips">' +
    '<div class="speaking-tips-title">' + (isFA() ? "\u0646\u06A9\u0627\u062A \u06AF\u0631\u0627\u0645\u0631\u06CC \u0648 \u0635\u062D\u0628\u062A:" : "Grammar & Speaking Tips:") + '</div>' +
    '<ul class="speaking-tips-list">';
  var tipsArr = isFA() ? (p.tipsFa || p.tips) : p.tips;
  for(var i = 0; i < tipsArr.length; i++){
    html += '<li class="en-text">' + tipsArr[i] + '</li>';
  }
  html += '</ul></div>';
  html += '</div>';

  // Difficulty info
  html += '<div style="text-align:center;margin-top:8px;font-size:12px;color:#888">' +
    (isFA() ? "\u0628\u062E\u0634" : "Part") + ' ' + p.part + ' \u00B7 ' + getDiffLabel(p.difficulty) + '</div>';

  container.innerHTML = html;

  // Bind events
  var prev = $("#spPrev");
  var next = $("#spNext");
  var reveal = $("#spReveal");
  if(prev) prev.addEventListener("click", function(){
    if(state.speakingIndex > 0){ state.speakingIndex--; showSpeakingView(); }
  });
  if(next) next.addEventListener("click", function(){
    if(state.speakingIndex < prompts.length - 1){ state.speakingIndex++; showSpeakingView(); }
  });
  if(reveal) reveal.addEventListener("click", function(){
    markPromptViewed(state.speakingIndex);
    showSpeakingView();
  });

  // Back button
  var backBtn = $("#speakingBackBtn");
  if(backBtn) backBtn.onclick = function(){ showView("home"); showHome(); };
}

function markPromptViewed(idx){
  if(state.speakingViewed.indexOf(idx) === -1){
    state.speakingViewed.push(idx);
    state.promptsViewed = state.speakingViewed.length;
    save();
    updateHeaderProgress();
  }
}

// =============================================
// GUIDE VIEW
// =============================================
function showGuideView(){
  var container = $("#guideContainer");
  if(!container) return;
  var guides = getTopicGuide();

  var html = '<h2 style="font-size:20px;font-weight:800;margin-bottom:8px">' + (isFA() ? "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u0622\u0645\u0627\u062F\u06AF\u06CC \u0622\u0632\u0645\u0648\u0646" : "Exam Preparation Guide") + '</h2>';
  html += '<p style="font-size:14px;color:#555;line-height:1.8;margin-bottom:20px">' +
    (isFA() ? "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u06A9\u0627\u0645\u0644 \u0628\u0631\u0627\u06CC \u0622\u0645\u0627\u062F\u06AF\u06CC \u0622\u0632\u0645\u0648\u0646 B1 \u0635\u062D\u0628\u062A \u0648 \u0634\u0646\u06CC\u062F\u0627\u0631." : "Complete guide for B1 Speaking & Listening exam preparation.") + '</p>';

  for(var i = 0; i < guides.length; i++){
    var g = guides[i];
    var isRead = state.guideRead.indexOf(i) !== -1;
    var isOpen = isRead;

    html += '<div class="guide-card' + (isOpen ? " open" : "") + '" id="guide-card-' + i + '">';
    html += '<button class="guide-header' + (isOpen ? " open" : "") + '" id="guide-hdr-' + i + '" data-guide="' + i + '">' +
      '<span class="guide-icon">\uD83D\uDCD6</span>' +
      '<div class="guide-info"><div class="guide-name">' + g[t("title")] + '</div>' +
      '<div class="guide-name-en">' + g.titleEn + '</div></div>' +
      (isRead ? '<span class="guide-read-badge">\u2713</span>' : '') +
      '<span class="guide-arrow">\u25BC</span></button></div>';

    html += '<div class="guide-body' + (isOpen ? " open" : "") + '" id="guide-body-' + i + '">';
    html += '<div class="guide-desc">' + g[t("desc")] + '</div>';
    html += '<div class="guide-desc-en en-text">' + g.descEn + '</div>';
    html += '<ul class="guide-tips-list">';
    var tipsArr = isFA() ? (g.tipsFa || g.tips) : g.tips;
    for(var j = 0; j < tipsArr.length; j++){
      html += '<li class="en-text">\uD83D\uDCA1 ' + tipsArr[j] + '</li>';
    }
    html += '</ul>';
    html += '<button class="guide-mark-btn' + (isRead ? " done" : "") + '" id="guide-mark-' + i + '" data-guide="' + i + '">' +
      (isRead ? (isFA() ? "\u2713 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F" : "\u2713 Read") : (isFA() ? "\u0639\u0644\u0627\u0645\u062A\u200C\u06AF\u0630\u0627\u0631\u06CC \u0628\u0647 \u0639\u0646\u0648\u0627\u0646 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F\u0647" : "Mark as Read")) + '</button>';
    html += '</div>';
  }

  container.innerHTML = html;

  // Bind toggle events
  $$("[data-guide]").forEach(function(el){
    el.addEventListener("click", function(){ toggleGuideSection(parseInt(this.dataset.guide)); });
  });

  // Back button
  var backBtn = $("#guideBackBtn");
  if(backBtn) backBtn.onclick = function(){ showView("home"); showHome(); };
}

function toggleGuideSection(idx){
  var i = state.guideRead.indexOf(idx);
  if(i === -1){
    state.guideRead.push(idx);
    save();
    updateHeaderProgress();
  }
  var el = document.getElementById("guide-body-" + idx);
  var hdr = document.getElementById("guide-hdr-" + idx);
  var card = document.getElementById("guide-card-" + idx);
  if(el) el.classList.toggle("open");
  if(hdr) hdr.classList.toggle("open");
  if(card) card.classList.toggle("open");
  var btn = document.getElementById("guide-mark-" + idx);
  if(btn){
    if(state.guideRead.indexOf(idx) !== -1){
      btn.textContent = isFA() ? "\u2713 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F" : "\u2713 Read";
      btn.classList.add("done");
    }
  }
}

// =============================================
// STUDY VIEW
// =============================================
function showStudyView(){
  var container = $("#studyContainer");
  if(!container) return;

  var grammarQs = getGrammarQuestions();
  var vocabQs = getVocabQuestions();
  var gInfo = getGrammarInfo();
  var tInfo = getTopicInfo();

  var html = '<h2 style="font-size:20px;font-weight:800;margin-bottom:8px">' + (isFA() ? "\u0633\u0648\u0627\u0644\u0627\u062A \u06AF\u0631\u0627\u0645\u0631" : "Grammar Questions") + '</h2>';

  var currentCat = "";
  for(var i = 0; i < grammarQs.length; i++){
    var q = grammarQs[i];
    if(q.grammar !== currentCat){
      currentCat = q.grammar;
      var gi = gInfo[currentCat] || {};
      html += '<div class="study-topic-divider" style="background:' + (gi.color || "#4361ee") + '">' +
        '<span>' + (isFA() ? (gi.fa || currentCat) : (gi.en || currentCat)) + '</span></div>';
    }
    html += renderStudyQuestion(q, i + 1);
  }

  html += '<h2 style="font-size:20px;font-weight:800;margin:24px 0 8px">' + (isFA() ? "\u0633\u0648\u0627\u0644\u0627\u062A \u0648\u0627\u0698\u06AF\u0627\u0646" : "Vocabulary Questions") + '</h2>';

  var currentTopic = "";
  for(var j = 0; j < vocabQs.length; j++){
    var vq = vocabQs[j];
    if(vq.topic !== currentTopic){
      currentTopic = vq.topic;
      var ti = tInfo[currentTopic] || {};
      html += '<div class="study-topic-divider" style="background:' + (ti.color || "#e84393") + '">' +
        '<span>' + (isFA() ? (ti.fa || currentTopic) : (ti.en || currentTopic)) + '</span></div>';
    }
    html += renderStudyQuestion(vq, grammarQs.length + j + 1);
  }

  container.innerHTML = html;

  // Back button
  var backBtn = $("#studyBackBtn");
  if(backBtn) backBtn.onclick = function(){ showView("home"); showHome(); };
}

function renderStudyQuestion(q, num){
  var labels = optLabels();
  var html = '<div class="study-card">' +
    '<div class="study-q-num">' + num + '</div>' +
    '<div class="study-question">' + q[t("question")] + '</div>' +
    '<div class="study-question-en en-text">' + q.questionEn + '</div>' +
    '<div class="study-options">';
  for(var k = 0; k < q.options.length; k++){
    var opt = q.options[k];
    var isCorrect = opt.id === q.correctOption;
    html += '<div class="study-option ' + (isCorrect ? "correct" : "") + '">' +
      '<span class="study-opt-label">' + labels[opt.id] + '</span> ' +
      '<span>' + opt[t("text")] + '</span>' +
      (isFA() ? '<span class="en-text" style="font-size:0.8em;color:#888;margin-right:6px"> ' + opt.textEn + '</span>' : '') +
    '</div>';
  }
  html += '</div>' +
    '<div class="study-explanation">' + q[t("explanation")] +
    '<div class="study-explanation-en en-text">' + q.explanationEn + '</div>' +
    '</div></div>';
  return html;
}

// =============================================
// PROGRESS VIEW
// =============================================
function showProgressView(){
  var container = $("#progressContainer");
  if(!container) return;

  var prompts = getSpeakingPrompts();
  var guides = getTopicGuide();
  var total = prompts.length + guides.length;
  var done = state.speakingViewed.length + state.guideRead.length;
  var overallPct = total > 0 ? Math.round((done / total) * 100) : 0;
  var dashoffset = 259 - (259 * overallPct / 100);

  var passRate = state.totalAttempts > 0 ? Math.round((state.passed / state.totalAttempts) * 100) : 0;
  var bestPct = state.totalAttempts > 0 ? Math.round((state.bestScore / QUIZ_SIZE) * 100) : 0;

  var html = '<div class="progress-view-header" style="text-align:center">' +
    '<h2 style="font-size:22px;font-weight:800;margin-bottom:4px">' + (isFA() ? "\u067E\u06CC\u0634\u0631\u0641\u062A" : "Progress") + '</h2>' +
    '<p style="font-size:13px;color:#888">' + (isFA() ? "\u0622\u0645\u0627\u062F\u06AF\u06CC \u0622\u0632\u0645\u0648\u0646 B1" : "B1 Exam Preparation") + '</p>' +
  '</div>';

  // Circular progress + stats
  html += '<div class="progress-card">' +
    '<div class="progress-overall-row">' +
      '<div class="progress-circle">' +
        '<svg class="progress-ring" viewBox="0 0 100 100">' +
          '<circle class="progress-ring-bg" cx="50" cy="50" r="41"/>' +
          '<circle class="progress-ring-fill" cx="50" cy="50" r="41" style="stroke-dashoffset:' + dashoffset + '"/>' +
        '</svg>' +
        '<div class="progress-circle-text">' + overallPct + '%</div>' +
      '</div>' +
      '<div class="progress-overall-stats">' +
        '<div class="progress-mini-stat"><span class="progress-mini-num">' + done + '</span><span class="progress-mini-label">' + (isFA() ? "\u062A\u06A9\u0645\u06CC\u0644 \u0634\u062F\u0647" : "Done") + '</span></div>' +
        '<div class="progress-mini-stat"><span class="progress-mini-num">' + total + '</span><span class="progress-mini-label">' + (isFA() ? "\u06A9\u0644" : "Total") + '</span></div>' +
      '</div>' +
    '</div>' +
  '</div>';

  // Stats grid
  html += '<div class="progress-stats-grid">' +
    '<div class="progress-stat-card"><div class="progress-stat-icon">\uD83D\uDCDD</div><div class="progress-stat-value">' + state.totalAttempts + '</div><div class="progress-stat-label">' + (isFA() ? "\u062A\u0644\u0627\u0634" : "Attempts") + '</div></div>' +
    '<div class="progress-stat-card"><div class="progress-stat-icon">\u2705</div><div class="progress-stat-value">' + state.passed + '</div><div class="progress-stat-label">' + (isFA() ? "\u0642\u0628\u0648\u0644" : "Passed") + '</div></div>' +
    '<div class="progress-stat-card"><div class="progress-stat-icon">\uD83C\uDFC6</div><div class="progress-stat-value">' + bestPct + '%</div><div class="progress-stat-label">' + (isFA() ? "\u0628\u0647\u062A\u0631\u06CC\u0646 \u0646\u0645\u0631\u0647" : "Best Score") + '</div></div>' +
    '<div class="progress-stat-card"><div class="progress-stat-icon">\uD83D\uDCC8</div><div class="progress-stat-value">' + passRate + '%</div><div class="progress-stat-label">' + (isFA() ? "\u0646\u0631\u062E \u0642\u0628\u0648\u0644\u06CC" : "Pass Rate") + '</div></div>' +
  '</div>';

  // Section progress
  html += '<div class="progress-card">' +
    '<div class="progress-card-header"><span class="progress-card-icon">\uD83D\uDDE3</span><span class="progress-card-title">' + (isFA() ? "\u067E\u0631\u0648\u0645\u067E\u062A\u200C\u0647\u0627\u06CC \u0635\u062D\u0628\u062A" : "Speaking Prompts") + '</span></div>' +
    '<p style="text-align:center;font-size:24px;font-weight:800;color:#e84393">' + state.speakingViewed.length + ' / ' + prompts.length + '</p>' +
  '</div>';

  html += '<div class="progress-card">' +
    '<div class="progress-card-header"><span class="progress-card-icon">\uD83D\uDCD6</span><span class="progress-card-title">' + (isFA() ? "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u0622\u0632\u0645\u0648\u0646" : "Exam Guide") + '</span></div>' +
    '<p style="text-align:center;font-size:24px;font-weight:800;color:#e84393">' + state.guideRead.length + ' / ' + guides.length + '</p>' +
  '</div>';

  container.innerHTML = html;

  updateHeaderProgress();
}

// =============================================
// EXPOSE TO WINDOW
// =============================================
window.showView = showView;
window.openStudy = function(){
  showView("study");
  showStudyView();
};
window.openProgress = function(){
  showView("progress");
  showProgressView();
};

// =============================================
// BOOT
// =============================================
if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
