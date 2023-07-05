import { FaFacebookF, FaGithub } from 'react-icons/fa'
import FootList from '../components/FootList'
import Container from '../components/Container'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <Container>
        <footer className='border-t-[1px] text-slate-300 border-slate-400 px-2 lg:px-8 py-10 md:py-14 mt-10 md:mt-14'>
          <div className='grid sm:grid-cols-2  md:grid-cols-3 lg:gap-10'>
            <div>
              <div className='pb-2 font-patua text-white text-lg'>
                Shiganime.
              </div>
              <p className=' text-sm lg:text-base leading-6'>
                A simple application where you can enjoy watching anime videos
                that you like.
              </p>
              <p className=' text-sm lg:text-base leading-6 pt-2'>
                This website using public api
                <a
                  href='https://github.com/riimuru/gogoanime-api'
                  target='_blank'
                  rel='noreferrer'
                  className=' underline text-slate-100'
                >
                  Gogoanime-api
                </a>
              </p>
              <div className=' text-sm py-3'>
                COPYRIGHT (C) 2023. CREATED BY RMS
              </div>
            </div>
            <div className='flex justify-around lg:justify-between my-4 md:my-0'>
              <ul className='space-y-1'>
                <li className='font-patua text-white'>Sitemap</li>
                <FootList>Home</FootList>
                <FootList>Genre</FootList>
                <FootList>Search</FootList>
                <FootList>About</FootList>
                <FootList>Anime Detail</FootList>
              </ul>
              <div className='space-y-6'>
                <ul className='space-y-1'>
                  <li className='font-patua text-white'>Partner</li>
                  <FootList>No one 😅</FootList>
                </ul>
                <ul>
                  <Link to='/about'>
                    <li className='font-patua text-white no-underline'>
                      About
                    </li>
                    <FootList>About Shiganime</FootList>
                  </Link>
                </ul>
              </div>
            </div>
            <div className='mt-3 md:mt-0 flex flex-col items-center'>
              <span className='font-patua text-white'>Stay Conected</span>
              <p className=' text-sm lg:text-base leading-6 py-2'>
                Find me on social media:
              </p>
              <div className='flex gap-2 lg:gap-3'>
                <a
                  href='https://www.facebook.com/profile.php?id=100093066214468'
                  target='_blank'
                  rel='noreferrer'
                  className='p-2 hover:bg-black/50 rounded-full'
                >
                  <FaFacebookF className='w-5 h-5' />
                </a>
                <a
                  href='https://github.com/radityaseptian'
                  target='_blank'
                  rel='noreferrer'
                  className='p-2 hover:bg-black/50 rounded-full'
                >
                  <FaGithub className='w-5 h-5' />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </>
  )
}
