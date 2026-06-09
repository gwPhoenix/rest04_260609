// ============================================================
// 사이트 전역 데이터 — AILearn 온라인 AI 교육 플랫폼
// YouTube 영상 ID는 youtubeId 필드를 실제 값으로 교체하세요.
// ⚠️  YouTube 영상은 '공개' 또는 '링크 공개(비공개 링크)' 상태여야 임베드 가능합니다.
//     '비공개' 영상은 임베드가 불가능합니다.
// ============================================================

export const company = {
  name: 'AILearn',
  nameKo: '에이아이런',
  fullName: 'AILearn Education Inc.',
  tagline: 'AI를 배우고, 미래를 만들다',
  description: [
    'AILearn은 누구나 인공지능을 쉽고 깊이 이해할 수 있도록 돕는 온라인 교육 플랫폼입니다.',
    'AI 기초부터 실전 딥러닝, AI 리터러시까지 — 전문가가 엄선한 강의를 영상으로 만나보세요.',
  ],
  email: 'info@ailearn.kr',
  phone: '02-1234-5678',
  address: '서울특별시 강남구 테헤란로 123, AILearn 빌딩 5층',
  copyright: '© 2026 AILearn Education Inc. All rights reserved.',
  socialLinks: [
    { name: 'YouTube', url: 'https://youtube.com/@ailearn' },
    { name: 'Instagram', url: '#' },
    { name: 'LinkedIn', url: '#' },
  ],
  footerLinks: [
    { label: '이용약관', to: '/terms' },
    { label: '개인정보처리방침', to: '/privacy', strong: true },
  ],
}

// 강의 주제 — 6가지
export const videoTopics = [
  {
    key: 'ai-basics',
    label: 'AI 기초',
    labelEn: 'AI Basics',
    icon: '🤖',
    desc: '인공지능의 개념·역사·활용 분야를 누구나 쉽게 이해할 수 있는 입문 강의.',
    count: 8,
  },
  {
    key: 'ai-literacy',
    label: 'AI 리터러시',
    labelEn: 'AI Literacy',
    icon: '📖',
    desc: 'AI를 올바르게 이해하고 활용하는 능력 — 윤리·정보 판별·도구 활용.',
    count: 8,
  },
  {
    key: 'machine-learning',
    label: '머신러닝',
    labelEn: 'Machine Learning',
    icon: '⚙️',
    desc: '데이터로 학습하는 머신러닝의 원리와 주요 알고리즘을 이론과 코드로 탐구.',
    count: 8,
  },
  {
    key: 'deep-learning',
    label: '딥러닝',
    labelEn: 'Deep Learning',
    icon: '🧠',
    desc: '신경망 구조와 최신 딥러닝 기술을 심층적으로 학습하는 고급 강의 시리즈.',
    count: 8,
  },
  {
    key: 'tutorials',
    label: '실습 튜토리얼',
    labelEn: 'Tutorials',
    icon: '💻',
    desc: 'Python·PyTorch·Hugging Face 등 AI 도구를 직접 활용하는 실습 강의.',
    count: 8,
  },
  {
    key: 'trends',
    label: 'AI 트렌드',
    labelEn: 'AI Trends',
    icon: '🔮',
    desc: '최신 AI 기술 동향·산업 적용 사례·미래 전망을 분석하는 인사이트 강의.',
    count: 8,
  },
]

// 상단 GNB
export const nav = [
  { label: '홈', to: '/' },
  {
    label: '강의 영상',
    to: '/videos/ai-basics',
    children: videoTopics.map(t => ({ label: t.label, to: `/videos/${t.key}` })),
  },
  { label: '커리큘럼', to: '/curriculum' },
  { label: '회사 소개', to: '/about' },
  { label: '문의하기', to: '/contact' },
]

// ── 영상 데이터 ─────────────────────────────────────────────
// youtubeId: 실제 YouTube 영상 ID(11자리)로 교체하세요.
//            null 이면 플레이스홀더 썸네일이 표시됩니다.
const v = (youtubeId, title, desc, duration, date, level) =>
  ({ youtubeId, title, desc, duration, date, level })

export const videosByTopic = {
  'ai-basics': [
    v(null, 'AI란 무엇인가? — 인공지능의 역사와 개요', '인공지능의 정의부터 역사, 현재 활용 분야까지 전반적인 개요를 다룹니다.', '14:22', '2026.05.01', '입문'),
    v(null, 'AI의 4가지 유형과 발전 단계', '반응형·제한 기억·이론 마음·자의식 AI — 각 단계를 명확히 이해합니다.', '11:45', '2026.05.05', '입문'),
    v(null, 'AI는 어떻게 학습하는가?', '지도학습·비지도학습·강화학습의 차이와 원리를 직관적으로 설명합니다.', '18:10', '2026.05.10', '입문'),
    v(null, '일상 속 AI — 추천 알고리즘부터 자율주행까지', '우리가 매일 접하는 AI 기술들을 실제 사례로 분석합니다.', '15:30', '2026.05.15', '입문'),
    v(null, 'ChatGPT 완전 해부 — 대형 언어 모델의 작동 원리', 'GPT 계열 언어 모델이 어떻게 텍스트를 생성하는지 원리를 파헤칩니다.', '22:05', '2026.05.20', '초급'),
    v(null, '생성 AI란 무엇인가? — 이미지·텍스트·음악 생성', 'DALL-E, Stable Diffusion, Sora 등 생성 AI 기술의 원리와 활용을 살펴봅니다.', '19:48', '2026.05.25', '초급'),
    v(null, 'AI의 한계와 위험 — 우리가 알아야 할 것들', 'AI 편향·할루시네이션·개인정보 침해 등 AI의 실제 한계를 냉정히 분석합니다.', '16:33', '2026.05.28', '초급'),
    v(null, 'AI 시대의 직업 변화 — 없어질 직업 vs 새로 생길 직업', 'AI 자동화가 가져올 노동 시장의 변화와 우리가 준비해야 할 것들을 이야기합니다.', '20:17', '2026.06.01', '입문'),
  ],
  'ai-literacy': [
    v(null, 'AI 리터러시란? — 왜 지금 배워야 하는가', 'AI 시대를 살아가는 모든 사람에게 필요한 AI 이해 능력의 개념과 중요성을 설명합니다.', '12:15', '2026.05.02', '입문'),
    v(null, 'AI 윤리 기초 — 편향, 공정성, 책임', 'AI 시스템에서 발생하는 윤리적 문제들을 실제 사례로 이해합니다.', '17:40', '2026.05.07', '입문'),
    v(null, 'AI 정보 리터러시 — 딥페이크와 AI 생성 콘텐츠 식별법', '가짜 이미지·영상·텍스트를 구별하는 실용적인 방법을 배웁니다.', '14:55', '2026.05.12', '입문'),
    v(null, '프롬프트 엔지니어링 입문 — AI를 더 잘 활용하는 방법', 'ChatGPT, Claude 등 AI 도구에서 더 좋은 결과를 얻는 프롬프트 작성법을 학습합니다.', '21:30', '2026.05.16', '초급'),
    v(null, 'AI 도구 비교 — ChatGPT, Claude, Gemini 활용법', '주요 AI 어시스턴트의 특징과 장단점을 비교하고 용도에 맞게 활용하는 방법을 안내합니다.', '18:22', '2026.05.21', '초급'),
    v(null, '개인정보와 AI — 내 데이터는 어떻게 사용되는가', 'AI 서비스가 개인 데이터를 수집·활용하는 방식과 사용자로서의 권리를 알아봅니다.', '15:08', '2026.05.26', '입문'),
    v(null, 'AI와 저작권 — 창작물의 법적 쟁점 이해', 'AI 생성 콘텐츠의 저작권 문제와 최신 법적 동향을 쉽게 설명합니다.', '13:44', '2026.05.30', '초급'),
    v(null, '학생과 교사를 위한 AI 활용 가이드', '교육 현장에서 AI를 효과적이고 윤리적으로 활용하는 구체적인 방법을 제시합니다.', '25:10', '2026.06.03', '입문'),
  ],
  'machine-learning': [
    v(null, '머신러닝의 핵심 개념 — 데이터, 특징, 모델', '머신러닝을 이해하기 위한 기본 용어와 개념을 체계적으로 정리합니다.', '16:20', '2026.05.03', '초급'),
    v(null, '선형 회귀 완전 정복 — 수식에서 파이썬 코드까지', '가장 기본적인 ML 알고리즘을 수학적 직관과 코드로 완전히 이해합니다.', '28:45', '2026.05.08', '초급'),
    v(null, '분류 알고리즘 비교 — 로지스틱 회귀·SVM·결정 트리', '주요 분류 알고리즘의 원리와 장단점을 비교하며 언제 무엇을 쓸지 배웁니다.', '32:12', '2026.05.13', '중급'),
    v(null, '과적합과 정규화 — 모델이 실패하는 이유', '과적합 현상과 L1/L2 정규화, 드롭아웃으로 이를 해결하는 방법을 다룹니다.', '24:37', '2026.05.18', '중급'),
    v(null, '앙상블 학습 — 랜덤 포레스트와 그래디언트 부스팅', '여러 모델을 결합해 성능을 높이는 앙상블 기법의 원리와 구현을 배웁니다.', '29:18', '2026.05.23', '중급'),
    v(null, '비지도 학습 — K-평균 클러스터링과 PCA', '레이블 없는 데이터에서 패턴을 찾는 비지도 학습의 주요 알고리즘을 다룹니다.', '26:50', '2026.05.27', '중급'),
    v(null, '모델 평가 — 정확도, F1 스코어, ROC 곡선', 'ML 모델의 성능을 올바르게 평가하는 다양한 지표와 그 해석법을 배웁니다.', '22:15', '2026.06.01', '중급'),
    v(null, '실전 ML 파이프라인 — 전처리부터 배포까지', '실제 프로젝트에서 ML 모델을 개발하고 서비스에 배포하는 전 과정을 다룹니다.', '45:30', '2026.06.05', '중급'),
  ],
  'deep-learning': [
    v(null, '신경망의 구조 — 퍼셉트론에서 딥러닝까지', '단순한 퍼셉트론에서 출발해 현대 딥러닝 신경망의 구조를 직관적으로 이해합니다.', '18:40', '2026.05.04', '중급'),
    v(null, '역전파 알고리즘 — 수학적 직관으로 이해하기', '딥러닝 학습의 핵심인 역전파 알고리즘을 직관적으로 설명합니다.', '23:55', '2026.05.09', '중급'),
    v(null, 'CNN 완전 이해 — 이미지 인식의 원리', '합성곱 신경망의 구조와 이미지 처리 원리를 시각적으로 이해합니다.', '31:20', '2026.05.14', '중급'),
    v(null, 'RNN과 LSTM — 시계열 데이터와 자연어 처리', '순환 신경망의 원리와 장기 의존성 문제를 해결한 LSTM을 깊이 있게 학습합니다.', '34:08', '2026.05.19', '고급'),
    v(null, '트랜스포머 아키텍처 — GPT와 BERT의 토대', '현대 LLM의 기반이 되는 트랜스포머 구조와 셀프 어텐션 메커니즘을 분석합니다.', '40:15', '2026.05.24', '고급'),
    v(null, 'GAN으로 이미지 생성하기 — 원리와 실전 구현', '생성적 적대 신경망의 원리를 이해하고 PyTorch로 직접 구현해봅니다.', '38:42', '2026.05.29', '고급'),
    v(null, '전이 학습 — 사전 학습 모델 파인튜닝 실전', 'ImageNet 사전 학습 모델을 내 데이터셋에 맞게 파인튜닝하는 방법을 배웁니다.', '29:30', '2026.06.02', '고급'),
    v(null, '멀티모달 AI — 텍스트·이미지·음성의 결합', 'GPT-4o, Gemini 등 멀티모달 모델의 구조와 활용 가능성을 탐구합니다.', '27:45', '2026.06.06', '고급'),
  ],
  'tutorials': [
    v(null, 'AI 개발 환경 세팅 — Anaconda + VS Code + Jupyter', 'AI 개발을 위한 Python 환경을 처음부터 단계별로 설정합니다.', '20:10', '2026.05.05', '입문'),
    v(null, 'NumPy와 Pandas — 데이터 분석의 기초', 'Python 데이터 분석의 필수 라이브러리를 실습 위주로 마스터합니다.', '35:25', '2026.05.10', '초급'),
    v(null, 'Scikit-learn으로 첫 머신러닝 모델 만들기', '붓꽃 데이터셋으로 분류 모델을 처음부터 만들어보는 입문 실습입니다.', '28:38', '2026.05.15', '초급'),
    v(null, 'PyTorch 입문 — 텐서와 자동 미분 이해하기', 'PyTorch의 핵심 개념인 텐서 연산과 autograd를 실습으로 이해합니다.', '33:12', '2026.05.20', '중급'),
    v(null, 'Hugging Face 트랜스포머 실습 — NLP 파이프라인', 'Hugging Face의 pretrained 모델로 감성 분석, 번역 등을 5분 안에 구현합니다.', '26:45', '2026.05.25', '중급'),
    v(null, 'LangChain으로 AI 앱 만들기 — RAG 챗봇 구현', '검색 증강 생성(RAG) 패턴으로 내 문서 기반으로 답변하는 챗봇을 만듭니다.', '42:20', '2026.05.30', '중급'),
    v(null, 'Streamlit으로 AI 웹앱 배포하기', 'ML 모델을 Streamlit으로 웹 앱으로 만들고 Hugging Face Spaces에 배포합니다.', '31:55', '2026.06.03', '중급'),
    v(null, 'OpenAI API 실전 — 챗봇 + 이미지 생성 앱', 'OpenAI GPT-4o와 DALL-E API를 활용한 복합 AI 앱을 처음부터 만들어봅니다.', '38:40', '2026.06.07', '중급'),
  ],
  'trends': [
    v(null, '2026 AI 트렌드 총정리 — GPT-5, Claude 4, Gemini 2', '2026년 주요 AI 모델의 최신 동향과 기술적 발전을 한눈에 정리합니다.', '22:30', '2026.05.06', '입문'),
    v(null, 'AGI를 향한 레이스 — 누가 먼저 도달할 것인가', '범용 인공지능을 향한 주요 AI 연구소들의 경쟁과 최근 성과를 분석합니다.', '25:15', '2026.05.11', '초급'),
    v(null, 'AI 에이전트 — 자율적으로 작업하는 AI의 현재와 미래', 'AutoGPT, Devin, Claude Computer Use 등 AI 에이전트 기술의 최전선을 소개합니다.', '28:45', '2026.05.16', '초급'),
    v(null, '멀티모달 AI의 현재와 미래 — 텍스트를 넘어서', '텍스트·이미지·음성·비디오를 함께 이해하는 멀티모달 AI의 가능성을 탐구합니다.', '20:33', '2026.05.21', '초급'),
    v(null, '엣지 AI — 스마트폰과 IoT에서 실행되는 AI', '클라우드 없이 기기에서 직접 실행되는 엣지 AI의 기술과 활용 사례를 분석합니다.', '18:20', '2026.05.26', '초급'),
    v(null, 'AI와 의료 혁명 — 신약 개발부터 진단 보조까지', 'AlphaFold, 의료 영상 분석 등 AI가 의료 분야에 가져오는 실질적 변화를 살펴봅니다.', '24:55', '2026.05.31', '입문'),
    v(null, 'AI 규제 동향 — EU AI Act와 글로벌 규범의 형성', '유럽 AI 법안과 각국의 AI 규제 움직임이 산업에 미치는 영향을 분석합니다.', '19:44', '2026.06.04', '초급'),
    v(null, '오픈소스 AI의 부상 — Llama, Mistral, Qwen 비교', '공개 AI 모델들의 성능을 분석하고 오픈소스 AI 생태계의 미래를 전망합니다.', '23:18', '2026.06.08', '중급'),
  ],
}

// 각 영상에 id 와 topic 필드 자동 부여
Object.entries(videosByTopic).forEach(([topic, list]) => {
  list.forEach((item, i) => {
    item.id = `${topic}-${i + 1}`
    item.topic = topic
  })
})

export const allVideos = Object.values(videosByTopic).flat()
export const featuredVideos = [
  videosByTopic['ai-basics'][0],
  videosByTopic['ai-literacy'][0],
  videosByTopic['tutorials'][0],
]

export const stats = [
  { value: '48+', label: '강의 영상' },
  { value: '6',   label: '주제 분야' },
  { value: '200+', label: '시간 콘텐츠' },
  { value: '4',   label: '난이도 레벨' },
]

export const curriculum = [
  {
    level: '입문',
    levelEn: 'Beginner',
    colorCls: 'bg-emerald-500',
    title: 'AI 첫걸음',
    desc: 'AI를 처음 접하는 분들을 위한 기초 과정입니다. 개념 이해 중심.',
    duration: '약 8시간',
    courses: 8,
    topics: ['AI 기초', 'AI 리터러시'],
  },
  {
    level: '초급',
    levelEn: 'Elementary',
    colorCls: 'bg-brand-500',
    title: 'AI 실전 입문',
    desc: 'AI의 원리를 이해하고 도구를 직접 활용하기 시작하는 단계입니다.',
    duration: '약 16시간',
    courses: 16,
    topics: ['머신러닝 기초', '실습 튜토리얼', 'AI 트렌드'],
  },
  {
    level: '중급',
    levelEn: 'Intermediate',
    colorCls: 'bg-brand-800',
    title: 'AI 심화 학습',
    desc: '딥러닝 이론과 실전 프로젝트로 실력을 한 단계 높이는 과정입니다.',
    duration: '약 24시간',
    courses: 24,
    topics: ['딥러닝', '머신러닝 심화', '실전 프로젝트'],
  },
  {
    level: '고급',
    levelEn: 'Advanced',
    colorCls: 'bg-brand-950',
    title: 'AI 마스터',
    desc: '최신 AI 아키텍처와 연구 동향까지 마스터하는 전문가 과정입니다.',
    duration: '약 32시간',
    courses: 16,
    topics: ['딥러닝 고급', 'AI 에이전트', '논문 읽기'],
  },
]
