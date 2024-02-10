import classNames from "classnames"
import { forwardRef, Dispatch, ForwardedRef, SetStateAction, SyntheticEvent } from "react"

import { Film } from "@/signatures.ts"

type VideoPlayerProps = {
	className?: string
	sourceUrl: Film["file_url"]
	setCurrentTime: Dispatch<SetStateAction<number | null>>
	setFilmDuration: Dispatch<SetStateAction<number | null>>
}

const VideoPlayer = ({className, sourceUrl, setCurrentTime, setFilmDuration}: VideoPlayerProps, ref: ForwardedRef<HTMLVideoElement>) => {
	const handleTimeChange = (event: SyntheticEvent<HTMLVideoElement>) => setCurrentTime((event.target as HTMLVideoElement).currentTime)

	return <div className={classNames(className, "flex justify-center aspect-video md:aspect-auto")}>
		<div className="grow flex flex-col bg-black">
			<video
				className="h-full"
				src={sourceUrl}
				controls
				onLoadedData={(event) => setFilmDuration((event.target as HTMLVideoElement).duration)}
				onPlay={handleTimeChange}
				onTimeUpdate={handleTimeChange}
				onEnded={handleTimeChange}
				ref={ref} />
		</div>
	</div>
}

export default forwardRef(VideoPlayer)
