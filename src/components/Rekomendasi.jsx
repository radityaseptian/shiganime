/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-const-assign */
import { BsFillCalendarHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { RekomendasiContext } from '../context/RekomendasiContext'
import { LoadingRekomendasi } from './Loading'

export default function Rekomendasi({
  className = 'lg:grid lg:grid-cols-2 flex flex-wrap gap-1',
  refresh = false,
  loading,
}) {
  const context = useContext(RekomendasiContext)
  return (
    <>
      <div className='text-sm lg:text-md shadow-md'>
        <div className='flex h-[2.3rem] text-white items-center shadow-md justify-between w-full rounded-t-md px-4 bg-sky-500 py-2'>
          <h3>Rekomendasi</h3>
          <BsFillCalendarHeartFill />
        </div>
        <div className='overflow-hidden p-2 bg-slate-200'>
          <ul className={`${className} justify-evenly`}>
            {loading || context.loading ? (
              <>
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
                <LoadingRekomendasi />
              </>
            ) : (
              context.map((list) => {
                return (
                  <li
                    key={list.animeId}
                    className='relative w-32 h-44 lg:w-full overflow-hidden flex-initial'
                  >
                    {!refresh ? (
                      <Link to={`/anime/${list.animeId}`}>
                        <img
                          src={list.animeImg}
                          alt={list.animeTitle}
                          className='bg-cover bg-center w-full h-full'
                        />
                        <span className='text-xs text-white absolute right-0 bottom-0 left-0 sm:text-md lg:text-sm text-center bg-black/50 py-1'>
                          {list.animeTitle}
                        </span>
                      </Link>
                    ) : (
                      <a href={`/anime/${list.animeId}`}>
                        <img
                          src={list.animeImg}
                          alt={list.animeTitle}
                          className='bg-cover bg-center w-full h-full'
                        />
                        <span className='text-xs text-white absolute right-0 bottom-0 left-0 sm:text-md lg:text-sm text-center bg-black/50 py-1'>
                          {list.animeTitle}
                        </span>
                      </a>
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
