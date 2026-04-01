// 몬테소리 매쓰 30주 가이드 데이터
const GUIDE_DATA = {
  startDate: "2026-02-24", // 1주차 시작일 (화요일)
  title: "몬테소리 매쓰 30주 가이드",
  subtitle: "우리집이 성장하는 30주 캘린더",

  // 레벨1 교구 목록 (10개)
  toolsLevel1: [
    { id: "l1-puzzle", name: "꼭지퍼즐", description: "꼭지를 잡고 퍼즐 조각을 맞추며 도형의 형태와 크기를 인식하는 교구입니다.", image: "images/tools/꼭지퍼즐.JPG" },
    { id: "l1-similar", name: "닮은꼴 블록", description: "닮은 모양의 블록을 짝지어 비교하며 관찰력과 변별력을 키우는 교구입니다.", image: "images/tools/닮은꼴블록.JPG" },
    { id: "l1-shape", name: "도형블록", description: "다양한 도형 블록으로 모양을 탐색하고, 구성 놀이를 통해 공간 감각를 발달시키는 교구입니다.", image: "images/tools/도형블록.JPG" },
    { id: "l1-measure", name: "측정블록", description: "블록의 길이와 크기를 비교하며 측정의 기초 개념을 익히는 교구입니다.", image: "images/tools/측정블록.JPG" },
    { id: "l1-tower", name: "타워블록", description: "블록을 쌓아 올리며 크기의 순서와 균형 감각을 경험하는 교구입니다.", image: "images/tools/타워블록.JPG" },
    { id: "l1-panoramix", name: "파노라믹스", description: "다양한 패턴을 구성하며 논리적 사고력과 창의력을 키우는 교구입니다.", image: "images/tools/파노라믹스.JPG" },
    { id: "l1-tactilo", name: "택틸로", description: "촉감으로 도형을 탐색하며 감각적 수학 경험을 제공하는 교구입니다.", image: "images/tools/택틸로.JPG" },
    { id: "l1-dice", name: "연산 주사위", description: "주사위를 굴려 다양한 연산 활동을 놀이처럼 즐기는 교구입니다.", image: "images/tools/연산주사위.JPG" },
    { id: "l1-pink", name: "핑크타워", description: "크기가 다른 분홍색 큐브를 순서대로 쌓으며 크기 개념을 체험하는 교구입니다.", image: "images/tools/핑크타워.JPG" },
    { id: "l1-beads", name: "색구슬 계단", description: "1~9까지 각 수량을 색깔 구슬로 표현하여 수량을 시각적으로 인지하는 교구입니다.", image: "" },
  ],

  // 레벨2 교구 목록 (9개)
  toolsLevel2: [
    { id: "l2-bus", name: "수학버스", description: "수학버스에 승객을 태우고 내리며 수의 합성과 분해를 배우는 교구입니다.", image: "images/tools/수학버스.JPG" },
    { id: "l2-memory", name: "메모리 박스", description: "카드를 짝지어 맞추며 수 개념과 기억력을 동시에 발달시키는 교구입니다.", image: "images/tools/메모리박스.JPG" },
    { id: "l2-stick", name: "막대퍼즐", description: "막대를 조합하여 다양한 모양과 수식을 구성하는 교구입니다.", image: "images/tools/막대퍼즐.JPG" },
    { id: "l2-ring", name: "링블록", description: "링을 끼우고 빼며 수량을 조작하고 연산을 시각적으로 이해하는 교구입니다.", image: "images/tools/링블록.JPG" },
    { id: "l2-scale", name: "양팔저울", description: "양팔저울로 무게를 비교하며 등호와 부등호의 개념을 체험하는 교구입니다.", image: "images/tools/양팔저울.jpg" },
    { id: "l2-turning", name: "해피터닝", description: "회전판을 돌려 수와 연산을 게임처럼 즐기는 교구입니다.", image: "images/tools/해피터닝.JPG" },
    { id: "l2-domino", name: "색도미노", description: "색깔 도미노를 연결하며 수의 패턴과 규칙을 발견하는 교구입니다.", image: "images/tools/색도미노.JPG" },
    { id: "l2-clock", name: "시계", description: "시계 교구로 시간 읽기와 시간의 흐름을 자연스럽게 배우는 교구입니다.", image: "images/tools/시계.JPG" },
    { id: "l2-stamp", name: "숫자도장", description: "숫자 도장을 찍으며 수 쓰기와 수 인지를 놀이로 익히는 교구입니다.", image: "images/tools/숫자도장.JPG" },
  ],

  // 30주차 커리큘럼 (실제 데이터)
  weeks: [
    {
      week: 1, date: "1/6",
      level1: { missionBook: 1, tools: ["l1-puzzle", "l1-similar"] },
      level2: { missionBook: 31, tools: ["l2-bus"] }
    },
    {
      week: 2, date: "1/13",
      level1: { missionBook: 2, tools: ["l1-similar", "l1-shape"] },
      level2: { missionBook: 32, tools: ["l2-bus"] }
    },
    {
      week: 3, date: "1/20",
      level1: { missionBook: 3, tools: ["l1-puzzle", "l1-measure", "l1-similar", "l1-shape"] },
      level2: { missionBook: 33, tools: ["l2-bus", "l1-dice"] }
    },
    {
      week: 4, date: "1/27",
      level1: { missionBook: 4, tools: ["l1-puzzle", "l1-shape", "l1-measure"] },
      level2: { missionBook: 34, tools: ["l2-memory"] }
    },
    {
      week: 5, date: "2/3",
      level1: { missionBook: 5, tools: ["l1-shape", "l1-puzzle", "l1-measure", "l1-similar", "l1-tower"] },
      level2: { missionBook: 35, tools: ["l2-bus"] }
    },
    {
      week: 6, date: "2/10",
      level1: { missionBook: 6, tools: ["l1-measure", "l1-dice"] },
      level2: { missionBook: 36, tools: ["l2-stick"] }
    },
    {
      week: 7, date: "2/24",
      level1: { missionBook: 7, tools: ["l1-shape", "l1-panoramix"] },
      level2: { missionBook: 37, tools: ["l2-ring", "l2-bus", "l2-turning", "l1-dice"] },
      note: "설 연휴(2/17) 후 재개"
    },
    {
      week: 8, date: "3/3",
      level1: { missionBook: 8, tools: ["l1-similar", "l1-shape"] },
      level2: { missionBook: 38, tools: ["l2-scale", "l2-ring"] }
    },
    {
      week: 9, date: "3/10",
      level1: { missionBook: 9, tools: ["l1-puzzle", "l1-measure", "l1-tactilo"] },
      level2: { missionBook: 39, tools: ["l2-ring", "l2-bus", "l1-dice"] }
    },
    {
      week: 10, date: "3/17",
      level1: { missionBook: 10, tools: ["l1-tactilo"] },
      level2: { missionBook: 40, tools: ["l2-domino"] }
    },
    {
      week: 11, date: "3/24",
      level1: { missionBook: 11, tools: ["l1-tower", "l1-tactilo"] },
      level2: { missionBook: 41, tools: ["l2-bus"] }
    },
    {
      week: 12, date: "3/31",
      level1: { missionBook: 12, tools: ["l1-panoramix", "l1-puzzle", "l1-measure"] },
      level2: { missionBook: 42, tools: ["l2-clock"] }
    },
    {
      week: 13, date: "4/7",
      level1: { missionBook: 13, tools: ["l1-shape", "l1-puzzle", "l1-measure", "l2-ring"] },
      level2: { missionBook: 43, tools: ["l2-bus"] }
    },
    {
      week: 14, date: "4/14",
      level1: { missionBook: 14, tools: ["l1-tactilo", "l1-measure", "l1-dice"] },
      level2: { missionBook: 44, tools: ["l2-domino"] }
    },
    {
      week: 15, date: "4/21",
      level1: { missionBook: 15, tools: ["l1-measure"] },
      level2: { missionBook: 45, tools: ["l2-ring", "l2-bus", "l1-dice"] }
    },
    {
      week: 16, date: "4/28",
      level1: { missionBook: 16, tools: ["l1-panoramix"] },
      level2: { missionBook: 46, tools: ["l2-stick", "l1-dice"] }
    },
    {
      week: 17, date: "5/5",
      level1: { missionBook: 17, tools: ["l1-tower", "l1-puzzle", "l1-similar"] },
      level2: { missionBook: 47, tools: ["l2-ring", "l2-bus"] }
    },
    {
      week: 18, date: "5/12",
      level1: { missionBook: 18, tools: ["l1-measure"] },
      level2: { missionBook: 48, tools: ["l2-domino"] }
    },
    {
      week: 19, date: "5/19",
      level1: { missionBook: 19, tools: ["l1-measure"] },
      level2: { missionBook: 49, tools: ["l2-ring", "l2-stamp", "l1-dice", "l2-bus", "l2-turning"] }
    },
    {
      week: 20, date: "5/26",
      level1: { missionBook: 20, tools: ["l1-measure"] },
      level2: { missionBook: 50, tools: ["l2-clock"] }
    },
    {
      week: 21, date: "6/2",
      level1: { missionBook: 21, tools: ["l1-puzzle", "l1-measure"] },
      level2: { missionBook: 51, tools: ["l2-ring", "l2-turning", "l2-stamp", "l2-bus"] }
    },
    {
      week: 22, date: "6/9",
      level1: { missionBook: 22, tools: ["l1-puzzle", "l1-measure"] },
      level2: { missionBook: 52, tools: ["l2-ring", "l2-bus", "l2-stamp"] }
    },
    {
      week: 23, date: "6/16",
      level1: { missionBook: 23, tools: ["l1-measure", "l1-tactilo"] },
      level2: { missionBook: 53, tools: ["l2-clock"] }
    },
    {
      week: 24, date: "6/23",
      level1: { missionBook: 24, tools: ["l1-tower"] },
      level2: { missionBook: 54, tools: ["l2-ring", "l2-stamp"] }
    },
    {
      week: 25, date: "6/30",
      level1: { missionBook: 25, tools: ["l1-tactilo"] },
      level2: { missionBook: 55, tools: ["l2-ring", "l2-bus", "l2-stamp"] }
    },
    {
      week: 26, date: "7/7",
      level1: { missionBook: 26, tools: ["l1-pink"] },
      level2: { missionBook: 56, tools: ["l2-clock"] }
    },
    {
      week: 27, date: "7/14",
      level1: { missionBook: 27, tools: ["l1-pink"] },
      level2: { missionBook: 57, tools: ["l2-ring", "l2-bus", "l2-stamp", "l1-dice", "l2-turning"] }
    },
    {
      week: 28, date: "7/21",
      level1: { missionBook: 28, tools: ["l1-measure", "l1-dice"] },
      level2: { missionBook: 58, tools: ["l2-ring", "l2-stamp"] }
    },
    {
      week: 29, date: "7/28",
      level1: { missionBook: 29, tools: ["l1-measure", "l1-dice"] },
      level2: { missionBook: 59, tools: ["l2-ring", "l2-stamp"] }
    },
    {
      week: 30, date: "8/4",
      level1: { missionBook: 30, tools: ["l1-measure", "l1-dice"] },
      level2: { missionBook: 60, tools: ["l2-ring", "l2-stamp"] }
    },
  ],

  // FAQ
  faq: [
    {
      q: "아직 아이가 어려서 계산은 힘들어요.",
      a: "괜찮아요! 숫자가 어려운 아이라면 책을 보고 따라해주세요! 그리고 엄마가 \"이게 다섯 개야\" 라고 말해주세요."
    },
    {
      q: "레벨 1 혹은 레벨 2만 있어요.",
      a: "괜찮아요! 해당 주차에 준비된 교구만 꺼내주세요. 해당 교구에 집중해서 놀아주세요."
    },
    {
      q: "미션북이 없어요.",
      a: "괜찮아요! 미션북으로 놀이 하지 않아도, 해당 교구로 놀이하는 사진을 업로드 해주세요!"
    }
  ],

  // 가이드 룰
  guideRules: {
    daily: "하루 10분이면 충분해요.",
    environment: "미션북 + 해당 교구만 놓이는 환경을 만들어주세요.",
    routine: "한 주에 책 1권 + 교구 2~3개에 집중하세요. 몬테소리는 '반복'이 핵심이에요.",
    certification: "매주 인증: 단톡방에 놀이 사진을 올려주세요."
  },

  // 카페 링크
  cafeUrl: "https://cafe.naver.com/f-e/cafes/31207252/menus/6?viewType=W"
};

// ==================== 유틸리티 함수 ====================

// 교구 ID로 교구 정보 가져오기
function getToolById(toolId) {
  const allTools = [...GUIDE_DATA.toolsLevel1, ...GUIDE_DATA.toolsLevel2];
  return allTools.find(t => t.id === toolId);
}

// 현재 주차 계산 (실제 날짜 기반)
function getCurrentWeek() {
  const now = new Date();
  const year = now.getFullYear();

  // 각 주차의 실제 날짜로 계산
  for (let i = GUIDE_DATA.weeks.length - 1; i >= 0; i--) {
    const w = GUIDE_DATA.weeks[i];
    const [month, day] = w.date.split("/").map(Number);
    const weekDate = new Date(year, month - 1, day);
    if (now >= weekDate) {
      return w.week;
    }
  }
  return 1;
}

// 주차가 시작되었는지 확인
function isWeekStarted(weekNum) {
  const weekData = GUIDE_DATA.weeks.find(w => w.week === weekNum);
  if (!weekData) return false;
  const now = new Date();
  const year = now.getFullYear();
  const [month, day] = weekData.date.split("/").map(Number);
  const weekDate = new Date(year, month - 1, day);
  return now >= weekDate;
}

// 다음 화요일까지 남은 시간
function getTimeUntilNextTuesday() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilTuesday = (2 - dayOfWeek + 7) % 7 || 7;
  const nextTuesday = new Date(now);
  nextTuesday.setDate(now.getDate() + daysUntilTuesday);
  nextTuesday.setHours(0, 0, 0, 0);
  const diff = nextTuesday - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

// 주차의 시작 날짜 가져오기
function getWeekStartDate(weekNum) {
  const weekData = GUIDE_DATA.weeks.find(w => w.week === weekNum);
  if (!weekData) return null;
  const year = new Date().getFullYear();
  const [month, day] = weekData.date.split("/").map(Number);
  return new Date(year, month - 1, day);
}

// 날짜 포맷
function formatDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
}

// 주차 데이터의 교구 ID 목록에서 교구 이름 목록 반환
function getToolNames(toolIds) {
  return toolIds.map(id => {
    const tool = getToolById(id);
    return tool ? tool.name : id;
  });
}
