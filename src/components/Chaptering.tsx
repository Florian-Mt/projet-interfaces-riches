import classnames from "classnames"

import { Chapter } from "@/signatures.ts"
import { formatTime } from "@/functions/formatTime.ts"

type ChapteringProps = {
	chapters: Array<Chapter>
	currentChapter: number | null
	playChapter: (chapter: number) => void
}

const Chaptering = ({chapters, currentChapter, playChapter}: ChapteringProps) => {
	return <nav className="flex flex-col gap-1">
		{chapters.map((chapter, key) => {
			return <h2 key={chapter.pos} className={classnames({"font-bold": key === currentChapter})} onClick={() => playChapter(key)}>
				<a className="anchor">
					{formatTime(Number(chapter.pos))} {chapter.title}
				</a>
			</h2>
		})}
	</nav>
}

export default Chaptering
