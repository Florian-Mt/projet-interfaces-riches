import classNames from "classnames"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import { DEFAULT_MAP_LATITUDE, DEFAULT_MAP_LONGITUDE } from "@/constants.ts"
import { Waypoint } from "@/signatures.ts"
import formatTime from "@/functions/formatTime.ts"

type MapProps = {
	className: string
	changeTimePosition: (chapter: number, continuePlaying?: boolean) => void
	currentChapterDuration: number | null
	currentChapterStartTime: number | null
	waypoints: Array<Waypoint>
}

const Map = ({className, changeTimePosition, currentChapterDuration, currentChapterStartTime, waypoints}: MapProps) => {
	let currentCenter = {
		lat: DEFAULT_MAP_LATITUDE,
		lng: DEFAULT_MAP_LONGITUDE,
	}
	let currentZoom = 4

	if (currentChapterStartTime !== null && currentChapterDuration !== null) {
		const currentWaypoint = waypoints.find(waypoint => {
			const waypointTs = Number(waypoint.timestamp)
			return currentChapterStartTime <= waypointTs && waypointTs < currentChapterStartTime + currentChapterDuration
		})

		if (currentWaypoint) {
			currentCenter = {
				lat: Number(currentWaypoint.lat),
				lng: Number(currentWaypoint.lng),
			}
			currentZoom = 10
		}
	}

	return <div className={classNames(className)}>
		<MapContainer className="w-full h-full" center={currentCenter} zoom={currentZoom} scrollWheelZoom={true}>
			<TileLayer
				attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{
				waypoints.map(waypoint => {
					const waypointKey = `${waypoint.lat}:${waypoint.lng}`
					const waypointPosition = {
						lat: Number(waypoint.lat),
						lng: Number(waypoint.lng),
					}

					return <Marker key={waypointKey} position={waypointPosition}>
						<Popup>
							<span className="flex gap-1">
								{waypoint.label}

								<button className="anchor" onClick={() => changeTimePosition(Number(waypoint.timestamp), true)}>
									{formatTime(Number(waypoint.timestamp))}
								</button>
							</span>
						</Popup>
					</Marker>
				})
			}
		</MapContainer>
	</div>
}

export default Map
