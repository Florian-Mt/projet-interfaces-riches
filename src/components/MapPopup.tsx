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
}

const MapPopup: React.FC<MapPopupProps> = ({ className, waypoints, changeTimePosition }) => {
	return <div className={classNames(className)}>
		<Map
			waypoints={waypoints}
			changeTimePosition={changeTimePosition} />
	</div>
}

export default MapPopup
