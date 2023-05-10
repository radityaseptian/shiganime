import Navbar from '../components/Navbar'
import Content from '../components/Content'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RekomendasiContext } from '../context/RekomendasiContext'

export default function Search() {
  const [search, setSearch] = useState([])
  const [rekomendasi, setRekomendasi] = useState([])
  const { param } = useParams()
  const url = `https://gogoanime.consumet.stream/search?keyw=${param}`

  const initSearch = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setSearch(res))
  }
  const initRekomendasi = async () => {
    await fetch('https://gogoanime.consumet.stream/popular')
      .then((res) => res.json())
      .then((res) => setRekomendasi(res))
  }
  useEffect(() => {
    initSearch()
    initRekomendasi()
  }, [])
  useEffect(() => {
    initSearch()
    document.title = `Search - ${param}`
  }, [param])

  return (
    <>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='container mx-auto max-w-6xl'>
          <RekomendasiContext.Provider value={rekomendasi}>
            <Content value={search} title={`Search: ${param}`} />
          </RekomendasiContext.Provider>
          <Footer />
        </div>
      </div>
    </>
  )
}
