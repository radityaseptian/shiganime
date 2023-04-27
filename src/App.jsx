import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Anime from './pages/Anime'
import AnimeWatch from './pages/AnimeWatch'
import Search from './pages/Search'
import Genre from './pages/Genre.jsx'
import Movie from './pages/Movie'
import GenreList from './pages/GenreList'

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
        <Route path='genre-list' element={<GenreList />} />
      </Routes>
    </>
  )
}
