import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { arrayLength } from '../arrayLength'

import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

import Title from '../components/Title'
import Video from '../components/Video'

import Skeleton from 'react-loading-skeleton'
import { Helmet } from 'react-helmet'

export default function AnimeWatch() {
  const navigate = useNavigate()
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(true)

  const initial = {
    sub: {
      empty: true,
      values: [],
    },
    sub: {
      empty: true,
      values: [],
    },
  }
  const [listEpisodes, setListEpisodes] = useState(initial)

  const { id } = useParams()
  const url = import.meta.env.VITE_URL

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getAnimeWatch(`${url}/vidcdn/watch/` + id)
  }, [id])

  const next = () => {
    const lastEpisode = listEpisodes[0].episodeNum
    const episode = id.split('-')
    const currentEpisode = episode[episode.length - 1]
    if (currentEpisode != lastEpisode) {
      let next = episode.filter((list) => list != currentEpisode)
      next.push((Number(currentEpisode) + 1).toString())
      navigate(`/watch/${next.join('-')}`)
    }
  }
  const previous = () => {
    const firstEpisode = listEpisodes[listEpisodes.length - 1].episodeNum
    const episode = id.split('-')
    const currentEpisode = episode[episode.length - 1]
    if (currentEpisode != firstEpisode) {
      let next = episode.filter((list) => list != currentEpisode)
      next.push((Number(currentEpisode) - 1).toString())
      navigate(`/watch/${next.join('-')}`)
    }
  }

  async function getAnimeWatch(param) {
    setLoading(true)
    try {
      // VIDEO ANIME
      // const res = await fetch(param)
      // const result = await res.json()
      // setRequest(result.sources_bk[0].file)

      // GET ANIME EPISODES
      const path = id.split('-')
      path.pop()
      path.pop()
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
      const subtitle = responses[0].episodesList
      const dubbing = responses[1].episodesList

      if (typeof dubbing !== 'undefined') {
        setListEpisodes({
          sub: { values: subtitle.reverse(), empty: false },
          dub: { values: dubbing.reverse(), empty: false },
        })
      } else {
        setListEpisodes({
          sub: { values: subtitle.reverse(), empty: false },
          dub: { values: [], empty: true },
        })
      }
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
      <Navbar />
      <div className='container bg-zinc-800 mx-auto max-w-5xl p-2 mt-2'>
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
        {loading ? (
          <Skeleton className='h-52 sm:h-80 md:h-96 lg:h-[33rem]' />
        ) : (
          // <Video {...play} />
          <></>
        )}
        <div className='mt-6 space-y-4 text-white'>
          <div>
            <Title title='Sub' />
            <ul className='flex flex-wrap flex-initial gap-2 pt-2 text-sm lg:text-md'>
              {loading ? (
                <>
                  {arrayLength(20).map(() => {
                    return <Skeleton containerClassName='w-16' height={36} />
                  })}
                </>
              ) : (
                <>
                  {listEpisodes.sub.values.map((item) => {
                    return (
                      <li
                        key={item.episodeId}
                        className='grid place-content-center rounded-sm w-16 h-9 border-2 border-slate-400'
                        onClick={() => getAnimeWatch(url + item.episodeId)}
                      >
                        {item.episodeNum}
                      </li>
                    )
                  })}
                </>
              )}
            </ul>
          </div>
          <div>
            <Title title='Dub' />
            <ul className='flex flex-wrap flex-initial gap-2 pt-2 text-sm lg:text-md'>
              {loading ? (
                <>
                  {arrayLength(20).map(() => {
                    return <Skeleton containerClassName='w-16' height={36} />
                  })}
                </>
              ) : (
                <>
                  {listEpisodes.dub.empty ? (
                    <p className='text-lg py-4'>Not Found!</p>
                  ) : (
                    listEpisodes.dub.values.map((item) => {
                      return (
                        <li
                          key={item.episodeId}
                          className='grid place-content-center rounded-sm w-16 h-9 border-2 border-slate-400'
                          onClick={() => getAnimeWatch(url + item.episodeId)}
                        >
                          {item.episodeNum}
                        </li>
                      )
                    })
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
