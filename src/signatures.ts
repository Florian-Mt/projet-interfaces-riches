export type Film = {
	file_url: string
	title: string
	synopsis_url: string
}

export type Chapter = {
	pos: string // Should be a number
	title: string
}

export type Chapters = Array<Chapter>

export type Waypoint = {
	lat: string
	lng: string
	label: string
	timestamp: string // Should be a number
}

export type Waypoints = Array<Waypoint>

export type Keyword = {
	pos: string // Should be a number
	data: Array<{
		title: string
		url: string
	}>
}

export type Keywords = Array<Keyword>

export type JsonApiResponse = {
	Film: Film
	Chapters: Chapters
	Waypoints: Waypoints
	Keywords: Keywords
}

export type Message = {
	message: string
	name: string
	when: number
	moment?: number
}

export type SocketApiResponse = Array<Message> | Message
