import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import EmptyPoint from '../components/EmptyPoint'
import { RekomendasiContext } from '../context/RekomendasiContext'

export default function GenreList() {
  const [rekomendasi, setRekomendasi] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    initRekomendasi()
    document.title = 'Genre Anime List'
  }, [])
  const initRekomendasi = async () => {
    await fetch('https://gogoanime.consumet.stream/popular')
      .then((res) => res.json())
      .then((res) => setRekomendasi(res))
      .finally(() => setLoading(false))
  }
  return (
    <>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='max-w-6xl lg:flex mx-auto'>
          <div>
            <div className='bg-sky-500 mt-2'>
              <h1 className='p-2 px-3'>Genre List</h1>
            </div>
            <ul className='flex flex-wrap shadow-md bg-slate-200 gap-2 p-2 [&>li]:py-2 text-xs md:text-sm xl:text-md'>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/action'
                >
                  Action
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/adventure'
                >
                  Adventure
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/cars'
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/comedy'
                >
                  Comedy
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/crime'
                >
                  Crime
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/dementia'
                >
                  Dementia
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/demons'
                >
                  Demons
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/drama'
                >
                  Drama
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/dub'
                >
                  Dub
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/ecchi'
                >
                  Ecchi
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/family'
                >
                  Family
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/fantasy'
                >
                  Fantasi
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/game'
                >
                  Game
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/gourmet'
                >
                  Gourmet
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/harem'
                >
                  Harem
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/historical'
                >
                  Historical
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/horror'
                >
                  Horror
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/josei'
                >
                  Josei
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/kids'
                >
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/magic'
                >
                  Magic
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/martial-arts'
                >
                  Martial-arts
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/mecha'
                >
                  Mecha
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/military'
                >
                  Military
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/music'
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/mystery'
                >
                  Mystery
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/parody'
                >
                  Parody
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/police'
                >
                  Police
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/psychological'
                >
                  Psychological
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/romance'
                >
                  Romance
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/samurai'
                >
                  Samurai
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/school'
                >
                  School
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/sci-fi'
                >
                  Sci-fi
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/seinen'
                >
                  Seinen
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/shoujo'
                >
                  Shoujo
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/shoujo-ai'
                >
                  Shoujo-ai
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/shounen'
                >
                  Shounen
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/shounen-ai'
                >
                  Shounen-ai
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/slice-of-life'
                >
                  Slice-of-life
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/space'
                >
                  Space
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/sports'
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/super-power'
                >
                  Super-power
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/supernatural'
                >
                  Supernatural
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/suspense'
                >
                  Suspense
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/thriller'
                >
                  Thriller
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/vampire'
                >
                  Vampire
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/yaoi'
                >
                  Yaoi
                </Link>
              </li>
              <li>
                <Link
                  className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                  to='/genre/yuri'
                >
                  Yuri
                </Link>
              </li>
            </ul>
          </div>
          <div className='lg:w-full p-2'>
            <RekomendasiContext.Provider value={rekomendasi}>
              <EmptyPoint loading={loading} />
            </RekomendasiContext.Provider>
          </div>
        </div>
        <div className='mx-auto container max-w-6xl'>
          <Footer />
        </div>
      </div>
    </>
  )
}
