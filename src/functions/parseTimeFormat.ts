import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE, TIME_FORMAT } from "@/constants.ts"

const parseTimeFormat = (timeFormat: string): number => {
	const matches = timeFormat.match(TIME_FORMAT)

	if (matches === null) {
		console.log(timeFormat)
		throw new RangeError("The argument must be a valid (hh:)mm:ss time format string.")
	}

	const [_, hours, minutes, seconds] = matches
	return (hours ? Number(hours) * SECONDS_PER_HOUR : 0) + Number(minutes) * SECONDS_PER_MINUTE + Number(seconds)
}

export default parseTimeFormat
