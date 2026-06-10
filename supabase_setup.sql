-- ============================================================
-- 1. profiles 테이블 (auth.users와 1:1 연동)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id       UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email    TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: 누구나 조회"    ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles: 본인만 등록"    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles: 본인만 수정"    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 회원가입 시 profiles 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(COALESCE(NEW.email, ''), '@', 1),
      'user_' || substring(NEW.id::text, 1, 8)
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- 2. posts 테이블 (notice / qna / free)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  board_type  TEXT NOT NULL CHECK (board_type IN ('notice', 'qna', 'free')),
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  author_id   UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  views       INTEGER DEFAULT 0,
  is_pinned   BOOLEAN DEFAULT FALSE,
  is_answered BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_board_type ON public.posts(board_type);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author_id  ON public.posts(author_id);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts: 누구나 조회"    ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts: 로그인 후 작성" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts: 본인만 수정"    ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts: 본인만 삭제"    ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- 조회수 증가 함수 (RLS 우회)
CREATE OR REPLACE FUNCTION public.increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- updated_at 자동 갱신
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- ============================================================
-- 3. comments 테이블
-- ============================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id     UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  content     TEXT NOT NULL,
  author_id   UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  is_answer   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_post_id    ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments: 누구나 조회"    ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments: 로그인 후 작성" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments: 본인만 수정"    ON public.comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "comments: 본인만 삭제"    ON public.comments FOR DELETE USING (auth.uid() = author_id);
