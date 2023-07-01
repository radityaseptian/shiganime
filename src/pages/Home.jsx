import { useEffect, useReducer, useState } from 'react'

import { Pagination } from '@mui/material'
import Skeleton from 'react-loading-skeleton'
import { Helmet } from 'react-helmet'

import Navbar from '../layouts/Navbar'
import Carousel from '../layouts/Carousel'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import TopAiring from '../layouts/TopAiring'
import Recommendation from '../layouts/Recommendation'
import Genres from '../layouts/Genres'

import Container from '../components/Container'
import Card from '../components/Card'
import FacebookPage from '../components/FacebookPage'

import { arrayLength } from '../arrayLength'

const tabs = ['Sub', 'Dub', 'Movie', 'Chinese']

const baseUrl = import.meta.env.VITE_URL
const url = [
  {
    path: `${baseUrl}/recent-release?type=1&page=`,
    count: 375,
  },
  {
    path: `${baseUrl}/recent-release?type=2&page=`,
    count: 164,
  },
  {
    path: `${baseUrl}/anime-movies?page=`,
    count: 106,
  },
  {
    path: `${baseUrl}/recent-release?type=3&page=`,
    count: 49,
  },
]
const [sub, dub, movie, chinese] = url

const reducer = (state, action) => {
  switch (action.payload) {
    case 'Sub':
      return (state.activeUrl = {
        ...state,
        activeTab: action.payload,
        activeUrl: sub.path,
        countPagination: sub.count,
      })
    case 'Dub':
      return (state.activeUrl = {
        ...state,
        activeTab: action.payload,
        activeUrl: dub.path,
        countPagination: dub.count,
      })
    case 'Movie':
      return (state.activeUrl = {
        ...state,
        activeTab: action.payload,
        activeUrl: movie.path,
        countPagination: movie.count,
      })
    case 'Chinese':
      return (state.activeUrl = {
        ...state,
        activeTab: action.payload,
        activeUrl: chinese.path,
        countPagination: chinese.count,
      })
    default:
      return { ...state, values: action }
  }
}

const initial = {
  activeTab: 'Sub',
  values: [],
  activeUrl: sub.path,
  countPagination: sub.count,
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initial)
  const [loading, setLoading] = useState(true)

  const getAnimes = async (_, num = 1) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    await fetch(state.activeUrl + num)
      .then((res) => res.json())
      .then((res) => dispatch(res))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAnimes()
  }, [state.activeTab])

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content='Streaming anime subtitle English' />
        <meta
          name='keywords'
          content='anime, streaming, Shiganime, streaming anime subtitle english, dubbing english, anime chinese'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Shiganime - Streaming Anime Subtitle English</title>
      </Helmet>
      <Navbar random={state.values} />
      <Container>
        <div className='self-start flex-1'>
          <Carousel />
          <ul className='flex gap-1 border-b border-slate-400'>
            {tabs.map((item) => {
              return (
                <li
                  key={item}
                  onClick={() => dispatch({ payload: item })}
                  className={`${
                    state.activeTab === item
                      ? 'bg-sky-400'
                      : 'bg-zinc-800 text-sky-400'
                  } px-4 py-[.3em] rounded-t cursor-pointer font-medium`}
                >
                  {item}
                </li>
              )
            })}
          </ul>
          <div>
            <Content>
              {loading ? (
                <>
                  {arrayLength(20).map((i) => {
                    return <Skeleton key={i} className='h-40 sm:h-56 md:h-52' />
                  })}
                </>
              ) : (
                <>
                  {state.values.map((item) => {
                    const oshiNoKo = item.animeTitle == ''
                    if (oshiNoKo) {
                      item.animeTitle = 'Oshi no Ko'
                    }
                    return (
                      <Card
                        key={item.animeId}
                        animeId={item.animeId}
                        animeImg={item.animeImg}
                        episodeNum={item.episodeNum}
                        episodeId={item.episodeId}
                        releasedDate={item.releasedDate}
                      >
                        {item.animeTitle}
                      </Card>
                    )
                  })}
                </>
              )}
            </Content>
            <div className='mt-4 flex justify-center'>
              <Pagination
                onChange={getAnimes}
                count={state.countPagination}
                hideNextButton
                hidePrevButton
                variant='outlined'
                shape='rounded'
              />
            </div>
          </div>
          <TopAiring />
        </div>
        <div className='space-y-2 lg:min-w-[17rem] lg:max-w-[17rem]'>
          <FacebookPage />
          <Genres className='hidden md:block' />
          <Recommendation />
        </div>
      </Container>
      <Footer />
    </>
  )
}
