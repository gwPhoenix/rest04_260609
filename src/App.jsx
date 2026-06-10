import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import Videos from './pages/Videos'
import About from './pages/About'
import Curriculum from './pages/Curriculum'
import Contact from './pages/Contact'
import SimplePage from './pages/SimplePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BoardList from './pages/board/BoardList'
import BoardDetail from './pages/board/BoardDetail'
import BoardWrite from './pages/board/BoardWrite'

export default function App() {
  return (
    <div className="min-w-[320px]">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Navigate to="/videos/ai-basics" replace />} />
          <Route path="/videos/:topic" element={<Videos />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/board" element={<Navigate to="/board/free" replace />} />
          <Route path="/board/:type" element={<BoardList />} />
          <Route path="/board/:type/write" element={<BoardWrite />} />
          <Route path="/board/:type/:id/edit" element={<BoardWrite />} />
          <Route path="/board/:type/:id" element={<BoardDetail />} />
          <Route path="/privacy" element={<SimplePage title="개인정보처리방침" />} />
          <Route path="/terms" element={<SimplePage title="이용약관" />} />
          <Route path="*" element={<SimplePage title="페이지를 찾을 수 없습니다" />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
