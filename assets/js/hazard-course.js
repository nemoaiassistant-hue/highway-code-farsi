(function () {
  'use strict';

  const scenarios = window.HAZARD_SCENARIOS || [];
  if (!scenarios.length) return;

  const courseKey = location.pathname.split('/').filter(Boolean).slice(-2, -1)[0] || 'course';
  const bestKey = `hc_hazard_best_${courseKey}`;
  const categoryLabels = {
    junctions: 'تقاطع‌ها', pedestrians: 'عابران پیاده', roadworks: 'عملیات جاده‌ای',
    weather: 'آب‌وهوا', motorway: 'بزرگراه', parking: 'پارک و توقف',
    cyclists: 'دوچرخه‌سواران', roundabouts: 'میدان‌ها', night: 'رانندگی شبانه',
    school_zones: 'محدوده مدرسه', filtering: 'عبور از میان ترافیک',
    lane_position: 'موقعیت در خط', road_surface: 'سطح جاده', blind_spots: 'نقاط کور',
    braking_distance: 'فاصله ترمز', low_bridges: 'پل‌های کوتاه', load_security: 'ایمنی بار',
    tight_turns: 'پیچ‌های تنگ', merging: 'ادغام در ترافیک', reversing: 'دنده عقب'
  };

  const state = { list: [], index: 0, score: 0, answered: false, category: 'all', difficulty: 'all' };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  const escape = (value) => String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const shuffle = (items) => items.slice().sort(() => Math.random() - 0.5);
  const isEnglish = () => document.documentElement.lang === 'en';

  function init() {
    const app = $('#app');
    const nav = $('#bottomNav');
    if (!app || !nav || $('#hazardView')) return;

    app.insertAdjacentHTML('beforeend', '<div class="view" id="hazardView"><div id="hazardContainer"></div></div>');
    nav.insertAdjacentHTML('beforeend', `
      <button class="bottom-nav-item" id="navHazard" data-target="hazard">
        <span class="bottom-nav-icon">⚠️</span>
        <span class="bottom-nav-label">تشخیص خطر<br><span dir="ltr">Hazards</span></span>
      </button>`);
    $('#navHazard').addEventListener('click', openMenu);

    ['langFa', 'langEn'].forEach(id => {
      const button = $(`#${id}`);
      if (button) button.addEventListener('click', () => {
        if ($('#hazardView').classList.contains('active')) renderCurrent();
      });
    });
  }

  function showHazardView() {
    $$('.view').forEach(view => view.classList.remove('active'));
    $('#hazardView').classList.add('active');
    $$('.bottom-nav-item').forEach(button => button.classList.toggle('active', button.id === 'navHazard'));
    window.scrollTo(0, 0);
  }

  function openMenu() {
    showHazardView();
    const categories = [...new Set(scenarios.map(item => item.category))];
    const best = Number(localStorage.getItem(bestKey) || 0);
    $('#hazardContainer').innerHTML = `
      <div class="hazard-menu">
        <div class="hazard-hero">
          <span class="hazard-hero-icon">⚠️</span>
          <h1>تمرین تشخیص خطر</h1>
          <p>خطر در حال توسعه را در هر موقعیت پیدا کنید</p>
          <p dir="ltr">Identify the developing hazard in each road scene</p>
        </div>
        <div class="hazard-stats">
          <div><strong>${scenarios.length}</strong><span>موقعیت / Scenarios</span></div>
          <div><strong>${best || '—'}</strong><span>بهترین امتیاز / Best</span></div>
        </div>
        <div class="hazard-filter-card">
          <label for="hazardCategory">دسته‌بندی / Category</label>
          <select id="hazardCategory"><option value="all">همه دسته‌ها / All categories</option>${categories.map(category => `<option value="${category}">${escape(categoryLabels[category] || category)} / ${escape(category.replaceAll('_', ' '))}</option>`).join('')}</select>
          <label for="hazardDifficulty">سطح دشواری / Difficulty</label>
          <select id="hazardDifficulty">
            <option value="all">همه سطوح / All levels</option>
            <option value="easy">آسان / Easy</option><option value="medium">متوسط / Medium</option><option value="hard">دشوار / Hard</option>
          </select>
          <button class="hazard-primary" id="hazardStart">شروع تمرین / Start practice</button>
        </div>
        <div class="hazard-note"><strong>خطر در حال توسعه چیست؟</strong><br>خطری که شما را وادار به تغییر سرعت یا مسیر می‌کند. جزئیات ثابت صحنه ممکن است خطر بالقوه باشند، اما هنوز به اقدام فوری نیاز ندارند.<div dir="ltr">A developing hazard is something that requires you to change speed or direction. Static details may be potential hazards, but do not yet require action.</div></div>
      </div>`;
    $('#hazardStart').addEventListener('click', startCourse);
  }

  function startCourse() {
    state.category = $('#hazardCategory').value;
    state.difficulty = $('#hazardDifficulty').value;
    state.list = shuffle(scenarios.filter(item =>
      (state.category === 'all' || item.category === state.category) &&
      (state.difficulty === 'all' || item.difficulty === state.difficulty)
    ));
    state.index = 0;
    state.score = 0;
    state.answered = false;
    renderCurrent();
  }

  function renderCurrent() {
    showHazardView();
    if (!state.list.length) return openMenu();
    if (state.index >= state.list.length) return renderResult();

    const item = state.list[state.index];
    const english = isEnglish();
    const scene = english ? item.sceneEn : item.sceneFa;
    const secondaryScene = english ? item.sceneFa : item.sceneEn;
    const category = categoryLabels[item.category] || item.category;
    $('#hazardContainer').innerHTML = `
      <div class="hazard-course">
        <button class="back-btn" id="hazardExit">← بازگشت / Back</button>
        <div class="hazard-progress"><div><span>${state.index + 1} / ${state.list.length}</span><span>امتیاز / Score: ${state.score}</span></div><div class="hazard-progress-track"><span style="width:${(state.index / state.list.length) * 100}%"></span></div></div>
        <article class="hazard-scene">
          <div class="hazard-badges"><span>${escape(category)}</span><span class="difficulty-${item.difficulty}">${escape(item.difficulty)}</span></div>
          <h2>${english ? 'What is the developing hazard?' : 'خطر در حال توسعه کدام است؟'}</h2>
          <p class="hazard-scene-main">${escape(scene)}</p>
          <p class="hazard-scene-secondary" dir="${english ? 'rtl' : 'ltr'}">${escape(secondaryScene)}</p>
          ${item.image ? `<img src="${escape(item.image)}" alt="" class="hazard-image">` : '<div class="hazard-placeholder"><span>👁️</span><small>صحنه را با دقت تجسم کنید / Visualise the scene carefully</small></div>'}
        </article>
        <div class="hazard-options">${item.options.map(option => `<button class="hazard-option" data-option="${option.id}"><b>${option.id.toUpperCase()}</b><span>${escape(english ? option.textEn : option.textFa)}<small dir="${english ? 'rtl' : 'ltr'}">${escape(english ? option.textFa : option.textEn)}</small></span></button>`).join('')}</div>
        <div id="hazardFeedback"></div>
      </div>`;
    $('#hazardExit').addEventListener('click', openMenu);
    $$('.hazard-option').forEach(button => button.addEventListener('click', () => answer(button.dataset.option)));
  }

  function answer(optionId) {
    if (state.answered) return;
    state.answered = true;
    const item = state.list[state.index];
    const correct = optionId === item.correctOption;
    if (correct) state.score++;
    $$('.hazard-option').forEach(button => {
      button.disabled = true;
      if (button.dataset.option === item.correctOption) button.classList.add('correct');
      if (button.dataset.option === optionId && !correct) button.classList.add('wrong');
    });
    const english = isEnglish();
    $('#hazardFeedback').innerHTML = `
      <div class="hazard-feedback ${correct ? 'is-correct' : 'is-wrong'}">
        <h3>${correct ? (english ? 'Correct' : 'درست است') : (english ? 'Not quite' : 'پاسخ درست نیست')}</h3>
        <p>${escape(english ? item.explanationEn : item.explanationFa)}</p>
        <p dir="${english ? 'rtl' : 'ltr'}">${escape(english ? item.explanationFa : item.explanationEn)}</p>
        <div class="hazard-tip"><strong>${english ? 'Tip' : 'نکته'}:</strong> ${escape(english ? item.tipEn : item.tipFa)}</div>
        <button class="hazard-primary" id="hazardNext">${state.index + 1 === state.list.length ? 'مشاهده نتیجه / See result' : 'بعدی / Next'}</button>
      </div>`;
    $('#hazardNext').addEventListener('click', () => { state.index++; state.answered = false; renderCurrent(); });
  }

  function renderResult() {
    const percent = Math.round((state.score / state.list.length) * 100);
    const oldBest = Number(localStorage.getItem(bestKey) || 0);
    localStorage.setItem(bestKey, String(Math.max(oldBest, percent)));
    $('#hazardContainer').innerHTML = `
      <div class="hazard-result">
        <span>${percent >= 80 ? '✓' : '⚠️'}</span><h1>تمرین تمام شد</h1><p dir="ltr">Hazard practice complete</p>
        <strong>${state.score} / ${state.list.length}</strong><div class="hazard-result-bar"><span style="width:${percent}%"></span></div><p>${percent}٪ پاسخ درست</p>
        <button class="hazard-primary" id="hazardAgain">تمرین دوباره / Practise again</button><button class="hazard-secondary" id="hazardMenu">انتخاب دسته‌بندی / Choose category</button>
      </div>`;
    $('#hazardAgain').addEventListener('click', () => { state.list = shuffle(state.list); state.index = 0; state.score = 0; state.answered = false; renderCurrent(); });
    $('#hazardMenu').addEventListener('click', openMenu);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
