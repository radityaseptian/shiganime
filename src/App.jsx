/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Anime from './pages/Anime'
import AnimeWatch from './pages/AnimeWatch'
import Search from './pages/Search'
import Genre from './pages/Genre'
import About from './pages/About'
import { RecommendationProvider } from './context/RecommendationContext'
import { SkeletonTheme } from 'react-loading-skeleton'

export default function App() {
  return (
    <>
      <RecommendationProvider>
        <SkeletonTheme baseColor='#373438' highlightColor='#393a3b'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='watch/:id' element={<AnimeWatch />} />
              <Route path='anime/:id' element={<Anime />} />
              <Route path='search/:param' element={<Search />} />
              <Route path='genre/:slug' element={<Genre />} />
              <Route path='about' element={<About />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </BrowserRouter>
        </SkeletonTheme>
      </RecommendationProvider>
    </>
  )
}
