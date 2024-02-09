import React from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import { Waypoint } from "@/signatures"
import formatTime from "@/functions/formatTime"

interface MapProps {
	waypoints: Array<Waypoint>
	changeTimePosition: (chapter: number) => void
}

const Map: React.FC<MapProps> = ({ waypoints, changeTimePosition }) => {
	const defaultCenter = {
		lat: 38.9071923,
		lng: -77.0368707,
	}

	return <MapContainer className="w-full h-full" center={defaultCenter} zoom={13} scrollWheelZoom={false}>
		<TileLayer
			attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{waypoints.map(waypoint => <Marker position={{ lat: Number(waypoint.lat), lng: Number(waypoint.lng) }}>
				<Popup>
					<span className="flex gap-1">
						{waypoint.label}
						<button className="anchor" onClick={()=>changeTimePosition(Number(waypoint.timestamp))}>{formatTime(Number(waypoint.timestamp))}</button>
					</span>
				</Popup>
			</Marker>
		)}
	</MapContainer>
}

export default Map
