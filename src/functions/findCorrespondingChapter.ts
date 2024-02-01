import { Chapter } from "@/signatures"

const findCorrespondingChapter = (chapters: Array<Chapter>, timePosition: number): number => {
	let chapter = chapters.length - 1
	while (timePosition < Number(chapters[chapter].pos)) {
		chapter -= 1
	}

	return chapter
}

export default findCorrespondingChapter
