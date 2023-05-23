import { BiArrowToTop } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [slider, setSlider] = useState(false)
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const search = (e) => {
    if (e.key == 'Enter') {
      if (value.length >= 3) {
        const split = e.target.value.split(' ').join('-')
        navigate(`/search/${split}`)
      }
    }
  }
  return (
    <>
      <nav className='bg-sky-400 md:px-2'>
        <div className='w-full h-24 box-border antialiased flex md:flex-row flex-col justify-between md:pl-2 py-1'>
          <div className='grid px-20 pb-1 place-content-center flex-1 md:flex-none'>
            <Link to='/'>
              <h1 className='text-5xl font-dancing'>Shiganime.</h1>
            </Link>
          </div>
          <div className='flex md:flex-1 justify-between items-center '>
            <div
              onClick={() => setSlider(!slider)}
              className='flex flex-col md:hidden bg-sky-500 p-2 rounded gap-1 cursor-pointer mx-4'
            >
              <span className='h-1 w-7 rounded bg-white'></span>
              <span className='h-1 w-7 rounded bg-white'></span>
              <span className='h-1 w-7 rounded bg-white'></span>
            </div>
            <div className='self-end relative mx-2 flex-1 overflow-hidden rounded'>
              <input
                value={value}
                onKeyDown={search}
                onChange={(e) => setValue(e.target.value)}
                type='text'
                placeholder='Search anime...'
                className='text-xs sm:text-sm w-full h-8 focus:outline-none focus:rounded focus:border-[1px] border-slate-500 pl-2 pr-10'
              />
              <FiSearch
                onClick={search}
                className='absolute right-0 top-0 box-content p-2 cursor-pointer'
              />
            </div>
          </div>
        </div>
        {slider && <NavSlider />}
        <NavBottom />
      </nav>
      <BackToTop />
    </>
  )
}

function NavSlider() {
  return (
    <div className='text-sm p-2 md:hidden bg-sky-500 text-white [&>ul>li]:py-2'>
      <ul className='overflow-hidden'>
        <li>
          <Link to='/' className='pr-[100%] box-content p-2 hover:bg-sky-400'>
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/genres-list'
            className='pr-[100%] box-content p-2 hover:bg-sky-400'
          >
            Genre
          </Link>
        </li>
        <li>
          <Link
            to='/movie'
            className='pr-[100%] box-content p-2 hover:bg-sky-400'
          >
            Movie
          </Link>
        </li>
      </ul>
    </div>
  )
}
function NavBottom() {
  return (
    <div className='hidden md:block'>
      <ul className='flex justify-between px-2 pb-2 pt-1 gap-2 [&>li]:bg-sky-500'>
        <li className='flex-1 text-center overflow-hidden'>
          <Link to='/' className='py-2 block hover:bg-sky-600 hover:text-white'>
            Home
          </Link>
        </li>
        <li className='flex-1 text-center overflow-hidden'>
          <Link
            to='/genres-list'
            className='py-2 block hover:bg-sky-600 hover:text-white'
          >
            Genre
          </Link>
        </li>
        <li className='flex-1 text-center overflow-hidden'>
          <Link
            to='/movie'
            className='py-2 block hover:bg-sky-600 hover:text-white'
          >
            Movie
          </Link>
        </li>
      </ul>
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
        className='scroll-smooth z-50 p-3 sm:p-4 fixed bottom-3 right-3 rounded-md cursor-pointer box-content bg-black/10 hover:bg-black/20'
      />
    </>
  )
}
