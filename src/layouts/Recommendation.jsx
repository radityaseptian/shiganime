/* eslint-disable react/prop-types */
import { BsFillHeartFill } from 'react-icons/bs'
import useRecommendation from '../context/RecommendationContext'
import Skeleton from 'react-loading-skeleton'
import { arrayLength } from '../arrayLength'
import { Link } from 'react-router-dom'

export default function Rekomendasi() {
  const context = useRecommendation()
  return (
    <>
      <div className='text-sm lg:text-md'>
        <div className='flex h-[2.73rem] items-center justify-between px-4 bg-sky-400 py-2'>
          <h3 className='text-base'>Recommendation</h3>
          <BsFillHeartFill className='text-red-600' />
        </div>
        <div className='p-2 bg-zinc-800'>
          <ul className='gap-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 '>
            {context.loading ? (
              <>
                {arrayLength(20).map((i) => {
                  return (
                    <Skeleton
                      key={i}
                      className='h-40 sm:h-56 md:h-52 lg:h-48'
                    />
                  )
                })}
              </>
            ) : (
              context?.values?.map((list) => {
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
