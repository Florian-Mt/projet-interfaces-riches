import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMap } from "@fortawesome/free-solid-svg-icons"

import { JSON_API_URL } from "./constants.ts"
import { Chapters, JsonApiResponse, Keywords, Waypoints } from "./signatures.ts"
import Banner from "./components/Banner.tsx"
import Loader from "./components/Loader.tsx"
import Chaptering from "./components/Chaptering.tsx"
//import Chatroom from "./components/Chatroom.tsx"
import VideoPlayer from "./components/VideoPlayer.tsx"
import Map from "./components/Map.tsx"

function App() {
  const [film, setFilm] = useState<Film | null>(null)
  const [chapters, setChapters] = useState<Chapters | null>(null)
  const [waypoints, setWaypoints] = useState<Waypoints | null>(null)
  const [keywords, setKeywords] = useState<Keywords | null>(null)
  const mapLocation = {
    lat: 51.505, // Remplacez ces coordonnées par celles de votre emplacement
    lon: -0.09,
    name: 'Emplacement de la carte',
  };


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

  const content = (film === null)
    ? <Loader />
    : <>
      <Banner title={film!.title} synopsisUrl={film!.synopsis_url} />

      <main className="flex-grow flex justify-center items-start px-8 py-4">
        <VideoPlayer className="flex-grow p-2" sourceUrl={film.file_url} />

        <div className="flex flex-col gap-4 ml-2 px-4 py-2 border-l border-neutral-300">
          <Chaptering chapters={chapters!} />

          <button className="flex justify-center items-center gap-2 text-md button mb-2">
            <FontAwesomeIcon icon={faMap} />
            Ouvrir la carte
          </button>
          <Map mapLocation={mapLocation} />
        </div>
      </main>
    </>

  return (
		<div className="min-h-screen h-screen flex flex-col">
      {content}
    </div>
  )
}

export default App
