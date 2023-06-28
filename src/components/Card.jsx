/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
export default function Card({
  animeId,
  animeImg,
  animeTitle,
  episodeNum,
  episodeId,
  releasedDate,
  children,
  status,
}) {
  return (
    <li
      key={animeId}
      className='relative text-sm text-center group overflow-hidden text-white max-h-60 sm:max-h-56 lg:max-h-60'
    >
      <Link to={episodeId ? `/watch/${episodeId}` : `/anime/${animeId}`}>
        <img src={animeImg} alt={animeTitle} className='h-full min-w-full' />
        <span
          className={`absolute bottom-0 -right-[1px] left-0 translate-y-9 px-2 py-1 h-16 group-hover:h-12 group-hover:translate-y-0 duration-500 line-clamp-2 bg-black/70`}
        >
          {children}
        </span>
      </Link>
      <span className='absolute top-0 left-0 py-1 px-2 text-xs bg-black/60'>
        {episodeNum && `Episode ${episodeNum}`}
        {releasedDate && `${releasedDate}`}
        {status && `${status}`}
      </span>
    </li>
  )
}
