import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Loader = () => {
	return <div className="flex-grow flex flex-col gap-4 justify-center items-center">
		<FontAwesomeIcon icon={faSpinner} spinPulse={true} className="text-neutral-300 text-8xl" />
		<span className="text-semibold text-xl">Chargement en cours…</span>
	</div>
}

export default Loader
