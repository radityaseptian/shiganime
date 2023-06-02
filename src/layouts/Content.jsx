/* eslint-disable react/prop-types */
import { Pagination } from '@mui/material'
import TopAiring from './TopAiring'

export default function Content(props) {
  const { children, title, pagination } = props
  return (
    <>
      <main className='self-start flex-1'>
        <div className='p-2 bg-sky-400'>
          <h2 className='text-lg'>{title}</h2>
        </div>
        <ul className='text-sm place-content-center grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-3 p-3 bg-zinc-800'>
          {children}
        </ul>
        <div className='mt-4 flex justify-center'>
          <Pagination {...props} count={pagination} variant='outlined' shape='rounded' />
        </div>
        <TopAiring />
      </main>
    </>
  )
}
