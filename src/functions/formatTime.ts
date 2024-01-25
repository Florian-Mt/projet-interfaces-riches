import {
	MINUTES_PER_HOUR,
	SECONDS_PER_HOUR,
	SECONDS_PER_MINUTE,
} from "@/constants.ts"

export function formatTime(duration: number, withoutZero: boolean = false): string {
	if (isNaN(duration) || (withoutZero && duration === 0))
		return "--:--"

	// Compute seconds, minutes and hours
	const seconds = `${Math.floor(duration % SECONDS_PER_MINUTE)}`.padStart(2, "0")
	const minutes = `${Math.floor((duration % SECONDS_PER_HOUR) / MINUTES_PER_HOUR)}`.padStart(2, "0")
	const hours = `${Math.floor(duration / SECONDS_PER_HOUR)}`

	// Then return a short or long time format depending of hours value
	const shortTimeFormat = `${minutes}:${seconds}`

	return hours !== "0" ? `${hours}:${shortTimeFormat}` : shortTimeFormat
}

