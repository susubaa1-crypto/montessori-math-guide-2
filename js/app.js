// 몬테소리 매쓰 30주 가이드 - 메인 앱 로직
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'home';

  switch (page) {
    case 'home':
      renderHomePage();
      break;
    case 'week':
      renderWeekPage();
      break;
    case 'curriculum':
      renderCurriculumPage();
      break;
    case 'tools':
      renderToolsPage();
      break;
  }

  initNav();
});

// ==================== 내비게이션 ====================
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // 링크 클릭 시 닫기
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

// ==================== 홈 페이지 ====================
function renderHomePage() {
  const currentWeek = getCurrentWeek();
  const weekData = GUIDE_DATA.weeks.find(w => w.week === currentWeek);

  // 히어로 배지
  const heroBadge = document.getElementById('hero-badge');
  if (heroBadge) {
    heroBadge.textContent = `📅 현재 ${currentWeek}주차 진행 중`;
  }

  // 진행률
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  if (progressFill) {
    const percent = Math.round((currentWeek / 30) * 100);
    progressFill.style.width = percent + '%';
    if (progressText) {
      progressText.textContent = `${currentWeek} / 30주`;
    }
  }

  // 이번 주 미션 카드
  renderCurrentMission(weekData);

  // 다음 미션 카운트다운
  renderCountdown();

  // 가이드 룰
  renderGuideRules();

  // FAQ
  renderFAQ();
}

// 교구 칩 HTML 생성 헬퍼
function renderToolChip(tool) {
  const imgHtml = tool.image
    ? `<img class="tool-chip-img" src="${tool.image}" alt="${tool.name}">`
    : `<span class="tool-chip-icon">🧩</span>`;
  return `
    <span class="tool-chip" onclick="openToolModal('${tool.id}')">
      ${imgHtml}
      ${tool.name}
    </span>
  `;
}

function renderCurrentMission(weekData) {
  const container = document.getElementById('mission-cards');
  if (!container || !weekData) return;

  const l1Tools = weekData.level1.tools.map(id => getToolById(id)).filter(Boolean);
  const l2Tools = weekData.level2.tools.map(id => getToolById(id)).filter(Boolean);

  const currentWeek = weekData.week;

  container.innerHTML = `
    <div class="mission-card level1">
      <div class="mission-card-header">
        <span class="level-badge l1">LEVEL 1</span>
        <span class="mission-book-num">📖 미션북 ${weekData.level1.missionBook}</span>
      </div>
      <div class="mission-card-body">
        <div class="tools-label">🧩 이번 주 교구</div>
        <div class="tools-list">
          ${l1Tools.map(t => renderToolChip(t)).join('')}
        </div>
      </div>
    </div>

    <div class="mission-card level2">
      <div class="mission-card-header">
        <span class="level-badge l2">LEVEL 2</span>
        <span class="mission-book-num">📖 미션북 ${weekData.level2.missionBook}</span>
      </div>
      <div class="mission-card-body">
        <div class="tools-label">🧩 이번 주 교구</div>
        <div class="tools-list">
          ${l2Tools.map(t => renderToolChip(t)).join('')}
        </div>
      </div>
    </div>

    ${weekData.note ? `<div class="timeline-note">📌 ${weekData.note}</div>` : ''}
  `;
}

function renderCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const { days, hours } = getTimeUntilNextTuesday();
  el.innerHTML = `<span>🔔 다음 미션 공개까지 <strong>${days}일 ${hours}시간</strong></span>`;
}

function renderGuideRules() {
  const container = document.getElementById('guide-cards');
  if (!container) return;

  const rules = [
    { icon: '⏰', title: '하루 10분이면 충분해요', desc: '나머지는 아이가 자유롭게 놀아도 괜찮아요. 미션북을 펼쳤을 때만큼은 가이드를 따라 몰입할 수 있도록 도와주세요.' },
    { icon: '🧸', title: '몰입 환경 만들기', desc: '미션북 + 해당 교구만 놓이는 환경이 중요해요. 다른 교구와 섞이지 않게 해주세요.' },
    { icon: '🔄', title: '반복이 핵심이에요', desc: '한 주에 책 1권 + 교구 2~3개에 집중하세요. 한 번 하고 끝 ❌ 일주일 동안 깊게 놀아주세요.' },
    { icon: '📸', title: '인증은 이렇게!', desc: '매주 단톡방에 놀이 사진을 올려주세요. 카페에 후기를 남기면 특별 인증!' },
  ];

  container.innerHTML = rules.map(r => `
    <div class="guide-card">
      <div class="guide-card-icon">${r.icon}</div>
      <div class="guide-card-content">
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      </div>
    </div>
  `).join('');
}

function renderFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  container.innerHTML = GUIDE_DATA.faq.map(item => `
    <div class="faq-item">
      <div class="faq-question">${item.q}</div>
      <div class="faq-answer">${item.a}</div>
    </div>
  `).join('');
}



// ==================== 주차 상세 페이지 ====================
function renderWeekPage() {
  const params = new URLSearchParams(window.location.search);
  const weekNum = parseInt(params.get('w')) || getCurrentWeek();
  const weekData = GUIDE_DATA.weeks.find(w => w.week === weekNum);

  if (!weekData) return;

  // 헤더
  const header = document.getElementById('week-detail-header');
  if (header) {
    const year = new Date().getFullYear();
    const [month, day] = weekData.date.split("/").map(Number);
    header.innerHTML = `
      <div class="week-detail-num">${weekNum}주차</div>
      <div class="week-detail-date">${month}월 ${day}일 (화)</div>
      ${weekData.note ? `<div class="week-detail-note">📌 ${weekData.note}</div>` : ''}
    `;
  }

  // 미션 카드
  const cards = document.getElementById('week-mission-cards');
  if (cards) {
    const l1Tools = weekData.level1.tools.map(id => getToolById(id)).filter(Boolean);
    const l2Tools = weekData.level2.tools.map(id => getToolById(id)).filter(Boolean);

    cards.innerHTML = `
      <div class="mission-card level1">
        <div class="mission-card-header">
          <span class="level-badge l1">LEVEL 1</span>
          <span class="mission-book-num">📖 미션북 ${weekData.level1.missionBook}</span>
        </div>
        <div class="mission-card-body">
          <div class="tools-label">🧩 이번 주 교구</div>
          <div class="tools-list">
            ${l1Tools.map(t => renderToolChip(t)).join('')}
          </div>
        </div>
      </div>

      <div class="mission-card level2">
        <div class="mission-card-header">
          <span class="level-badge l2">LEVEL 2</span>
          <span class="mission-book-num">📖 미션북 ${weekData.level2.missionBook}</span>
        </div>
        <div class="mission-card-body">
          <div class="tools-label">🧩 이번 주 교구</div>
          <div class="tools-list">
            ${l2Tools.map(t => renderToolChip(t)).join('')}
          </div>
        </div>
      </div>

    `;
  }

  // 이전/다음 네비게이션
  const prevBtn = document.getElementById('week-prev');
  const nextBtn = document.getElementById('week-next');
  if (prevBtn) {
    if (weekNum > 1) {
      prevBtn.href = `week.html?w=${weekNum - 1}`;
      prevBtn.textContent = `← ${weekNum - 1}주차`;
    } else {
      prevBtn.classList.add('disabled');
      prevBtn.textContent = '';
    }
  }
  if (nextBtn) {
    if (weekNum < 30) {
      nextBtn.href = `week.html?w=${weekNum + 1}`;
      nextBtn.textContent = `${weekNum + 1}주차 →`;
    } else {
      nextBtn.classList.add('disabled');
      nextBtn.textContent = '';
    }
  }
}

// ==================== 커리큘럼 페이지 ====================
function renderCurriculumPage() {
  const container = document.getElementById('timeline');
  if (!container) return;

  const currentWeek = getCurrentWeek();

  container.innerHTML = GUIDE_DATA.weeks.map((w, i) => {
    let status = 'future';
    if (w.week < currentWeek) status = 'past';
    else if (w.week === currentWeek) status = 'current';

    const l1ToolNames = w.level1.tools.map(id => {
      const t = getToolById(id);
      return t ? t.name : '';
    }).filter(Boolean);

    const l2ToolNames = w.level2.tools.map(id => {
      const t = getToolById(id);
      return t ? t.name : '';
    }).filter(Boolean);

    return `
      <div class="timeline-item ${status}" style="--index: ${i}">
        <div class="timeline-dot"></div>
        <a href="week.html?w=${w.week}" class="timeline-card">
          <div class="timeline-week-header">
            <span class="timeline-week-num">${w.week}주차</span>
            <span class="timeline-date">${w.date}</span>
          </div>
          <div class="timeline-tools">
            <span class="level-badge l1" style="font-size:0.65rem; padding:1px 6px;">L1</span>
            미션북 ${w.level1.missionBook}
            ${l1ToolNames.map(n => `<span class="timeline-tool-tag">${n}</span>`).join('')}
          </div>
          <div class="timeline-tools" style="margin-top: 4px;">
            <span class="level-badge l2" style="font-size:0.65rem; padding:1px 6px;">L2</span>
            미션북 ${w.level2.missionBook}
            ${l2ToolNames.map(n => `<span class="timeline-tool-tag">${n}</span>`).join('')}
          </div>
          ${w.note ? `<div class="timeline-note">📌 ${w.note}</div>` : ''}
        </a>
      </div>
    `;
  }).join('');
}

// ==================== 교구 도감 페이지 ====================
function renderToolsPage() {
  renderToolsGrid('all');

  // 탭 이벤트
  document.querySelectorAll('.tools-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tools-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderToolsGrid(tab.dataset.level);
    });
  });
}

function renderToolsGrid(level) {
  const container = document.getElementById('tools-grid');
  if (!container) return;

  let tools = [];
  if (level === 'all' || level === '1') {
    tools = tools.concat(GUIDE_DATA.toolsLevel1.map(t => ({ ...t, level: 1 })));
  }
  if (level === 'all' || level === '2') {
    tools = tools.concat(GUIDE_DATA.toolsLevel2.map(t => ({ ...t, level: 2 })));
  }

  container.innerHTML = tools.map((t, i) => {
    // 이 교구가 등장하는 미션북 찾기
    const relatedWeeks = GUIDE_DATA.weeks.filter(w =>
      w.level1.tools.includes(t.id) || w.level2.tools.includes(t.id)
    );
    const relatedMissions = relatedWeeks.map(w =>
      w.level1.tools.includes(t.id) ? w.level1.missionBook : w.level2.missionBook
    );

    const icon = t.level === 1 ? '🔶' : '🔷';
    const imgSection = t.image
      ? `<div class="tool-card-img-wrapper"><img class="tool-card-img" src="${t.image}" alt="${t.name}" loading="lazy"></div>`
      : `<div class="tool-card-icon">${icon}</div>`;

    return `
      <div class="tool-card level${t.level}" style="animation-delay: ${i * 0.05}s" onclick="openToolModal('${t.id}')">
        ${imgSection}
        <div class="tool-card-info">
          <div class="tool-card-name">${t.name}</div>
          <div class="tool-card-desc">${t.description}</div>
          <div class="tool-card-missions">
            📚 미션북: ${relatedMissions.join(', ')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== 교구 모달 ====================
function openToolModal(toolId) {
  const tool = getToolById(toolId);
  if (!tool) return;

  // 관련 미션북 찾기
  const relatedWeeks = GUIDE_DATA.weeks.filter(w =>
    w.level1.tools.includes(toolId) || w.level2.tools.includes(toolId)
  );

  const modal = document.getElementById('tool-modal');
  const content = document.getElementById('tool-modal-content');
  if (!modal || !content) return;

  const relatedMissions = relatedWeeks.map(w => {
    const isL1 = w.level1.tools.includes(toolId);
    return isL1 ? w.level1.missionBook : w.level2.missionBook;
  });

  const modalImgHtml = tool.image
    ? `<div class="modal-tool-img-wrapper"><img class="modal-tool-img" src="${tool.image}" alt="${tool.name}"></div>`
    : '';

  content.innerHTML = `
    <button class="modal-close" onclick="closeToolModal()">✕</button>
    ${modalImgHtml}
    <div class="modal-title">${tool.name}</div>
    <div class="modal-desc">${tool.description}</div>
    <div class="modal-missions-title">📚 등장하는 미션북</div>
    <div class="modal-missions-list">
      ${relatedMissions.map(m => `
        <span class="modal-mission-tag">미션북 ${m}</span>
      `).join('')}
    </div>
    <div style="margin-top: var(--space-lg);">
      <div class="modal-missions-title">📅 등장하는 주차</div>
      <div class="modal-missions-list">
        ${relatedWeeks.map(w => `
          <a href="week.html?w=${w.week}" class="modal-mission-tag" style="text-decoration:none; cursor:pointer;">${w.week}주차</a>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeToolModal() {
  const modal = document.getElementById('tool-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeToolModal();
  }
});

// ESC키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeToolModal();
});
