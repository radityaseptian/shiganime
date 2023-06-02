/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Card from '../components/Card'
import Container from '../components/Container'
import Rekomendasi from '../layouts/Rekomendasi'
import { Loading } from '../components/Loading'
import { arrayLength } from '../arrayLength'
import notFoundImg from '/404.webp'

export default function Movie() {
  const [genre, setGenre] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const url = `${import.meta.env.VITE_URL}/genre/${id}`

  useEffect(() => {
    initGenre()
  }, [])
  const initGenre = async (num = 1) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    await fetch(`${url}?page=${num}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error || res.length == 0) {
          return setNotFound(true)
        }
        setGenre(res)
      })
      .finally(() => setLoading(false))
  }

  const handleChangePagination = (_, number) => {
    initGenre(number)
  }

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta
          name='description'
          content={`Watch Anime Genre ${id} Subtitle English - Shiganime`}
        />
        <meta
          name='keywords'
          content='anime, streaming, genre, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Genre - {id}</title>
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
                title={`Genre - ${id}`}
                pagination={30}
                onChange={handleChangePagination}
              >
                {loading ? (
                  <>
                    {arrayLength(20).map((i) => {
                      return <Loading key={i} className='min-h-[9rem] sm:h-52 md:h-48 lg:h-52' />
                    })}
                  </>
                ) : (
                  <>
                    {genre.map((item) => {
                      return (
                        <>
                          <Card
                            key={item.animeId}
                            animeImg={item.animeImg}
                            releasedDate={item.releasedDate}
                            animeId={item.animeId}
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
