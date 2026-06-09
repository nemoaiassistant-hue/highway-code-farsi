// Life in the UK — Quiz Controller
(function(){
"use strict";

var STORAGE_KEY = "lifeInUK";
var QUIZ_SIZE = 24;
var PASS_MARK = 75;

var state = {
  lang: "fa",
  view: "home",
  questions: [],
  currentIndex: 0,
  answers: {},
  score: 0,
  topicFilter: null,
  difficultyFilter: null,
  mode: "quiz",
  history: [],
  totalAttempts: 0,
  bestScore: 0,
  passed: 0
};

var topicNames = {
  values: {fa:"ارزش‌ها و اصول",en:"Values and Principles"},
  early_britain: {fa:"بریتانیای باستانی",en:"Early Britain"},
  middle_ages: {fa:"قرون وسطا",en:"The Middle Ages"},
  tudor_stuart: {fa:"تودور و استوارت",en:"Tudors and Stuarts"},
  georgian_victorian: {fa:"جورجی و ویکتوریا",en:"Georgians and Victorians"},
  modern_britain: {fa:"بریتانیای مدرن",en:"Modern Britain"},
  government: {fa:"دولت بریتانیا",en:"UK Government"},
  geography: {fa:"جغرافیا",en:"Geography"},
  culture: {fa:"فرهنگ",en:"Culture"},
  society: {fa:"جامعه",en:"Society"}
};

var topicColors = {
  values:"#6c5ce7",early_britain:"#e17055",middle_ages:"#d63031",
  tudor_stuart:"#e84393",georgian_victorian:"#fdcb6e",modern_britain:"#00b894",
  government:"#0984e3",geography:"#55a3e8",culture:"#fd79a8",society:"#636e72"
};

function t(key){ return state.lang==="fa"?key+"Fa":key+"En"; }

function save(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({
    history:state.history, totalAttempts:state.totalAttempts,
    bestScore:state.bestScore, passed:state.passed, lang:state.lang
  })); }catch(e){}
}

function load(){
  try{
    var d=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(d){ state.history=d.history||[]; state.totalAttempts=d.totalAttempts||0;
      state.bestScore=d.bestScore||0; state.passed=d.passed||0;
      if(d.lang) state.lang=d.lang; }
  }catch(e){}
}

function shuffle(arr){
  var a=arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var tmp=a[i]; a[i]=a[j]; a[j]=tmp;
  }
  return a;
}

function startQuiz(topic,diff){
  state.topicFilter=topic||null;
  state.difficultyFilter=diff||null;
  var pool = window.LIFE_IN_UK_QUESTIONS || [];
  if(state.topicFilter){
    pool = pool.filter(function(q){ return q.topic===state.topicFilter; });
  }
  if(state.difficultyFilter){
    pool = pool.filter(function(q){ return q.difficulty===state.difficultyFilter; });
  }
  if(pool.length < QUIZ_SIZE){
    pool = (window.LIFE_IN_UK_QUESTIONS || []).slice();
  }
  state.questions = shuffle(pool).slice(0, QUIZ_SIZE);
  state.currentIndex = 0;
  state.answers = {};
  state.score = 0;
  state.mode = "quiz";
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
      passed: pct >= PASS_MARK
    });
    if(state.history.length > 50) state.history = state.history.slice(0, 50);
    save();
    setTimeout(function(){ state.view="results"; render(); }, 600);
  }
  render();
}

function nav(view){ state.view=view; render(); }

function toggleLang(){
  state.lang = state.lang==="fa"?"en":"fa";
  save(); render();
}

function getDiffLabel(d, lang){
  var k = lang===true?"fa":lang===false?"en":lang;
  var m = {easy:{fa:"آسان",en:"Easy"},medium:{fa:"متوسط",en:"Medium"},hard:{fa:"سخت",en:"Hard"}};
  return m[d]?m[d][k]:d;
}

function getDiffColor(d){
  return d==="easy"?"#00b894":d==="medium"?"#fdcb6e":"#d63031";
}

// ===== RENDER =====
function render(){
  var app = document.getElementById("app");
  if(!app) return;
  switch(state.view){
    case "home": app.innerHTML = renderHome(); break;
    case "study": app.innerHTML = renderStudy(); break;
    case "quiz": app.innerHTML = renderQuiz(); break;
    case "results": app.innerHTML = renderResults(); break;
  }
  bindEvents();
  updateProgress();
}

function updateProgress(){
  var el = document.getElementById("progress-bar");
  if(!el) return;
  if(state.view==="quiz"){
    var pct = ((state.currentIndex) / state.questions.length) * 100;
    el.style.width = pct + "%";
    el.style.display = "block";
    var cnt = document.getElementById("progress-count");
    if(cnt) cnt.textContent = (state.currentIndex+1) + "/" + state.questions.length;
  } else {
    el.style.display = "none";
  }
}

function renderHeader(){
  var isRTL = state.lang === "fa";
  return '<header class="app-header">'+
    '<div class="header-left">'+
    '<button id="btn-home" class="icon-btn">&#9664;</button>'+
    '</div>'+
    '<div class="header-center">'+
    '<h1 class="header-title">'+(state.lang==="fa"?"آزمون زندگی در بریتانیا":"Life in the UK Test")+'</h1>'+
    '</div>'+
    '<div class="header-right">'+
    '<button id="btn-lang" class="lang-toggle">'+(state.lang==="fa"?"EN":"فا")+'</button>'+
    '</div>'+
    '</header>';
}

function renderHome(){
  var isFA = state.lang==="fa";
  var passRate = state.totalAttempts > 0 ? Math.round((state.passed/state.totalAttempts)*100) : 0;
  var topics = {};
  var allQ = window.LIFE_IN_UK_QUESTIONS || [];
  allQ.forEach(function(q){ if(!topics[q.topic]) topics[q.topic]=0; topics[q.topic]++; });

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';
  html += '<main class="container">';

  // Stats
  html += '<div class="stats-bar">'+
    '<div class="stat-card"><div class="stat-num">'+allQ.length+'</div><div class="stat-label">'+(isFA?"سوال":"Questions")+'</div></div>'+
    '<div class="stat-card"><div class="stat-num">24</div><div class="stat-label">'+(isFA?"سوال هر آزمون":"Per Quiz")+'</div></div>'+
    '<div class="stat-card"><div class="stat-num">'+state.totalAttempts+'</div><div class="stat-label">'+(isFA?"تلاش":"Attempts")+'</div></div>'+
    '<div class="stat-card"><div class="stat-num">'+passRate+'%</div><div class="stat-label">'+(isFA?"نرخ قبولی":"Pass Rate")+'</div></div>'+
    '</div>';

  // Quick Start
  html += '<section class="section"><h2 class="section-title">'+(isFA?"شروع سریع":"Quick Start")+'</h2>'+
    '<div class="quick-start">'+
    '<button id="btn-quiz-all" class="btn btn-primary btn-large">'+(isFA?"آزمون تصادفی ۲۴ سوالی":"Random 24-Question Quiz")+'</button>'+
    '</div></section>';

  // Topic Filter
  html += '<section class="section"><h2 class="section-title">'+(isFA?"آزمون بر اساس موضوع":"Quiz by Topic")+'</h2>'+
    '<div class="topic-grid">';
  var topicKeys = Object.keys(topicNames);
  for(var i=0; i<topicKeys.length; i++){
    var tk = topicKeys[i];
    var tn = topicNames[tk];
    html += '<button data-topic="'+tk+'" class="topic-card topic-filter-btn" style="border-color:'+topicColors[tk]+'">'+
      '<div class="topic-name">'+tn[isFA?"fa":"en"]+'</div>'+
      '<div class="topic-count">'+(topics[tk]||0)+(isFA?" سوال":" questions")+'</div>'+
      '</button>';
  }
  html += '</div></section>';

  // Difficulty Filter
  html += '<section class="section"><h2 class="section-title">'+(isFA?"آزمون بر اساس سختی":"Quiz by Difficulty")+'</h2>'+
    '<div class="diff-grid">'+
    '<button data-diff="easy" class="diff-card diff-btn" style="border-color:#00b894"><div>'+getDiffLabel("easy",isFA)+'</div></button>'+
    '<button data-diff="medium" class="diff-card diff-btn" style="border-color:#fdcb6e"><div>'+getDiffLabel("medium",isFA)+'</div></button>'+
    '<button data-diff="hard" class="diff-card diff-btn" style="border-color:#d63031"><div>'+getDiffLabel("hard",isFA)+'</div></button>'+
    '</div></section>';

  // Study Mode
  html += '<section class="section"><h2 class="section-title">'+(isFA?"مطالعه آزاد":"Study Mode")+'</h2>'+
    '<div class="study-intro">'+
    '<button id="btn-study" class="btn btn-secondary btn-large">'+(isFA?"مشاهده همه سوالات و پاسخ‌ها":"View All Questions and Answers")+'</button>'+
    '</div></section>';

  // History
  if(state.history.length > 0){
    html += '<section class="section"><h2 class="section-title">'+(isFA?"تاریخچه":"History")+'</h2>'+
      '<div class="history-list">';
    var show = Math.min(state.history.length, 10);
    for(var h=0; h<show; h++){
      var item = state.history[h];
      var d = new Date(item.date);
      var dateStr = d.toLocaleDateString(isFA?"fa-IR":"en-GB");
      html += '<div class="history-item '+(item.passed?"passed":"failed")+'">'+
        '<div class="hist-score">'+item.score+'/'+item.total+'</div>'+
        '<div class="hist-pct">'+item.pct+'%</div>'+
        '<div class="hist-date">'+dateStr+'</div>'+
        '</div>';
    }
    html += '</div></section>';
  }

  html += '<footer class="credit">'+(isFA?"ساخته شده توسط نیما حکیم‌مانی":"Crafted by Nima Hakimmaani")+'</footer>';
  html += '</main>';
  return html;
}

function renderStudy(){
  var isFA = state.lang==="fa";
  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';
  html += '<main class="container">';
  html += '<div class="study-header"><button id="btn-back-study" class="btn btn-secondary">'+(isFA?"بازگشت":"Back")+'</button></div>';

  var allQ = window.LIFE_IN_UK_QUESTIONS || [];
  var currentTopic = "";
  for(var i=0; i<allQ.length; i++){
    var q = allQ[i];
    if(q.topic !== currentTopic){
      currentTopic = q.topic;
      var tn = topicNames[currentTopic] || {fa:currentTopic,en:currentTopic};
      html += '<div class="study-topic-divider" style="background:'+topicColors[currentTopic]+'">'+
        '<span>'+tn[isFA?"fa":"en"]+'</span></div>';
    }
    html += '<div class="study-card">'+
      '<div class="study-q-num">'+q.id+'</div>'+
      '<div class="study-question">'+q[t("question")]+'</div>'+
      '<div class="study-options">';
    var optLabels = {a:"A",b:"B",c:"C",d:"D"};
    for(var j=0; j<q.options.length; j++){
      var opt = q.options[j];
      var isCorrect = opt.id === q.correctOption;
      html += '<div class="study-option '+(isCorrect?"correct":"")+'">'+
        '<span class="opt-label">'+optLabels[opt.id]+'</span> '+opt[t("text")]+'</div>';
    }
    html += '</div>'+
      '<div class="study-explanation">'+q[t("explanation")]+'</div>'+
      '</div>';
  }

  html += '</main>';
  return html;
}

function renderQuiz(){
  var isFA = state.lang==="fa";
  var q = state.questions[state.currentIndex];
  if(!q) return '<p>'+isFA?"خطا":"Error"+'</p>';
  var idx = state.currentIndex;
  var total = state.questions.length;
  var answered = state.answers[idx];
  var isCorrect = answered === q.correctOption;

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div>'+
    '<span id="progress-count" class="progress-count">'+(idx+1)+'/'+total+'</span></div>';

  html += '<main class="container">'+
    '<div class="quiz-card">'+
    '<div class="quiz-meta">'+
    '<span class="quiz-num">'+(isFA?"سوال ":"Question ")+(idx+1)+'</span>'+
    '<span class="quiz-topic" style="color:'+topicColors[q.topic]+'">'+topicNames[q.topic][isFA?"fa":"en"]+'</span>'+
    '<span class="quiz-diff" style="color:'+getDiffColor(q.difficulty)+'">'+getDiffLabel(q.difficulty,isFA)+'</span>'+
    '</div>'+
    '<div class="quiz-question">'+q[t("question")]+'</div>'+
    '<div class="quiz-options">';

  var optLabels = {a:"A",b:"B",c:"C",d:"D"};
  for(var i=0; i<q.options.length; i++){
    var opt = q.options[i];
    var cls = "quiz-option";
    if(answered){
      if(opt.id === q.correctOption) cls += " correct";
      else if(opt.id === answered && !isCorrect) cls += " wrong";
    }
    html += '<button data-opt="'+opt.id+'" class="'+cls+'">'+
      '<span class="opt-label">'+optLabels[opt.id]+'</span>'+
      '<span class="opt-text">'+opt[t("text")]+'</span>'+
      '</button>';
  }
  html += '</div>';

  if(answered){
    html += '<div class="quiz-feedback">'+
      '<div class="feedback-icon">'+(isCorrect?"✓":"✗")+'</div>'+
      '<div class="feedback-text">'+(isCorrect?(isFA?"آفرین! پاسخ درست است.":"Correct!"):(isFA?"پاسخ اشتباه بود.":"Incorrect!"))+'</div>'+
      '<div class="feedback-explanation">'+q[t("explanation")]+'</div>'+
      '</div>';
  }

  html += '</div></main>';
  return html;
}

function renderResults(){
  var isFA = state.lang==="fa";
  var pct = Math.round((state.score / state.questions.length) * 100);
  var passed = pct >= PASS_MARK;
  var latest = state.history[0];

  var html = renderHeader();
  html += '<div class="progress-wrapper"><div id="progress-bar" class="progress-bar"></div></div>';
  html += '<main class="container">';
  html += '<div class="results-card '+(passed?"passed":"failed")+'">'+
    '<div class="results-icon">'+(passed?"🎉":"😔")+'</div>'+
    '<div class="results-title">'+(passed?(isFA?"تبریک! قبول شدید":"Congratulations! Passed"):(isFA?"متأسفانه قبول نشدید":"Unfortunately, Failed"))+'</div>'+
    '<div class="results-score"><span class="score-big">'+state.score+'</span><span class="score-sep">/</span><span>'+state.questions.length+'</span></div>'+
    '<div class="results-pct">'+pct+'%</div>'+
    '<div class="results-bar"><div class="results-bar-fill" style="width:'+pct+'%;background:'+(passed?"#00b894":"#d63031")+'"></div></div>'+
    '<div class="results-pass-mark">'+(isFA?"نمره قبولی: "+PASS_MARK+"%":"Pass mark: "+PASS_MARK+"%")+'</div>'+
    '</div>';

  html += '<div class="results-actions">'+
    '<button id="btn-retry" class="btn btn-primary btn-large">'+(isFA?"تلاش مجدد":"Try Again")+'</button>'+
    '<button id="btn-home-results" class="btn btn-secondary btn-large">'+(isFA?"صفحه اصلی":"Home")+'</button>'+
    '</div>';

  // Answer Summary
  html += '<div class="answer-summary">';
  for(var i=0; i<state.questions.length; i++){
    var q = state.questions[i];
    var ans = state.answers[i];
    var correct = ans === q.correctOption;
    html += '<div class="summary-item '+(correct?"correct":"wrong")+'">'+
      '<span class="sum-num">'+(i+1)+'</span>'+
      '<span class="sum-icon">'+(correct?"✓":"✗")+'</span>'+
      '</div>';
  }
  html += '</div>';

  html += '</main>';
  return html;
}

// ===== EVENTS =====
function bindEvents(){
  var el = function(id){ return document.getElementById(id); };

  var bh = el("btn-home");
  if(bh) bh.onclick = function(){ state.view="home"; render(); };

  var bl = el("btn-lang");
  if(bl) bl.onclick = toggleLang;

  var bq = el("btn-quiz-all");
  if(bq) bq.onclick = function(){ startQuiz(null, null); };

  var bs = el("btn-study");
  if(bs) bs.onclick = function(){ state.view="study"; render(); };

  var bbs = el("btn-back-study");
  if(bbs) bbs.onclick = function(){ state.view="home"; render(); };

  var br = el("btn-retry");
  if(br) br.onclick = function(){ startQuiz(state.topicFilter, state.difficultyFilter); };

  var bhr = el("btn-home-results");
  if(bhr) bhr.onclick = function(){ state.view="home"; render(); };

  // Topic filter buttons
  var tBtns = document.querySelectorAll(".topic-filter-btn");
  for(var i=0; i<tBtns.length; i++){
    tBtns[i].onclick = function(){ startQuiz(this.dataset.topic, null); };
  }

  // Difficulty buttons
  var dBtns = document.querySelectorAll(".diff-btn");
  for(var j=0; j<dBtns.length; j++){
    dBtns[j].onclick = function(){ startQuiz(null, this.dataset.diff); };
  }

  // Quiz option buttons
  var qOpts = document.querySelectorAll(".quiz-option");
  for(var k=0; k<qOpts.length; k++){
    qOpts[k].onclick = function(){ handleAnswer(this.dataset.opt); };
  }
}

// ===== INIT =====
function init(){
  load();
  render();
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
