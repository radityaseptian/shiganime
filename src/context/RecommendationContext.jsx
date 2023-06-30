import { createContext, useState, useEffect, useContext } from 'react'
const Context = createContext({ loading: true, values: [] })

export function RecommendationProvider({ children }) {
  const url = import.meta.env.VITE_URL
  const [recommendation, setRecommendation] = useState({
    loading: true,
    values: [],
  })
  useEffect(() => {
    const initRekomendasi = async () => {
      await fetch(`${url}/popular`)
        .then((res) => res.json())
        .then((res) => setRecommendation({ loading: false, values: res }))
    }
    initRekomendasi()
  }, [])
  return <Context.Provider value={recommendation}>{children}</Context.Provider>
}

export default function useRecommendation() {
  return useContext(Context)
}