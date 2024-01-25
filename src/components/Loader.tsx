import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Loader() {
	return <div className="flex-grow flex flex-col gap-4 justify-center items-center">
		<FontAwesomeIcon icon={faSpinner} spinPulse={true} className="text-neutral-300 text-8xl" />
		<span className="text-semibold text-xl">Chargement en cours…</span>
	</div>
}
