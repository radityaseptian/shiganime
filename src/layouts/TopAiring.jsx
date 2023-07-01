/* eslint-disable react-hooks/exhaustive-deps */
import CardTopAiring from '../components/CardTopAiring'
import { Pagination } from '@mui/material'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { arrayLength } from '../arrayLength.js'

export default function TopAiring() {
  const [topAiring, setTopAiring] = useState([])
  const [loading, setLoading] = useState(true)
  const url = import.meta.env.VITE_URL

  const initTopAiring = async (_, num = 1) => {
    setLoading(true)
    await fetch(`${url}/top-airing?page=${num}`)
      .then((res) => res.json())
      .then((res) => setTopAiring(res))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    initTopAiring()
  }, [])

  return (
    <section className='my-14'>
      <div className='p-2 bg-sky-400'>
        <h2 className='text-lg'>Popular On Going Update</h2>
      </div>
      <ul className='grid sm:grid-cols-2 gap-2 p-2 bg-zinc-800 min-h-[12rem]'>
        {loading ? (
          <>
            {arrayLength(10).map((i) => {
              return (
                <div key={i} className='flex gap-2 p-2 pt-1 bg-zinc-900'>
                  <Skeleton height={136} width={98} />
                  <div className='flex-1 flex flex-col space-y-2 pt-2'>
                    <Skeleton containerClassName='w-full' />
                    <Skeleton containerClassName='max-w-[12rem]' />
                    <Skeleton containerClassName='max-w-[7rem]' />
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <>
            {topAiring.map((item) => {
              const oshiNoKo = item.animeTitle == ''
              if (oshiNoKo) {
                item.animeTitle = 'Oshi no Ko'
              }
              return (
                <CardTopAiring
                  key={item.animeId}
                  animeId={item.animeId}
                  animeImg={item.animeImg}
                  latestEp={item.latestEp}
                  genres={item.genres}
                >
                  {item.animeTitle}
                </CardTopAiring>
              )
            })}
          </>
        )}
      </ul>
      <div className='mt-4 flex justify-center'>
        <Pagination
          count={40}
          hideNextButton
          hidePrevButton
          variant='outlined'
          shape='rounded'
          onChange={initTopAiring}
        />
      </div>
    </section>
  )
}
