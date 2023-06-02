/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Card from '../components/Card'
import Container from '../components/Container'
import Rekomendasi from '../layouts/Rekomendasi'
import { Loading } from '../components/Loading'
import { arrayLength } from '../arrayLength'
import notFoundImg from '/404.webp'

export default function Movie() {
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const url = `${import.meta.env.VITE_URL}/anime-movies`

  useEffect(() => {
    initMovie()
  }, [])
  const initMovie = async (num = 1) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    await fetch(`${url}?page=${num}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          return setNotFound(true)
        }
        setMovie(res)
      })
      .finally(() => setLoading(false))
  }

  const handleChangePagination = (empty, number) => {
    initMovie(number)
  }

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content='Watch anime movie subtitle English' />
        <meta
          name='keywords'
          content='anime, streaming, Shiganime, movie anime,streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Movie Anime List</title>
      </Helmet>
      <div className='bg-zinc-700'>
        <Navbar />
        <Container>
          {notFound ? (
            <>
              <img
                src={notFoundImg}
                className='self-start mb-2 lg:w-10/12'
                alt='Not Found!'
              />
            </>
          ) : (
            <>
              <Content
                title={'Anime Movie'}
                pagination={100}
                onChange={handleChangePagination}
              >
                {loading ? (
                  <>
                    {arrayLength(20).map((i) => {
                      return <Loading key={i} className='h-36 sm:h-52' />
                    })}
                  </>
                ) : (
                  <>
                    {movie.map((item) => {
                      return (
                        <>
                          <Card
                            key={item.animeId}
                            animeId={item.animeId}
                            animeImg={item.animeImg}
                            releasedDate={item.releasedDate}
                          >
                            {item.animeTitle}
                          </Card>
                        </>
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
