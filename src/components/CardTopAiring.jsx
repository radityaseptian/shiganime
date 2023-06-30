/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

export default function CardTopAiring({
  animeId,
  children,
  animeImg,
  latestEp,
  genres,
}) {
  return (
    <>
      <li
        key={animeId}
        className='flex gap-2 text-sm text-slate-300 bg-zinc-900 max-h-40 rounded overflow-hidden p-2'
      >
        <Link to={`/anime/${animeId}`}>
          <img
            src={animeImg}
            alt={animeId}
            className='max-w-[6rem] min-w-[6rem] h-full'
          />
        </Link>
        <div>
          <Link to={`/anime/${animeId}`}>
            <p className='text-sky-400 text-[15px] line-clamp-2'>{children}</p>
          </Link>
          <div className='flex gap-1 flex-wrap pt-3 pb-1'>
            <span>Genres:</span>
            {genres.map((item, i) => {
              const removeGagHumor = item == 'Gag Humor'
              if (removeGagHumor) {
                item = ''
              }
              return (
                <Link to={`/genre/${item.toLowerCase()}`} key={i}>
                  {item}
                </Link>
              )
            })}
          </div>
          <div className='flex gap-1'>
            <span>Latest:</span>
            <Link
              to={`/watch/${
                animeId + '-' + latestEp.toLowerCase().split(' ').join('-')
              }`}
              className='text-white'
            >
              {latestEp}
            </Link>
          </div>
        </div>
      </li>
    </>
  )
}
