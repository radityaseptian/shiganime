/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../layouts/Navbar'
import Content from '../layouts/Content'
import Footer from '../layouts/Footer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const [genre, setGenre] = useState([])

  const { id } = useParams()
  const url = `${import.meta.url}/genre/${id}`

  useEffect(() => {
    initGenre()
    document.title = `Genre - ${id}`
  }, [])
  const initGenre = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setGenre(res))
  }
  return (
    <>
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
