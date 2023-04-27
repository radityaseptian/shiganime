/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Loading from './Loading'

export default function Card({ value, error, loading, linkHome = false }) {
  return (
    <>
      <ul className='text-xs md:text-sm grid md:grid-cols-2 gap-2 lg:text-md w-full p-2 bg-slate-200'>
        {error[0] && <h1>{error[1]}</h1>}
        {loading ? (
          <>
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
          </>
        ) : (
          value.map((list) => {
            return (
              <>
                <li
                  key={list.animeId}
                  className='shadow-md border-[1.2px] border-black/50 rounded-md'
                >
                  <div className='flex justify-between'>
                    <div className='rounded-md overflow-hidden w-24 h-32 md:w-28 md:h-36'>
                      <Link to={`/anime/${list.animeId}`}>
                        <img
                          src={list.animeImg}
                          alt={list.animeTitle}
                          className='h-full w-full bg-cover bg-center'
                        />
                      </Link>
                    </div>
                    <div className='flex-1 flex flex-col overflow-y-auto justify-between px-2 h-32 md:w-28 md:h-36 text-xs md:text-sm'>
                      <Link to={`/anime/${list.animeId}`}>
                        <h3 className='py-1'>{list.animeTitle}</h3>
                      </Link>
                      <div>
                        <p>{list.subOrDub}</p>
                        {linkHome ? (
                          <Link to={`/anime/watch/${list.episodeId}`}>
                            <p className='mb-4 mt-2 rounded inline-block px-2 py-1 bg-sky-300 hover:bg-sky-400'>
                              Episode : {list.episodeNum}
                            </p>
                          </Link>
                        ) : (
                          <p className='mb-4 mt-2 rounded px-2 inline-block py-1 bg-sky-300'>
                            {list.releasedDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )
          })
        )}
      </ul>
    </>
  )
}
export function CardSearch({ value, loading }) {
  return (
    <>
      <ul className='text-xs md:text-sm grid md:grid-cols-2 p-2 gap-2 lg:text-md w-full bg-slate-200'>
        {loading ? (
          <>
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
            <Loading style={'w-24 h-32 md:w-28 md:h-36'} />
          </>
        ) : (
          value.map((list) => {
            return (
              <>
                <li
                  key={list.animeId}
                  className='shadow-md border-[1.2px] border-black/50 rounded-md'
                >
                  <div className='flex justify-between'>
                    <div className='rounded-md overflow-hidden w-24 h-32 md:w-28 md:h-36'>
                      <Link to={`/anime/${list.animeId}`}>
                        <img
                          src={list.animeImg}
                          alt={list.animeTitle}
                          className='h-full w-full bg-cover bg-center'
                        />
                      </Link>
                    </div>
                    <div className='flex-1 flex flex-col overflow-y-auto justify-between px-2 h-32 md:w-28 md:h-36 text-xs md:text-sm'>
                      <Link to={`/anime/${list.animeId}`}>
                        <h3 className='py-1'>{list.animeTitle}</h3>
                      </Link>
                      <div>
                        <p className='mb-4 mt-2 rounded inline-block px-2 py-1 bg-sky-300 hover:bg-sky-400'>
                          {list.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )
          })
        )}
      </ul>
    </>
  )
}
