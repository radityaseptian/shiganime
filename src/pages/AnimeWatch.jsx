import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import WatchConfig from '../layouts/WatchConfig'

import Video from '../components/Video'
import Iframe from '../components/Iframe'

import Skeleton from 'react-loading-skeleton'
import { Helmet } from 'react-helmet'

export default function AnimeWatch() {
  const navigate = useNavigate()
  const [data, setData] = useState({ file: [], referer: '' })

  const [loadingVideo, setLoadingVideo] = useState(true)
  const [loadingAnime, setLoadingAnime] = useState(true)

  const [currentPlay, setCurrentPlay] = useState(1)
  const [play, setPlay] = useState({
    fill: true,
    fluid: true,
    autoplay: false,
    controls: true,
    preload: 'metadata',
    sources: [
      {
        src: null,
        type: 'application/x-mpegURL',
      },
    ],
  })

  const { id } = useParams()
  const url = import.meta.env.VITE_URL

  async function getAnimeWatch() {
    try {
      const res = await fetch(`${url}/vidcdn/watch/${id}`)
      const result = await res.json()
      setData({
        file: [result.sources[0].file, result.sources_bk[0].file],
        referer: result.Referer,
      })
    } finally {
      setLoadingVideo(false)
    }
  }

  const handleChange = (num = 1) => {
    switch (num) {
      case 1:
        setCurrentPlay(2)
        setPlay({
          ...play,
          sources: [
            {
              src: data.file[0],
              type: 'application/x-mpegURL',
            },
          ],
        })
        break
      case 2:
        setCurrentPlay(3)
        setPlay({
          ...play,
          sources: [
            {
              src: data.file[1],
              type: 'application/x-mpegURL',
            },
          ],
        })
        break
    }
  }

  useEffect(() => {
    setLoadingVideo(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getAnimeWatch()
  }, [id])

  const [anime, setAnime] = useState({
    sub: {
      episodes: [],
      empty: true,
      values: {},
    },
    dub: {
      episodes: [],
      empty: true,
      values: {},
    },
  })
  useEffect(() => {
    async function getAnime() {
      const path = id.split('-')
      path.pop()
      path.pop()
      if (path[path.length - 1] === 'dub') {
        path.pop()
      }
      const baseUrl = `${url}/anime-details`
      const animeUrl = [
        `${baseUrl}/${path.join('-')}`,
        `${baseUrl}/${path.join('-')}-dub`,
      ]
      const responses = await Promise.all(
        animeUrl.map(async (url) => {
          const response = await fetch(url)
          const data = await response.json()
          return data
        })
      )
      const subtitle = responses[0]
      const dubbing = responses[1]
      if (typeof dubbing !== 'undefined' && !dubbing.error) {
        setAnime({
          sub: {
            values: subtitle,
            episodes: subtitle.episodesList.reverse(),
            empty: false,
          },
          dub: {
            values: dubbing,
            episodes: dubbing.episodesList.reverse(),
            empty: false,
          },
        })
      } else {
        setAnime({
          sub: {
            values: subtitle,
            empty: false,
            episodes: subtitle.episodesList.reverse(),
          },
          dub: { values: [], empty: true, episodes: [] },
        })
      }
      setLoadingAnime(false)
    }
    getAnime()
  }, [])

  const location = id.split('-')
  const currentEpisode = location[location.length - 1]
  const next = () => {
    const lastSub = anime.sub.episodes.length - 1
    const lastDub = anime.dub.episodes.length - 1
    if (
      loadingVideo ||
      loadingAnime ||
      currentEpisode === anime.sub.values.episodesList[lastSub].episodeNum ||
      currentEpisode === anime.dub.values.episodesList[lastDub].episodeNum
    ) {
      return
    }
    const next = location.filter((list) => list != currentEpisode)
    next.push((Number(currentEpisode) + 1).toString())
    navigate(`/watch/${next.join('-')}`)
  }
  const previous = () => {
    if (loadingVideo || loadingAnime || currentEpisode === '1') {
      return
    }
    const next = location.filter((list) => list != currentEpisode)
    next.push((Number(currentEpisode) - 1).toString())
    navigate(`/watch/${next.join('-')}`)
  }

  let download, streaming
  if (data.referer) {
    let server = new URL(data.referer)
    let server2 = server.href
    server.pathname = 'download'
    download = server.href
    streaming = server2
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
      <Navbar />
      <div className='container bg-zinc-800 mx-auto max-w-4xl py-2 md:px-2 mt-2'>
        <div className='flex flex-wrap gap-4 items-center justify-between mb-2 p-2 bg-sky-400 '>
          <h1 className='text-base capitalize'>{id.split('-').join(' ')}</h1>
          <div className='flex gap-3 text-xs text-white'>
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
        {loadingVideo ? (
          <Skeleton className='h-52 sm:h-80 md:h-96 lg:h-[32rem]' />
        ) : (
          <>
            {currentPlay === 1 ? (
              <Iframe src={streaming} />
            ) : (
              <Video {...play} />
            )}
          </>
        )}
        <WatchConfig
          download={download}
          anime={anime}
          play={[currentPlay, setCurrentPlay, handleChange]}
          loading={loadingAnime}
          currentEpisode={{
            episode: currentEpisode,
            type: location[location.length - 3] === 'dub',
          }}
        />
      </div>
      <Footer />
    </>
  )
}
