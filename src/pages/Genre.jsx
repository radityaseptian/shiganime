/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { RekomendasiContext } from '../context/RekomendasiContext'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const [rekomendasi, setRekomendasi] = useState([])
  const [genre, setGenre] = useState([])

  const { id } = useParams()
  const url = `https://gogoanime.consumet.stream/genre/${id}`

  useEffect(() => {
    initRekomendasi()
    initGenre()
    document.title = `Genre - ${id}`
  }, [])
  const initGenre = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setGenre(res))
  }
  const initRekomendasi = async () => {
    await fetch('https://gogoanime.consumet.stream/popular')
      .then((res) => res.json())
      .then((res) => setRekomendasi(res))
  }
  return (
    <>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='container mx-auto max-w-6xl'>
          <RekomendasiContext.Provider value={rekomendasi}>
            <Content value={genre} pageCount={30} url={url} title={'Genre'} />
          </RekomendasiContext.Provider>
          <Footer />
        </div>
      </div>
    </>
  )
}
