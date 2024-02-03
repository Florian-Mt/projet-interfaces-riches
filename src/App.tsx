import { useEffect, useRef, useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMap } from "@fortawesome/free-solid-svg-icons"

import { JSON_API_URL } from "@/constants.ts"
import { Chapters, Film, JsonApiResponse, Keywords, Waypoints } from "@/signatures.ts"
import Banner from "@/components/Banner.tsx"
import Chaptering from "@/components/Chaptering.tsx"
import Chatroom from "@/components/Chatroom.tsx"
import Loader from "@/components/Loader.tsx"
import UiError from "@/components/UiError"
import VideoPlayer from "@/components/VideoPlayer.tsx"
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

		setCurrentChapter(chapter)
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
		content = <Loader />
	}

	else {
		content = <>
			<Banner title={film.title} synopsisUrl={film.synopsis_url} />
			<main className="flex-grow flex justify-center items-start px-8 py-4">
				<VideoPlayer className="flex-grow p-2" sourceUrl={film.file_url} updateTime={updateTime} ref={videoPlayer} />

				<div className="flex flex-col h-full gap-2 ml-2 px-4 py-2 border-l border-neutral-300">
					<Tabs>
						<TabList>
							<Tab>
								Chaptering
							</Tab>
							<Tab>
								Chatroom
							</Tab>
						</TabList>

						<TabPanel>
							<Chaptering
								chapters={chapters!}
								currentChapter={currentChapter}
								currentChapterDuration={currentChapterDuration!}
								currentChapterProgress={currentChapterProgress!}
								changeTimePosition={changeTimePosition} />
						</TabPanel>

						<TabPanel>
							<Chatroom />
						</TabPanel>
					</Tabs>

					<button className="flex justify-center items-center gap-2 text-md button mb-2">
						<FontAwesomeIcon icon={faMap} />
						Ouvrir la carte
					</button>
				</div>
			</main>
		</>
	}

	return (
		<div className="min-h-screen h-screen flex flex-col">
			{content}
		</div>
	)
}

export default App
