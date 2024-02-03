const clamp = (min: number, n: number, max: number): number => {
	return Math.min(max, Math.max(min, n))
}

export default clamp
