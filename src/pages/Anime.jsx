/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import Rekomendasi from '../layouts/Rekomendasi'
import { LoadingAnimeDetail } from '../components/Loading'

export default function Anime() {
  const [anime, setAnime] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const url = `${import.meta.env.VITE_URL}/anime-details/${id}`
  const initAnime = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setAnime(res))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    initAnime()
    document.title = `Anime - ${id}`
  }, [])
  return (
    <>
      <Navbar />
      <div className='container mx-auto max-w-6xl'>
        <div className='pt-2 text-xs sm:text-sm lg:text-md'>
          <div className='bg-slate-100 mx-auto max-w-5xl p-2'>
            <div className='bg-sky-400 py-2 text-center'>
              <h1>Streaming {anime.animeTitle}</h1>
            </div>
            <div className='flex justify-between pt-2'>
              {loading ? (
                <LoadingAnimeDetail />
              ) : (
                <div className='w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-60'>
                  <img
                    src={anime.animeImg}
                    alt={anime.animeTitle}
                    className='bg-cover bg-center w-full h-full'
                  />
                </div>
              )}
              <div className='flex-1 overflow-y-auto h-48 md:h-52 lg:h-60 px-2'>
                <p>{anime.synopsis}</p>
              </div>
            </div>
            <div className='flex py-2 leading-5'>
              <div className='pr-5'>
                <p>Title</p>
                <p>Alternatif</p>
                <p>Type</p>
                <p>Status</p>
                <p>Episode Available</p>
                <p>Release Date</p>
                <p>Genres</p>
              </div>
              <div>
                <p>: {anime.animeTitle}</p>
                <p>: {anime.otherNames}</p>
                <p>: {anime.type}</p>
                <p>: {anime.status}</p>
                <p>: {anime.totalEpisodes}</p>
                <p>: {anime.releasedDate}</p>
                <ul className='flex gap-1'>
                  :
                  {anime.genres &&
                    anime.genres.map((list) => {
                      return (
                        <>
                          <Link to={`/genre/${list}`}>
                            <li key={list} className='pr-1'>
                              {list}
                            </li>
                          </Link>
                        </>
                      )
                    })}
                </ul>
              </div>
            </div>
            <div className='mb-4'>
              <p className='bg-sky-500 py-2 pl-2'>LIST EPISODE</p>
              <ul className='overflow-y-auto max-h-screen'>
                {anime.episodesList &&
                  anime.episodesList.map((list) => {
                    return (
                      <>
                        <li key={list.episodeNum} className='pt-1'>
                          <Link
                            to={`/anime/watch/${list.episodeId}`}
                            className='py-1 pl-2 block bg-sky-300 hover:bg-sky-400 hover:underline'
                          >
                            Episode {list.episodeNum}
                          </Link>
                        </li>
                      </>
                    )
                  })}
              </ul>
            </div>
            <Rekomendasi className={'grid-cols-7'} />
          </div>
        </div>
      </div>
      <div className='container mx-auto max-w-6xl'>
        <Footer />
      </div>
    </>
  )
}
