// ===== LIFE IN THE UK — FULL FEATURE APP =====
// Brand header, hero, bottom nav, DOM-based views, 24-question quiz, 75% pass mark
(function () {
  'use strict';

  // =============================================
  // CONSTANTS
  // =============================================
  var STORAGE_KEY = 'lifeInUK';
  var QUIZ_SIZE = 24;
  var PASS_MARK = 75;

  // =============================================
  // STATE
  // =============================================
  var state = {
    currentView: 'home',
    lang: 'fa',
    quizIndex: 0,
    quizAnswered: false,
    quizScore: 0,
    quizQuestions: [],
    topicFilter: null,
    difficultyFilter: null,
    history: [],
    totalAttempts: 0,
    bestScore: 0,
    passed: 0,
    lastScore: '—'
  };

  // =============================================
  // TOPIC CONFIG
  // =============================================
  var topicNames = {
    values: { fa: 'ارزش‌ها و اصول', en: 'Values and Principles' },
    early_britain: { fa: 'بریتانیای باستانی', en: 'Early Britain' },
    middle_ages: { fa: 'قرون وسطا', en: 'The Middle Ages' },
    tudor_stuart: { fa: 'تودور و استوارت', en: 'Tudors and Stuarts' },
    georgian_victorian: { fa: 'جورجی و ویکتوریا', en: 'Georgians and Victorians' },
    modern_britain: { fa: 'بریتانیای مدرن', en: 'Modern Britain' },
    government: { fa: 'دولت بریتانیا', en: 'UK Government' },
    geography: { fa: 'جغرافیا', en: 'Geography' },
    culture: { fa: 'فرهنگ', en: 'Culture' },
    society: { fa: 'جامعه', en: 'Society' }
  };

  var topicColors = {
    values: '#6c5ce7', early_britain: '#e17055', middle_ages: '#d63031',
    tudor_stuart: '#e84393', georgian_victorian: '#fdcb6e', modern_britain: '#00b894',
    government: '#0984e3', geography: '#55a3e8', culture: '#fd79a8', society: '#636e72'
  };

  var topicIcons = {
    values: '🏛️', early_britain: '⚔️', middle_ages: '🏰',
    tudor_stuart: '👑', georgian_victorian: '🎩', modern_britain: '🇬🇧',
    government: '⚖️', geography: '🗺️', culture: '🎭', society: '👥'
  };

  // =============================================
  // DOM HELPERS
  // =============================================
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return document.querySelectorAll(sel); };

  // =============================================
  // PERSISTENCE
  // =============================================
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        history: state.history, totalAttempts: state.totalAttempts,
        bestScore: state.bestScore, passed: state.passed, lang: state.lang
      }));
    } catch (e) { /* ignore */ }
  }

  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (d) {
        state.history = d.history || [];
        state.totalAttempts = d.totalAttempts || 0;
        state.bestScore = d.bestScore || 0;
        state.passed = d.passed || 0;
        if (d.lang) state.lang = d.lang;
      }
    } catch (e) { /* ignore */ }
  }

  // =============================================
  // HELPERS
  // =============================================
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function escHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function t(key) { return state.lang === 'fa' ? key + 'Fa' : key + 'En'; }

  function isFA() { return state.lang === 'fa'; }

  function getDiffLabel(d, lang) {
    var k = lang === true ? 'fa' : lang === false ? 'en' : lang;
    var m = { easy: { fa: 'آسان', en: 'Easy' }, medium: { fa: 'متوسط', en: 'Medium' }, hard: { fa: 'سخت', en: 'Hard' } };
    return m[d] ? m[d][k] : d;
  }

  function getDiffColor(d) {
    return d === 'easy' ? '#00b894' : d === 'medium' ? '#fdcb6e' : '#d63031';
  }

  function getPassRate() {
    return state.totalAttempts > 0 ? Math.round((state.passed / state.totalAttempts) * 100) : 0;
  }

  // =============================================
  // VIEW MANAGEMENT
  // =============================================
  function showView(name) {
    $$('.view').forEach(function (v) { v.classList.remove('active'); });
    var target = $('#' + name + 'View');
    if (target) target.classList.add('active');
    state.currentView = name;
    window.scrollTo(0, 0);
    updateBottomNav(name);
  }

  // =============================================
  // BOTTOM NAV
  // =============================================
  function updateBottomNav(active) {
    var map = { home: 'navHome', study: 'navStudy', quiz: 'navQuiz', progress: 'navProgress' };
    var activeId = map[active] || 'navHome';
    $$('.bottom-nav-item').forEach(function (btn) {
      btn.classList.toggle('active', btn.id === activeId);
    });
  }

  // =============================================
  // UPDATE PROGRESS PILL
  // =============================================
  function updateProgressPill() {
    var el = $('#progressText');
    if (!el) return;
    var allQ = window.LIFE_IN_UK_QUESTIONS || [];
    if (!allQ.length) { el.textContent = '0%'; return; }
    var pct = state.totalAttempts > 0 ? Math.round((state.passed / state.totalAttempts) * 100) : 0;
    el.textContent = pct + '%';
  }

  // =============================================
  // HOME VIEW
  // =============================================
  function showHome() {
    showView('home');
    var fa = isFA();
    var allQ = window.LIFE_IN_UK_QUESTIONS || [];

    // Stats
    var totalQEl = $('#totalQuestions');
    if (totalQEl) totalQEl.textContent = allQ.length;
    var lastScoreEl = $('#lastScore');
    if (lastScoreEl) lastScoreEl.textContent = state.lastScore;

    // Quick actions
    var qaContainer = $('#quickActions');
    if (qaContainer) {
      qaContainer.innerHTML =
        '<div class="quick-actions">' +
        '<button class="quick-action-btn" id="btnQuizAll">' +
        '<span class="quick-action-icon">✏️</span>' +
        '<span class="quick-action-label">' + (fa ? 'آزمون تصادفی' : 'Random Quiz') + '</span>' +
        '<span class="quick-action-label-en">24 ' + (fa ? 'سوال' : 'Questions') + '</span>' +
        '</button>' +
        '<button class="quick-action-btn" id="btnStudy">' +
        '<span class="quick-action-icon">📖</span>' +
        '<span class="quick-action-label">' + (fa ? 'مطالعه آزاد' : 'Study All') + '</span>' +
        '<span class="quick-action-label-en">' + (fa ? 'همه سوالات' : 'All Questions') + '</span>' +
        '</button>' +
        '<button class="quick-action-btn" id="btnProgressHome">' +
        '<span class="quick-action-icon">📊</span>' +
        '<span class="quick-action-label">' + (fa ? 'پیشرفت' : 'Progress') + '</span>' +
        '<span class="quick-action-label-en">' + (fa ? 'آمار کامل' : 'Full Stats') + '</span>' +
        '</button>' +
        '</div>';
      bind($('#btnQuizAll'), 'click', function () { startQuiz(null, null); });
      bind($('#btnStudy'), 'click', function () { openStudy(); });
      bind($('#btnProgressHome'), 'click', function () { openProgress(); });
    }

    // Category grid
    renderCategoryGrid();

    // History (append below category grid)
    renderHistorySection();

    updateProgressPill();
  }

  function renderCategoryGrid() {
    var grid = $('#categoryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    var fa = isFA();
    var allQ = window.LIFE_IN_UK_QUESTIONS || [];
    var topics = {};
    allQ.forEach(function (q) {
      if (!topics[q.topic]) topics[q.topic] = 0;
      topics[q.topic]++;
    });

    var topicKeys = Object.keys(topicNames);
    topicKeys.forEach(function (tk) {
      var tn = topicNames[tk];
      var color = topicColors[tk] || '#6c5ce7';
      var icon = topicIcons[tk] || '📚';
      var count = topics[tk] || 0;

      var card = document.createElement('button');
      card.className = 'cat-card';
      card.dataset.topic = tk;
      card.innerHTML =
        '<div class="cat-icon" style="background:' + color + '15">' + icon + '</div>' +
        '<div class="cat-info">' +
        '<div class="cat-title">' + tn[fa ? 'fa' : 'en'] + '</div>' +
        '<div class="cat-title-en">' + tn[fa ? 'en' : 'fa'] + '</div>' +
        '<div class="cat-meta">' + count + ' ' + (fa ? 'سوال' : 'questions') + '</div>' +
        '</div>';

      card.addEventListener('click', function () {
        openSection(tk);
      });
      grid.appendChild(card);
    });

    // Credit
    var credit = document.createElement('div');
    credit.style.cssText = 'text-align:center;padding:24px 16px 8px;font-size:12px;color:#aaa;font-style:italic;';
    credit.textContent = 'Crafted by Nima Hakimmaani';
    grid.appendChild(credit);
  }

  function renderHistorySection() {
    var grid = $('#categoryGrid');
    if (!grid) return;

    // Remove old history section if exists
    var old = document.getElementById('historySection');
    if (old) old.remove();

    if (!state.history.length) return;

    var fa = isFA();
    var section = document.createElement('div');
    section.id = 'historySection';
    section.className = 'history-section';
    section.innerHTML =
      '<h2 class="section-heading">' + (fa ? 'تاریخچه' : 'History') + '</h2>' +
      '<div class="history-list" id="historyList"></div>';

    // Insert after cta-section or at end
    var cta = document.querySelector('.cta-section');
    if (cta && cta.parentNode) {
      cta.parentNode.insertBefore(section, cta);
    } else {
      grid.parentNode.appendChild(section);
    }

    var list = section.querySelector('#historyList');
    var show = Math.min(state.history.length, 10);
    for (var h = 0; h < show; h++) {
      var item = state.history[h];
      var d = new Date(item.date);
      var dateStr = d.toLocaleDateString(fa ? 'fa-IR' : 'en-GB');
      var div = document.createElement('div');
      div.className = 'history-item ' + (item.passed ? 'passed' : 'failed');
      div.innerHTML =
        '<div class="history-left">' +
        '<span class="history-score">' + item.score + '/' + item.total + '</span>' +
        '<span class="history-pct">' + item.pct + '%</span>' +
        '</div>' +
        '<span class="history-date">' + dateStr + '</span>';
      list.appendChild(div);
    }
  }

  // =============================================
  // SECTION VIEW (Topic quiz launcher)
  // =============================================
  function openSection(topicKey) {
    showView('section');
    var fa = isFA();
    var tn = topicNames[topicKey] || { fa: topicKey, en: topicKey };
    var color = topicColors[topicKey] || '#6c5ce7';
    var icon = topicIcons[topicKey] || '📚';
    var allQ = window.LIFE_IN_UK_QUESTIONS || [];
    var topicQs = allQ.filter(function (q) { return q.topic === topicKey; });

    var container = $('#sectionContent');
    if (!container) return;
    container.innerHTML =
      '<div style="text-align:center;margin-bottom:24px">' +
      '<h1 class="section-title">' + tn[fa ? 'fa' : 'en'] + '</h1>' +
      '<p class="section-title-en">' + tn[fa ? 'en' : 'fa'] + '</p>' +
      '</div>' +
      '<div class="quiz-question quiz-mode-card" id="startTopicQuiz" style="text-align:center;border-color:' + color + '">' +
      '<strong style="font-size:18px">' + (fa ? 'آزمون این موضوع' : 'Quiz This Topic') + '</strong>' +
      '<div style="color:#667085;margin-top:6px">' + topicQs.length + ' ' + (fa ? 'سوال' : 'questions') + ' · ' + QUIZ_SIZE + (fa ? ' سوال تصادفی' : ' random') + '</div>' +
      '</div>' +
      '<div style="margin-top:16px">' +
      '<h3 style="font-size:14px;margin-bottom:10px;color:#555">' + (fa ? 'سطح دشواری' : 'Difficulty') + '</h3>' +
      '<div class="quiz-options">' +
      '<button class="quiz-opt difficulty-btn" data-diff="easy" data-topic="' + topicKey + '">' +
      '<span class="quiz-opt-letter" style="background:#00b894;color:#fff">E</span>' + getDiffLabel('easy', fa) + '</button>' +
      '<button class="quiz-opt difficulty-btn" data-diff="medium" data-topic="' + topicKey + '">' +
      '<span class="quiz-opt-letter" style="background:#fdcb6e;color:#fff">M</span>' + getDiffLabel('medium', fa) + '</button>' +
      '<button class="quiz-opt difficulty-btn" data-diff="hard" data-topic="' + topicKey + '">' +
      '<span class="quiz-opt-letter" style="background:#d63031;color:#fff">H</span>' + getDiffLabel('hard', fa) + '</button>' +
      '<button class="quiz-opt difficulty-btn" data-diff="all" data-topic="' + topicKey + '">' +
      '<span class="quiz-opt-letter" style="background:#6c5ce7;color:#fff">A</span>' + (fa ? 'همه' : 'All') + '</button>' +
      '</div></div>';

    // Quick-start quiz (all difficulty)
    bind($('#startTopicQuiz'), 'click', function () { startQuiz(topicKey, 'all'); });

    // Difficulty buttons
    container.querySelectorAll('.difficulty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        startQuiz(btn.dataset.topic, btn.dataset.diff);
      });
    });
  }

  // =============================================
  // QUIZ
  // =============================================
  function startQuiz(topic, diff) {
    state.topicFilter = topic || null;
    state.difficultyFilter = diff || null;
    var pool = window.LIFE_IN_UK_QUESTIONS || [];
    if (state.topicFilter) {
      pool = pool.filter(function (q) { return q.topic === state.topicFilter; });
    }
    if (state.difficultyFilter && state.difficultyFilter !== 'all') {
      pool = pool.filter(function (q) { return q.difficulty === state.difficultyFilter; });
    }
    if (pool.length < QUIZ_SIZE) {
      pool = (window.LIFE_IN_UK_QUESTIONS || []).slice();
    }
    state.quizQuestions = shuffle(pool).slice(0, QUIZ_SIZE);
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizAnswered = false;
    showView('quiz');
    renderQuestion();
  }

  function renderQuestion() {
    var quiz = state.quizQuestions;
    if (!quiz.length) return;
    if (state.quizIndex >= quiz.length) {
      renderResults();
      return;
    }

    var q = quiz[state.quizIndex];
    var fa = isFA();
    var idx = state.quizIndex;
    var total = quiz.length;
    var progress = ((idx) / total * 100).toFixed(0);
    var tn = topicNames[q.topic] || { fa: q.topic, en: q.topic };

    var html =
      '<div class="quiz-progress">' +
      '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quizProgressFill" style="width:' + progress + '%"></div></div>' +
      '<span class="quiz-progress-text" id="quizProgressText">' + (idx + 1) + ' / ' + total + '</span>' +
      '</div>' +
      '<div class="quiz-question">' +
      '<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">' +
      '<span style="font-size:12px;color:' + (topicColors[q.topic] || '#6c5ce7') + ';font-weight:700">' + tn[fa ? 'fa' : 'en'] + '</span>' +
      '<span style="font-size:12px;color:' + getDiffColor(q.difficulty) + ';font-weight:700">' + getDiffLabel(q.difficulty, fa) + '</span>' +
      '</div>' +
      '<div class="quiz-q-text">' + escHtml(q[t('question')]) + '</div>' +
      '<div class="quiz-q-en">' + escHtml(q[fa ? 'questionEn' : 'questionFa']) + '</div>' +
      '<div class="quiz-options">';

    var optLabels = { a: 'A', b: 'B', c: 'C', d: 'D' };
    for (var i = 0; i < q.options.length; i++) {
      var opt = q.options[i];
      html +=
        '<button class="quiz-opt" data-opt="' + opt.id + '">' +
        '<span class="quiz-opt-letter">' + optLabels[opt.id] + '</span>';
      if (fa) {
        html += escHtml(opt.textFa) + '<span class="en-text">' + escHtml(opt.textEn) + '</span>';
      } else {
        html += escHtml(opt.textEn);
      }
      html += '</button>';
    }
    html += '</div></div>';

    html += '<div class="quiz-explanation" id="quizExplanation">' +
      '<strong>' + (fa ? 'توضیح:' : 'Explanation:') + '</strong> ' + escHtml(q[t('explanation')]) +
      '<div class="quiz-explanation-en">' + escHtml(q[fa ? 'explanationEn' : 'explanationFa']) + '</div>' +
      '</div>';
    html += '<button class="quiz-next" id="quizNextBtn">' + (fa ? 'بعدی / Next →' : 'Next →') + '</button>';

    var qc = $('#quizContainer');
    if (qc) qc.innerHTML = html;
    state.quizAnswered = false;

    // Bind options
    qc.querySelectorAll('.quiz-opt').forEach(function (opt) {
      opt.addEventListener('click', function () { handleAnswer(opt.dataset.opt); });
    });

    // Bind next
    var nextBtn = $('#quizNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        state.quizIndex++;
        renderQuestion();
      });
    }
  }

  function handleAnswer(optionId) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    var q = state.quizQuestions[state.quizIndex];
    var correct = optionId === q.correctOption;
    if (correct) state.quizScore++;

    // Highlight options
    var container = $('#quizContainer');
    if (container) {
      container.querySelectorAll('.quiz-opt').forEach(function (opt) {
        var oid = opt.dataset.opt;
        if (oid === q.correctOption) opt.classList.add('correct');
        else if (oid === optionId && !correct) opt.classList.add('wrong');
      });
    }

    // Update progress
    var progressFill = $('#quizProgressFill');
    var progressText = $('#quizProgressText');
    if (progressFill) progressFill.style.width = ((state.quizIndex + 1) / state.quizQuestions.length * 100) + '%';
    if (progressText) progressText.textContent = (state.quizIndex + 1) + ' / ' + state.quizQuestions.length;

    // Show explanation + next
    var exp = $('#quizExplanation');
    if (exp) exp.classList.add('visible');
    var next = $('#quizNextBtn');
    if (next) next.classList.add('visible');
  }

  function renderResults() {
    var fa = isFA();
    var total = state.quizQuestions.length;
    var pct = Math.round((state.quizScore / total) * 100);
    var passed = pct >= PASS_MARK;

    // Save
    state.totalAttempts++;
    if (state.quizScore > state.bestScore) state.bestScore = state.quizScore;
    if (passed) state.passed++;
    state.lastScore = pct + '%';
    state.history.unshift({
      date: new Date().toISOString(),
      score: state.quizScore,
      total: total,
      pct: pct,
      passed: passed
    });
    if (state.history.length > 50) state.history = state.history.slice(0, 50);
    save();

    var qc = $('#quizContainer');
    if (!qc) return;

    var html =
      '<div class="quiz-result">' +
      '<div class="quiz-result-icon">' + (passed ? '🎉' : '📚') + '</div>' +
      '<div class="quiz-result-score">' + state.quizScore + '/' + total + '</div>' +
      '<div class="quiz-result-label">' + pct + '%</div>' +
      '<div class="quiz-result-bar"><div class="quiz-result-bar-fill" style="width:' + pct + '%;background:' + (passed ? '#22c55e' : '#ef4444') + '"></div></div>' +
      '<div class="quiz-result-pass-mark">' + (fa ? 'نمره قبولی: ' + PASS_MARK + '%' : 'Pass mark: ' + PASS_MARK + '%') + '</div>' +
      '<div class="quiz-result-message">' +
      (passed
        ? (fa ? 'آفرین! قبول شدید!' : 'Congratulations! You passed!') +
          '<br><span style="font-size:14px;color:#888">' + (fa ? 'نتیجه عالی!' : 'Great result!') + '</span>'
        : (fa ? 'قبول نشدید. دوباره تلاش کنید!' : 'Not yet. Try again!') +
          '<br><span style="font-size:14px;color:#888">' + (fa ? 'نیاز به مطالعه بیشتر' : 'Keep studying!') + '</span>') +
      '</div>' +
      '</div>' +
      '<div class="results-actions">' +
      '<button class="btn-primary" id="btnRetry">' + (fa ? 'تلاش مجدد' : 'Try Again') + '</button>' +
      '<button class="btn-secondary" id="btnHomeResults">' + (fa ? 'صفحه اصلی' : 'Home') + '</button>' +
      '</div>';

    // Answer summary
    html += '<div class="answer-summary">';
    for (var i = 0; i < state.quizQuestions.length; i++) {
      var qq = state.quizQuestions[i];
      var ans = state.quizAnswers ? state.quizAnswers[i] : null;
      // We don't track individual answers in the simplified version, so use score position
      html += '<div class="summary-item" style="background:' + (i < state.quizScore ? '#ecfdf5' : '#fef2f2') + ';color:' + (i < state.quizScore ? '#22c55e' : '#ef4444') + '">✓</div>';
    }
    html += '</div>';

    qc.innerHTML = html;

    updateProgressPill();

    bind($('#btnRetry'), 'click', function () {
      startQuiz(state.topicFilter, state.difficultyFilter);
    });
    bind($('#btnHomeResults'), 'click', function () {
      showHome();
    });
  }

  // =============================================
  // STUDY VIEW
  // =============================================
  function openStudy() {
    showView('study');
    var fa = isFA();
    var container = $('#studyContainer');
    if (!container) return;

    var allQ = window.LIFE_IN_UK_QUESTIONS || [];
    var currentTopic = '';
    var optLabels = { a: 'A', b: 'B', c: 'C', d: 'D' };
    var html = '';

    for (var i = 0; i < allQ.length; i++) {
      var q = allQ[i];
      if (q.topic !== currentTopic) {
        currentTopic = q.topic;
        var tn = topicNames[currentTopic] || { fa: currentTopic, en: currentTopic };
        var color = topicColors[currentTopic] || '#6c5ce7';
        var icon = topicIcons[currentTopic] || '📚';
        html += '<div class="study-topic-divider" style="background:' + color + '">' +
          '<span>' + icon + '</span><span>' + tn[fa ? 'fa' : 'en'] + '</span></div>';
      }

      html += '<div class="study-card">' +
        '<div class="study-q-num">' + q.id + '</div>' +
        '<div class="study-q-text">' + escHtml(q[t('question')]) + '</div>' +
        '<div class="study-q-en">' + escHtml(q[fa ? 'questionEn' : 'questionFa']) + '</div>' +
        '<div class="study-options">';

      for (var j = 0; j < q.options.length; j++) {
        var opt = q.options[j];
        var isCorrect = opt.id === q.correctOption;
        html += '<div class="study-opt' + (isCorrect ? ' correct-opt' : '') + '">' +
          '<span class="study-opt-letter">' + optLabels[opt.id] + '</span>';
        if (fa) {
          html += '<span>' + escHtml(opt.textFa) + '</span>';
        } else {
          html += '<span>' + escHtml(opt.textEn) + '</span>';
        }
        html += '</div>';
      }

      html += '</div>' +
        '<div class="study-explanation"><strong>' + (fa ? 'توضیح:' : 'Explanation:') + '</strong> ' + escHtml(q[t('explanation')]) +
        '<div class="study-explanation-en">' + escHtml(q[fa ? 'explanationEn' : 'explanationFa']) + '</div>' +
        '</div></div>';
    }

    container.innerHTML = html;
  }

  // =============================================
  // PROGRESS VIEW
  // =============================================
  function openProgress() {
    showView('progress');
    var fa = isFA();
    var container = $('#progressContainer');
    if (!container) return;

    var passRate = getPassRate();
    var allQ = window.LIFE_IN_UK_QUESTIONS || [];

    // Per-topic stats
    var topicKeys = Object.keys(topicNames);
    var topicScores = {};
    allQ.forEach(function (q) {
      if (!topicScores[q.topic]) topicScores[q.topic] = { total: 0, correct: 0 };
      topicScores[q.topic].total++;
    });

    var html =
      '<div class="progress-view-header">' +
      '<h1 class="section-title">📊 ' + (fa ? 'پیشرفت شما' : 'Your Progress') + '</h1>' +
      '<p class="section-title-en">Life in the UK Test Stats</p>' +
      '</div>' +

      // Overall
      '<div class="progress-card progress-card-overall">' +
      '<div class="progress-card-header">' +
      '<span class="progress-card-icon">🎯</span>' +
      '<span class="progress-card-title">Overall</span>' +
      '</div>' +
      '<div class="progress-overall-row">' +
      '<div class="progress-circle">' +
      '<svg viewBox="0 0 100 100" class="progress-ring">' +
      '<circle cx="50" cy="50" r="42" class="progress-ring-bg"/>' +
      '<circle cx="50" cy="50" r="42" class="progress-ring-fill" style="stroke-dashoffset:' + (259 - (259 * passRate / 100)) + '"/>' +
      '</svg>' +
      '<div class="progress-circle-text">' + passRate + '%</div>' +
      '</div>' +
      '<div class="progress-overall-stats">' +
      '<div class="progress-mini-stat"><span class="progress-mini-num">' + state.passed + '</span><span class="progress-mini-label">' + (fa ? 'قبولی' : 'Passed') + '</span></div>' +
      '<div class="progress-mini-stat"><span class="progress-mini-num">' + state.totalAttempts + '</span><span class="progress-mini-label">' + (fa ? 'تلاش' : 'Attempts') + '</span></div>' +
      '</div></div></div>' +

      // Stats grid
      '<div class="progress-stats-grid">' +
      '<div class="progress-stat-card">' +
      '<div class="progress-stat-icon">📝</div>' +
      '<div class="progress-stat-value">' + state.totalAttempts + '</div>' +
      '<div class="progress-stat-label">' + (fa ? 'کل آزمون' : 'Total Quizzes') + '</div>' +
      '</div>' +
      '<div class="progress-stat-card">' +
      '<div class="progress-stat-icon">🏆</div>' +
      '<div class="progress-stat-value">' + state.bestScore + '</div>' +
      '<div class="progress-stat-label">' + (fa ? 'بهترین نمره' : 'Best Score') + '</div>' +
      '</div>' +
      '<div class="progress-stat-card">' +
      '<div class="progress-stat-icon">✅</div>' +
      '<div class="progress-stat-value">' + state.passed + '</div>' +
      '<div class="progress-stat-label">' + (fa ? 'قبول شده' : 'Times Passed') + '</div>' +
      '</div>' +
      '<div class="progress-stat-card">' +
      '<div class="progress-stat-icon">📊</div>' +
      '<div class="progress-stat-value">' + passRate + '%</div>' +
      '<div class="progress-stat-label">' + (fa ? 'نرخ قبولی' : 'Pass Rate') + '</div>' +
      '</div>' +
      '</div>';

    // Per-topic list
    html += '<div class="progress-section-title">' + (fa ? 'پیشرفت موضوعی' : 'Per-Topic') + '</div>' +
      '<div class="progress-section-list">';

    topicKeys.forEach(function (tk) {
      var tn = topicNames[tk];
      var color = topicColors[tk] || '#6c5ce7';
      var icon = topicIcons[tk] || '📚';
      var count = topicScores[tk] ? topicScores[tk].total : 0;

      html +=
        '<div class="progress-section-item">' +
        '<div class="progress-section-left">' +
        '<span class="progress-section-icon" style="background:' + color + '15">' + icon + '</span>' +
        '<div class="progress-section-info">' +
        '<div class="progress-section-name">' + tn[fa ? 'fa' : 'en'] + '</div>' +
        '<div class="progress-section-name-en">' + tn[fa ? 'en' : 'fa'] + '</div>' +
        '</div></div>' +
        '<div class="progress-section-right">' +
        '<span class="progress-badge pending">' + count + ' ' + (fa ? 'سوال' : 'Q') + '</span>' +
        '</div></div>';
    });

    html += '</div>';
    html += '<button class="start-quiz-btn" style="margin-top:20px" id="progressBackBtn">' + (fa ? 'بازگشت / Back to Home' : 'Back to Home') + '</button>';

    container.innerHTML = html;

    bind($('#progressBackBtn'), 'click', function () { showHome(); });
  }

  // =============================================
  // QUIZ MENU (from bottom nav)
  // =============================================
  function openQuizMenu() {
    showView('quiz');
    var fa = isFA();
    var qc = $('#quizContainer');
    if (!qc) return;

    qc.innerHTML =
      '<div style="text-align:center;margin-bottom:20px">' +
      '<h1 class="section-title">✏️ ' + (fa ? 'انتخاب آزمون' : 'Choose Quiz') + '</h1>' +
      '<p class="section-title-en">Select quiz mode</p>' +
      '</div>' +
      '<div class="quiz-question quiz-mode-card" id="quizRandom" style="border-color:#6c5ce7">' +
      '<strong style="font-size:18px">' + (fa ? 'آزمون تصادفی' : 'Random Quiz') + '</strong>' +
      '<div style="color:#667085;margin-top:6px">' + QUIZ_SIZE + ' ' + (fa ? 'سوال تصادفی از همه موضوعات' : 'random questions from all topics') + '</div>' +
      '</div>';

    bind($('#quizRandom'), 'click', function () { startQuiz(null, null); });
  }

  // =============================================
  // LANGUAGE TOGGLE
  // =============================================
  function toggleLang() {
    state.lang = state.lang === 'fa' ? 'en' : 'fa';
    save();

    var fa = $('#langFa');
    var en = $('#langEn');
    if (fa) fa.classList.toggle('active', state.lang === 'fa');
    if (en) en.classList.toggle('active', state.lang === 'en');

    // Re-render current view
    switch (state.currentView) {
      case 'home': showHome(); break;
      case 'quiz':
        if (state.quizQuestions.length > 0 && state.quizIndex < state.quizQuestions.length) {
          renderQuestion();
        } else {
          openQuizMenu();
        }
        break;
      case 'study': openStudy(); break;
      case 'progress': openProgress(); break;
      case 'section': /* stay */ break;
    }
  }

  // =============================================
  // EVENT BINDING HELPER
  // =============================================
  function bind(el, eventName, handler) {
    if (!el) return;
    el.addEventListener(eventName, handler);
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    load();

    // Brand click → home
    var brand = $('.brand');
    if (brand) brand.addEventListener('click', function () { showHome(); });

    // Lang flags
    bind($('#langFa'), 'click', function () {
      if (state.lang !== 'fa') toggleLang();
    });
    bind($('#langEn'), 'click', function () {
      if (state.lang !== 'en') toggleLang();
    });

    // Back buttons
    bind($('#backBtn'), 'click', function () { showHome(); });
    bind($('#quizBackBtn'), 'click', function () { showHome(); });
    bind($('#studyBackBtn'), 'click', function () { showHome(); });

    // Bottom nav
    $$('.bottom-nav-item[data-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.target;
        switch (target) {
          case 'home': showHome(); break;
          case 'study': openStudy(); break;
          case 'quiz': openQuizMenu(); break;
          case 'progress': openProgress(); break;
          default: showView(target);
        }
      });
    });

    // Set initial lang flag state
    if (state.lang === 'en') {
      var fa = $('#langFa');
      var en = $('#langEn');
      if (fa) fa.classList.remove('active');
      if (en) en.classList.add('active');
    }

    showHome();
  }

  // =============================================
  // EXPOSE TO WINDOW
  // =============================================
  window.showView = showView;
  window.openStudy = openStudy;
  window.openProgress = openProgress;

  // =============================================
  // BOOT
  // =============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
