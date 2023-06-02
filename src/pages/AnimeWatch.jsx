/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import Video from '../components/Video'
import { LoadingVideoAnime } from '../components/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function AnimeWatch() {
  const navigate = useNavigate()
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(true)
  const [listEpisodes, setListEpisodes] = useState([])
  const { id } = useParams()
  const url = `${import.meta.env.VITE_URL}/vidcdn/watch/${id}`
  const animeVideoList = id.split('-')
  animeVideoList.pop()
  animeVideoList.pop()
  const urlAnimeDetails = `${
    import.meta.env.VITE_URL
  }/anime-details/${animeVideoList.join('-')}`

  const RefreshToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    RefreshToTop()
    getAnimeWatch()
  }, [id])

  const next = () => {
    const lastEpisode = listEpisodes[0].episodeNum
    const episode = id.split('-')
    const currentEpisode = episode[episode.length - 1]
    if (currentEpisode != lastEpisode) {
      let next = episode.filter((list) => list != currentEpisode)
      next.push((Number(currentEpisode) + 1).toString())
      navigate(`/anime/watch/${next.join('-')}`)
    }
  }
  const previous = () => {
    const firstEpisode = listEpisodes[listEpisodes.length - 1].episodeNum
    const episode = id.split('-')
    const currentEpisode = episode[episode.length - 1]
    if (currentEpisode != firstEpisode) {
      let next = episode.filter((list) => list != currentEpisode)
      next.push((Number(currentEpisode) - 1).toString())
      navigate(`/anime/watch/${next.join('-')}`)
    }
  }

  async function getAnimeWatch() {
    setLoading(true)
    try {
      // VIDEO ANIME
      const res = await fetch(url)
      const result = await res.json()
      setRequest(result.sources_bk[0].file)

      // GET ANIME EPISODES LISTS
      const response = await fetch(urlAnimeDetails)
      const resolve = await response.json()
      setListEpisodes(resolve.episodesList)
    } finally {
      setLoading(false)
    }
  }
  const play = {
    fill: true,
    fluid: true,
    autoplay: true,
    controls: true,
    preload: 'metadata',
    sources: [
      {
        src: request,
        type: 'application/x-mpegURL',
      },
    ],
  }
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
        <title>Watch - {id.split('-').join(' ')}</title>
      </Helmet>
      <div className='bg-zinc-700'>
        <Navbar />
        <div className='container bg-zinc-800 mx-auto max-w-5xl p-2 mt-2'>
          <div className='bg-sky-400 mb-2 p-2 antialiased flex flex-col sm:items-center sm:flex-row justify-between'>
            <h1 className='text-base'>{id.split('-').join(' ')}</h1>
            <div className='flex gap-3 text-xs mt-2 sm:mt-0 sm:pr-2 text-white'>
              <button
                onClick={previous}
                className='p-2 bg-sky-500 hover:bg-sky-600 rounded'
              >
                Previous Eps.
              </button>
              <button
                onClick={next}
                className='p-2 bg-sky-500 hover:bg-sky-600 rounded'
              >
                Next Eps.
              </button>
            </div>
          </div>
          {loading && <LoadingVideoAnime />}
          {!loading && <Video {...play} />}
          <div className='mt-3'>
            <p className='bg-sky-500 py-2 pl-2 text-sm lg:text-md'>
              LIST EPISODE
            </p>
            <ul className='overflow-y-auto max-h-[70vh] text-sm lg:text-md'>
              {!loading &&
                listEpisodes.map((list, i) => {
                  return (
                    <>
                      <li key={i} className='pt-1'>
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
        </div>
        <div className='container mx-auto max-w-6xl'>
          <Footer />
        </div>
      </div>
    </>
  )
}
