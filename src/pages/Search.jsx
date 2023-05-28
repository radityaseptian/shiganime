/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Search() {
  const [search, setSearch] = useState([])
  const { param } = useParams()
  const url = `${import.meta.env.VITE_URL}/search?keyw=${param}`

  const initSearch = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setSearch(res))
  }
  useEffect(() => {
    initSearch()
  }, [param])

  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content={`Search anime ${param} subtitle english - Shiganime`} />
        <meta
          name='keywords'
          content='search, anime, Shiganime, streaming anime subtitle english'
        />
        <meta name='author' content='Raditya Septian' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Search - {param}</title>
      </Helmet>
      <div className='bg-slate-100'>
        <Navbar />
        <div className='container mx-auto max-w-6xl'>
          <Content value={search} title={`Search: ${param}`} />
          <Footer />
        </div>
      </div>
    </>
  )
}
