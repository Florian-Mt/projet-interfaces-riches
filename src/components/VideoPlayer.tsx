import { forwardRef, ForwardedRef, SyntheticEvent } from "react"
import classNames from "classnames"

import { Film } from "@/signatures.ts"

type VideoPlayerProps = {
	className: string
	sourceUrl: Film["file_url"]
	updateCurrentChapter: (currentTime: number) => void
}

const VideoPlayer = function({className, sourceUrl, updateCurrentChapter}: VideoPlayerProps, ref: ForwardedRef<HTMLVideoElement | null>) {
	const handleTimeChange = (event: SyntheticEvent<HTMLVideoElement>) => {
		updateCurrentChapter(Math.floor((event.target as HTMLVideoElement).currentTime))
	}

	return <div className={classNames(className, "flex justify-center h-full")}>
		<div className="flex-grow flex flex-col h-full bg-black">
			<video
				className="h-full"
				src={sourceUrl}
				controls
				onPlay={handleTimeChange}
				onTimeUpdate={handleTimeChange}
				onEnded={handleTimeChange}
				ref={ref} />
		</div>
	</div>
}

export default forwardRef(VideoPlayer)
