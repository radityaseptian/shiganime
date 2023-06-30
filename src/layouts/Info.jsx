import Title from '../components/Title'
import Skeleton from 'react-loading-skeleton'
import { AiOutlineClose } from 'react-icons/ai'

export default function Info(props) {
  const { title, description, genres, image, type, releaseDate } = props

  let newGenres = ''
  if (genres) {
    genres.forEach((item, i) => {
      if (item === genres[genres.length - 1]) {
        return (newGenres += item)
      }
      newGenres += `${item}, `
    })
  }

  return (
    <div className='sm:relative'>
      <div className='fixed sm:absolute z-50 sm:z-10 inset-0 sm:inset-auto sm:right-0 sm:bottom-1 text-slate-200 sm:min-w-[20rem] min-h-[30rem] rounded overflow-y-scroll bg-zinc-800 border border-slate-400'>
        <div className='relative'>
          <Title title={title ? title : 'wait...'} center={true} />
          <AiOutlineClose
            onClick={props.onClick}
            className='absolute top-[.40rem] right-2 box-content p-2 bg-slate-700 hover:bg-slate-800 rounded-full cursor-pointer'
          />
        </div>
        <div className='p-2'>
          <center>
            {!image ? (
              <Skeleton className='w-[8.5rem] h-40 mb-2' />
            ) : (
              <img src={image} alt={title} className='h-44 mb-2' />
            )}
          </center>
          {!description ? (
            <Skeleton count={5} />
          ) : (
            <div className='sm:max-h-[8rem] overflow-scroll'>
              <p className='whitespace-normal text-white'>{description}</p>
            </div>
          )}
          <p className='py-2 flex gap-2'>
            <span className='text-white'>Type: </span>
            {!type ? (
              <Skeleton containerClassName='flex-1' width={90} />
            ) : (
              <span>{type}</span>
            )}
          </p>
          <p className='py-2 flex gap-2'>
            <span className='text-white'>Release: </span>
            {!releaseDate ? (
              <Skeleton containerClassName='flex-1' width={60} />
            ) : (
              <span>{releaseDate}</span>
            )}
          </p>
          <p className='flex gap-2'>
            <span className='text-white'>Genres: </span>
            {!genres ? (
              <Skeleton containerClassName='flex-1' />
            ) : (
              <span>{newGenres}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
