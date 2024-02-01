import classnames from "classnames"

import { Chapter } from "@/signatures.ts"
import formatTime from "@/functions/formatTime.ts"

type ChapteringProps = {
	chapters: Array<Chapter>
	currentChapter: number | null
	currentChapterDuration: number | null
	currentChapterProgress: number | null
	playChapter: (chapter: number) => void
}

const Chaptering = ({chapters, currentChapter, currentChapterDuration, currentChapterProgress, playChapter}: ChapteringProps) => {
	return <nav className="flex flex-col gap-1">
		{chapters.map((chapter, key) => {
			return <h2 key={chapter.pos} className={classnames("flex flex-col", {"font-bold": key === currentChapter})} onClick={() => playChapter(key)}>
				<a className="anchor">
					{formatTime(Number(chapter.pos))} {chapter.title}
				</a>
				{
					key === currentChapter
					? <progress value={currentChapterProgress!} max={currentChapterDuration!} className="h-1 mb-2" />
					: null
				}
			</h2>
		})}
	</nav>
}

export default Chaptering
