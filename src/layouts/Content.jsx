/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Pagination } from '@mui/material'
import Card, { CardSearch } from '../components/Card'
import Rekomendasi from './Rekomendasi'
import { useEffect, useState } from 'react'

export default function Content({
  value,
  pageCount = 1,
  url,
  title,
  linkHome,
}) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(value)
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    handleChange()
  }, [])
  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [page])

  const handleChange = async (empty, number = '1') => {
    await fetch(`${url}?page=${number}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setData([])
          setError([
            true,
            'Page not found, please return to the previous page.',
          ])
        } else {
          setError([false])
          setData(res)
        }
      })
      .finally(() => {
        setLoading(false)
        setPage(number)
      })
  }
  return (
    <>
      <div className='lg:flex max-w-7xl mx-auto mt-2'>
        <main className='flex-1 md:mx-4 pb-2 bg-slate-200 md:shadow-md md:rounded-md md:overflow-hidden'>
          <div className='w-full flex items-center h-[2.3rem] md:rounded-t-sm bg-sky-400'>
            <h2 className='text-lg pl-2'>
              {title} {url && `Page: ${page}`}
            </h2>
          </div>
          {url ? (
            <Card
              value={data}
              loading={loading}
              error={error}
              linkHome={linkHome}
            />
          ) : (
            <CardSearch value={value} loading={loading} />
          )}
          <div className='flex justify-center my-6 lg:mt-12'>
            {url && (
              <Pagination
                count={pageCount}
                onChange={handleChange}
                variant='outlined'
                shape='rounded'
              />
            )}
          </div>
        </main>

        <div className='mt-2 mx-2 lg:mx-0 lg:mr-4 lg:mt-0 lg:w-3/12 text-slate-50'>
          <Rekomendasi loading={loading} />
        </div>
      </div>
    </>
  )
}
