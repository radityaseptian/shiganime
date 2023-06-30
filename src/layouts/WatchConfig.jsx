import Dropdown, { Item } from '../components/Dropdown'
import Title from '../components/Title'
import Button from '../components/Button'
import Info from './Info'

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, useReducer } from 'react'

import { arrayLength } from '../arrayLength'
import Skeleton from 'react-loading-skeleton'

import { FaDownload, FaListUl } from 'react-icons/fa'

const listDropDown = {
  select: [
    {
      target: 1,
      text: 'sub & dub',
    },
    {
      target: 2,
      text: 'sub only',
    },
    {
      target: 3,
      text: 'dub only',
    },
  ],
  episodes: [
    {
      target: 1,
      text: 'all episodes',
    },
    {
      target: 2,
      text: '1 - 199',
    },
    {
      target: 3,
      text: '200 - 399',
    },
    {
      target: 4,
      text: '400 - 599',
    },
    {
      target: 5,
      text: '600 - 799',
    },
    {
      target: 6,
      text: '800 - 999',
    },
    {
      target: 7,
      text: '1000 - 1199',
    },
  ],
}
const reducer = (state, action) => {
  switch (action.payload) {
    case 'select':
      return {
        ...state,
        select: {
          target: action.select.target,
          text: action.select.text,
          show: false,
        },
      }
    case 'episodes':
      return {
        ...state,
        episodes: {
          target: action.select.target,
          text: action.select.text,
          show: false,
        },
      }
    case 'showSelect':
      return {
        ...state,
        select: { ...state.select, show: !state.select.show },
      }

    case 'showEpisodes':
      return {
        ...state,
        episodes: { ...state.episodes, show: !state.episodes.show },
      }
  }
}
const initial = {
  select: {
    show: false,
    target: listDropDown.select[0].target,
    text: listDropDown.select[0].text,
  },
  episodes: {
    show: false,
    target: listDropDown.episodes[0].target,
    text: listDropDown.episodes[0].text,
  },
}
export default function WatchConfig({
  download,
  play,
  anime,
  loading,
  currentEpisode,
}) {
  const { sub, dub } = anime
  const [currentPlay, setCurrentPlay, handleChange] = play
  const { episode, type } = currentEpisode

  const [state, dispatch] = useReducer(reducer, initial)
  const [showInfo, setShowInfo] = useState(false)

  const [sliceList, setSliceList] = useState({
    sub: { count: 0, start: 0, end: 0 },
    dub: { count: 0, start: 0, end: 0 },
  })

  useEffect(() => {
    setSliceList({
      sub: { count: sub.episodes.length, start: 0, end: sub.episodes.length },
      dub: { count: dub.episodes.length, start: 0, end: dub.episodes.length },
    })
  }, [anime])

  const handleSlice = (target) => {
    switch (target) {
      case 1:
        return setSliceList({
          ...sliceList,
          sub: { ...sliceList.sub, start: 0, end: sliceList.sub.count },
          dub: { ...sliceList.dub, start: 0, end: sliceList.dub.count },
        })
      case 2:
        return setSliceList({
          ...sliceList,
          sub: { ...sliceList.sub, start: 0, end: 199 },
          dub: { ...sliceList.dub, start: 0, end: 199 },
        })
      case 3:
        return setSliceList({
          ...sliceList,
          sub: { ...sliceList.sub, start: 199, end: 399 },
          dub: { ...sliceList.dub, start: 199, end: 399 },
        })
      case 4:
        return setSliceList({
          ...sliceList,
          sub: { ...sliceList.sub, start: 399, end: 599 },
          dub: { ...sliceList.dub, start: 399, end: 599 },
        })
      case 5:
        return setSliceList({
          ...sliceList,
          sub: { ...sliceList.sub, start: 599, end: 799 },
          dub: { ...sliceList.dub, start: 599, end: 799 },
        })
      case 6:
        return setSliceList({
          ...sliceList,
          sub: { ...sliceList.sub, start: 799, end: 999 },
          dub: { ...sliceList.dub, start: 799, end: 999 },
        })
      case 7:
        return setSliceList({
          ...sliceList,
          sub: { ...sliceList.sub, start: 999, end: 1999 },
          dub: { ...sliceList.dub, start: 999, end: 1999 },
        })
    }
  }

  return (
    <div className='mt-2 space-y-2 text-white'>
      <div>
        <Title title='Another server' />
        <div className='p-2 bg-zinc-700 flex flex-wrap gap-2'>
          <Button
            className={
              currentPlay === 1 ? 'bg-sky-400 text-black' : 'hover:bg-zinc-800'
            }
            text='Main'
            onClick={() => setCurrentPlay(1)}
          />
          <Button
            className={
              currentPlay === 2 ? 'bg-sky-400 text-black' : 'hover:bg-zinc-800'
            }
            text='Server1'
            onClick={() => handleChange(1)}
          />
          <Button
            className={
              currentPlay === 3 ? 'bg-sky-400 text-black' : 'hover:bg-zinc-800'
            }
            text='Server2'
            onClick={() => handleChange(2)}
          />
        </div>
      </div>
      <div>
        <Title title='Options' />
        <div className='p-2 bg-zinc-700 flex flex-wrap-reverse items-center justify-between gap-4'>
          <div className='flex flex-wrap-reverse gap-2'>
            <Dropdown
              show={state.select.show}
              onClick={() => dispatch({ payload: 'showSelect' })}
              current={state.select.text}
            >
              {listDropDown.select.map((item) => {
                return (
                  <Item
                    key={item.text}
                    text={item.text}
                    onClick={() => {
                      dispatch({
                        payload: 'select',
                        select: { target: item.target, text: item.text },
                      })
                    }}
                  />
                )
              })}
            </Dropdown>
            <Dropdown
              show={state.episodes.show}
              onClick={() => dispatch({ payload: 'showEpisodes' })}
              current={state.episodes.text}
            >
              {listDropDown.episodes.map((item) => {
                return (
                  <Item
                    key={item.text}
                    text={item.text}
                    onClick={() => {
                      handleSlice(item.target)
                      dispatch({
                        payload: 'episodes',
                        select: { target: item.target, text: item.text },
                      })
                    }}
                  />
                )
              })}
            </Dropdown>
          </div>
          <div className='flex flex-wrap gap-2'>
            <a href={download} target='_blank'>
              <Button className='hover:bg-zinc-800'>
                <FaDownload />
                <span>Download</span>
              </Button>
            </a>
            <div>
              {showInfo && (
                <Info
                  onClick={() => setShowInfo(false)}
                  title={anime.sub.values.animeTitle}
                  description={anime.sub.values.synopsis}
                  genres={anime.sub.values.genres}
                  image={anime.sub.values.animeImg}
                  type={anime.sub.values.type}
                  releaseDate={anime.sub.values.releasedDate}
                />
              )}
              <Button
                onClick={() => setShowInfo(!showInfo)}
                className='hover:bg-zinc-800'
              >
                <FaListUl />
                <span>Info</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {(state.select.target === 1 || state.select.target === 2) && (
        <div>
          <Title title='Sub' />
          <ul className='flex flex-wrap flex-initial gap-2 p-2 bg-zinc-700 text-sm lg:text-md'>
            {loading ? (
              <>
                {arrayLength(20).map((i) => {
                  return (
                    <Skeleton key={i} containerClassName='w-16' height={36} />
                  )
                })}
              </>
            ) : (
              <>
                {anime.sub.values.episodesList
                  .slice(sliceList.sub.start, sliceList.sub.end)
                  .map((item) => {
                    return (
                      <li key={item.episodeNum}>
                        <Link
                          to={`/watch/${item.episodeId}`}
                          className={`${
                            episode === item.episodeNum && !type
                              ? 'bg-sky-400 text-black'
                              : 'hover:bg-zinc-800'
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
      )}
      {(state.select.target === 1 || state.select.target === 3) && (
        <div>
          <Title title='Dub' />
          <ul className='flex flex-wrap flex-initial gap-2 p-2 bg-zinc-700 text-sm lg:text-md'>
            {loading ? (
              <>
                {arrayLength(20).map((i) => {
                  return (
                    <Skeleton key={i} containerClassName='w-16' height={36} />
                  )
                })}
              </>
            ) : (
              <>
                {anime.dub.empty ? (
                  <p className='text-lg py-4'>Not Found!</p>
                ) : (
                  anime.dub.values.episodesList
                    .slice(sliceList.dub.start, sliceList.dub.end)
                    .map((item) => {
                      return (
                        <li key={item.episodeNum}>
                          <Link
                            to={`/watch/${item.episodeId}`}
                            className={`${
                              episode === item.episodeNum && type
                                ? 'bg-sky-400 text-black'
                                : 'hover:bg-zinc-800'
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
      )}
    </div>
  )
}
