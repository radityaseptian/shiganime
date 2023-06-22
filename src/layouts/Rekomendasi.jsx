/* eslint-disable react/prop-types */
import { BsFillCalendarHeartFill } from 'react-icons/bs'
import { useContext } from 'react'
import { RekomendasiContext } from '../context/RekomendasiContext'
import Skeleton from 'react-loading-skeleton'
import { arrayLength } from '../arrayLength'
import { Link } from 'react-router-dom'

export default function Rekomendasi(props) {
  const { className = 'lg:grid-cols-2', lgFull = false } = props
  const context = useContext(RekomendasiContext)
  return (
    <>
      <div
        className={`${
          !lgFull && 'lg:max-w-0'
        } text-sm lg:text-md lg:min-w-[19.1rem] self-start`}
      >
        <div className='flex h-[2.73rem] text-white items-center justify-between rounded-t-md px-4 bg-sky-500 py-2'>
          <h3 className='text-base'>Recomendation</h3>
          <BsFillCalendarHeartFill />
        </div>
        <div className='p-2 bg-zinc-800'>
          <ul
            className={`${className} gap-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5`}
          >
            {context.loading ? (
              <>
                {arrayLength(20).map((i) => {
                  return <Skeleton key={i} className='h-40 sm:h-56 md:h-52 lg:h-48' />
                })}
              </>
            ) : (
              context.values.map((list) => {
                const handleEmpty = list.animeTitle == ''
                if (handleEmpty) {
                  list.animeTitle = 'Oshi no Ko'
                }
                return (
                  <li key={list.animeId} className='relative'>
                    <Link to={`/anime/${list.animeId}`}>
                      <img
                        src={list.animeImg}
                        alt={list.animeTitle}
                        className='w-full h-full'
                      />
                      <span className='px-1 text-white absolute line-clamp-2 right-0 bottom-0 left-0 sm:text-md lg:text-sm text-center bg-black/50 py-1'>
                        {list.animeTitle}
                      </span>
                    </Link>
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
