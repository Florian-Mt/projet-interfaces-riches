import { useEffect, useRef, useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import { JSON_API_URL } from "@/constants.ts"
import { Chapters, Film, JsonApiResponse, Keywords, Waypoints } from "@/signatures.ts"
import Banner from "@/components/Banner.tsx"
import Chaptering from "@/components/Chaptering.tsx"
import Chatroom from "@/components/Chatroom.tsx"
import Loader from "@/components/Loader.tsx"
import Map from "@/components/Map.tsx"
import UiError from "@/components/UiError"
import VideoPlayer from "@/components/VideoPlayer.tsx"
import clamp from "./functions/clamp"
import findCorrespondingChapter from "@/functions/findCorrespondingChapter"
import getChapterDuration from "@/functions/getChapterDuration"

function App() {
	const [film, setFilm] = useState<Film | null>(null)
	const [chapters, setChapters] = useState<Chapters | null>(null)
	const [waypoints, setWaypoints] = useState<Waypoints | null>(null)
	const [keywords, setKeywords] = useState<Keywords | null>(null)
	const [apiError, setApiError] = useState<string | null>(null)

	const [currentChapter, setCurrentChapter] = useState<number | null>(null)
	const [currentChapterDuration, setCurrentChapterDuration] = useState<number | null>(null)
	const [currentChapterProgress, setCurrentChapterProgress] = useState<number | null>(null)

	const videoPlayer = useRef<HTMLVideoElement | null>(null)
	const mapLocation = {
		lat: 51.505, // Remplacez ces coordonnées par celles de votre emplacement
		lon: -0.09,
		name: "Emplacement de la carte",
	}

	useEffect(() => {
		fetch(JSON_API_URL)
			.then(async (response) => {
				if (! response.ok) {
					const errorMessage = response.status === 429
						? "Vous avez effectué trop de requêtes. Veuillez réessayez dans un instant."
						: "Une erreur inattendue est survenue."

					throw new Error(errorMessage)
				}

				return response.json()
			})
			.then((apiData: JsonApiResponse) => {
				try {
					setFilm(apiData.Film)
					setChapters(apiData.Chapters)
					setWaypoints(apiData.Waypoints)
					setKeywords(apiData.Keywords)
				}
				catch (error) {
					setApiError("Le serveur a fourni une réponse malformée.")
				}
			}, (error) => {
				setApiError(error.message)
			})
	}, [])

	const changeTimePosition = (timePosition: number, continuePlaying: boolean = false) => {
		const chapter = findCorrespondingChapter(chapters!, timePosition)
		const chapterStart = Number(chapters![chapter!].pos)
		const chapterDuration = getChapterDuration(chapters!, chapter, videoPlayer.current!.duration)

		setCurrentChapter(chapter)
		setCurrentChapterProgress(clamp(0, timePosition - chapterStart, chapterDuration))

		if (currentChapter !== null) {
			videoPlayer.current!.currentTime = timePosition

			if (continuePlaying) {
				videoPlayer.current!.play()
			}
		}
	}

	const updateTime = (currentTime: number) => {
		const currentChapter = findCorrespondingChapter(chapters!, currentTime)

		// Update current chapter
		setCurrentChapter(currentChapter)
		setCurrentChapterDuration(getChapterDuration(chapters!, currentChapter!, videoPlayer.current!.duration))
		setCurrentChapterProgress(videoPlayer.current!.currentTime - Number(chapters![currentChapter!].pos))
	}

	let content

	if (apiError) {
		content = <UiError reason={apiError} />
	}

	else if (film === null) {
		content = <Loader iconSize="6x">
			<span className="text-2xl text-semibold">Chargement en cours…</span>
		</Loader>
	}

	else {
		content = <>
			<Banner className="mx-4 px-2 py-3 border-b border-neutral-300" title={film.title} synopsisUrl={film.synopsis_url} />

			<main className="grow flex flex-col md:overflow-hidden md:grid md:grid-cols-12 gap-2 mx-4 py-3">
				<VideoPlayer className="p-2 col-span-6 lg:col-span-8 xl:col-span-9" sourceUrl={film.file_url} updateTime={updateTime} ref={videoPlayer} />

				<div className="flex flex-col gap-2 overflow-hidden md:col-span-6 lg:col-span-4 xl:col-span-3 p-2 md:border-l md:border-neutral-300">
					<Tabs>
						<TabList>
							<Tab>
								Chapitrage
							</Tab>
							<Tab>
								Discussion
							</Tab>
						</TabList>

						<TabPanel>
							<Chaptering
								className="overflow-auto p-2"
								chapters={chapters!}
								currentChapter={currentChapter}
								currentChapterDuration={currentChapterDuration!}
								currentChapterProgress={currentChapterProgress!}
								changeTimePosition={changeTimePosition} />
						</TabPanel>

						<TabPanel>
							<Chatroom className="p-2" />
						</TabPanel>
					</Tabs>

					<Map mapLocation={mapLocation} />
				</div>
			</main>
		</>
	}

	return (
		<div className="h-screen min-h-screen md:overflow-hidden flex flex-col">
			{content}
		</div>
	)
}

export default App
