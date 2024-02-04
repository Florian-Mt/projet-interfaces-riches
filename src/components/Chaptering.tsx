import classNames from "classnames"
import { useRef, useState, MouseEvent as ReactMouseEvent } from "react"

import { Chapter } from "@/signatures.ts"
import formatTime from "@/functions/formatTime.ts"

type ChapteringProps = {
	className?: string
	chapters: Array<Chapter>
	currentChapter: number | null
	currentChapterDuration: number | null
	currentChapterProgress: number | null
	changeTimePosition: (chapter: number) => void
}

const Chaptering = ({className, chapters, currentChapter, currentChapterDuration, currentChapterProgress, changeTimePosition}: ChapteringProps) => {
	const [isDraggingProgressBar, setIsDraggingProgressBar] = useState<boolean>(false)
	const progressBar = useRef<HTMLProgressElement>(null)

	const jumpToPosition = (event: MouseEvent | ReactMouseEvent<HTMLProgressElement>) => {
		const progressClientRect = (event.target as HTMLProgressElement).getBoundingClientRect()
		const selectedTimePosition = currentChapterDuration! * (event.clientX - progressClientRect.x) / progressClientRect.width
		changeTimePosition(Number(chapters[currentChapter!].pos) + selectedTimePosition)
	}

	const addProgressBarEventListeners = () => {
		setIsDraggingProgressBar(true)
		document.addEventListener("mousemove", jumpToPosition)
		document.addEventListener("mouseup", removeProgressBarEventListeners)
	}

	const removeProgressBarEventListeners = () => {
		setIsDraggingProgressBar(false)
		document.removeEventListener("mousemove", jumpToPosition)
		document.removeEventListener("mouseup", removeProgressBarEventListeners)
	}

	return <nav className={classNames(className, "flex flex-col gap-1")}>
		{chapters.map((chapter, key) => {
			return <h2 key={chapter.pos} className={classNames("flex flex-col", {"font-bold": key === currentChapter})}>
				<button className="anchor text-left" onClick={() => changeTimePosition(Number(chapters[key].pos))}>
					{formatTime(Number(chapter.pos))} {chapter.title}
				</button>
				{
					key === currentChapter
					? <progress
						value={currentChapterProgress!}
						max={currentChapterDuration!}
						className={classNames("hover:h-3 mb-2 cursor-pointer rounded-sm transition-all ease-in-out", {"h-1": ! isDraggingProgressBar, "h-3": isDraggingProgressBar})}
						onClick={jumpToPosition}
						onMouseDown={addProgressBarEventListeners}
						ref={progressBar} />
					: null
				}
			</h2>
		})}
	</nav>
}

export default Chaptering
