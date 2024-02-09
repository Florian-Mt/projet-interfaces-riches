import { useEffect } from "react"

import useIsMounting from "@/hooks/useIsMounting.ts"

const useUpdateEffect: typeof useEffect = (effect, deps) => {
	const isMounting = useIsMounting()

	useEffect(() => {
		if (! isMounting) {
			return effect()
		}
	}, deps)
}

export default useUpdateEffect
