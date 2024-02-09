import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSadTear } from "@fortawesome/free-solid-svg-icons"

type UiErrorProps = {
	reason: string
}

const UiError = ({reason}: UiErrorProps) => {
	return <div className="grow flex flex-col gap-4 justify-center items-center">
		<FontAwesomeIcon icon={faSadTear} className="text-neutral-300 text-8xl" />
		<span className="text-semibold text-xl">{reason}</span>
	</div>
}

export default UiError
