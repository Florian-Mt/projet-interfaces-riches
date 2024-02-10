import { useEffect, useMemo, useRef, useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import { JSON_API_URL } from "@/constants.ts"
import { Chapters, Film, JsonApiResponse, Keyword, Keywords, Waypoints } from "@/signatures.ts"
import Banner from "@/components/Banner.tsx"
import Chaptering from "@/components/Chaptering.tsx"
import Chatroom from "@/components/Chatroom.tsx"
import Loader from "@/components/Loader.tsx"
import Map from "@/components/Map.tsx"
import UiError from "@/components/UiError.tsx"
import VideoPlayer from "@/components/VideoPlayer.tsx"
import clamp from "@/functions/clamp.ts"
import findCorrespondingChapter from "@/functions/findCorrespondingChapter.ts"
import getChapterDuration from "@/functions/getChapterDuration.ts"

function App() {
	const [film, setFilm] = useState<Film | null>(null)
	const [chapters, setChapters] = useState<Chapters | null>(null)
	const [waypoints, setWaypoints] = useState<Waypoints | null>(null)
	const [keywords, setKeywords] = useState<Keywords | null>(null)
	const [apiError, setApiError] = useState<string | null>(null)

	const [currentTime, setCurrentTime] = useState<number | null>(null)
	const [filmDuration, setFilmDuration] = useState<number | null>(null)

	const currentChapter = useMemo<number | null>(() => {
		if (chapters === null || currentTime === null || filmDuration === null) {
			return null
		}

		return findCorrespondingChapter(chapters, currentTime)
	}, [chapters, currentTime])

	const currentChapterStartTime = useMemo<number | null>(() => {
		if (chapters === null || currentChapter === null) {
			return null
		}

		return Number(chapters[currentChapter].pos)
	}, [chapters, currentChapter])

	const currentChapterDuration = useMemo<number | null>(() => {
		if (chapters === null || currentChapter === null || filmDuration === null) {
			return null
		}

		return getChapterDuration(chapters, currentChapter, filmDuration)
	}, [chapters, currentChapter, filmDuration])

	const currentChapterProgress = useMemo<number | null>(() => {
		if (chapters === null || currentTime === null) {
			return null
		}

		return clamp(0, currentTime - currentChapterStartTime!, currentChapterDuration!)
	}, [chapters, currentTime])

	const currentKeywords = useMemo<Keyword | null>(() => {
		if (currentTime === null) {
			return null
		}

		return keywords?.find(keyword => {
			const keywordTs = Number(keyword.pos)
			return currentChapterStartTime! <= keywordTs && keywordTs < currentChapterStartTime! + currentChapterDuration!
		})!
	}, [keywords, currentTime])

	const [isMapOpen, setIsMapOpen] = useState<boolean>(false)

	const videoPlayer = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		fetch(JSON_API_URL)
			.then(async response => {
				if (! response.ok) {
					const errorMessage = response.status === 429
						? "Vous avez effectué trop de requêtes. Veuillez réessayer dans un instant."
						: "Une erreur inattendue est survenue."

					throw new Error(errorMessage)
				}

				return response.json() as Promise<JsonApiResponse>
			})
			.then(apiData => {
				try {
					setFilm(apiData.Film)
					setChapters(apiData.Chapters)
					setWaypoints(apiData.Waypoints)
					setKeywords(apiData.Keywords)
				}
				catch (error) {
					setApiError("Le serveur a fourni une réponse malformée.")
				}
			}, error => {
				setApiError(error.message)
			})
	}, [])

	const toggleMap = () => {
		setIsMapOpen(isMapOpen => {
			// Met la vidéo en pause à l’ouverture de la carte
			if (! isMapOpen) {
				videoPlayer.current!.pause()
			}

			return ! isMapOpen
		})
	}

	const changeTimePosition = (timePosition: number, continuePlaying: boolean = false) => {
		if (currentChapter !== null) {
			setCurrentTime(timePosition)
			videoPlayer.current!.currentTime = timePosition
			// Ferme la carte lors d’un saut dans la vidéo
			setIsMapOpen(false)

			if (continuePlaying) {
				videoPlayer.current!.play()
			}
		}
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
			<Banner
				className="mx-4 px-2 py-3 border-b border-neutral-300" 
				title={film.title} 
				synopsisUrl={film.synopsis_url}
				currentKeywords={currentKeywords}
				isMapOpen={isMapOpen}
				toggleMap={toggleMap} />

			<main className="grow flex flex-col md:overflow-hidden md:grid md:grid-cols-12 gap-2 mx-4 py-3">
				<div className="relative m-2 col-span-6 lg:col-span-8 xl:col-span-9">
					<VideoPlayer
						className="absolute top-0 left-0 bottom-0 right-0"
						sourceUrl={film.file_url}
						setCurrentTime={setCurrentTime}
						setFilmDuration={setFilmDuration}
						ref={videoPlayer} />

					{
						isMapOpen && <Map
							className="absolute top-0 left-0 bottom-0 right-0"
							waypoints={waypoints!}
							changeTimePosition={changeTimePosition}
							currentChapterDuration={currentChapterDuration}
							currentChapterStartTime={currentChapter ? Number(chapters![currentChapter].pos) : null} />
					}
				</div>

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
							<Chatroom
								className="p-2"
								currentTime={currentTime}
								changeTimePosition={changeTimePosition}
								filmDuration={filmDuration} />
						</TabPanel>
					</Tabs>
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
