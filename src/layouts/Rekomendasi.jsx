/* eslint-disable react/prop-types */
import { BsFillCalendarHeartFill } from 'react-icons/bs'
import { useContext } from 'react'
import { RekomendasiContext } from '../context/RekomendasiContext'
import { LoadingRekomendasi } from '../components/Loading'
import { arrayLength } from '../arrayLength'

export default function Rekomendasi({ className = 'lg:grid-cols-2' }) {
  const context = useContext(RekomendasiContext)
  return (
    <>
      <div className='text-sm lg:text-md shadow-md'>
        <div className='flex h-[2.3rem] text-white items-center shadow-md justify-between w-full rounded-t-md px-4 bg-sky-500 py-2'>
          <h3>Recommendation</h3>
          <BsFillCalendarHeartFill />
        </div>
        <div className='overflow-hidden p-2 bg-slate-200'>
          <ul
            className={`${className} flex flex-wrap justify-evenly gap-1 lg:grid`}
          >
            {context.loading ? (
              <>
                {arrayLength(19).map((i) => {
                  return <LoadingRekomendasi key={i} />
                })}
              </>
            ) : (
              context.values.map((list) => {
                return (
                  <li
                    key={list.animeId}
                    className='relative w-32 h-44 lg:w-full overflow-hidden flex-initial'
                  >
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
