import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import Rekomendasi from '../layouts/Rekomendasi'
import { Helmet } from 'react-helmet'
import Container from '../components/Container'
import TopAiring from '../layouts/TopAiring'

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
  'Mmusic',
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

export default function GenreList() {
  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content='Genre lists anime' />
        <meta
          name='keywords'
          content='anime, streaming, Shiganime, genre list,streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Genre List</title>
      </Helmet>
      <div className='bg-zinc-700'>
        <Navbar />
        <Container>
          <main className='max-w-[52rem] self-start'>
            <div className='p-2 bg-sky-400'>
              <h2 className='text-lg'>Genre List</h2>
            </div>
            <ul className='flex flex-wrap shadow-md bg-zinc-800 gap-2 p-2 [&>li]:py-2 text-base'>
              {genres.map((item) => {
                return (
                  <>
                    <li key={item}>
                      <Link
                        className='px-3 py-2 bg-sky-400 hover:text-white hover:bg-sky-500'
                        to={`/genre/${item}`}
                      >
                        {item}
                      </Link>
                    </li>
                  </>
                )
              })}
            </ul>
            <TopAiring />
          </main>
          <Rekomendasi />
        </Container>
        <Footer />
      </div>
    </>
  )
}
