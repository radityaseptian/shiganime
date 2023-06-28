import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { arrayLength } from '../arrayLength'

import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

import Title from '../components/Title'
import Video from '../components/Video'

import Skeleton from 'react-loading-skeleton'
import { Helmet } from 'react-helmet'
import { FaDownload, FaListUl } from 'react-icons/fa'

export default function AnimeWatch() {
  const navigate = useNavigate()
  const [data, setData] = useState({ file: '', referer: '' })
  const [loading, setLoading] = useState(true)

  const initial = {
    sub: {
      empty: true,
      values: [],
    },
    dub: {
      empty: true,
      values: [],
    },
  }
  const [listEpisodes, setListEpisodes] = useState(initial)

  const { id } = useParams()
  const url = import.meta.env.VITE_URL

  async function getAnimeWatch() {
    setLoading(true)
    try {
      const res = await fetch(`${url}/vidcdn/watch/${id}`)
      const result = await res.json()
      setData({
        file: result.sources[0].file,
        referer: result.Referer,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getAnimeWatch()

    async function getListEpisodes() {
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
    }
    getListEpisodes()
  }, [id])

  const location = id.split('-')
  const currentEpisode = location[location.length - 1]
  const next = () => {
    const isDub = location[location.length - 3] === 'dub'
    if (loading) {
      return
    }
    if (isDub) {
      const last = listEpisodes.dub.values.length - 1
      if (currentEpisode == listEpisodes.dub.values[last].episodeNum) {
        return
      }
    } else {
      const last = listEpisodes.sub.values.length - 1
      if (currentEpisode == listEpisodes.sub.values[last].episodeNum) {
        return
      }
    }
    const next = location.filter((list) => list != currentEpisode)
    next.push((Number(currentEpisode) + 1).toString())
    navigate(`/watch/${next.join('-')}`)
  }
  const previous = () => {
    if (loading || currentEpisode == '1') {
      return
    }
    const next = location.filter((list) => list != currentEpisode)
    next.push((Number(currentEpisode) - 1).toString())
    navigate(`/watch/${next.join('-')}`)
  }

  const play = {
    fill: true,
    fluid: true,
    autoplay: false,
    controls: true,
    preload: 'metadata',
    sources: [
      {
        src: data.file,
        type: 'application/x-mpegURL',
      },
    ],
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
          <Video {...play} />
          // <iframe src={streaming} frameborder="0"></iframe>\
        )}
        <div className='mt-6 space-y-4 text-white'>
          <div>
            <Title title='Options' />
            <div className='pt-2 flex items-center gap-2'>
              <button>
                <a
                  href={download}
                  target='_blank'
                  className='flex items-center gap-1 px-4 py-2 border-2 rounded text-white border-slate-400'
                >
                  <FaDownload />
                  <span>Download</span>
                </a>
              </button>
              <Link
                to={'/anime/' + id.replace(/-episode-\d+$/, '')}
                className='flex items-center gap-1 px-4 py-2 border-2 rounded border-slate-400'
              >
                <FaListUl />
                <span>Info</span>
              </Link>
            </div>
          </div>
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
                      <li key={item.episodeId}>
                        <Link
                          to={`/watch/${item.episodeId}`}
                          className={`${
                            id === item.episodeId && 'bg-sky-400 text-black'
                          } grid place-content-center rounded-sm w-16 h-9 border-2 border-slate-400`}
                        >
                          {item.episodeNum}
                        </Link>
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
                        <li key={item.episodeId}>
                          <Link
                            to={`/watch/${item.episodeId}`}
                            className={`${
                              id === item.episodeId && 'bg-sky-400 text-black'
                            } grid place-content-center rounded-sm w-16 h-9 border-2 border-slate-400`}
                          >
                            {item.episodeNum}
                          </Link>
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
