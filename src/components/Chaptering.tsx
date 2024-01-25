import { FC } from "react"
import { Chapter } from "../signatures.ts"

import { formatTime } from "../functions/formatTime.ts"

const Chaptering: FC<{chapters: Array<Chapter>}> = function({chapters}) {
	return <nav className="flex flex-col gap-1">
		{chapters.map((chapter) => {
			return <h2 key={chapter.pos}>
				<a className="anchor">
					{formatTime(Number(chapter.pos))} {chapter.title}
				</a>
			</h2>
		})}
	</nav>
}

export default Chaptering
