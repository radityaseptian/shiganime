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

  const initTopAiring = async (num = 1) => {
    setLoading(true)
    await fetch(`${url}/top-airing?page=${num}`)
      .then((res) => res.json())
      .then((res) => setTopAiring(res))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    initTopAiring()
  }, [])

  const handleChangePagination = (_, number) => {
    initTopAiring(number)
  }

  return (
    <section className='my-10'>
      <div className='p-2 bg-sky-400'>
        <h2 className='text-lg'>Popular On Going Update</h2>
      </div>
      <ul className='grid sm:grid-cols-2 gap-2 p-2 bg-zinc-800'>
        {loading ? (
          <>
            {arrayLength(10).map((i) => {
              return (
                <>
                  <div key={i} className='bg-zinc-700 rounded flex gap-1 pr-2'>
                    <Skeleton height={136} width={98} className='m-2' />
                    <Skeleton
                      count={3}
                      height={20}
                      containerClassName='flex-1'
                      className='mt-4'
                    />
                  </div>
                </>
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
                <>
                  <CardTopAiring
                    key={item.animeId}
                    animeId={item.animeId}
                    animeImg={item.animeImg}
                    latestEp={item.latestEp}
                    genres={item.genres}
                  >
                    {item.animeTitle}
                  </CardTopAiring>
                </>
              )
            })}
          </>
        )}
      </ul>
      <div className='mt-4 flex justify-center'>
        <Pagination
          count={50}
          hideNextButton
          hidePrevButton
          variant='outlined'
          shape='rounded'
          onChange={handleChangePagination}
        />
      </div>
    </section>
  )
}
