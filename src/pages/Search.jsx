/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Card from '../components/Card'
import Container from '../components/Container'
import Rekomendasi from '../layouts/Rekomendasi'
import Skeleton from 'react-loading-skeleton'
import { arrayLength } from '../arrayLength'

export default function Search() {
  const [search, setSearch] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { param } = useParams()
  const url = `${import.meta.env.VITE_URL}/search?keyw=${param}`

  const searchAnime = async (num = 1) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    await fetch(`${url}&page=${num}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error || res.length == 0) {
          return setNotFound(true)
        }
        setSearch(res)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    searchAnime()
  }, [param])

  const handleChangePagination = (_, number) => {
    searchAnime(number)
  }

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta
          name='description'
          content={`Search anime ${param} subtitle english - Shiganime`}
        />
        <meta
          name='keywords'
          content='search, anime, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Search - {param}</title>
      </Helmet>
      <div className='bg-zinc-700'>
        <Navbar />
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
            <>
              <Content
                title={`Search: ${param}`}
                pagination={20}
                onChange={handleChangePagination}
              >
                {loading ? (
                  <>
                    {arrayLength(20).map((i) => {
                      return (
                        <Skeleton key={i} className='h-40 sm:h-56 md:h-52' />
                      )
                    })}
                  </>
                ) : (
                  <>
                    {search.map((item) => {
                      return (
                        <Card
                          key={item.animeId}
                          animeImg={item.animeImg}
                          animeId={item.animeId}
                          status={item.status}
                        >
                          {item.animeTitle}
                        </Card>
                      )
                    })}
                  </>
                )}
              </Content>
            </>
          )}
          <Rekomendasi />
        </Container>
        <Footer />
      </div>
    </>
  )
}
