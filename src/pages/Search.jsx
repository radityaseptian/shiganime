import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import Recommendation from '../layouts/Recommendation'
import Genres from '../layouts/Genres'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import Skeleton from 'react-loading-skeleton'

import Card from '../components/Card'
import Container from '../components/Container'
import Title from '../components/Title'
import MoreButton from '../components/MoreButton'

import { arrayLength } from '../arrayLength'
import FacebookPage from '../components/FacebookPage'

export default function Search() {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [count, setCount] = useState(2)
  const [more, setMore] = useState(true)
  const [loadingFetch, setLoadingFetch] = useState(false)

  const { param } = useParams()
  const url = `${import.meta.env.VITE_URL}/search?keyw=${param}`

  const searchAnime = async (num = 1, refresh = true) => {
    setNotFound(false)
    await fetch(`${url}&page=${num}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0 && refresh) {
          return setNotFound(true)
        }
        res.length < 20 ? setMore(false) : setMore(true)
        refresh ? (setAnime(res), setCount(2)) : setAnime([...anime, ...res])
      })
      .finally(() => {
        setLoading(false)
        setLoadingFetch(false)
      })
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    searchAnime()
  }, [param])

  const getMore = () => {
    setLoadingFetch(true)
    if (!loading || !loadingFetch) {
      searchAnime(count, false)
      setCount(count + 1)
    }
  }

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta
          name='description'
          Content={`Search anime ${param} subtitle english - Shiganime`}
        />
        <meta
          name='keywords'
          Content='search, anime, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' Content='Raditya Septian' />
        <meta name='viewport' Content='width=device-width, initial-scale=1.0' />
        <title>Search - {param}</title>
      </Helmet>
      <Navbar random={anime} />
      <Container>
        {notFound ? (
          <>
            <img
              src='/404.webp'
              className='self-start mb-2 lg:w-10/12'
              alt='Not Found!'
            />
          </>
        ) : (
          <div className='w-full'>
            <Title title={`Search: ${param}`} />
            <Content>
              {loading ? (
                <>
                  {arrayLength(20).map((i) => {
                    return <Skeleton key={i} className='h-40 sm:h-56 md:h-52' />
                  })}
                </>
              ) : (
                <>
                  {anime.map((item) => {
                    return (
                      <Card
                        key={item.animeId}
                        animeImg={item.animeImg}
                        animeId={item.animeId}
                        status={item.status}
                        search={true}
                      >
                        {item.animeTitle}
                      </Card>
                    )
                  })}
                </>
              )}
            </Content>
            {more && (
              <MoreButton
                onClick={getMore}
                text={!loadingFetch ? 'More' : 'Wait'}
              />
            )}
          </div>
        )}
        <div className='space-y-2 lg:min-w-[17rem] lg:max-w-[17rem]'>
          <FacebookPage />
          <Genres className='hidden md:block' />
          <Recommendation />
        </div>
      </Container>
      <Footer />
    </>
  )
}
