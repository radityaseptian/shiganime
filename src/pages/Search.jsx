/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Search() {
  const [search, setSearch] = useState([])
  const { param } = useParams()
  const url = `${import.meta.url}/search?keyw=${param}`

  const initSearch = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setSearch(res))
  }
  useEffect(() => {
    initSearch()
    document.title = `Search - ${param}`
  }, [param])

  return (
    <>
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
