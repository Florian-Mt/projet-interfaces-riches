import React from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import { Waypoint } from "@/signatures"
import formatTime from "@/functions/formatTime"
import classNames from "classnames"

interface MapProps {
	className: string
	waypoints: Array<Waypoint>
	changeTimePosition: (chapter: number) => void
	currentChapterDuration: number | null
	currentChapterStartTime: number | null
}

const Map: React.FC<MapProps> = ({ className, waypoints, changeTimePosition, currentChapterDuration, currentChapterStartTime }) => {
	let currentCenter
	if (currentChapterStartTime === null || currentChapterDuration == null) {
		currentCenter = {
			lat: 38.9071923,
			lng: -77.0368707,
		}
	}
	else {
		const currentWaypoint = waypoints
			.find((waypoint) => {
				const waypointTs = Number(waypoint.timestamp)
				return currentChapterStartTime <= waypointTs && waypointTs < currentChapterStartTime + currentChapterDuration
			})!

		currentCenter = {
			lat: Number(currentWaypoint.lat),
			lng: Number(currentWaypoint.lng),
		}
	}
		console.log(currentCenter)

	return <div className={classNames(className)}>
		<MapContainer className="w-full h-full" center={currentCenter} zoom={13} scrollWheelZoom={false}>
			<TileLayer
				attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

				{waypoints.map(waypoint => <Marker key={`${waypoint.lat}:${waypoint.lng}`} position={{ lat: Number(waypoint.lat), lng: Number(waypoint.lng) }}>
					<Popup>
						<span className="flex gap-1">
							{waypoint.label}
							<button className="anchor" onClick={()=>changeTimePosition(Number(waypoint.timestamp))}>{formatTime(Number(waypoint.timestamp))}</button>
						</span>
					</Popup>
				</Marker>
			)}
		</MapContainer>
	</div>
}

export default Map
