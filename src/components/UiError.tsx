import { faSadTear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type UiErrorProps = {
	reason: string
}

const UiError = ({reason}: UiErrorProps) => {
	return <div className="flex-grow flex flex-col gap-4 justify-center items-center">
		<FontAwesomeIcon icon={faSadTear} className="text-neutral-300 text-8xl" />
		<span className="text-semibold text-xl">{reason}</span>
	</div>
}

export default UiError
