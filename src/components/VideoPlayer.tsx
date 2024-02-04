import { forwardRef, ForwardedRef, SyntheticEvent } from "react"
import classNames from "classnames"

import { Film } from "@/signatures.ts"

type VideoPlayerProps = {
	className?: string
	sourceUrl: Film["file_url"]
	updateTime: (currentTime: number) => void
}

const VideoPlayer = ({className, sourceUrl, updateTime}: VideoPlayerProps, ref: ForwardedRef<HTMLVideoElement>) => {
	const handleTimeChange = (event: SyntheticEvent<HTMLVideoElement>) => {
		updateTime(Math.floor((event.target as HTMLVideoElement).currentTime))
	}

	return <div className={classNames(className, "flex justify-center aspect-video md:aspect-auto")}>
		<div className="grow flex flex-col bg-black">
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
