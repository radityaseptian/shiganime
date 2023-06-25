import { BiArrowToTop } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const navbar = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Genre',
    path: '/genre-list',
  },
  {
    name: 'Movie',
    path: '/movie',
  },
  {
    name: 'Dubbing',
    path: '/dubbing',
  },
  {
    name: 'Chinese',
    path: '/chinese',
  },
]

export default function Navbar() {
  const [slider, setSlider] = useState(false)
  const [value, setValue] = useState('')
  const [target, setTarget] = useState('')
  const navigate = useNavigate()

  const search = (e) => {
    if (e.key == 'Enter') {
      if (value.length >= 3) {
        const split = e.target.value.split(' ').join('-')
        navigate(`/search/${split}`)
      }
    }
  }

  useEffect(() => {
    if (location.pathname === '/') {
      setTarget('/home')
    } else {
      setTarget(location.pathname)
    }
  }, [])

  return (
    <>
      <nav className='bg-sky-400'>
        <div className='max-w-6xl mx-auto'>
          <div className='h-24 box-border antialiased flex md:flex-row flex-col justify-between py-1'>
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
              <div className='md:self-end relative mx-2 flex-1 overflow-hidden rounded'>
                <input
                  value={value}
                  onKeyDown={search}
                  onChange={(e) => setValue(e.target.value)}
                  type='text'
                  placeholder='Search anime...'
                  className='text-sm w-full h-8 focus:outline-none pl-2 pr-10'
                />
                <FiSearch
                  onClick={search}
                  className='absolute right-0 top-0 box-content p-2 cursor-pointer'
                />
              </div>
            </div>
          </div>
          {slider && (
            <>
              <ul className='overflow-hidden text-sm p-2 md:hidden bg-sky-500 text-white space-y-2'>
                {navbar.map(({ name, path }) => {
                  let newPathTarget = path === '/' ? '/home' : path
                  return (
                    <li key={name}>
                      <Link
                        to={path}
                        className={`${
                          target === newPathTarget && 'bg-sky-400'
                        } block p-2 hover:bg-sky-400`}
                      >
                        {name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
          <ul className='hidden md:flex justify-between p-2 gap-2'>
            {navbar.map(({ name, path }) => {
              let newPathTarget = path === '/' ? '/home' : path
              return (
                <li
                  key={name}
                  className={`${
                    target === newPathTarget && 'bg-sky-600 text-white'
                  } flex-1 text-center overflow-hidden bg-sky-500 hover:bg-sky-600 hover:text-white`}
                >
                  <Link to={path} className='py-2 block'>
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      <BackToTop />
    </>
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
        className='scroll-smooth z-50 text-white p-3 sm:p-4 fixed bottom-6 right-6 rounded-md cursor-pointer box-content bg-black/20 hover:bg-black/30'
      />
    </>
  )
}
