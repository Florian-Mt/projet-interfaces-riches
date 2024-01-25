import { Chapter } from "@/signatures"

const getChapterDuration = (chapters: Array<Chapter>, chapter: number, totalDuration: number) => {
	if (chapter < 0 || chapter >= chapters.length) {
		throw new RangeError("Invalid value: this chapter does not exist.")
	}

	if (chapter - 1 == chapters.length) {
		return totalDuration - Number(chapters[chapter].pos)
	}

	return Number(chapters![chapter! + 1].pos) - Number(chapters![chapter!].pos)
}

export default getChapterDuration
