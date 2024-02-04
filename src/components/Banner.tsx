import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faMap } from "@fortawesome/free-solid-svg-icons"

import { Film } from "@/signatures.ts"

type BannerProps = {
	className?: string
	title: Film["title"]
	synopsisUrl: Film["synopsis_url"]
}

const Banner = ({className, title, synopsisUrl}: BannerProps) => {
	return <header className={classNames(className, "flex justify-between items-center")}>
		<div className="flex flex-col items-start">
			<h1 className="text-xl font-bold">
				{title}
			</h1>

			<a href={synopsisUrl} className="text-sm flex gap-2 items-center anchor">
				Accéder au synopsis
				<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
			</a>
		</div>

		<button className="flex justify-center items-center gap-2 text-md button">
			Ouvrir la carte
			<FontAwesomeIcon icon={faMap} />
		</button>
	</header>
}

export default Banner
