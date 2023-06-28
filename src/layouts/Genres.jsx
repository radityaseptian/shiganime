import { Link } from 'react-router-dom'

import { BsTagsFill } from 'react-icons/bs'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { useState } from 'react'

const genres = [
  'action',
  'adventure',
  'cars',
  'comedy',
  'crime',
  'dementia',
  'demons',
  'drama',
  'dub',
  'ecchi',
  'family',
  'fantasy',
  'game',
  'gourmet',
  'harem',
  'historical',
  'horror',
  'josei',
  'kids',
  'magic',
  'martial-arts',
  'mecha',
  'military',
  'music',
  'mystery',
  'parody',
  'police',
  'psychological',
  'romance',
  'samurai',
  'school',
  'sci-fi',
  'seinen',
  'shoujo',
  'shoujo-ai',
  'shounen',
  'shounen-ai',
  'slice-of-Life',
  'space',
  'sports',
  'super-power',
  'supernatural',
  'suspense',
  'thriller',
  'vampire',
  'yaoi',
  'yuri',
]

export default function Genres({ className }) {
  const [more, setMore] = useState(false)

  return (
    <div className={`${className} bg-zinc-800 pb-2`}>
      <div className='flex h-[2.73rem] items-center justify-between px-4 bg-sky-400 py-2'>
        <h3>Genres</h3>
        <BsTagsFill />
      </div>
      <ul
        className={`${
          !more ? 'md:h-72' : 'max-h-none'
        } grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2 md:gap-1 p-2 text-white overflow-hidden`}
      >
        {genres.map((genre) => {
          return (
            <li key={genre}>
              <Link
                to={'/genre/' + genre}
                className='hover:bg-zinc-700 p-1 rounded capitalize text-sm'
              >
                {genre}
              </Link>
            </li>
          )
        })}
      </ul>
      <div
        onClick={() => setMore(!more)}
        className='hidden md:flex justify-center mt-1'
      >
        <span className='flex items-center gap-1 text-white bg-zinc-700 px-2 rounded cursor-pointer'>
          {!more ? <span>more</span> : <span>close</span>}
          <MdKeyboardArrowDown className={more && 'rotate-180'} />
        </span>
      </div>
    </div>
  )
}
