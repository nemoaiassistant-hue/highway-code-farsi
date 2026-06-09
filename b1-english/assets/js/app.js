// B1 English — Quiz Controller (Trinity GESE Grade 5)
(function(){
"use strict";

var STORAGE_KEY = "b1English";
var QUIZ_SIZE = 10;
var PASS_MARK = 70;

var state = {
  lang: "fa",
  view: "home", // home, quiz, speaking, guide, results
  mode: "grammar", // grammar, vocabulary, speaking
  questions: [],
  currentIndex: 0,
  answers: {},
  score: 0,
  filter: null, // grammar category or vocab topic filter
  speakingIndex: 0,
  speakingViewed: [],
  guideRead: [],
  history: [],
  totalAttempts: 0,
  bestScore: 0,
  passed: 0,
  promptsViewed: 0
};

function t(key){ return state.lang==="fa" ? key+"Fa" : key+"En"; }

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

// ===== QUIZ =====
function startQuiz(mode, filter){
  state.mode = mode || "grammar";
  state.filter = filter || null;
  var pool = [];

  if(state.mode === "grammar"){
    pool = getGrammarQuestions();
    if(state.filter) pool = pool.filter(function(q){ return q.grammar === state.filter; });
  } else {
    pool = getVocabQuestions();
    if(state.filter) pool = pool.filter(function(q){ return q.topic === state.filter; });
  }

  if(pool.length < QUIZ_SIZE){
    // fallback: use all if filter has too few
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

  render(); // show feedback

  if(state.currentIndex < state.questions.length - 1){
    setTimeout(function(){
      state.currentIndex++;
      render();
    }, 1200);
  } else {
    setTimeout(function(){
      finishQuiz();
    }, 1200);
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
  state.view = "results";
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
  if(el){
    el.classList.toggle("open");
    if(hdr) hdr.classList.toggle("open");
  }
  // Update rendered button
  var btn = document.getElementById("guide-mark-" + idx);
  if(btn){
    if(state.guideRead.indexOf(idx) !== -1){
      btn.textContent = state.lang === "fa" ? "✓ خوانده شد" : "✓ Read";
      btn.classList.add("done");
    }
  }
}

// ===== NAV =====
function nav(view){
  state.view = view;
  render();
}

function toggleLang(){
  state.lang = state.lang === "fa" ? "en" : "fa";
  save();
  render();
}

// ===== RENDER =====
function render(){
  var app = document.getElementById("app");
  if(!app) return;

  var headerHTML = renderHeader();
  var bodyHTML = "";

  switch(state.view){
    case "home": bodyHTML = renderHome(); break;
    case "quiz": bodyHTML = renderQuiz(); break;
    case "speaking": bodyHTML = renderSpeaking(); break;
    case "guide": bodyHTML = renderGuide(); break;
    case "results": bodyHTML = renderResults(); break;
  }

  var navHTML = renderBottomNav();
  app.innerHTML = headerHTML + bodyHTML + navHTML;
  bindEvents();
}

function renderHeader(){
  var isFA = state.lang === "fa";
  var pillText = "";

  if(state.view === "quiz"){
    var q = state.questions[state.currentIndex];
    if(q) pillText = (state.currentIndex + 1) + "/" + state.questions.length;
  }

  return '<header class="app-header"><div class="header-inner">' +
    '<div class="brand" id="brand-home">' +
    '<span class="brand-icon">📝</span>' +
    '<div class="brand-text">' +
    '<span class="brand-fa">آمادگی B1</span>' +
    '<span class="brand-en">B1 English Prep</span>' +
    '</div></div>' +
    '<div class="header-actions">' +
    (pillText ? '<span class="progress-pill">' + pillText + '</span>' : '') +
    '<div class="lang-flags">' +
    '<button class="lang-flag-btn' + (state.lang === "fa" ? " active" : "") + '" id="lang-fa">🇮🇷</button>' +
    '<button class="lang-flag-btn' + (state.lang === "en" ? " active" : "") + '" id="lang-en">🇬🇧</button>' +
    '</div></div></div></header>';
}

function renderBottomNav(){
  var isFA = state.lang === "fa";
  var items = [
    { id: "nav-home", icon: "🏠", label: isFA ? "خانه" : "Home", view: "home" },
    { id: "nav-quiz", icon: "📝", label: isFA ? "آزمون" : "Quiz", view: "quiz" },
    { id: "nav-speaking", icon: "🗣", label: isFA ? "صحبت" : "Speaking", view: "speaking" },
    { id: "nav-guide", icon: "📖", label: isFA ? "راهنما" : "Guide", view: "guide" }
  ];

  var html = '<nav class="bottom-nav">';
  for(var i = 0; i < items.length; i++){
    var it = items[i];
    var active = (state.view === it.view) || (it.view === "quiz" && state.view === "results");
    html += '<button class="bottom-nav-item' + (active ? " active" : "") + '" data-nav="' + it.view + '">' +
      '<span class="bottom-nav-icon">' + it.icon + '</span>' +
      '<span class="bottom-nav-label">' + it.label + '</span></button>';
  }
  html += '</nav>';
  return html;
}

// ===== HOME VIEW =====
function renderHome(){
  var isFA = state.lang === "fa";
  var grammarQs = getGrammarQuestions();
  var vocabQs = getVocabQuestions();
  var prompts = getSpeakingPrompts();
  var gInfo = getGrammarInfo();
  var tInfo = getTopicInfo();

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

  var html = '<main class="view active">';

  // Hero
  html += '<div class="hero">' +
    '<div class="hero-icon">🎓</div>' +
    '<div class="hero-title">' + (isFA ? "آمادگی آزمون B1 انگلیسی" : "B1 English Test Prep") + '</div>' +
    '<div class="hero-sub">' + (isFA ? "Trinity GESE Grade 5 — Speaking & Listening" : "Trinity GESE Grade 5 — Speaking & Listening") + '</div>' +
    '<div class="hero-sub-en">B1 CEFR Level Practice</div>' +
    '<span class="hero-badge">' + (isFA ? "سطح B1" : "B1 Level") + '</span></div>';

  // Stats
  html += '<div class="stats-row">' +
    '<div class="stat-card"><span class="stat-num">' + grammarQs.length + '</span><span class="stat-label">' + (isFA ? "سوال گرامر" : "Grammar Qs") + '</span></div>' +
    '<div class="stat-card pink"><span class="stat-num">' + vocabQs.length + '</span><span class="stat-label">' + (isFA ? "سوال واژگان" : "Vocab Qs") + '</span></div>' +
    '<div class="stat-card"><span class="stat-num">' + prompts.length + '</span><span class="stat-label">' + (isFA ? "پامپت صحبت" : "Speaking") + '</span></div>' +
    '<div class="stat-card"><span class="stat-num">' + state.totalAttempts + '</span><span class="stat-label">' + (isFA ? "تلاش" : "Attempts") + '</span></div></div>';

  // Quick Actions
  html += '<div class="quick-actions">' +
    '<button class="quick-action-btn" id="qa-random-grammar"><span class="quick-action-icon">🎲</span><span class="quick-action-label">' + (isFA ? "گرامر تصادفی" : "Random Grammar") + '</span><span class="quick-action-label-en">10 Questions</span></button>' +
    '<button class="quick-action-btn" id="qa-random-vocab"><span class="quick-action-icon">📚</span><span class="quick-action-label">' + (isFA ? "واژگان تصادفی" : "Random Vocab") + '</span><span class="quick-action-label-en">10 Questions</span></button>' +
    '<button class="quick-action-btn" id="qa-speaking"><span class="quick-action-icon">🗣</span><span class="quick-action-label">' + (isFA ? "آمادگی صحبت" : "Speaking Prep") + '</span><span class="quick-action-label-en">48 Prompts</span></button></div>';

  // Quiz Mode Cards
  html += '<h2 class="section-heading">' + (isFA ? "حالت‌های آزمون" : "Quiz Modes") + '</h2>';
  html += '<div class="mode-grid">' +
    '<div class="mode-card grammar" id="mode-grammar">' +
    '<div class="mode-icon">📝</div><div class="mode-info">' +
    '<div class="mode-title">' + (isFA ? "گرامر" : "Grammar") + '</div>' +
    '<div class="mode-title-en">Grammar Quiz</div>' +
    '<div class="mode-meta">' + grammarQs.length + ' ' + (isFA ? "سوال" : "questions") + '</div></div>' +
    '<span class="mode-arrow">←</span></div>' +

    '<div class="mode-card vocabulary" id="mode-vocabulary">' +
    '<div class="mode-icon">📚</div><div class="mode-info">' +
    '<div class="mode-title">' + (isFA ? "واژگان" : "Vocabulary") + '</div>' +
    '<div class="mode-title-en">Vocabulary Quiz</div>' +
    '<div class="mode-meta">' + vocabQs.length + ' ' + (isFA ? "سوال" : "questions") + '</div></div>' +
    '<span class="mode-arrow">←</span></div>' +

    '<div class="mode-card speaking" id="mode-speaking">' +
    '<div class="mode-icon">🗣</div><div class="mode-info">' +
    '<div class="mode-title">' + (isFA ? "آمادگی صحبت" : "Speaking Prep") + '</div>' +
    '<div class="mode-title-en">Speaking Practice</div>' +
    '<div class="mode-meta">' + prompts.length + ' ' + (isFA ? "پامپت" : "prompts") + ' · ' + state.promptsViewed + ' ' + (isFA ? "دیده شده" : "viewed") + '</div></div>' +
    '<span class="mode-arrow">←</span></div></div>';

  // Grammar Categories
  html += '<h2 class="section-heading">' + (isFA ? "دسته‌بندی گرامر" : "Grammar Categories") + '</h2>';
  html += '<div class="category-grid">';
  var gKeys = Object.keys(gInfo);
  for(var gi = 0; gi < gKeys.length; gi++){
    var gk = gKeys[gi];
    var gdata = gInfo[gk];
    html += '<div class="cat-card" data-quiz="grammar" data-filter="' + gk + '">' +
      '<div class="cat-icon" style="background:' + gdata.color + '22;color:' + gdata.color + '">📝</div>' +
      '<div class="cat-info"><div class="cat-title">' + (isFA ? gdata.fa : gdata.en) + '</div>' +
      '<div class="cat-title-en">' + gdata.en + '</div>' +
      '<div class="cat-meta">' + (grammarCats[gk] || 0) + ' ' + (isFA ? "سوال" : "questions") + '</div></div></div>';
  }
  html += '</div>';

  // Vocab Topics
  html += '<h2 class="section-heading">' + (isFA ? "موضوعات واژگان" : "Vocabulary Topics") + '</h2>';
  html += '<div class="category-grid">';
  var tKeys = Object.keys(tInfo);
  for(var ti = 0; ti < tKeys.length; ti++){
    var tk = tKeys[ti];
    var tdata = tInfo[tk];
    html += '<div class="cat-card" data-quiz="vocabulary" data-filter="' + tk + '">' +
      '<div class="cat-icon" style="background:' + tdata.color + '22;color:' + tdata.color + '">' + tdata.icon + '</div>' +
      '<div class="cat-info"><div class="cat-title">' + (isFA ? tdata.fa : tdata.en) + '</div>' +
      '<div class="cat-title-en">' + tdata.en + '</div>' +
      '<div class="cat-meta">' + (vocabTopics[tk] || 0) + ' ' + (isFA ? "سوال" : "questions") + '</div></div></div>';
  }
  html += '</div>';

  // History
  if(state.history.length > 0){
    html += '<h2 class="section-heading">' + (isFA ? "تاریخچه" : "History") + '</h2>';
    html += '<div class="history-list">';
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
    html += '</div>';
  }

  html += '</main>';
  return html;
}

// ===== QUIZ VIEW =====
function renderQuiz(){
  var isFA = state.lang === "fa";
  var q = state.questions[state.currentIndex];
  if(!q) return '<main class="view active"><p>' + (isFA ? "خطا" : "Error") + '</p></main>';

  var idx = state.currentIndex;
  var total = state.questions.length;
  var answered = state.answers[idx];
  var isCorrect = answered && answered === q.correctOption;

  var pctProgress = ((idx) / total) * 100;
  var isPink = state.mode === "vocabulary";

  var html = '<main class="view active">';
  html += '<div class="back-btn" id="btn-back-quiz">→ ' + (isFA ? "بازگشت" : "Back") + '</div>';

  // Progress
  html += '<div class="quiz-progress">' +
    '<div class="quiz-progress-bar"><div class="quiz-progress-fill' + (isPink ? ' pink' : '') + '" id="quiz-fill" style="width:' + pctProgress + '%"></div></div>' +
    '<span class="quiz-progress-text">' + (idx + 1) + '/' + total + '</span></div>';

  // Mode label
  var modeLabel = state.mode === "grammar" ? (isFA ? "گرامر" : "Grammar") : (isFA ? "واژگان" : "Vocabulary");
  var modeColor = isPink ? "#e84393" : "#4361ee";

  // Question card
  html += '<div class="quiz-question">';

  // Meta tags
  html += '<div class="quiz-q-meta">';
  html += '<span class="quiz-q-tag" style="background:' + modeColor + '15;color:' + modeColor + '">' + modeLabel + '</span>';

  if(state.mode === "grammar"){
    var gInfo = getGrammarInfo();
    var gi = gInfo[q.grammar];
    if(gi) html += '<span class="quiz-q-tag" style="background:' + gi.color + '15;color:' + gi.color + '">' + (isFA ? gi.fa : gi.en) + '</span>';
  } else {
    var tInfo = getTopicInfo();
    var ti = tInfo[q.topic];
    if(ti) html += '<span class="quiz-q-tag" style="background:' + ti.color + '15;color:' + ti.color + '">' + ti.icon + ' ' + (isFA ? ti.fa : ti.en) + '</span>';
  }
  html += '<span class="quiz-q-tag" style="background:' + getDiffColor(q.difficulty) + '15;color:' + getDiffColor(q.difficulty) + '">' + getDiffLabel(q.difficulty) + '</span>';
  html += '</div>';

  // Question text
  html += '<div class="quiz-q-text">' + q[t("question")] + '</div>';
  html += '<div class="quiz-q-en en-text">' + q.questionEn + '</div>';

  // Options
  html += '<div class="quiz-options">';
  var optLabels = { a: "A", b: "B", c: "C", d: "D" };
  for(var i = 0; i < q.options.length; i++){
    var opt = q.options[i];
    var cls = "quiz-opt";
    if(answered){
      if(opt.id === q.correctOption) cls += " correct";
      else if(opt.id === answered && !isCorrect) cls += " wrong";
    }
    html += '<button data-opt="' + opt.id + '" class="' + cls + '">' +
      '<span class="quiz-opt-letter">' + optLabels[opt.id] + '</span>' +
      '<span class="quiz-opt-text">' + opt[t("text")] +
      (state.lang === "fa" ? '<span class="en-text"> ' + opt.textEn + '</span>' : '') +
      '</span></button>';
  }
  html += '</div>';

  // Explanation (after answer)
  if(answered){
    html += '<div class="quiz-explanation visible">' +
      '<strong>' + (isCorrect ? "✓ " + (isFA ? "آفرین! پاسخ درست است." : "Correct!") : "✗ " + (isFA ? "پاسخ اشتباه بود." : "Incorrect!")) + '</strong><br>' +
      q[t("explanation")] +
      '<div class="quiz-explanation-en en-text">' + q.explanationEn + '</div></div>';
  }

  html += '</div></main>';
  return html;
}

// ===== SPEAKING VIEW =====
function renderSpeaking(){
  var isFA = state.lang === "fa";
  var prompts = getSpeakingPrompts();
  if(prompts.length === 0) return '<main class="view active"><p>' + (isFA ? "داده‌ای یافت نشد" : "No data") + '</p></main>';

  var p = prompts[state.speakingIndex];
  if(!p) state.speakingIndex = 0;
  p = prompts[state.speakingIndex];

  var tInfo = getTopicInfo();
  var topicData = tInfo[p.topic] || {};
  var topicColor = topicData.color || "#4361ee";
  var topicIcon = topicData.icon || "💬";
  var topicName = isFA ? (topicData.fa || p.topic) : (topicData.en || p.topic);

  var html = '<main class="view active">';
  html += '<div class="back-btn" id="btn-back-speaking">→ ' + (isFA ? "بازگشت" : "Back") + '</div>';

  // Nav bar
  html += '<div class="speaking-nav">' +
    '<button class="speaking-nav-btn" id="sp-prev"' + (state.speakingIndex === 0 ? " disabled" : "") + '>' + (isFA ? "قبلی" : "Prev") + '</button>' +
    '<span class="speaking-counter">' + (state.speakingIndex + 1) + ' / ' + prompts.length + '</span>' +
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
  html += '<div class="model-answer' + (isRevealed ? " visible" : '') + '" id="sp-answer">';
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

// ===== GUIDE VIEW =====
function renderGuide(){
  var isFA = state.lang === "fa";
  var guides = getTopicGuide();

  var html = '<main class="view active">';
  html += '<h2 class="section-title">' + (isFA ? "راهنمای آمادگی آزمون" : "Exam Preparation Guide") + '</h2>';
  html += '<div class="section-title-en en-text">Trinity GESE Grade 5 Tips</div>';
  html += '<div class="section-desc">' + (isFA ? "راهنمای کامل برای آمادگی آزمون B1 صحبت و شنیدار. هر بخش را باز کنید و نکات مهم را مطالعه کنید." : "Complete guide for B1 Speaking & Listening exam preparation. Open each section and study the key tips.") + '</div>';

  for(var i = 0; i < guides.length; i++){
    var g = guides[i];
    var isRead = state.guideRead.indexOf(i) !== -1;
    var isOpen = isRead; // auto-open read sections

    html += '<div class="guide-card' + (isOpen ? ' open' : '') + '" id="guide-card-' + i + '">';
    html += '<button class="guide-header' + (isOpen ? ' open' : '') + '" id="guide-hdr-' + i + '" data-guide="' + i + '">' +
      '<span class="guide-icon">📖</span>' +
      '<div class="guide-info"><div class="guide-name">' + g[t("title")] + '</div>' +
      '<div class="guide-name-en">' + g.titleEn + '</div></div>' +
      (isRead ? '<span class="guide-read-badge">✓</span>' : '') +
      '<span class="guide-arrow">▼</span></button></div>';

    html += '<div class="guide-body' + (isOpen ? ' open' : '') + '" id="guide-body-' + i + '">';
    html += '<div class="guide-desc">' + g[t("desc")] + '</div>';
    html += '<div class="guide-desc-en en-text">' + g.descEn + '</div>';
    html += '<ul class="guide-tips-list">';
    var tipsArr = isFA ? (g.tipsFa || g.tips) : g.tips;
    for(var j = 0; j < tipsArr.length; j++){
      html += '<li class="en-text">💡 ' + tipsArr[j] + '</li>';
    }
    html += '</ul>';
    html += '<button class="guide-mark-btn' + (isRead ? ' done' : '') + '" id="guide-mark-' + i + '" data-guide="' + i + '">' +
      (isRead ? (isFA ? "✓ خوانده شد" : "✓ Read") : (isFA ? "علامت‌گذاری به عنوان خوانده شده" : "Mark as Read")) + '</button>';
    html += '</div>';
  }

  html += '</main>';
  return html;
}

// ===== RESULTS VIEW =====
function renderResults(){
  var isFA = state.lang === "fa";
  var pct = Math.round((state.score / state.questions.length) * 100);
  var passed = pct >= PASS_MARK;
  var modeLabel = state.mode === "grammar" ? (isFA ? "گرامر" : "Grammar") : (isFA ? "واژگان" : "Vocabulary");

  var html = '<main class="view active">';

  html += '<div class="results-card ' + (passed ? 'passed' : 'failed') + '">' +
    '<div class="results-icon">' + (passed ? "🎉" : "💪") + '</div>' +
    '<div class="results-title">' + (passed ? (isFA ? "تبریک! قبول شدید" : "Congratulations! Passed") : (isFA ? "متأسفانه قبول نشدید" : "Unfortunately, Failed")) + '</div>' +
    '<div class="results-sub" style="font-size:14px;color:#888;margin-top:4px;">' + modeLabel + '</div>' +
    '<div class="results-score">' +
    '<span class="score-big">' + state.score + '</span>' +
    '<span class="score-sep">/</span>' +
    '<span class="score-total">' + state.questions.length + '</span></div>' +
    '<div class="results-pct">' + pct + '%</div>' +
    '<div class="results-bar"><div class="results-bar-fill" style="width:' + pct + '%;background:' + (passed ? '#22c55e' : '#ef4444') + '"></div></div>' +
    '<div class="results-pass-mark">' + (isFA ? "نمره قبولی: " + PASS_MARK + "%" : "Pass mark: " + PASS_MARK + "%") + '</div></div>';

  // Actions
  html += '<div class="results-actions">' +
    '<button class="results-btn results-btn-primary" id="btn-retry">' + (isFA ? "تلاش مجدد" : "Try Again") + '</button>' +
    '<button class="results-btn results-btn-secondary" id="btn-home-results">' + (isFA ? "صفحه اصلی" : "Home") + '</button></div>';

  // Summary grid
  html += '<div class="answer-summary">';
  for(var i = 0; i < state.questions.length; i++){
    var q = state.questions[i];
    var ans = state.answers[i];
    var correct = ans === q.correctOption;
    html += '<div class="summary-item ' + (correct ? 'correct' : 'wrong') + '" title="Q' + (i + 1) + ': ' + (correct ? '✓' : '✗') + '">' + (i + 1) + '</div>';
  }
  html += '</div>';

  // Stats
  html += '<div class="stats-row">' +
    '<div class="stat-card"><span class="stat-num">' + state.totalAttempts + '</span><span class="stat-label">' + (isFA ? "کل تلاش" : "Total") + '</span></div>' +
    '<div class="stat-card"><span class="stat-num">' + state.bestScore + '</span><span class="stat-label">' + (isFA ? "بهترین نمره" : "Best Score") + '</span></div>' +
    '<div class="stat-card"><span class="stat-num">' + state.passed + '</span><span class="stat-label">' + (isFA ? "قبولی" : "Passed") + '</span></div>' +
    '<div class="stat-card pink"><span class="stat-num">' + (state.totalAttempts > 0 ? Math.round((state.passed / state.totalAttempts) * 100) : 0) + '%</span><span class="stat-label">' + (isFA ? "نرخ قبولی" : "Pass Rate") + '</span></div></div>';

  html += '</main>';
  return html;
}

// ===== BIND EVENTS =====
function bindEvents(){
  var el = function(id){ return document.getElementById(id); };

  // Brand/home
  var bh = el("brand-home");
  if(bh) bh.onclick = function(){ state.view = "home"; render(); };

  // Lang
  var lf = el("lang-fa");
  if(lf) lf.onclick = function(){ if(state.lang !== "fa"){ state.lang = "fa"; save(); render(); } };
  var le = el("lang-en");
  if(le) le.onclick = function(){ if(state.lang !== "en"){ state.lang = "en"; save(); render(); } };

  // Bottom nav
  var navBtns = document.querySelectorAll("[data-nav]");
  for(var n = 0; n < navBtns.length; n++){
    navBtns[n].onclick = function(){
      var v = this.getAttribute("data-nav");
      if(v === "speaking") startSpeaking();
      else if(v === "quiz"){ state.view = "home"; render(); } // go home to pick mode
      else nav(v);
    };
  }

  // Quick actions
  var qag = el("qa-random-grammar");
  if(qag) qag.onclick = function(){ startQuiz("grammar", null); };
  var qav = el("qa-random-vocab");
  if(qav) qav.onclick = function(){ startQuiz("vocabulary", null); };
  var qas = el("qa-speaking");
  if(qas) qas.onclick = function(){ startSpeaking(); };

  // Mode cards
  var mg = el("mode-grammar");
  if(mg) mg.onclick = function(){ startQuiz("grammar", null); };
  var mv = el("mode-vocabulary");
  if(mv) mv.onclick = function(){ startQuiz("vocabulary", null); };
  var ms = el("mode-speaking");
  if(ms) ms.onclick = function(){ startSpeaking(); };

  // Category cards (quiz filter)
  var catCards = document.querySelectorAll("[data-quiz]");
  for(var c = 0; c < catCards.length; c++){
    catCards[c].onclick = function(){
      var mode = this.getAttribute("data-quiz");
      var filter = this.getAttribute("data-filter");
      startQuiz(mode, filter);
    };
  }

  // Back buttons
  var bbq = el("btn-back-quiz");
  if(bbq) bbq.onclick = function(){ state.view = "home"; render(); };
  var bbs = el("btn-back-speaking");
  if(bbs) bbs.onclick = function(){ state.view = "home"; render(); };

  // Quiz options
  var qOpts = document.querySelectorAll(".quiz-opt");
  for(var q = 0; q < qOpts.length; q++){
    qOpts[q].onclick = function(){ handleAnswer(this.getAttribute("data-opt")); };
  }

  // Speaking nav
  var spPrev = el("sp-prev");
  if(spPrev) spPrev.onclick = function(){ navigateSpeaking(-1); };
  var spNext = el("sp-next");
  if(spNext) spNext.onclick = function(){ navigateSpeaking(1); };
  var spReveal = el("sp-reveal");
  if(spReveal) spReveal.onclick = function(){
    markPromptViewed(state.speakingIndex);
    render();
  };

  // Guide sections
  var guideHeaders = document.querySelectorAll("[data-guide]");
  for(var g = 0; g < guideHeaders.length; g++){
    guideHeaders[g].onclick = function(){
      toggleGuideSection(parseInt(this.getAttribute("data-guide")));
    };
  }

  // Results buttons
  var retry = el("btn-retry");
  if(retry) retry.onclick = function(){ startQuiz(state.mode, state.filter); };
  var homeR = el("btn-home-results");
  if(homeR) homeR.onclick = function(){ state.view = "home"; render(); };

  // Update progress bar
  var fill = el("quiz-fill");
  if(fill){
    var pct = (state.currentIndex / state.questions.length) * 100;
    fill.style.width = pct + "%";
  }
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
