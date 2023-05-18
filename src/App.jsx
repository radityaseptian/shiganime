import { Routes, Route,Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Anime from './pages/Anime'
import AnimeWatch from './pages/AnimeWatch'
import Search from './pages/Search'
import Genre from './pages/Genre.jsx'
import Movie from './pages/Movie'
import GenresList from './pages/GenresList'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='anime/watch/:id' element={<AnimeWatch />} />
        <Route path='search/:param' element={<Search />} />
        <Route path='anime/:id' element={<Anime />} />
        <Route path='genre/:id' element={<Genre />} />
        <Route path='movie' element={<Movie />} />
        <Route path='genres-list' element={<GenresList />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}
