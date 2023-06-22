/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Anime from './pages/Anime'
import AnimeWatch from './pages/AnimeWatch'
import Search from './pages/Search'
import Genre from './pages/Genre.jsx'
import Movie from './pages/Movie'
import GenreList from './pages/GenreList'
import { useEffect, useState } from 'react'
import { RekomendasiContext } from './context/RekomendasiContext'
import { SkeletonTheme } from 'react-loading-skeleton'

export default function App() {
  const url = import.meta.env.VITE_URL
  const [rekomendasi, setRekomendasi] = useState({ loading: true, values: [] })
  useEffect(() => {
    const initRekomendasi = async () => {
      await fetch(`${url}/popular`)
        .then((res) => res.json())
        .then((res) => setRekomendasi({ loading: false, values: res }))
    }
    initRekomendasi()
  }, [])
  return (
    <>
      <RekomendasiContext.Provider value={rekomendasi}>
        <SkeletonTheme baseColor='#373438' highlightColor='#393a3b'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='anime/watch/:id' element={<AnimeWatch />} />
              <Route path='search/:param' element={<Search />} />
              <Route path='anime/:id' element={<Anime />} />
              <Route path='movie' element={<Movie />} />
              <Route path='genre-list' element={<GenreList />} />
              <Route path='genre/:id' element={<Genre />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </BrowserRouter>
        </SkeletonTheme>
      </RekomendasiContext.Provider>
    </>
  )
}
