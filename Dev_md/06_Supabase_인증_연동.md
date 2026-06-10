# 06. Supabase 인증 연동 — 이메일 로그인 · 카카오 OAuth

작업일: 2026-06-10

## 목표
Supabase를 연동하여 회원가입/로그인, 카카오 소셜 로그인, 게시판용 DB 테이블을 구축한다.

---

## 변경 내역

### 1. Supabase DB 스키마 구축

**파일**: `supabase_setup.sql` (신규)

#### 생성 테이블

| 테이블 | 역할 |
|--------|------|
| `profiles` | auth.users와 1:1 연동, 닉네임·이메일 저장 |
| `posts` | 게시판 글 (notice / qna / free 타입) |
| `comments` | 게시글 댓글, is_answer 필드로 Q&A 채택 지원 |

#### 주요 설정
- 모든 테이블 **Row Level Security(RLS)** 적용
- 조회: 누구나 / 작성·수정·삭제: 본인만
- `handle_new_user()` 트리거: 회원가입 시 profiles 자동 생성
- 카카오 로그인 대비 `email` nullable, username fallback 체인 적용
  ```sql
  COALESCE(username, name, full_name, email prefix, 'user_' || id[:8])
  ```
- `increment_post_views()` 함수: RLS 우회 조회수 증가

---

### 2. 카카오 OAuth 스코프 제한

**파일**: `src/context/AuthContext.jsx`

#### 변경 이유
Supabase 내장 Kakao 프로바이더가 서버 측에서 `account_email` 스코프를 하드코딩 요청 →
비즈니스 인증 전 KOE205 에러 발생

#### 변경 내용
```js
// Before
options: { redirectTo: window.location.origin + window.location.pathname }

// After
options: {
  redirectTo: window.location.origin + window.location.pathname,
  scopes: 'profile_nickname',
}
```

비즈니스 앱 전환 후 이메일 동의 항목 활성화로 카카오 로그인 최종 성공

---

### 3. 환경변수 설정

**파일**: `.env`

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY  (서버 전용, VITE_ 접두사 없음)
```

---

## 검증 결과

| 항목 | 결과 |
|------|------|
| profiles / posts / comments 테이블 생성 | ✅ |
| 이메일 회원가입 | ✅ profiles 트리거 자동 생성 |
| 이메일 로그인 | ✅ access_token 발급 |
| RLS — 본인 데이터만 수정/삭제 | ✅ |
| 카카오 로그인 | ✅ 닉네임·이메일 정상 수신 |
| 카카오 로그인 후 profiles 자동 생성 | ✅ |

---

## 이슈 기록

- **Supabase 무료 SMTP 제한**: 시간당 2건 → 개발 중 이메일 확인 OFF 권장, 배포 전 Resend SMTP 연결 필요
- **카카오 Redirect URI**: 신규 콘솔 UI에서 사용설정 페이지 내 별도 입력란 없음 → 고급 탭에서 등록
- **카카오 Client Secret**: 비즈 앱 전환 후 플랫폼 키 페이지에서 생성 가능
