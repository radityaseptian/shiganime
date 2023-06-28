import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Skeleton from 'react-loading-skeleton'

import { BsTagsFill } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Slider() {
  const [animeSlider, setAnimeSlider] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const url = import.meta.env.VITE_URL + '/anime-details'
  const length = animeSlider.length

  useEffect(() => {
    async function getAnimeSlider() {
      const animeUrl = [
        `${url}/one-piece`,
        `${url}/yakusoku-no-neverland`,
        `${url}/tokyo-ghoul`,
        `${url}/made-in-abyss`,
        `${url}/mushishi`,
      ]
      const responses = await Promise.all(
        animeUrl.map(async (url) => {
          const response = await fetch(url)
          const data = await response.json()
          return data
        })
      )
      setAnimeSlider(responses)
      setLoading(false)
    }
    getAnimeSlider()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLast = currentImage + 1 === length
      isLast ? setCurrentImage(0) : setCurrentImage(currentImage + 1)
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentImage])

  let genres = ''
  animeSlider[currentImage]?.genres?.forEach((item, i) => {
    if (animeSlider[currentImage]?.genres?.length == i + 1) {
      return (genres += item)
    }
    genres += `${item}, `
  })

  const next = () => {
    const isLast = currentImage + 1 === length
    isLast ? setCurrentImage(0) : setCurrentImage(currentImage + 1)
  }

  const prev = () => {
    const isFirst = length - currentImage === length
    isFirst ? setCurrentImage(length - 1) : setCurrentImage(currentImage - 1)
  }

  return (
    <div className='relative bg-zinc-800 flex h-40 rounded overflow-hidden mx-2 mb-2 md:mb-4 md:mx-0 text-white/70 text-sm'>
      {!loading && (
        <span
          style={{
            backgroundImage: `url('${animeSlider[currentImage].animeImg}')`,
          }}
          className='absolute inset-0 opacity-40 blur-lg bg-no-repeat bg-cover bg-center'
        ></span>
      )}
      {loading ? (
        <div className='flex flex-1'>
          <Skeleton className='max-w-[7rem] min-w-[7rem] h-full' />
          <div className='flex-1 flex flex-col space-y-2 px-3 py-4'>
            <Skeleton containerClassName='max-w-[12rem]' />
            <Skeleton count={3} containerClassName='w-full' />
            <Skeleton containerClassName='max-w-[20rem]' />
          </div>
        </div>
      ) : (
        <div>
          <Link
            to={
              '/anime/' +
              animeSlider[currentImage]?.animeTitle
                .split(' ')
                .join('-')
                .toLowerCase()
            }
          >
            <img
              src={animeSlider[currentImage]?.animeImg}
              className='max-w-[7rem] min-w-[7rem] h-full relative'
            />
          </Link>
          <div className='p-3 space-y-2 absolute inset-0 left-28'>
            <Link
              to={
                '/anime/' +
                animeSlider[currentImage]?.animeTitle
                  .split(' ')
                  .join('-')
                  .toLowerCase()
              }
            >
              <h2 className='text-sky-400 line-clamp-1 text-base md:text-lg'>
                {animeSlider[currentImage]?.animeTitle}
              </h2>
            </Link>
            <p className='line-clamp-3'>
              {animeSlider[currentImage]?.synopsis}
            </p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div>
                  <BsTagsFill />
                </div>
                <span className='line-clamp-1'>{genres}</span>
              </div>
              <div className='flex items-center gap-1'>
                <FaChevronLeft
                  onClick={prev}
                  className='w-4 h-4 cursor-pointer box-content p-2 rounded-full hover:bg-zinc-700'
                />
                <FaChevronRight
                  onClick={next}
                  className='w-4 h-4 cursor-pointer box-content p-2 rounded-full hover:bg-zinc-700'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
