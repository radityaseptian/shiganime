import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Genres from './Genres'

import { HiHome } from 'react-icons/hi'
import { BiArrowToTop } from 'react-icons/bi'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { IoSearch, IoClose } from 'react-icons/io5'
import { FaChevronLeft } from 'react-icons/fa'
import { AiOutlineGithub } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function Navbar({ random = [] }) {
  const navigate = useNavigate()
  const [slider, setSlider] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const animeRandom = () => {
    const href = Math.floor(Math.random() * random.length)
    navigate('/anime/' + random[href].animeId)
  }

  return (
    <>
      <nav className='bg-zinc-900 text-[#e9e8e8] fixed inset-0 bottom-auto z-50 py-3'>
        <div className='max-w-6xl mx-auto flex justify-between px-2'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2'>
                <FaChevronLeft
                  title='Back'
                  onClick={() => history.back()}
                  className='hover:text-white cursor-pointer h-5 w-5 mt-[.10rem]'
                />
                <Link to='/' title='Home'>
                  <HiHome className='w-6 h-6 hover:text-white' />
                </Link>
              </div>
              <Title className='hidden md:block' />
              {!showSearch ? (
                <Title className='md:hidden' />
              ) : (
                <SearchInput className='md:hidden' />
              )}
            </div>
            <SearchInput className='hidden md:block' />
            <div className='hidden md:block'>
              <Helper onClick={animeRandom} />
            </div>
          </div>
          <div className='flex gap-3 items-center ml-1 md:hidden'>
            <div onClick={() => setShowSearch(!showSearch)}>
              {!showSearch ? (
                <IoSearch className='h-7 w-7 cursor-pointer' />
              ) : (
                <IoClose className='h-8 w-8 cursor-pointer' />
              )}
            </div>
            <RxHamburgerMenu
              onClick={() => setSlider(!slider)}
              className='h-8 w-8 cursor-pointer'
            />
          </div>
        </div>
      </nav>
      {slider && (
        <div className='md:hidden fixed z-40 right-0 bottom-0 top-14 max-h-screen overflow-hidden overflow-y-scroll bg-zinc-800'>
          <div className='p-2'>
            <Helper onClick={animeRandom} />
          </div>
          <Genres />
        </div>
      )}
      {/* Empty Point for handle display fixed navbar */}
      <div className='h-12 md:h-14'></div>
      <BackToTop />
    </>
  )
}

function Title({ className }) {
  return (
    <Link to='/' title='Shiganime' className={className}>
      <h1 className='text-2xl md:text-3xl font-medium hover:text-white'>
        SHIGANIME
      </h1>
    </Link>
  )
}

function SearchInput({ className }) {
  const input = useRef(null)
  const navigate = useNavigate()
  const search = (e) => {
    if (e.key == 'Enter' || e.type == 'click') {
      const str = input.current.value.trim()
      if (str.length >= 3) {
        navigate(`/search/${str.split(' ').join('-')}`)
      }
    }
  }
  return (
    <label title='Search' htmlFor='text' className={`${className} relative`}>
      <input
        onKeyDown={search}
        ref={input}
        id='text'
        type='text'
        placeholder='Search...'
        className='w-full outline outline-1 outline-slate-700 focus:outline-sky-400 bg-[#131313] px-2 md:pr-9 py-1 rounded placeholder:text-white/50'
      />
      <IoSearch
        onClick={search}
        className='hidden md:block absolute box-content p-1 right-1 top-[.20rem] w-5 h-5 text-white/50 cursor-pointer'
      />
    </label>
  )
}

function Helper(props) {
  return (
    <div className='flex items-center gap-3 font-mono text-[#e9e8e8]'>
      <div
        {...props}
        title='Random'
        className='flex items-center gap-1 cursor-pointer hover:text-white'
      >
        <GiPerspectiveDiceSixFacesRandom className='w-5 h-5' />
        <span>Random</span>
      </div>
      <a
        title='Github'
        href='https://github.com/radityaseptian'
        target='_blank'
        className='flex items-center gap-1 cursor-pointer hover:text-white'
      >
        <AiOutlineGithub className='w-5 h-5' />
        <span>Github</span>
      </a>
    </div>
  )
}

function BackToTop() {
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    toTop()
  }, [])
  return (
    <>
      <BiArrowToTop
        onClick={toTop}
        className='scroll-smooth z-30 text-white p-4 fixed bottom-6 right-6 rounded-md cursor-pointer box-content bg-black/20 hover:bg-black/30'
      />
    </>
  )
}
