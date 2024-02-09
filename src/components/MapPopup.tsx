import React from "react"
import classNames from "classnames"

import { Waypoint } from "@/signatures"
import Map from "@/components/Map.tsx"

interface MapPopupProps {
	className: string
	mapLocation: {
		lat: number
		lon: number
		name: string
	}
	waypoints: Array<Waypoint>
	changeTimePosition: (chapter: number) => void
	currentChapter : number|null
}

const MapPopup: React.FC<MapPopupProps> = ({ className, waypoints, changeTimePosition,currentChapter }) => {
	return <div className={classNames(className)}>
		<Map
			waypoints={waypoints}
			changeTimePosition={changeTimePosition} 
			currentChapter={currentChapter} />
	</div>
}

export default MapPopup
