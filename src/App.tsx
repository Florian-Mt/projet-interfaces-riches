import { useEffect, useState } from "react"
import { JSON_API_URL } from "./constants.ts"

function App() {
  const [film, setFilm] = useState<Film | null>(null)
  const [chapters, setChapters] = useState<Chapters | null>(null)
  const [waypoints, setWaypoints] = useState<Waypoints | null>(null)
  const [keywords, setKeywords] = useState<Keywords | null>(null)

  useEffect(() => {
    fetch(JSON_API_URL)
      .then((response) => response.json())
      .then((apiData: JsonApiResponse) => {
        setFilm(apiData.Film)
        setChapters(apiData.Chapters)
        setWaypoints(apiData.Waypoints)
        setKeywords(apiData.Keywords)
      })
  }, [])

  return <p>OK</p>
}

export default App
