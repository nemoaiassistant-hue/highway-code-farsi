// ===== HIGHWAY CODE FARSI APP — FULL FEATURE =====
// Flashcards, Progress Tracking, Audio Mode, Sign Images

(function () {
  'use strict';

  // =============================================
  // STATE
  // =============================================
  const state = {
    currentView: 'home',
    currentCategory: null,
    showMeFilter: 'all',
    quizIndex: 0,
    quizAnswered: false,
    quizScore: 0,
    quizMode: 'section',
    quizQuestions: [],
    quizDifficulty: 'all',
    quizTimer: null,
    quizTimeRemaining: 0,
    quizStartedAt: null,
    hazard: {
      index: 0,
      score: 0,
      total: 0,
      answers: {},
    },
    completedSections: JSON.parse(localStorage.getItem('hc_completed') || '[]'),
    lastQuizScore: localStorage.getItem('hc_last_score') || '—',
    // Flashcard state
    flashcard: {
      cards: [],
      index: 0,
      flipped: false,
      correct: 0,
      incorrect: 0,
      reviewed: 0,
      done: false,
      filter: 'all',
    },
    // Audio
    audioEnabled: JSON.parse(localStorage.getItem('hc_audio') || 'true'),
    speakingRuleId: null,
    listenAllPlaying: false,
    listenAllAbort: false,
    listenAllTimeout: null,
  };

  // Progress data from localStorage
  function loadProgressData() {
    try {
      return JSON.parse(localStorage.getItem('highway-code-progress') || '{}');
    } catch (e) {
      return {};
    }
  }
  function saveProgressData(data) {
    localStorage.setItem('highway-code-progress', JSON.stringify(data));
  }

  // =============================================
  // DOM HELPERS
  // =============================================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // =============================================
  // AUDIO ENGINE (Web Speech API)
  // =============================================
  let farsiVoice = null;

  function initAudioVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices();
    // Prefer female Farsi voice
    farsiVoice = voices.find(v => v.lang === 'fa-IR' && v.name.toLowerCase().includes('female'))
      || voices.find(v => v.lang === 'fa-IR')
      || voices.find(v => v.lang === 'fa')
      || voices.find(v => v.lang && v.lang.startsWith('fa'));
  }

  function speakFarsi(text, ruleId) {
    if (!state.audioEnabled || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = farsiVoice ? farsiVoice.lang : 'fa-IR';
    if (farsiVoice) utterance.voice = farsiVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    state.speakingRuleId = ruleId;
    // Show speaking indicator
    const indicator = document.querySelector(`[data-speaking-indicator="${ruleId}"]`);
    if (indicator) indicator.classList.add('speaking-active');

    utterance.onend = () => {
      state.speakingRuleId = null;
      if (indicator) indicator.classList.remove('speaking-active');
    };
    utterance.onerror = () => {
      state.speakingRuleId = null;
      if (indicator) indicator.classList.remove('speaking-active');
    };

    speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    state.speakingRuleId = null;
    $$('.speaking-active').forEach(el => el.classList.remove('speaking-active'));
  }

  function speakFarsiSequential(texts, ruleIds, onDone) {
    if (!texts.length) { if (onDone) onDone(); return; }
    state.listenAllPlaying = true;
    state.listenAllAbort = false;

    let idx = 0;
    function next() {
      if (state.listenAllAbort || idx >= texts.length) {
        state.listenAllPlaying = false;
        if (onDone) onDone();
        return;
      }
      const text = texts[idx];
      const ruleId = ruleIds[idx];

      // Highlight current
      $$('.listen-all-highlight').forEach(el => el.classList.remove('listen-all-highlight'));
      const card = document.querySelector(`[data-rule-id="${ruleId}"]`);
      if (card) card.classList.add('listen-all-highlight');

      if (!state.audioEnabled || !('speechSynthesis' in window)) {
        idx++;
        state.listenAllTimeout = setTimeout(next, 2000);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = farsiVoice ? farsiVoice.lang : 'fa-IR';
      if (farsiVoice) utterance.voice = farsiVoice;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      const indicator = document.querySelector(`[data-speaking-indicator="${ruleId}"]`);
      if (indicator) indicator.classList.add('speaking-active');

      utterance.onend = () => {
        if (indicator) indicator.classList.remove('speaking-active');
        idx++;
        state.listenAllTimeout = setTimeout(next, 500);
      };
      utterance.onerror = () => {
        if (indicator) indicator.classList.remove('speaking-active');
        idx++;
        state.listenAllTimeout = setTimeout(next, 500);
      };

      speechSynthesis.speak(utterance);
    }
    next();
  }

  function stopListenAll() {
    state.listenAllAbort = true;
    state.listenAllPlaying = false;
    stopSpeaking();
    if (state.listenAllTimeout) clearTimeout(state.listenAllTimeout);
    $$('.listen-all-highlight').forEach(el => el.classList.remove('listen-all-highlight'));
    $$('.speaking-active').forEach(el => el.classList.remove('speaking-active'));
  }

  // =============================================
  // ROAD SIGN IMAGE MATCHING
  // =============================================
  function findSignForRule(rule) {
    if (!window.ROAD_SIGN_VISUALS || !window.ROAD_SIGN_VISUALS.length) return null;
    const text = (rule.fa + ' ' + rule.en).toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const sign of window.ROAD_SIGN_VISUALS) {
      let score = 0;
      for (const kw of (sign.keywords || [])) {
        if (text.includes(kw.toLowerCase())) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = sign;
      }
    }
    return bestScore >= 1 ? bestMatch : null;
  }

  function signThumbnail(sign, size) {
    size = size || 60;
    if (!sign) return '';
    const content = sign.img
      ? `<img src="${sign.img}" alt="${sign.nameFa}" style="width:100%;height:100%;object-fit:contain;"/>`
      : sign.svg;
    return `<div class="sign-thumbnail" style="width:${size}px;height:${size}px;flex-shrink:0" title="${sign.nameFa} / ${sign.nameEn}">${content}</div>`;
  }

  // =============================================
  // VIEW MANAGEMENT
  // =============================================
  function showView(name) {
    $$('.view').forEach(v => v.classList.remove('active'));
    const target = $(`#${name}View`);
    if (target) target.classList.add('active');
    state.currentView = name;
    window.scrollTo(0, 0);
    updateBottomNav(name);
  }

  // =============================================
  // BOTTOM NAV
  // =============================================
  function updateBottomNav(active) {
    const map = { home: 'navHome', read: 'navRead', flashcards: 'navFlashcards', progress: 'navProgress', hazard: 'navHazard', showme: 'navShowMe', quiz: 'navQuiz' };
    const activeId = map[active] || 'navHome';
    $$('.bottom-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.id === activeId);
    });
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    ensureShowMeUI();
    renderCategories();
    updateProgress();
    updateStats();
    renderQuickActions();
    bindEvents();
    initAudioVoices();
    // Voices may load async
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = initAudioVoices;
    }
  }

  // =============================================
  // SHOW ME / TELL ME
  // =============================================
  function ensureShowMeUI() {
    $('#app').insertAdjacentHTML('beforeend', '<div class="view" id="hazardView"><div id="hazardContainer"></div></div><div class="view" id="showmeView"><div id="showmeContainer"></div></div>');
  }

  window.openShowMe = function() {
    state.showMeFilter = 'all';
    showView('showme');
    renderShowMeView();
  };
  window.openHazardGallery = openHazardGallery;
  window.openFlashcards = openFlashcards;
  window.openProgress = openProgress;
  window.showView = showView;

  function renderShowMeView() {
    const container = $('#showmeContainer');
    const questions = (window.SHOW_ME_TELL_ME || []).filter(q => state.showMeFilter === 'all' || q.type === state.showMeFilter);
    const filters = [['all', 'همه / All'], ['tell', 'توضیح بده / Tell'], ['show', 'نشان بده / Show']];
    let html = `<div style="max-width:900px;margin:0 auto;padding:20px 16px 100px">
      <div style="text-align:center;margin-bottom:20px"><h1 class="section-title" style="margin-bottom:4px">🔧 نمایش بده / توضیح بده</h1><p class="section-title-en">Show Me / Tell Me</p></div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:20px">
        ${filters.map(([id, label]) => `<button class="showme-filter" data-filter="${id}" style="border:1px solid ${state.showMeFilter === id ? '#4361ee' : '#dfe3ea'};background:${state.showMeFilter === id ? '#4361ee' : '#fff'};color:${state.showMeFilter === id ? '#fff' : '#444'};border-radius:20px;padding:8px 14px;font:inherit;font-size:13px;font-weight:600;cursor:pointer">${label}</button>`).join('')}
      </div><div style="display:grid;gap:12px">`;
    if (!questions.length) html += '<div style="background:#fff;border:1px solid #e8ebf0;border-radius:14px;padding:28px;text-align:center;color:#777">سؤالی موجود نیست / No questions available</div>';
    questions.forEach(q => {
      const isShow = q.type === 'show';
      html += `<div style="background:#fff;border:1px solid #e8ebf0;border-radius:14px;box-shadow:0 3px 12px rgba(30,40,70,.06);overflow:hidden">
        <button class="showme-card-toggle" aria-expanded="false" style="width:100%;border:0;background:#fff;padding:16px;text-align:inherit;font:inherit;cursor:pointer;color:#1a1a2e">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px"><span style="background:${isShow ? '#eef9f1' : '#f2efff'};color:${isShow ? '#16803a' : '#6542b5'};border-radius:20px;padding:5px 10px;font-size:12px;font-weight:700">${isShow ? 'Show 👆' : 'Tell 🗣️'}</span><span class="showme-arrow" style="color:#4361ee;font-size:18px">⌄</span></div>
          <div style="font-weight:700;line-height:1.8">${escapeHtml(q.questionFa)}</div><div dir="ltr" style="text-align:left;color:#667085;font-size:14px;line-height:1.6;margin-top:4px">${escapeHtml(q.questionEn)}</div>
        </button>
        <div class="showme-answer" hidden style="border-top:1px solid #eef0f4;padding:16px;background:#fafbff">
          <div style="font-weight:700;color:#4361ee;margin-bottom:8px">پاسخ / Answer</div><div style="line-height:1.9">${escapeHtml(q.answerFa)}</div><div dir="ltr" style="text-align:left;color:#596274;line-height:1.7;margin-top:10px">${escapeHtml(q.answerEn)}</div>
          <div style="margin-top:14px;padding:12px;background:#fff8e7;border-radius:10px;border-right:3px solid #f4b942"><div style="font-weight:700;margin-bottom:5px">نکته / Tip</div><div style="line-height:1.8">${escapeHtml(q.tipFa)}</div><div dir="ltr" style="text-align:left;color:#596274;line-height:1.6;margin-top:5px">${escapeHtml(q.tipEn)}</div></div>
        </div>
      </div>`;
    });
    container.innerHTML = html + '</div></div>';
    $$('.showme-filter').forEach(btn => btn.addEventListener('click', () => { state.showMeFilter = btn.dataset.filter; renderShowMeView(); }));
    $$('.showme-card-toggle').forEach(btn => btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.nextElementSibling.hidden = expanded;
      btn.querySelector('.showme-arrow').textContent = expanded ? '⌄' : '⌃';
    }));
  }

  // =============================================
  // HAZARD PERCEPTION
  // =============================================
  const hazardCategoryLabels = {
    junctions: 'تقاطع‌ها / Junctions', pedestrians: 'عابران پیاده / Pedestrians',
    roadworks: 'عملیات جاده‌ای / Roadworks', weather: 'آب‌وهوا / Weather',
    motorway: 'بزرگراه / Motorway', parking: 'پارک / Parking',
    cyclists: 'دوچرخه‌سواران / Cyclists', roundabouts: 'میدان‌ها / Roundabouts',
    night: 'رانندگی شبانه / Night driving', school_zones: 'محدوده مدرسه / School zones',
    filtering: 'عبور از ترافیک / Filtering', lane_position: 'موقعیت خط / Lane position',
    road_surface: 'سطح جاده / Road surface', blind_spots: 'نقاط کور / Blind spots',
    braking_distance: 'فاصله ترمز / Braking distance', low_bridges: 'پل کوتاه / Low bridges',
    load_security: 'ایمنی بار / Load security', tight_turns: 'پیچ تنگ / Tight turns',
    merging: 'ادغام / Merging', reversing: 'دنده عقب / Reversing', rural: 'جاده روستایی / Rural roads'
  };

  function hazardScenarios() {
    return window.HAZARD_SCENARIOS || [];
  }

  function openHazardGallery() {
    showView('hazard');
    const scenarios = hazardScenarios();
    const container = $('#hazardContainer');
    container.innerHTML = `
      <div class="hazard-menu">
        <div class="hazard-hero">
          <span class="hazard-hero-icon">⚠️</span>
          <h1>تشخیص خطر / Hazard Perception</h1>
          <p>یک موقعیت را برای شروع انتخاب کنید</p>
          <p dir="ltr">Choose a scenario to begin</p>
        </div>
        <div class="hazard-stats">
          <div><strong>${scenarios.length}</strong><span>موقعیت / Scenarios</span></div>
          <div><strong>${state.hazard.score}/${state.hazard.total}</strong><span>امتیاز جلسه / Session score</span></div>
        </div>
        <div class="hazard-gallery">
          ${scenarios.map((scenario, index) => `
            <button class="hazard-card" data-hazard-index="${index}">
              <img src="${escapeAttr(scenario.image)}" alt="Hazard scenario ${scenario.id}">
              <span class="hazard-card-number">${String(scenario.id).padStart(2, '0')}</span>
              <span class="hazard-card-meta">
                <span>${escapeHtml(hazardCategoryLabels[scenario.category] || scenario.category)}</span>
                <span class="difficulty-${scenario.difficulty}">${escapeHtml(scenario.difficulty)}</span>
              </span>
            </button>`).join('')}
        </div>
      </div>`;
    $$('.hazard-card').forEach(card => card.addEventListener('click', () => startHazardSession(Number(card.dataset.hazardIndex))));
  }

  function startHazardSession(index) {
    state.hazard.index = index;
    state.hazard.score = 0;
    state.hazard.total = 0;
    state.hazard.answers = {};
    showView('hazard');
    renderHazardScenario();
  }

  function renderHazardScenario() {
    const scenarios = hazardScenarios();
    const scenario = scenarios[state.hazard.index];
    if (!scenario) return openHazardGallery();
    const answer = state.hazard.answers[scenario.id];
    const container = $('#hazardContainer');
    container.innerHTML = `
      <div class="hazard-course">
        <button class="back-btn" id="hazardGallery">← گالری / Gallery</button>
        <div class="hazard-progress">
          <div><span>${state.hazard.index + 1} / ${scenarios.length}</span><span>امتیاز / Score: ${state.hazard.score}/${state.hazard.total}</span></div>
          <div class="hazard-progress-track"><span style="width:${((state.hazard.index + 1) / scenarios.length) * 100}%"></span></div>
        </div>
        <article class="hazard-scene">
          <div class="hazard-badges"><span>${escapeHtml(hazardCategoryLabels[scenario.category] || scenario.category)}</span><span class="difficulty-${scenario.difficulty}">${escapeHtml(scenario.difficulty)}</span></div>
          <img src="${escapeAttr(scenario.image)}" alt="Hazard scenario ${scenario.id}" class="hazard-image">
          <h2>کدام خطر اصلی را می‌بینید؟ / What is the main developing hazard?</h2>
          <p class="hazard-scene-main">${escapeHtml(scenario.sceneFa)}</p>
          <p class="hazard-scene-secondary" dir="ltr">${escapeHtml(scenario.sceneEn)}</p>
        </article>
        <div class="hazard-options">
          ${scenario.options.map(option => {
            const isCorrect = answer && option.id === scenario.correctOption;
            const isWrong = answer && option.id === answer.optionId && !answer.correct;
            return `<button class="hazard-option ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" data-option="${option.id}" ${answer ? 'disabled' : ''}>
              <b>${option.id.toUpperCase()}</b><span>${escapeHtml(option.textFa)}<small dir="ltr">${escapeHtml(option.textEn)}</small></span>
            </button>`;
          }).join('')}
        </div>
        ${answer ? hazardFeedback(scenario, answer.correct) : ''}
        <div class="hazard-navigation">
          <button class="hazard-secondary" id="hazardPrevious" ${state.hazard.index === 0 ? 'disabled' : ''}>← قبلی / Previous</button>
          <button class="hazard-primary" id="hazardNext">${state.hazard.index === scenarios.length - 1 ? 'پایان / Finish' : 'بعدی / Next →'}</button>
        </div>
      </div>`;
    $('#hazardGallery').addEventListener('click', openHazardGallery);
    $$('.hazard-option').forEach(button => button.addEventListener('click', () => answerHazard(button.dataset.option)));
    $('#hazardPrevious').addEventListener('click', () => {
      if (state.hazard.index > 0) state.hazard.index--;
      renderHazardScenario();
    });
    $('#hazardNext').addEventListener('click', () => {
      if (state.hazard.index === scenarios.length - 1) renderHazardSummary();
      else {
        state.hazard.index++;
        renderHazardScenario();
      }
    });
  }

  function answerHazard(optionId) {
    const scenario = hazardScenarios()[state.hazard.index];
    if (!scenario || state.hazard.answers[scenario.id]) return;
    const correct = optionId === scenario.correctOption;
    state.hazard.answers[scenario.id] = { optionId, correct };
    state.hazard.total++;
    if (correct) state.hazard.score++;
    renderHazardScenario();
  }

  function hazardFeedback(scenario, correct) {
    return `<div class="hazard-feedback ${correct ? 'is-correct' : 'is-wrong'}">
      <h3>${correct ? '✅ درست / Correct' : '❌ نادرست / Wrong'}</h3>
      <p>${escapeHtml(scenario.explanationFa)}</p>
      <p dir="ltr">${escapeHtml(scenario.explanationEn)}</p>
      <div class="hazard-tip"><strong>نکته / Tip:</strong> ${escapeHtml(scenario.tipFa)}<div dir="ltr">${escapeHtml(scenario.tipEn)}</div></div>
    </div>`;
  }

  function renderHazardSummary() {
    const percent = state.hazard.total ? Math.round((state.hazard.score / state.hazard.total) * 100) : 0;
    $('#hazardContainer').innerHTML = `
      <div class="hazard-result">
        <span>${percent >= 80 ? '✓' : '⚠️'}</span>
        <h1>پایان جلسه / Session complete</h1>
        <strong>${state.hazard.score} / ${state.hazard.total}</strong>
        <div class="hazard-result-bar"><span style="width:${percent}%"></span></div>
        <p>${percent}% پاسخ درست / correct</p>
        <button class="hazard-primary" id="hazardRestart">شروع دوباره / Start again</button>
        <button class="hazard-secondary" id="hazardSummaryGallery">گالری موقعیت‌ها / Scenario gallery</button>
      </div>`;
    $('#hazardRestart').addEventListener('click', () => startHazardSession(0));
    $('#hazardSummaryGallery').addEventListener('click', openHazardGallery);
  }

  // =============================================
  // QUICK ACTIONS (Flashcards + Progress buttons)
  // =============================================
  function renderQuickActions() {
    const container = $('#quickActions');
    if (!container) return;
    container.innerHTML = `
      <div class="quick-actions">
        <button class="quick-action-btn" id="btnRead">
          <span class="quick-action-icon">📖</span>
          <span class="quick-action-label">مطالعه کامل</span>
          <span class="quick-action-label-en">Read Full Book</span>
        </button>
        <button class="quick-action-btn" id="btnFlashcards">
          <span class="quick-action-icon">🔄</span>
          <span class="quick-action-label">فلش‌کارت</span>
          <span class="quick-action-label-en">Flashcards</span>
        </button>
        <button class="quick-action-btn" id="btnProgress">
          <span class="quick-action-icon">📊</span>
          <span class="quick-action-label">پیشرفت</span>
          <span class="quick-action-label-en">Progress</span>
        </button>
      </div>
    `;
    $('#btnRead').addEventListener('click', () => openReadView());
    $('#btnFlashcards').addEventListener('click', () => openFlashcards());
    $('#btnProgress').addEventListener('click', () => openProgress());
  }

  // =============================================
  // RENDER CATEGORIES
  // =============================================
  function renderCategories(filter) {
    filter = filter || '';
    const grid = $('#categoryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = CATEGORIES.filter(c => {
      if (!filter) return true;
      return c.title.includes(filter) || c.titleEn.toLowerCase().includes(filter.toLowerCase());
    });

    filtered.forEach(cat => {
      const completed = state.completedSections.includes(cat.id);
      const hasContent = !!RULES[cat.id];
      const card = document.createElement('div');
      card.className = 'cat-card' + (completed ? ' completed' : '');
      card.innerHTML = `
        <div class="cat-icon" style="background:${cat.color}15">${cat.icon}</div>
        <div class="cat-info">
          <div class="cat-title">${cat.title}</div>
          <div class="cat-title-en">${cat.titleEn}</div>
          <div class="cat-meta">${cat.count} rule${hasContent ? ' · ✅ Available' : ' · 🚧 Coming soon'}</div>
        </div>
      `;
      if (hasContent) {
        card.addEventListener('click', () => openSection(cat.id));
      }
      grid.appendChild(card);
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="text-align:center;color:#888;padding:20px">نتیجه‌ای یافت نشد / No results found</p>';
    }

    // Creator credit
    const credit = document.createElement('div');
    credit.style.cssText = 'text-align:center;padding:24px 16px 8px;font-size:12px;color:#aaa;font-style:italic;';
    credit.textContent = 'Crafted by Nima Hakimmaani';
    grid.appendChild(credit);
  }

  // =============================================
  // OPEN SECTION (Category view with audio + sign images)
  // =============================================
  function openSection(catId) {
    stopListenAll();
    const rules = RULES[catId];
    if (!rules) return;
    state.currentCategory = catId;

    let html = `
      <h1 class="section-title">${rules.title}</h1>
      <p class="section-title-en">${rules.titleEn}</p>
    `;

    // Show signs gallery for road-signs category
    if (catId === 'road-signs' && window.ROAD_SIGN_VISUALS && window.ROAD_SIGN_VISUALS.length) {
      const groups = {};
      window.ROAD_SIGN_VISUALS.forEach(s => {
        const cat = s.category || 'other';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(s);
      });
      html += `<div class="signs-gallery">`;
      html += `<h2 style="font-size:16px;margin-bottom:12px;color:#1a1a2e">🪧 گالری علائم / Sign Gallery</h2>`;
      for (const [group, signs] of Object.entries(groups)) {
        html += `<div class="signs-gallery-group">`;
        html += `<h3 style="font-size:13px;color:#555;margin:8px 0 6px;text-transform:capitalize">${group}</h3>`;
        html += `<div class="signs-gallery-grid">`;
        signs.forEach(s => {
          const content = s.img
            ? `<img src="${s.img}" alt="${s.nameEn}" style="width:100%;height:100%;object-fit:contain;"/>`
            : s.svg;
          html += `<div class="signs-gallery-item" title="${s.nameFa} / ${s.nameEn}">
            <div style="width:56px;height:56px;display:flex;align-items:center;justify-content:center;margin:0 auto">${content}</div>
            <div style="font-size:11px;margin-top:4px;text-align:center;line-height:1.2">${s.nameFa}</div>
            <div style="font-size:10px;color:#888;text-align:center;line-height:1.2">${s.nameEn}</div>
          </div>`;
        });
        html += `</div></div>`;
      }
      html += `</div>`;
    }

    rules.rules.forEach(rule => {
      const ruleId = catId + '-' + rule.num;
      const sign = findSignForRule(rule);

      html += `<div class="rule-card" data-rule-id="${ruleId}">`;
      html += `<div class="rule-header">`;

      // Sign thumbnail + rule number
      if (sign) {
        html += `<div class="rule-header-row">`;
        html += `<div class="rule-num">Rule ${rule.num}</div>`;
        html += signThumbnail(sign, 50);
        html += `</div>`;
      } else {
        html += `<div class="rule-num">Rule ${rule.num}</div>`;
      }
      html += `</div>`;

      html += `<div class="rule-text-row">`;
      html += `<div class="rule-text">${rule.fa.replace(/\n/g, '<br>')}</div>`;
      html += `</div>`;

      html += `<div class="rule-text-en">${rule.en.replace(/\n/g, '<br>')}</div>`;

      if (rule.tipFa) {
        html += `<div class="rule-tip"><div><strong>${rule.tipFa}</strong><br><span style="direction:ltr;display:block;margin-top:4px;color:#166534;font-size:12px">${rule.tipEn}</span></div></div>`;
      }
      if (rule.warning) {
        html += `<div class="rule-warning"><div><strong>${rule.warning.fa}</strong><br><span style="direction:ltr;display:block;margin-top:4px;color:#92400e;font-size:12px">${rule.warning.en}</span></div></div>`;
      }
      if (rule.warningFa) {
        html += `<div class="rule-warning"><div><strong>${rule.warningFa}</strong><br><span style="direction:ltr;display:block;margin-top:4px;color:#92400e;font-size:12px">${rule.warningEn}</span></div></div>`;
      }

      html += `</div>`;
    });

    const completed = state.completedSections.includes(catId);
    html += `
      <button class="mark-complete ${completed ? 'done' : ''}" id="markCompleteBtn">
        ${completed ? '✅ مطالعه شد / Studied' : '✅ نشانه‌گذاری به عنوان مطالعه شده / Mark as studied'}
      </button>
    `;

    if (rules.quiz) {
      html += `<button class="start-quiz-btn" id="startQuizBtn">📝 آزمون کوتاه / Take Quiz</button>`;
    }

    // Prev / Next section navigation
    const catIds = CATEGORIES.filter(c => RULES[c.id]).map(c => c.id);
    const idx = catIds.indexOf(catId);
    const prevId = idx > 0 ? catIds[idx - 1] : null;
    const nextId = idx < catIds.length - 1 ? catIds[idx + 1] : null;
    if (prevId || nextId) {
      html += `<div class="section-nav">`;
      if (prevId) {
        html += `<button class="section-nav-btn prev" data-next="${prevId}">← Previous / قبلی</button>`;
      }
      if (nextId) {
        html += `<button class="section-nav-btn next" data-next="${nextId}">Next / بعدی →</button>`;
      }
      html += `</div>`;
    }

    const sectionContent = $('#sectionContent');
    if (sectionContent) sectionContent.innerHTML = html;
    showView('section');

    // Bind mark complete
    const mcBtn = $('#markCompleteBtn');
    if (mcBtn) mcBtn.addEventListener('click', () => toggleComplete(catId));

    // Bind quiz
    const quizBtn = $('#startQuizBtn');
    if (quizBtn) quizBtn.addEventListener('click', () => openQuizView(catId));

    // Bind prev/next nav
    document.querySelectorAll('.section-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => openSection(btn.dataset.next));
    });

  }

  // =============================================
  // TOGGLE COMPLETE
  // =============================================
  function toggleComplete(catId) {
    const idx = state.completedSections.indexOf(catId);
    if (idx === -1) {
      state.completedSections.push(catId);
    } else {
      state.completedSections.splice(idx, 1);
    }
    localStorage.setItem('hc_completed', JSON.stringify(state.completedSections));

    // Update progress tracking
    recordStudyDay();
    updateProgress();
    updateStats();
    openSection(catId); // re-render
  }

  function recordStudyDay() {
    const data = loadProgressData();
    const today = new Date().toISOString().split('T')[0];
    if (!data.studyDays) data.studyDays = [];
    if (!data.studyDays.includes(today)) {
      data.studyDays.push(today);
      saveProgressData(data);
    }
  }

  // =============================================
  // QUIZ MODES
  // =============================================
  function clearQuizTimer() {
    if (state.quizTimer) clearInterval(state.quizTimer);
    state.quizTimer = null;
  }

  function allQuizQuestions() {
    return Object.keys(RULES).flatMap(catId => (RULES[catId].quiz || []).map((question, index) => ({
      ...question,
      categoryId: catId,
      difficulty: question.difficulty || ['easy', 'medium', 'hard'][index % 3],
    })));
  }

  function sampleQuestions(questions, count) {
    const result = [];
    while (result.length < count && questions.length) {
      result.push(...shuffleArray(questions.slice()).slice(0, count - result.length));
    }
    return result;
  }

  function beginQuiz(mode, questions, catId) {
    clearQuizTimer();
    state.quizMode = mode;
    state.currentCategory = catId || null;
    state.quizQuestions = questions;
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizAnswered = false;
    state.quizStartedAt = Date.now();
    state.quizTimeRemaining = mode === 'mock' ? 57 * 60 : 0;
    showView('quiz');
    renderQuestion();
    if (mode === 'mock') {
      state.quizTimer = setInterval(() => {
        state.quizTimeRemaining = Math.max(0, 57 * 60 - Math.floor((Date.now() - state.quizStartedAt) / 1000));
        updateQuizTimer();
        if (state.quizTimeRemaining <= 0) renderMockResult();
      }, 1000);
    }
  }

  function startQuiz(catId, difficulty) {
    state.quizDifficulty = difficulty || 'all';
    const quiz = (RULES[catId].quiz || []).map((question, index) => ({
      ...question,
      difficulty: question.difficulty || ['easy', 'medium', 'hard'][index % 3],
    })).filter(question => state.quizDifficulty === 'all' || question.difficulty === state.quizDifficulty);
    beginQuiz('section', quiz, catId);
  }

  function openQuizMenu() {
    clearQuizTimer();
    state.quizMode = 'menu';
    showView('quiz');
    const history = JSON.parse(localStorage.getItem('hc_mock_history') || '[]');
    const historyHtml = history.length ? `
      <div style="margin-top:24px;text-align:right">
        <strong>آخرین آزمون‌های شبیه‌سازی / Recent Mock Tests</strong>
        ${history.slice().reverse().map(item => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;font-size:13px"><span>${new Date(item.date).toLocaleDateString()}</span><span style="color:${item.passed ? '#16803a' : '#dc2626'}">${item.score}/50 · ${item.passed ? 'Pass' : 'Fail'}</span></div>`).join('')}
      </div>` : '';
    $('#quizContainer').innerHTML = `
      <div style="text-align:center;margin-bottom:20px"><h1 class="section-title">📝 انتخاب نوع آزمون</h1><p class="section-title-en">Choose Quiz Mode</p></div>
      <div style="display:grid;gap:14px">
        <button class="quiz-question quiz-mode-card" id="sectionQuizMode" style="font:inherit;text-align:right;cursor:pointer;border:2px solid #4361ee"><strong style="font-size:18px">📚 آزمون بخش / Section Quiz</strong><div style="color:#667085;margin-top:6px">انتخاب بخش و سطح دشواری / Choose category and difficulty</div></button>
        <button class="quiz-question quiz-mode-card" id="quickQuizMode" style="font:inherit;text-align:right;cursor:pointer;border:2px solid #2563eb;background:#eff6ff"><strong style="font-size:18px;color:#2563eb">⚡ آزمون سریع / Quick Quiz</strong><div style="color:#667085;margin-top:6px">۱۰ سوال تصادفی، بدون زمان‌سنج / 10 random questions, no timer</div></button>
        <button class="quiz-question quiz-mode-card" id="mockQuizMode" style="font:inherit;text-align:right;cursor:pointer;border:2px solid #f59e0b;background:#fffbeb"><strong style="font-size:18px;color:#b45309">⏱️ آزمون شبیه‌سازی / Mock Test</strong><div style="color:#667085;margin-top:6px">آزمون شبیه‌سازی واقعی DVSA — ۵۰ سوال، ۵۷ دقیقه</div></button>
      </div>${historyHtml}`;
    $('#sectionQuizMode').addEventListener('click', openSectionQuizMenu);
    $('#quickQuizMode').addEventListener('click', openQuickQuiz);
    $('#mockQuizMode').addEventListener('click', renderMockWarning);
  }

  function openSectionQuizMenu() {
    state.quizMode = 'section-menu';
    $('#quizContainer').innerHTML = `
      <div style="text-align:center;margin-bottom:20px"><h1 class="section-title">آزمون بخش / Section Quiz</h1><p class="section-title-en">Choose a category</p></div>
      <div style="display:grid;gap:10px">${CATEGORIES.filter(cat => RULES[cat.id] && RULES[cat.id].quiz).map(cat => `<button class="quiz-question section-quiz-category" data-category="${cat.id}" style="font:inherit;text-align:right;cursor:pointer;border:1px solid #e5e7eb"><strong>${cat.icon} ${cat.title}</strong><div style="direction:ltr;text-align:left;color:#667085">${cat.titleEn}</div></button>`).join('')}</div>`;
    $$('.section-quiz-category').forEach(btn => btn.addEventListener('click', () => openQuizView(btn.dataset.category)));
  }

  function openQuizView(catId) {
    clearQuizTimer();
    state.quizMode = 'section-menu';
    state.currentCategory = catId;
    showView('quiz');
    const rules = RULES[catId];
    $('#quizContainer').innerHTML = `
      <div style="text-align:center;margin-bottom:20px"><h1 class="section-title">${rules.title}</h1><p class="section-title-en">${rules.titleEn}</p></div>
      <div class="quiz-question"><strong>سطح دشواری / Difficulty</strong><div style="display:grid;gap:10px;margin-top:16px">
        ${[['easy','آسان / Easy'],['medium','متوسط / Medium'],['hard','سخت / Hard'],['all','همه / All']].map(([id,label]) => `<button class="start-quiz-btn difficulty-btn" data-difficulty="${id}">${label}</button>`).join('')}
      </div></div>`;
    $$('.difficulty-btn').forEach(btn => btn.addEventListener('click', () => startQuiz(catId, btn.dataset.difficulty)));
  }
  window.openQuizView = openQuizView;

  function openQuickQuiz() {
    beginQuiz('quick', sampleQuestions(allQuizQuestions(), 10));
  }

  function renderMockWarning() {
    state.quizMode = 'mock-warning';
    $('#quizContainer').innerHTML = `<div class="quiz-result"><div class="quiz-result-icon">⏱️</div><div class="quiz-result-message">آزمون شبیه‌سازی واقعی DVSA — ۵۰ سوال، ۵۷ دقیقه<br><span style="font-size:14px;color:#888;direction:ltr">Pass mark: 43/50 (86%)</span></div><button class="start-quiz-btn" style="margin-top:24px" id="startMockBtn">شروع آزمون / Start Mock Test</button></div>`;
    $('#startMockBtn').addEventListener('click', openMockTest);
  }

  function openMockTest() {
    beginQuiz('mock', sampleQuestions(allQuizQuestions(), 50));
  }

  function formatTime(seconds) {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.max(0, seconds) % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateQuizTimer() {
    const timer = $('#quizTimer');
    if (timer) timer.textContent = `⏱️ ${formatTime(state.quizTimeRemaining)}`;
  }

  function renderQuestion() {
    const quiz = state.quizQuestions;
    if (!quiz || state.quizIndex >= quiz.length) {
      if (state.quizMode === 'mock') renderMockResult();
      else renderQuizResult();
      return;
    }
    const q = quiz[state.quizIndex];

    const progress = ((state.quizIndex) / quiz.length * 100).toFixed(0);
    let html = `
      ${state.quizMode === 'mock' ? `<div style="display:flex;justify-content:space-between;direction:ltr;font-weight:800;color:#b45309;font-size:18px;margin-bottom:12px"><span id="quizTimer">⏱️ ${formatTime(state.quizTimeRemaining)}</span><span id="mockScore">${state.quizScore}/50</span></div>` : ''}
      <div class="quiz-progress">
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quizProgressFill" style="width:${progress}%"></div></div>
        <span class="quiz-progress-text" id="quizProgressText">${state.quizIndex} answered / ${quiz.length}</span>
      </div>
      <div class="quiz-question">
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-q-en">${q.qEn}</div>
        <div class="quiz-options">
    `;

    q.options.forEach(opt => {
      html += `
        <div class="quiz-opt" data-letter="${opt.letter}">
          <span class="quiz-opt-letter">${opt.letter}</span>
          ${opt.fa}<br><span style="direction:ltr;font-size:12px;color:#888">${opt.en}</span>
        </div>
      `;
    });

    html += `</div></div>`;
    html += `<div class="quiz-explanation" id="quizExplanation"><strong>توضیح:</strong> ${q.explanation}</div>`;
    html += `<button class="quiz-next" id="quizNextBtn">بعدی / Next →</button>`;

    const qc = $('#quizContainer');
    if (qc) qc.innerHTML = html;
    state.quizAnswered = false;

    // Bind options
    $$('.quiz-opt').forEach(opt => {
      opt.addEventListener('click', () => handleAnswer(opt.dataset.letter, q.answer));
    });

    // Bind next
    const nextBtn = $('#quizNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        state.quizIndex++;
        renderQuestion();
      });
    }
  }

  function handleAnswer(letter, correct) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    if (letter === correct) {
      state.quizScore++;
      const el = document.querySelector(`.quiz-opt[data-letter="${letter}"]`);
      if (el) el.classList.add('correct');
    } else {
      const el = document.querySelector(`.quiz-opt[data-letter="${letter}"]`);
      if (el) el.classList.add('wrong');
      const cel = document.querySelector(`.quiz-opt[data-letter="${correct}"]`);
      if (cel) cel.classList.add('correct');
    }

    const answered = state.quizIndex + 1;
    const progressFill = $('#quizProgressFill');
    const progressText = $('#quizProgressText');
    const mockScore = $('#mockScore');
    if (progressFill) progressFill.style.width = `${answered / state.quizQuestions.length * 100}%`;
    if (progressText) progressText.textContent = `${answered} answered / ${state.quizQuestions.length}`;
    if (mockScore) mockScore.textContent = `${state.quizScore}/50`;

    const exp = $('#quizExplanation');
    if (exp) exp.classList.add('visible');
    const next = $('#quizNextBtn');
    if (next) next.classList.add('visible');
  }

  function renderQuizResult() {
    clearQuizTimer();
    const quiz = state.quizQuestions;
    const pct = Math.round((state.quizScore / quiz.length) * 100);
    const passed = pct >= 75;

    state.lastQuizScore = pct + '%';
    localStorage.setItem('hc_last_score', state.lastQuizScore);

    // Save to progress tracking
    if (state.quizMode === 'section') saveQuizScore(state.currentCategory, pct);

    updateStats();

    const qc = $('#quizContainer');
    if (!qc) return;
    qc.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-icon">${passed ? '🎉' : '📚'}</div>
        <div class="quiz-result-score">${state.quizScore}/${quiz.length}</div>
        <div class="quiz-result-label">${pct}%</div>
        <div class="quiz-result-message">
          ${passed
            ? 'آفرین! نتیجه عالی! 🎉<br><span style="font-size:14px;color:#888;direction:ltr">Great result! You passed!</span>'
            : 'نیاز به مطالعه بیشتر دارید 📚<br><span style="font-size:14px;color:#888;direction:ltr">Keep studying and try again!</span>'
          }
        </div>
        <button class="start-quiz-btn" style="margin-top:24px;max-width:200px;margin-left:auto;margin-right:auto" id="quizResultRetryBtn">
          تلاش دوباره / Retry
        </button>
      </div>
    `;
    $('#quizResultRetryBtn').addEventListener('click', () => state.quizMode === 'quick' ? openQuickQuiz() : startQuiz(state.currentCategory, state.quizDifficulty));
  }

  function renderMockResult() {
    clearQuizTimer();
    const pct = Math.round((state.quizScore / 50) * 100);
    const passed = state.quizScore >= 43;
    const timeTaken = 57 * 60 - state.quizTimeRemaining;
    const history = JSON.parse(localStorage.getItem('hc_mock_history') || '[]');
    history.push({ date: new Date().toISOString(), score: state.quizScore, passed, timeTaken });
    localStorage.setItem('hc_mock_history', JSON.stringify(history.slice(-5)));
    state.lastQuizScore = `${state.quizScore}/50`;
    localStorage.setItem('hc_last_score', state.lastQuizScore);
    updateStats();
    $('#quizContainer').innerHTML = `<div class="quiz-result"><div class="quiz-result-icon">${passed ? '✅' : '❌'}</div><div class="quiz-result-score" style="color:${passed ? '#16803a' : '#dc2626'}">${state.quizScore}/50</div><div class="quiz-result-label">${pct}% · ${formatTime(timeTaken)}</div><div class="quiz-result-message" style="color:${passed ? '#16803a' : '#dc2626'}">${passed ? 'قبول شدید / Passed' : 'قبول نشدید / Failed'}</div><button class="start-quiz-btn" style="margin-top:24px" id="mockRetryBtn">تلاش دوباره / Try Again</button></div>`;
    $('#mockRetryBtn').addEventListener('click', openMockTest);
  }

  // =============================================
  // PROGRESS TRACKING — QUIZ SCORE HISTORY
  // =============================================
  function saveQuizScore(catId, pct) {
    const data = loadProgressData();
    if (!data.quizScores) data.quizScores = {};
    if (!data.quizScores[catId]) data.quizScores[catId] = [];
    data.quizScores[catId].push({ score: pct, date: new Date().toISOString() });
    // Keep last 5
    if (data.quizScores[catId].length > 5) {
      data.quizScores[catId] = data.quizScores[catId].slice(-5);
    }
    saveProgressData(data);
  }

  function getStreak() {
    const data = loadProgressData();
    const days = (data.studyDays || []).sort();
    if (!days.length) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const check = new Date(today);
      check.setDate(check.getDate() - i);
      const dateStr = check.toISOString().split('T')[0];
      if (days.includes(dateStr)) {
        streak++;
      } else {
        // Allow today to not be recorded yet (if it's still early)
        if (i === 0) continue;
        break;
      }
    }
    return streak;
  }

  // =============================================
  // PROGRESS VIEW
  // =============================================
  function openProgress() {
    const container = $('#progressContainer');
    if (!container) return;
    showView('progress');

    const data = loadProgressData();
    const totalSections = Object.keys(RULES).length;
    const completedCount = state.completedSections.filter(s => RULES[s]).length;
    const overallPct = totalSections ? Math.round((completedCount / totalSections) * 100) : 0;

    // Quiz stats
    const quizScores = data.quizScores || {};
    const allQuizScores = [];
    Object.values(quizScores).forEach(arr => arr.forEach(e => allQuizScores.push(e.score)));
    const totalQuizAttempts = allQuizScores.length;
    const avgQuizScore = totalQuizAttempts ? Math.round(allQuizScores.reduce((a, b) => a + b, 0) / totalQuizAttempts) : 0;

    // Streak
    const streak = getStreak();
    const totalStudyDays = (data.studyDays || []).length;
    const totalRulesStudied = completedCount; // sections = rules groups

    let html = `
      <div class="progress-view-header">
        <h1 class="section-title">📊 پیشرفت شما</h1>
        <p class="section-title-en">Your Progress</p>
      </div>

      <!-- Overall -->
      <div class="progress-card progress-card-overall">
        <div class="progress-card-header">
          <span class="progress-card-icon">🎯</span>
          <span class="progress-card-title">Overall Progress</span>
        </div>
        <div class="progress-overall-row">
          <div class="progress-circle">
            <svg viewBox="0 0 100 100" class="progress-ring">
              <circle cx="50" cy="50" r="42" class="progress-ring-bg"/>
              <circle cx="50" cy="50" r="42" class="progress-ring-fill" style="stroke-dashoffset:${259 - (259 * overallPct / 100)}"/>
            </svg>
            <div class="progress-circle-text">${overallPct}%</div>
          </div>
          <div class="progress-overall-stats">
            <div class="progress-mini-stat"><span class="progress-mini-num">${completedCount}</span><span class="progress-mini-label">Sections</span></div>
            <div class="progress-mini-stat"><span class="progress-mini-num">${totalSections}</span><span class="progress-mini-label">Total</span></div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="progress-stats-grid">
        <div class="progress-stat-card">
          <div class="progress-stat-icon">🔥</div>
          <div class="progress-stat-value">${streak}</div>
          <div class="progress-stat-label">روز متوالی<br><span style="direction:ltr">Day Streak</span></div>
        </div>
        <div class="progress-stat-card">
          <div class="progress-stat-icon">📝</div>
          <div class="progress-stat-value">${totalQuizAttempts}</div>
          <div class="progress-stat-label">تلاش آزمون<br><span style="direction:ltr">Quiz Attempts</span></div>
        </div>
        <div class="progress-stat-card">
          <div class="progress-stat-icon">📊</div>
          <div class="progress-stat-value">${avgQuizScore}%</div>
          <div class="progress-stat-label">میانگین امتیاز<br><span style="direction:ltr">Avg Score</span></div>
        </div>
        <div class="progress-stat-card">
          <div class="progress-stat-icon">📅</div>
          <div class="progress-stat-value">${totalStudyDays}</div>
          <div class="progress-stat-label">روز مطالعه<br><span style="direction:ltr">Days Studied</span></div>
        </div>
      </div>

      <!-- Per-Section Breakdown -->
      <div class="progress-section-title">Per-Section Progress</div>
      <div class="progress-section-list">
    `;

    CATEGORIES.forEach(cat => {
      const hasContent = !!RULES[cat.id];
      if (!hasContent) return;
      const isComplete = state.completedSections.includes(cat.id);
      const sectionQuizScores = quizScores[cat.id] || [];
      const lastScore = sectionQuizScores.length ? sectionQuizScores[sectionQuizScores.length - 1].score : null;

      // Score history bar (last 5)
      let scoreBarHtml = '';
      if (sectionQuizScores.length) {
        scoreBarHtml = '<div class="progress-score-bar">';
        sectionQuizScores.forEach((s, i) => {
          const color = s.score >= 75 ? '#22c55e' : s.score >= 50 ? '#f59e0b' : '#ef4444';
          const height = Math.max(8, s.score * 0.3);
          scoreBarHtml += `<div class="progress-score-col" style="height:${height}px;background:${color}" title="${s.score}%"></div>`;
        });
        scoreBarHtml += '</div>';
      }

      html += `
        <div class="progress-section-item ${isComplete ? 'done' : ''}">
          <div class="progress-section-left">
            <span class="progress-section-icon" style="background:${cat.color}15">${cat.icon}</span>
            <div class="progress-section-info">
              <div class="progress-section-name">${cat.title}</div>
              <div class="progress-section-name-en">${cat.titleEn}</div>
            </div>
          </div>
          <div class="progress-section-right">
            <div class="progress-section-status">
              ${isComplete
                ? '<span class="progress-badge done">✅ مطالعه شد</span>'
                : '<span class="progress-badge pending">⬜ در انتظار</span>'
              }
              ${lastScore !== null ? `<span class="progress-score-badge" style="color:${lastScore >= 75 ? '#22c55e' : '#f59e0b'}">آخرین: ${lastScore}%</span>` : ''}
            </div>
            ${scoreBarHtml}
          </div>
        </div>
      `;
    });

    html += `
      </div>
      <button class="start-quiz-btn" style="margin-top:20px" id="progressBackBtn">بازگشت / Back to Home</button>
    `;

    container.innerHTML = html;

    const backBtn = $('#progressBackBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        showView('home');
        renderCategories();
      });
    }
  }

  // =============================================
  // FULL READ VIEW (Book Mode)
  // =============================================
  function openReadView(sectionId) {
    const container = $('#readContainer');
    if (!container) return;
    showView('read');
    state.readLang = state.readLang || 'fa';
    if (sectionId) {
      renderReadSection(sectionId);
    } else {
      renderReadMenu();
    }
  }

  // Step 1: Show category menu
  function renderReadMenu() {
    const container = $('#readContainer');
    if (!container) return;
    const readLang = state.readLang || 'fa';
    const isFa = readLang === 'fa';
    const isEn = readLang === 'en';

    let html = '<div class="read-menu">';
    html += '<div class="read-menu-header">';
    html += '<div class="read-lang-toggle">';
    html += '<button class="read-lang-btn' + (readLang === 'fa' ? ' active' : '') + '" onclick="switchReadLang(\'fa\')">فارسی</button>';
    html += '<button class="read-lang-btn' + (readLang === 'en' ? ' active' : '') + '" onclick="switchReadLang(\'en\')">English</button>';
    html += '<button class="read-lang-btn' + (readLang === 'both' ? ' active' : '') + '" onclick="switchReadLang(\'both\')">هر دو / Both</button>';
    html += '</div>';

    const mainTitle = isEn ? '🇬🇧 The Highway Code' : '🇬🇧 کد بزرگراه بریتانیا';
    const subtitle = isEn ? 'Choose a section to read' : 'بخش مورد نظر را انتخاب کنید';
    html += `<h1 class="read-menu-title">${mainTitle}</h1>`;
    html += `<p class="read-menu-subtitle">${subtitle}</p>`;
    html += '</div>';

    const totalRules = Object.values(RULES).reduce((s, r) => s + (r.rules || []).length, 0);
    const totalSections = Object.keys(RULES).length;
    const statSections = isEn ? 'Sections' : 'بخش';
    const statRules = isEn ? 'Rules' : 'قانون';
    const statQuizzes = isEn ? 'Quizzes' : 'آزمون';
    html += '<div class="read-menu-stats">';
    html += `<div class="read-stat"><span class="read-stat-num">${totalSections}</span><span class="read-stat-label">${statSections}</span></div>`;
    html += `<div class="read-stat"><span class="read-stat-num">${totalRules}</span><span class="read-stat-label">${statRules}</span></div>`;
    html += `<div class="read-stat"><span class="read-stat-num">47</span><span class="read-stat-label">${statQuizzes}</span></div>`;
    html += '</div>';

    Object.entries(RULES).forEach(([key, section], idx) => {
      const title = isEn ? (section.titleEn || section.title) : section.title;
      const titleSub = (readLang === 'both' || isEn) ? (section.titleEn || '') : '';
      const rules = section.rules || [];
      const hasQuiz = section.quiz && section.quiz.length > 0;
      const quizCount = hasQuiz ? section.quiz.length : 0;
      const completed = state.completedSections.includes(key);

      html += `<button class="read-menu-item" onclick="openReadSection('${key}')">`;
      html += `<span class="read-menu-num">${idx + 1}</span>`;
      html += '<div class="read-menu-info">';
      html += `<div class="read-menu-item-title">${title}</div>`;
      if (titleSub && titleSub !== title) html += `<div class="read-menu-item-sub">${titleSub}</div>`;
      html += `<div class="read-menu-meta">${rules.length} ${isEn ? 'rules' : 'قانون'}${quizCount ? ' · ' + quizCount + ' ' + (isEn ? 'quiz' : 'آزمون') : ''}</div>`;
      html += '</div>';
      if (completed) html += '<span class="read-menu-check">✅</span>';
      html += '<span class="read-menu-arrow">←</span>';
      html += '</button>';
    });

    const disclaimer = isEn ? '⚠️ Educational version. Visit gov.uk for the official Highway Code.' : '⚠️ این نسخه آموزشی است. نسخه رسمی: gov.uk';
    html += `<div class="read-menu-footer">${disclaimer}</div>`;
    html += '</div>';

    container.innerHTML = html;
  }

  // Step 2: Show one section's rules
  function renderReadSection(sectionKey) {
    const container = $('#readContainer');
    if (!container) return;

    const readLang = state.readLang || 'fa';
    const isFa = readLang === 'fa';
    const isEn = readLang === 'en';
    const isBoth = readLang === 'both';
    const showFa = isFa || isBoth;
    const showEn = isEn || isBoth;

    const section = RULES[sectionKey];
    if (!section) { renderReadMenu(); return; }
    const rules = section.rules || [];

    let html = '<div class="read-section-view">';
    html += `<div class="read-section-topbar">`;
    html += `<button class="read-back-btn" onclick="openReadView()">→ ${isEn ? 'Back' : 'بازگشت'}</button>`;
    html += `<div class="read-lang-toggle compact">`;
    html += '<button class="read-lang-btn' + (readLang === 'fa' ? ' active' : '') + '" onclick="switchReadLang(\'fa\')">فا</button>';
    html += '<button class="read-lang-btn' + (readLang === 'en' ? ' active' : '') + '" onclick="switchReadLang(\'en\')">EN</button>';
    html += '<button class="read-lang-btn' + (readLang === 'both' ? ' active' : '') + '" onclick="switchReadLang(\'both\')">ب+ا</button>';
    html += '</div>';
    html += '</div>';

    html += '<div class="read-section-header">';
    if (showFa) html += `<h1 class="read-section-main-title">${section.title}</h1>`;
    if (showEn) html += `<p class="read-section-main-title-en">${section.titleEn}</p>`;
    html += `<div class="read-section-meta">${rules.length} ${isEn ? 'rules' : 'قانون'}</div>`;
    html += '</div>';

    rules.forEach((rule, ri) => {
      html += `<div class="read-rule">`;
      const numLabel = isEn ? `Rule ${rule.num}` : `قانون ${rule.num}`;
      html += `<div class="read-rule-num">${numLabel}</div>`;
      if (showFa) html += `<div class="read-rule-fa">${rule.fa}</div>`;
      if (showEn) html += `<div class="read-rule-en">${rule.en}</div>`;
      if (showFa && rule.warningFa) html += `<div class="read-warning">⚠️ ${rule.warningFa}</div>`;
      if (showEn && rule.warningEn) html += `<div class="read-warning-en">⚠️ ${rule.warningEn}</div>`;
      if (showFa && rule.tipFa) html += `<div class="read-tip">💡 ${rule.tipFa}</div>`;
      if (showEn && rule.tipEn) html += `<div class="read-tip-en">💡 ${rule.tipEn}</div>`;
      html += '</div>';
    });

    if (section.quiz && section.quiz.length > 0) {
      const quizTitle = isEn ? 'Take Quiz' : 'شروع آزمون';
      html += `<div class="read-quiz-section">`;
      html += `<button class="read-quiz-btn" onclick="openQuizView('${sectionKey}')">📝 ${quizTitle}</button>`;
      html += `</div>`;
    }

    // Prev / Next section navigation
    const readCatIds = Object.keys(RULES).filter(k => RULES[k].rules && RULES[k].rules.length > 0);
    const rIdx = readCatIds.indexOf(sectionKey);
    const rPrev = rIdx > 0 ? readCatIds[rIdx - 1] : null;
    const rNext = rIdx < readCatIds.length - 1 ? readCatIds[rIdx + 1] : null;
    if (rPrev || rNext) {
      html += `<div class="section-nav" style="margin-top:24px">`;
      if (rPrev) html += `<button class="section-nav-btn prev" onclick="openReadSection('${rPrev}')">← Previous / قبلی</button>`;
      if (rNext) html += `<button class="section-nav-btn next" onclick="openReadSection('${rNext}')">Next / بعدی →</button>`;
      html += `</div>`;
    }

    html += '</div>';
    container.innerHTML = html;
    window.scrollTo(0, 0);
  }

  window.openReadSection = function(key) {
    renderReadSection(key);
  };

  // Expose to global for inline onclick
  window.switchReadLang = function(lang) {
    state.readLang = lang;
    // Re-render whichever read view is currently shown
    const menu = document.querySelector('.read-menu');
    if (menu) {
      renderReadMenu();
    } else {
      const secView = document.querySelector('.read-section-view');
      if (secView) {
        // Find which section is displayed
        const backBtn = secView.querySelector('.read-quiz-btn');
        if (backBtn) {
          const match = backBtn.getAttribute('onclick').match(/openQuizView\('([^']+)'\)/);
          if (match) renderReadSection(match[1]);
          else renderReadMenu();
        } else {
          renderReadMenu();
        }
      } else {
        renderReadMenu();
      }
    }
  };

  // =============================================
  // FLASHCARD MODE
  // =============================================
  function openFlashcards(filter) {
    const container = $('#flashcardContainer');
    if (!container) return;
    showView('flashcards');

    state.flashcard.filter = filter || 'all';
    state.flashcard.done = false;

    renderFlashcardView();
  }

  function renderFlashcardView() {
    const container = $('#flashcardContainer');
    if (!container) return;

    if (state.flashcard.done) {
      renderFlashcardSummary();
      return;
    }

    // Load cards
    let cards = (window.ROAD_SIGN_VISUALS || []).slice();
    const filter = state.flashcard.filter;

    if (filter && filter !== 'all') {
      cards = cards.filter(c => c.category === filter);
    }

    if (!cards.length) {
      container.innerHTML = `
        <div style="text-align:center;padding:60px 20px;color:#888">
          <div style="font-size:48px;margin-bottom:16px">🚫</div>
          <p>نشانه‌ای برای این دسته‌بندی یافت نشد</p>
          <p style="direction:ltr;font-size:13px">No signs found for this category</p>
        </div>
      `;
      return;
    }

    if (!state.flashcard.cards.length || state.flashcard.filter !== filter) {
      state.flashcard.cards = cards;
      state.flashcard.index = 0;
      state.flashcard.correct = 0;
      state.flashcard.incorrect = 0;
      state.flashcard.reviewed = 0;
      state.flashcard.flipped = false;
    }

    const fc = state.flashcard;
    const card = fc.cards[fc.index];
    const total = fc.cards.length;
    const progressPct = total ? Math.round((fc.reviewed / total) * 100) : 0;

    const categories = ['all', 'regulatory', 'warning', 'pedestrian', 'motorway'];
    const catLabels = { all: 'همه / All', regulatory: 'تنظیمی / Regulatory', warning: 'هشدار / Warning', pedestrian: 'پیاده / Pedestrian', motorway: 'بزرگراه / Motorway' };

    let filterHtml = '<div class="flashcard-filters">';
    categories.forEach(cat => {
      filterHtml += `<button class="flashcard-filter-btn ${filter === cat ? 'active' : ''}" data-filter="${cat}">${catLabels[cat]}</button>`;
    });
    filterHtml += '</div>';

    container.innerHTML = `
      <h1 class="section-title">🔄 فلش‌کارت</h1>
      <p class="section-title-en">Flashcard Mode</p>

      ${filterHtml}

      <!-- Score display -->
      <div class="flashcard-score-bar">
        <span class="flashcard-score-correct">✅ ${fc.correct}</span>
        <span class="flashcard-score-progress">${fc.index + 1} / ${total}</span>
        <span class="flashcard-score-incorrect">❌ ${fc.incorrect}</span>
      </div>

      <!-- Progress bar -->
      <div class="flashcard-progress-bar">
        <div class="flashcard-progress-fill" style="width:${progressPct}%"></div>
      </div>

      <!-- Flashcard -->
      <div class="flashcard-wrapper" id="flashcardWrapper">
        <div class="flashcard-card ${fc.flipped ? 'flipped' : ''}" id="flashcardCard">
          <div class="flashcard-face flashcard-front">
            <div class="flashcard-front-inner">
              ${card.img ? `<img src="${card.img}" alt="${card.nameFa}" style="width:100%;height:100%;object-fit:contain;"/>` : card.svg}
            </div>
            <div class="flashcard-hint">برای دیدن جواب ضربه بزنید<br><span style="direction:ltr;font-size:12px;color:#aaa">Tap to reveal</span></div>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="flashcard-back-inner">
              <div class="flashcard-name">${card.nameFa}</div>
              <div class="flashcard-name-en">${card.nameEn}</div>
              <div class="flashcard-divider"></div>
              <div class="flashcard-desc">${card.descriptionFa}</div>
              <div class="flashcard-desc-en">${card.descriptionEn}</div>
              <div class="flashcard-cat-badge">${card.category}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flashcard-actions">
        <button class="flashcard-btn incorrect" id="fcIncorrect" title="Incorrect / اشتباه">
          ← ❌
        </button>
        ${!fc.flipped ? `
          <button class="flashcard-btn flip" id="fcFlip" title="Flip / برگردان">
            🔄
          </button>
        ` : ''}
        <button class="flashcard-btn correct" id="fcCorrect" title="Correct / درست">
          ✅ →
        </button>
      </div>

      <!-- Extra actions -->
      <div class="flashcard-extra-actions">
        <button class="flashcard-extra-btn" id="fcShuffle">🔀 ترتیب تصادفی / Shuffle</button>
        <button class="flashcard-extra-btn" id="fcRestart">🔄 شروع مجدد / Restart</button>
      </div>
    `;

    // Bind card flip (tap)
    const wrapper = $('#flashcardWrapper');
    if (wrapper) {
      wrapper.addEventListener('click', (e) => {
        if (e.target.closest('.flashcard-btn') || e.target.closest('.flashcard-extra-btn') || e.target.closest('.flashcard-filter-btn')) return;
        fc.flipped = !fc.flipped;
        renderFlashcardView();
      });
    }

    // Bind flip button
    const flipBtn = $('#fcFlip');
    if (flipBtn) {
      flipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fc.flipped = !fc.flipped;
        renderFlashcardView();
      });
    }

    // Bind correct
    const correctBtn = $('#fcCorrect');
    if (correctBtn) {
      correctBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fc.correct++;
        fc.reviewed++;
        advanceFlashcard();
      });
    }

    // Bind incorrect
    const incorrectBtn = $('#fcIncorrect');
    if (incorrectBtn) {
      incorrectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fc.incorrect++;
        fc.reviewed++;
        advanceFlashcard();
      });
    }

    // Bind shuffle
    const shuffleBtn = $('#fcShuffle');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        fc.cards = shuffleArray(fc.cards.slice());
        fc.index = 0;
        fc.reviewed = 0;
        fc.correct = 0;
        fc.incorrect = 0;
        fc.flipped = false;
        renderFlashcardView();
      });
    }

    // Bind restart
    const restartBtn = $('#fcRestart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        fc.index = 0;
        fc.reviewed = 0;
        fc.correct = 0;
        fc.incorrect = 0;
        fc.flipped = false;
        fc.done = false;
        renderFlashcardView();
      });
    }

    // Bind filters
    $$('.flashcard-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openFlashcards(btn.dataset.filter);
      });
    });

    // Swipe support
    setupFlashcardSwipe();
  }

  function advanceFlashcard() {
    const fc = state.flashcard;
    fc.flipped = false;
    if (fc.index + 1 >= fc.cards.length) {
      fc.done = true;
      renderFlashcardSummary();
    } else {
      fc.index++;
      renderFlashcardView();
    }
  }

  function renderFlashcardSummary() {
    const container = $('#flashcardContainer');
    if (!container) return;

    const fc = state.flashcard;
    const total = fc.correct + fc.incorrect;
    const pct = total ? Math.round((fc.correct / total) * 100) : 0;

    container.innerHTML = `
      <div class="flashcard-summary">
        <div class="flashcard-summary-icon">${pct >= 70 ? '🎉' : '📚'}</div>
        <h2 class="flashcard-summary-title">Session Complete!</h2>
        <p class="flashcard-summary-sub">جلسه تمام شد!</p>

        <div class="flashcard-summary-stats">
          <div class="flashcard-summary-stat correct">
            <div class="flashcard-summary-num">${fc.correct}</div>
            <div class="flashcard-summary-label">Correct / درست</div>
          </div>
          <div class="flashcard-summary-stat incorrect">
            <div class="flashcard-summary-num">${fc.incorrect}</div>
            <div class="flashcard-summary-label">Incorrect / اشتباه</div>
          </div>
          <div class="flashcard-summary-stat">
            <div class="flashcard-summary-num">${pct}%</div>
            <div class="flashcard-summary-label">Score / امتیاز</div>
          </div>
        </div>

        <div class="flashcard-summary-bar">
          <div class="flashcard-summary-fill" style="width:${pct}%;background:${pct >= 70 ? '#22c55e' : '#f59e0b'}"></div>
        </div>

        <div class="flashcard-summary-actions">
          <button class="start-quiz-btn" id="fcRestartSummary">🔄 تلاش دوباره / Try Again</button>
          <button class="start-quiz-btn" style="background:#fff;color:#4361ee;border:2px solid #4361ee" id="fcHomeSummary">🏠 خانه / Home</button>
        </div>
      </div>
    `;

    const restartBtn = $('#fcRestartSummary');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        state.flashcard.cards = [];
        state.flashcard.done = false;
        renderFlashcardView();
      });
    }
    const homeBtn = $('#fcHomeSummary');
    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        showView('home');
        renderCategories();
      });
    }
  }

  // Swipe support for flashcards
  function setupFlashcardSwipe() {
    const wrapper = $('#flashcardWrapper');
    if (!wrapper) return;
    let startX = 0;
    let startY = 0;
    let swiping = false;

    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      swiping = true;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      if (!swiping) return;
      swiping = false;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      // Only count horizontal swipes
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        const fc = state.flashcard;
        if (diffX < 0) {
          // Swipe left = incorrect
          fc.incorrect++;
          fc.reviewed++;
          advanceFlashcard();
        } else {
          // Swipe right = correct
          fc.correct++;
          fc.reviewed++;
          advanceFlashcard();
        }
      }
    }, { passive: true });
  }

  // =============================================
  // PROGRESS (existing header)
  // =============================================
  function updateProgress() {
    const total = Object.keys(RULES).length;
    const done = state.completedSections.filter(s => RULES[s]).length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    const pt = $('#progressText');
    if (pt) pt.textContent = pct + '%';
    const pp = $('#progressPill');
    if (pp) pp.style.background = pct > 0 ? 'rgba(248,247,244,.3)' : 'rgba(248,247,244,.12)';
  }

  function updateStats() {
    const sc = $('#sectionsCompleted');
    if (sc) sc.textContent = state.completedSections.filter(s => RULES[s]).length;
    const qs = $('#quizScore');
    if (qs) qs.textContent = state.lastQuizScore;
  }

  // =============================================
  // EVENTS
  // =============================================
  function bindEvents() {
    const backBtn = $('#backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        stopListenAll();
        showView('home');
        renderCategories();
      });
    }
    const quizBackBtn = $('#quizBackBtn');
    if (quizBackBtn) {
      quizBackBtn.addEventListener('click', () => {
        clearQuizTimer();
        if (state.quizMode === 'menu') {
          showView('home');
          renderCategories();
        } else {
          openQuizMenu();
        }
      });
    }
    const langFa = $('#langFa');
    const langEn = $('#langEn');
    function setLang(lang) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
      langFa.classList.toggle('active', lang === 'fa');
      langEn.classList.toggle('active', lang === 'en');
    }
    if (langFa) langFa.addEventListener('click', () => setLang('fa'));
    if (langEn) langEn.addEventListener('click', () => setLang('en'));
    const searchInput = $('#searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderCategories(e.target.value);
      });
    }

    // Bottom nav
    $$('.bottom-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        clearQuizTimer();
        const target = btn.dataset.target;
        if (target === 'home') {
          showView('home');
          renderCategories();
        } else if (target === 'read') {
          openReadView();
        } else if (target === 'signs') {
          openSection('road-signs');
        } else if (target === 'flashcards') {
          openFlashcards();
        } else if (target === 'progress') {
          openProgress();
        } else if (target === 'quiz') {
          openQuizMenu();
        } else if (target === 'hazard') {
          openHazardGallery();
        } else if (target === 'showme') {
          state.showMeFilter = 'all';
          showView('showme');
          renderShowMeView();
        }
      });
    });
  }

  // =============================================
  // UTILITIES
  // =============================================
  function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  // =============================================
  // GO
  // =============================================
  document.addEventListener('DOMContentLoaded', init);

})();
