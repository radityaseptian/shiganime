/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import Video from '../components/Video'
import { LoadingVideoAnime } from '../components/Loading'

export default function AnimeWatch() {
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(true)
  const [listEpisodes, setListEpisodes] = useState([])
  const { id } = useParams()
  const url = `https://gogoanime.consumet.stream/vidcdn/watch/${id}`
  const animeVideoList = id.split('-')
  animeVideoList.pop()
  animeVideoList.pop()
  const urlAnimeDetails = `https://gogoanime.consumet.stream/anime-details/${animeVideoList}`

  useEffect(() => {
    initRequest()
    getAnimeDetails()
    document.title = `Watch - ${id}`
  }, [])
  const getAnimeDetails = async () => {
    await fetch(urlAnimeDetails)
      .then((res) => res.json())
      .then((res) => setListEpisodes(res.episodesList))
  }
  const initRequest = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setRequest(res.sources_bk[0].file))
      .finally(() => setLoading(false))
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
      <div className='bg-slate-100'>
        <Navbar />
        <div className='containerbg-slate-200 mx-auto max-w-6xl p-2 mt-2 shadow-sm shadow-slate-400'>
          <div className='bg-sky-400 mb-2 p-2 antialiased'>
            <h1>{id}</h1>
          </div>
          {loading && <LoadingVideoAnime />}
          {request && <Video {...play} />}
          <div className='mt-3'>
            <p className='bg-sky-500 py-2 pl-2 text-sm lg:text-md'>
              LIST EPISODE
            </p>
            <ul className='overflow-y-auto max-h-screen text-xs sm:text-sm lg:text-md'>
              {listEpisodes &&
                listEpisodes.map((list) => {
                  return (
                    <>
                      <li key={list.episodeNum} className='pt-1'>
                        <a
                          href={`/anime/watch/${list.episodeId}`}
                          className='py-1 pl-2 block bg-sky-300 hover:bg-sky-400 hover:underline'
                        >
                          Episode {list.episodeNum}
                        </a>
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
