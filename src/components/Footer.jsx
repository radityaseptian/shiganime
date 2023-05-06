/* eslint-disable react/prop-types */
import { FaFacebookF, FaGithub } from 'react-icons/fa'
import FootList from './FootList'

export default function Footer() {
  return (
    <>
      <footer className='border-t-[1px] border-[#0e144a46] px-2 lg:px-0 py-10 md:py-14 mt-10 md:mt-14'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:gap-10'>
          <div>
            <div className='pb-2 font-patua'>Shiganime.</div>
            <p className='text-[#0e144a9f] text-sm lg:text-base leading-6'>
              A simple application where you can enjoy watching anime videos
              that you like.
            </p>
            <p className='text-[#0e144a9f] text-sm lg:text-base leading-6 pt-2'>
              This website using public api{' '}
              <a
                href='https://github.com/riimuru/gogoanime-api'
                target='_blank'
                rel='noreferrer'
                className='text-blue-900 underline'
              >
                Gogonomi-api
              </a>
            </p>
            <div className='text-[#0e144a9f] text-sm py-3'>
              COPYRIGHT (C) 2023. CREATED BY RMS
            </div>
          </div>
          <div className='flex justify-around lg:justify-between my-4 md:my-0'>
            <ul className='space-y-1'>
              <li className='font-patua'>Sitemap</li>
              <FootList>Home</FootList>
              <FootList>Genre</FootList>
              <FootList>Movie</FootList>
              <FootList>Search</FootList>
              <FootList>Anime Detail</FootList>
            </ul>
            <ul className='space-y-1'>
              <li className='font-patua'>Partner</li>
              <FootList>No one 😅</FootList>
            </ul>
          </div>
          <div className='mt-3 md:mt-0 lg:pl-20'>
            <span className='py-2 lg:py-4 font-patua'>Stay Conected</span>
            <p className='text-[#0e144a9f] text-sm lg:text-base leading-6 py-2'>
              Find me on social media:
            </p>
            <div className='flex gap-2 lg:gap-3'>
              <a
                href='https://www.facebook.com/'
                target='_blank'
                rel='noreferrer'
                className='p-2 hover:bg-black/10 rounded-full'
              >
                <FaFacebookF />
              </a>
              <a
                href='https://github.com/'
                target='_blank'
                rel='noreferrer'
                className='p-2 hover:bg-black/10 rounded-full'
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
