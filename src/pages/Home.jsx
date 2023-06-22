/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Skeleton from 'react-loading-skeleton'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Container from '../components/Container'
import Card from '../components/Card'
import Rekomendasi from '../layouts/Rekomendasi'
import { arrayLength } from '../arrayLength'

export default function Home() {
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const url = `${import.meta.env.VITE_URL}/recent-release`

  useEffect(() => {
    initRecent()
  }, [])
  const initRecent = async (num = 1) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    await fetch(`${url}?page=${num}`)
      .then((res) => res.json())
      .then((res) => setRecent(res))
      .finally(() => setLoading(false))
  }
  const handleChangePagination = (_, number) => {
    initRecent(number)
  }

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content='Watch anime subtitle English' />
        <meta
          name='keywords'
          content='anime, streaming, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Shiganime - Watch Anime Subtitle English</title>
      </Helmet>
      <div className='bg-zinc-700'>
        <Navbar />
        <Container>
          <Content
            title='Anime On-Going'
            pagination={312}
            onChange={handleChangePagination}
          >
            {loading ? (
              <>
                {arrayLength(20).map((i) => {
                  return <Skeleton key={i} className='h-40 sm:h-56 md:h-52' />
                })}
              </>
            ) : (
              <>
                {recent.map((item) => {
                  const oshiNoKo = item.animeTitle == ''
                  if (oshiNoKo) {
                    item.animeTitle = 'Oshi no Ko'
                  }
                  return (
                    <Card
                      key={item.animeId}
                      animeId={item.animeId}
                      animeImg={item.animeImg}
                      episodeNum={item.episodeNum}
                    >
                      {item.animeTitle}
                    </Card>
                  )
                })}
              </>
            )}
          </Content>
          <Rekomendasi />
        </Container>
        <Footer />
      </div>
    </>
  )
}
