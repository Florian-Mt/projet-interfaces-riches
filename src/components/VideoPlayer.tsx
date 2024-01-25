import { FC } from "react"
import classNames from "classnames"

import { Film } from "../signatures.ts"

type VideoPlayerProps = {
	className: string
	sourceUrl: Film["file_url"]
}

const VideoPlayer: FC<VideoPlayerProps> = function({className, sourceUrl}) {
	return <div className={classNames(className, "flex justify-center h-full")}>
		<div className="flex-grow flex flex-col h-full bg-black">
			<video className="h-full" src={sourceUrl} controls />
		</div>
	</div>
}

export default VideoPlayer
