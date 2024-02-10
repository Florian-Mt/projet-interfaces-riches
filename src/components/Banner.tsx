import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faMap } from "@fortawesome/free-solid-svg-icons"

import { Film, Keyword } from "@/signatures.ts"
import Keywords from "@/components/Keywords.tsx"

type BannerProps = {
	className?: string
	title: Film["title"]
	synopsisUrl: Film["synopsis_url"]
	currentKeywords: Keyword | null
	isMapOpen: boolean
	setIsMapOpen: (value: boolean) => void
}

const Banner = ({className, title, synopsisUrl, currentKeywords, isMapOpen, setIsMapOpen}: BannerProps) => {
	return <header className={classNames(className, "flex justify-between items-center")}>
		<div className="flex flex-col gap-2 items-start">
			<h1 className="text-xl font-bold">
				{title}
			</h1>

			<div className="flex justify-center items-center gap-2">
				<a href={synopsisUrl} className="text-sm flex gap-2 items-center anchor">
					Accéder au synopsis
					<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
				</a>

				<Keywords keywords={currentKeywords} />
			</div>
		</div>

		<button className="flex justify-center items-center gap-2 text-md button" onClick={() => setIsMapOpen(! isMapOpen)}>
			{isMapOpen ? "Fermer la carte" : "Ouvrir la carte"}
			<FontAwesomeIcon icon={faMap} />
		</button>
	</header>
}

export default Banner
