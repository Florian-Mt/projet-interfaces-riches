type Film = {
	file_url: string
	title: string
	synopsis_url: string
}

type Chapter = {
	pos: string // Should be a number
	title: string
}

type Chapters = Array<Chapter>

type Waypoint = {
	lat: string
	lng: string
	label: string
	timestamp: string // Should be a number
}

type Waypoints = Array<Waypoint>

type Keyword = {
	pos: string // Should be a number
	data: Array<{
		title: string
		url: string
	}>
}

type Keywords = Array<Keyword>

type JsonApiResponse = {
	Film: Film
	Chapters: Chapters
	Waypoints: Waypoints
	Keywords: Keywords
}
