import { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

import { Film } from "@/signatures.ts"

type BannerProps = {
	title: Film["title"]
	synopsisUrl: Film["synopsis_url"]
}

const Banner: FC<BannerProps> = function({title, synopsisUrl}) {
	return <header className="flex justify-between items-center mx-4 p-4 border-b border-neutral-300">
		<h1 className="text-xl font-bold">
			{title}
		</h1>

		<a href={synopsisUrl} className="flex gap-2 items-center anchor">
			Accéder au synopsis
			<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
		</a>
	</header>
}

export default Banner
