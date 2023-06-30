import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <>
      <Navbar />
      <div className='min-h-screen px-4 py-10 text-center max-w-lg mx-auto text-white'>
        <center>
          <img src='/hutao.jpg' className='h-56' />
        </center>
        <h1 className='py-6 text-3xl font-medium'>About Shiganime.</h1>
        <p className='leading-8'>
          Shiganime is a website where you can watch or stream anime that you
          like with English subtitles, dubbing, Chinese, movies, for free.
          Formed in April 2023
        </p>
      </div>
      <Footer />
    </>
  )
}
