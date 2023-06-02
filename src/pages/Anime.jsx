/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import Rekomendasi from '../layouts/Rekomendasi'
import { LoadingAnimeDetail } from '../components/Loading'
import { Helmet } from 'react-helmet'

export default function Anime() {
  const [anime, setAnime] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const url = `${import.meta.env.VITE_URL}/anime-details/${id}`
  const getAnime = async () => {
    setLoading(true)
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setAnime(res))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getAnime()
    RefeshToTop()
  }, [id])
  const RefeshToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const title =
    id.split('-').join(' ').charAt(0).toUpperCase() +
    id.split('-').join(' ').slice(1) +
    ' Subtitle English | Shiganime'
  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta
          name='description'
          content={`Watch anime ${id
            .split('-')
            .join(' ')} subtitle English - Shiganime`}
        />
        <meta
          name='keywords'
          content='anime, streaming, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <div className='pt-2 text-xs sm:text-sm lg:text-md text-white bg-zinc-700'>
        <div className='bg-zinc-800 mx-auto max-w-5xl p-2'>
          <div className='bg-sky-400 py-2 text-center text-black'>
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
          <div className='mb-4 text-black pt-4'>
            <p className='bg-sky-500 py-2 pl-2'>LIST EPISODE</p>
            <ul className='overflow-y-auto max-h-[70vh]'>
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
        <Footer />
      </div>
    </>
  )
}
