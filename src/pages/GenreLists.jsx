import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import Rekomendasi from '../layouts/Rekomendasi'
import { genres } from '../genres'
import { Helmet } from 'react-helmet'

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
      <div className='bg-slate-100'>
        <Navbar />
        <div className='max-w-6xl lg:flex mx-auto'>
          <div>
            <div className='bg-sky-500 mt-2'>
              <h1 className='p-2 px-3'>Genre List</h1>
            </div>
            <ul className='flex flex-wrap shadow-md bg-slate-200 gap-2 p-2 [&>li]:py-2 text-xs md:text-sm xl:text-md'>
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
          </div>
          <div className='lg:w-full p-2'>
            <Rekomendasi />
          </div>
        </div>
        <div className='mx-auto container max-w-6xl'>
          <Footer />
        </div>
      </div>
    </>
  )
}
