import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Anime from './pages/Anime'
import AnimeWatch from './pages/AnimeWatch'
import Search from './pages/Search'
import Genre from './pages/Genre.jsx'
import Movie from './pages/Movie'
import GenresList from './pages/GenresList'
import { useEffect, useState } from 'react'
import { RekomendasiContext } from './context/RekomendasiContext'

export default function App() {
  const [rekomendasi, setRekomendasi] = useState({ loading: true, values: [] })
  const initRekomendasi = async () => {
    await fetch(`${import.meta.url}/popular`)
      .then((res) => res.json())
      .then((res) => setRekomendasi({ loading: false, values: res }))
  }
  useEffect(() => {
    initRekomendasi()
  }, [])

  return (
    <>
      <RekomendasiContext.Provider value={rekomendasi}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='anime/watch/:id' element={<AnimeWatch />} />
          <Route path='search/:param' element={<Search />} />
          <Route path='anime/:id' element={<Anime />} />
          <Route path='movie' element={<Movie />} />
          <Route path='genres-list' element={<GenresList />} />
          <Route path='genre/:id' element={<Genre />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </RekomendasiContext.Provider>
    </>
  )
}
