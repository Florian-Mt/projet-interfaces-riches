import { PropsWithChildren } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SizeProp } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

type LoaderProps = {
	iconSize?: SizeProp
}

const Loader = ({iconSize = "6x", children}: PropsWithChildren<LoaderProps>) => {
	return <div className="grow flex flex-col gap-4 justify-center items-center">
		<FontAwesomeIcon icon={faSpinner} size={iconSize} spinPulse={true} className="text-neutral-300" />
		{children}
	</div>
}

export default Loader
