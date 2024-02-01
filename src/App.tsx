import { useEffect, useRef, useState } from "react"
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
import getChapterDuration from "@/functions/getChapterDuration"

function App() {
  const [film, setFilm] = useState<Film | null>(null)
  const [chapters, setChapters] = useState<Chapters | null>(null)
  const [waypoints, setWaypoints] = useState<Waypoints | null>(null)
  const [keywords, setKeywords] = useState<Keywords | null>(null)

  const [currentChapter, setCurrentChapter] = useState<number | null>(null)
  const [currentChapterDuration, setCurrentChapterDuration] = useState<number | null>(null)
  const [currentChapterProgress, setCurrentChapterProgress] = useState<number | null>(null)

  const videoPlayer = useRef<HTMLVideoElement | null>(null)
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

  const playChapter = (chapter: number) => {
    setCurrentChapter(chapter)
    if (currentChapter !== null) {
      videoPlayer.current!.currentTime = Number(chapters![chapter].pos)
    }
  }

  const updateTime = (currentTime: number) => {
    // Find the corresponding chapter
    let currentChapter = chapters!.length - 1
    while (currentTime < Number(chapters![currentChapter].pos)) {
      currentChapter -= 1
    }

    // Update current chapter
    setCurrentChapter(currentChapter)
    setCurrentChapterDuration(getChapterDuration(chapters!, currentChapter!, videoPlayer.current!.duration))
    setCurrentChapterProgress(videoPlayer.current!.currentTime - Number(chapters![currentChapter!].pos))
  }

  const content = (film === null)
    ? <Loader />
    : <>
      <Banner title={film.title} synopsisUrl={film.synopsis_url} />

      <main className="flex-grow flex justify-center items-start px-8 py-4">
        <VideoPlayer className="flex-grow p-2" sourceUrl={film.file_url} updateTime={updateTime} ref={videoPlayer} />

        <div className="flex flex-col gap-4 ml-2 px-4 py-2 border-l border-neutral-300">
          <Chaptering
            chapters={chapters!}
            currentChapter={currentChapter}
            currentChapterDuration={currentChapterDuration!}
            currentChapterProgress={currentChapterProgress!}
            playChapter={playChapter} />

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
