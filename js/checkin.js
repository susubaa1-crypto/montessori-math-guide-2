// 몬테소리 매쓰 - 미션 완료 체크 시스템
// localStorage 기반 개인 추적

const STORAGE_KEY = 'montessori_math_checkin_s2';

// ==================== 참가자 관리 ====================

function getSelectedUser() {
  const data = getCheckinData();
  return data.userName || '';
}

function setSelectedUser(name) {
  const data = getCheckinData();
  data.userName = name;
  saveCheckinData(data);
}

// ==================== 체크인 데이터 ====================

function getCheckinData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { userName: '', completedWeeks: {} };
  } catch {
    return { userName: '', completedWeeks: {} };
  }
}

function saveCheckinData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 체크 토글 (type: 'setup' 또는 'play')
function toggleWeekCheck(weekNum, type) {
  const data = getCheckinData();
  if (!data.userName) return false;

  if (!data.completedWeeks[weekNum]) {
    data.completedWeeks[weekNum] = {};
  }

  const isChecked = !data.completedWeeks[weekNum][type];
  data.completedWeeks[weekNum][type] = isChecked;

  if (isChecked) {
    data.completedWeeks[weekNum][type + 'Date'] = new Date().toISOString().split('T')[0];
  }

  saveCheckinData(data);
  return isChecked;
}

// 특정 체크 여부
function isChecked(weekNum, type) {
  const data = getCheckinData();
  return !!(data.completedWeeks[weekNum] && data.completedWeeks[weekNum][type]);
}

// 주차 완료 여부 (setup + play 둘 다 체크해야 완료)
function isWeekFullyCompleted(weekNum) {
  return isChecked(weekNum, 'setup') && isChecked(weekNum, 'play');
}

// ==================== 통계 ====================

function getTotalCompletedCount() {
  const data = getCheckinData();
  let count = 0;
  for (const weekNum of Object.keys(data.completedWeeks)) {
    const w = data.completedWeeks[weekNum];
    if (w.setup && w.play) count++;
  }
  return count;
}

// ==================== UI 렌더링 ====================

// 참가자 선택 바
function renderUserSelector() {
  const container = document.getElementById('user-selector');
  if (!container) return;

  const currentUser = getSelectedUser();
  const participants = GUIDE_DATA.participants || [];

  container.innerHTML = `
    <div class="user-selector-inner">
      <div class="user-selector-label">
        <span class="user-selector-icon">👤</span>
        <span>참가자</span>
      </div>
      <div class="user-selector-dropdown-wrapper">
        <select class="user-selector-dropdown" id="user-dropdown" onchange="handleUserSelect(this.value)">
          <option value="">이름을 선택하세요</option>
          ${participants.map(name => `
            <option value="${name}" ${name === currentUser ? 'selected' : ''}>${name}</option>
          `).join('')}
        </select>
      </div>
      ${currentUser ? `
        <div class="user-selector-welcome">
          ✅ <strong>${currentUser}</strong>님
        </div>
      ` : ''}
    </div>
  `;
}

function handleUserSelect(name) {
  setSelectedUser(name);
  window.location.reload();
}

// 모든 체크 버튼 상태 업데이트
function updateAllCheckButtons() {
  document.querySelectorAll('.mission-check-btn').forEach(btn => {
    const week = parseInt(btn.dataset.week);
    const type = btn.dataset.type;
    const checked = isChecked(week, type);
    btn.classList.toggle('checked', checked);
    if (type === 'setup') {
      btn.innerHTML = checked ? '✅ 교구 세팅 완료!' : '🧩 교구 세팅 완료했어요';
    } else {
      btn.innerHTML = checked ? '✅ 놀이 완료!' : '🎯 놀이했어요';
    }
  });
  // 완료 배지 업데이트
  document.querySelectorAll('.week-complete-badge').forEach(badge => {
    const week = parseInt(badge.dataset.week);
    badge.style.display = isWeekFullyCompleted(week) ? 'flex' : 'none';
  });
}

// 나의 진행 현황
function renderMyProgress() {
  const container = document.getElementById('my-progress');
  if (!container) return;

  const currentUser = getSelectedUser();
  if (!currentUser) {
    container.innerHTML = `
      <div class="progress-empty">
        <p>👆 위에서 이름을 선택하면 나의 진행 현황을 볼 수 있어요</p>
      </div>
    `;
    return;
  }

  const total = getTotalCompletedCount();
  const currentWeek = getCurrentWeek();
  const percent = Math.round((total / 30) * 100);

  const weekGrid = GUIDE_DATA.weeks.map(w => {
    const setup = isChecked(w.week, 'setup');
    const play = isChecked(w.week, 'play');
    const done = setup && play;
    const partial = (setup || play) && !done;
    const isCurrent = w.week === currentWeek;
    const isFuture = w.week > currentWeek;

    let cls = 'week-dot';
    if (done) cls += ' done';
    else if (partial) cls += ' partial';
    else if (isCurrent) cls += ' current';
    else if (isFuture) cls += ' future';

    return `<div class="${cls}" title="${w.week}주차${done ? ' ✅' : partial ? ' (진행중)' : ''}">${w.week}</div>`;
  }).join('');

  container.innerHTML = `
    <div class="my-progress-card">
      <div class="my-progress-header">
        <div class="my-progress-title">📊 나의 30주 여정</div>
        <div class="my-progress-count">${total}/30 완료</div>
      </div>
      <div class="my-progress-bar-wrapper">
        <div class="my-progress-bar" style="width: ${percent}%"></div>
      </div>
      <div class="week-grid">
        ${weekGrid}
      </div>
    </div>
  `;
}

// 미션 체크 버튼 HTML 생성 (레벨 구분 없이 setup/play 2개)
function renderCheckButtons(weekNum) {
  const currentUser = getSelectedUser();
  if (!currentUser) return '';

  const setupChecked = isChecked(weekNum, 'setup');
  const playChecked = isChecked(weekNum, 'play');
  const fullyDone = setupChecked && playChecked;

  const setupCls = setupChecked ? 'mission-check-btn checked' : 'mission-check-btn';
  const playCls = playChecked ? 'mission-check-btn checked' : 'mission-check-btn';

  return `
    <div class="mission-check-area">
      <button class="${setupCls}" data-week="${weekNum}" data-type="setup"
              onclick="handleMissionCheck(${weekNum}, 'setup')">
        ${setupChecked ? '✅ 교구 세팅 완료!' : '🧩 교구 세팅 완료했어요'}
      </button>
      <div class="check-hint">화·수요일에 교구를 세팅해 주세요</div>

      <button class="${playCls}" data-week="${weekNum}" data-type="play"
              onclick="handleMissionCheck(${weekNum}, 'play')">
        ${playChecked ? '✅ 놀이 완료!' : '🎯 놀이했어요'}
      </button>
      <div class="check-hint">목~월요일에 교구로 놀이해 주세요</div>

      <div class="week-complete-badge" data-week="${weekNum}" style="display: ${fullyDone ? 'flex' : 'none'}">
        🎉 이번 주 미션 완료!
      </div>
    </div>
  `;
}

// 미션 체크 핸들러
function handleMissionCheck(weekNum, type) {
  if (!getSelectedUser()) {
    alert('먼저 위에서 이름을 선택해 주세요!');
    return;
  }

  const isNowChecked = toggleWeekCheck(weekNum, type);

  // 버튼 업데이트
  const btn = document.querySelector(`.mission-check-btn[data-week="${weekNum}"][data-type="${type}"]`);
  if (btn) {
    btn.classList.toggle('checked', isNowChecked);
    if (type === 'setup') {
      btn.innerHTML = isNowChecked ? '✅ 교구 세팅 완료!' : '🧩 교구 세팅 완료했어요';
    } else {
      btn.innerHTML = isNowChecked ? '✅ 놀이 완료!' : '🎯 놀이했어요';
    }
    if (isNowChecked) {
      btn.classList.add('just-checked');
      setTimeout(() => btn.classList.remove('just-checked'), 600);
    }
  }

  // 완료 배지 업데이트
  const badge = document.querySelector(`.week-complete-badge[data-week="${weekNum}"]`);
  if (badge) {
    const fullyDone = isWeekFullyCompleted(weekNum);
    badge.style.display = fullyDone ? 'flex' : 'none';
    if (fullyDone) {
      badge.classList.add('just-checked');
      setTimeout(() => badge.classList.remove('just-checked'), 600);
    }
  }

  renderMyProgress();
}
