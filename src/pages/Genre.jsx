/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Movie() {
  const [genre, setGenre] = useState([])
  const { id } = useParams()
  const url = `${import.meta.env.VITE_URL}/genre/${id}`

  useEffect(() => {
    initGenre()
  }, [])
  const initGenre = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setGenre(res))
  }
  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content='specific genre anime' />
        <meta
          name='keywords'
          content='anime, streaming, genre, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Genre - {id}</title>
      </Helmet>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='container mx-auto max-w-6xl'>
          <Content value={genre} pageCount={30} url={url} title={'Genre'} />
          <Footer />
        </div>
      </div>
    </>
  )
}
