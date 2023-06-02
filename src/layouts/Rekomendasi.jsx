/* eslint-disable react/prop-types */
import { BsFillCalendarHeartFill } from 'react-icons/bs'
import { useContext } from 'react'
import { RekomendasiContext } from '../context/RekomendasiContext'
import { Loading } from '../components/Loading'
import { arrayLength } from '../arrayLength'
import { Link } from 'react-router-dom'

export default function Rekomendasi({ className = 'lg:grid-cols-2' }) {
  const context = useContext(RekomendasiContext)
  return (
    <>
      <div className='text-sm lg:text-md shadow-md lg:min-w-[19.1rem] self-start'>
        <div className='flex h-[2.73rem] text-white items-center shadow-md justify-between rounded-t-md px-4 bg-sky-500 py-2'>
          <h3 className='text-base'>Recomendation</h3>
          <BsFillCalendarHeartFill />
        </div>
        <div className='overflow-hidden p-2 bg-zinc-800'>
          <ul
            className={`${className} flex flex-wrap justify-center gap-2 lg:grid`}
          >
            {context.loading ? (
              <>
                {arrayLength(20).map((i) => {
                  return <Loading key={i} />
                })}
              </>
            ) : (
              context.values.map((list) => {
                const handleEmpty = list.animeTitle == ''
                if (handleEmpty) {
                  list.animeTitle = 'Oshi no Ko'
                }
                return (
                  <li
                    key={list.animeId}
                    className='relative w-32 h-44 lg:w-full overflow-hidden flex-initial'
                  >
                    <Link to={`/anime/${list.animeId}`}>
                      <img
                        src={list.animeImg}
                        alt={list.animeTitle}
                        className='w-full h-full'
                      />
                      <span className='text-xs px-1 text-white absolute line-clamp-2 right-0 bottom-0 left-0 sm:text-md lg:text-sm text-center bg-black/50 py-1'>
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
