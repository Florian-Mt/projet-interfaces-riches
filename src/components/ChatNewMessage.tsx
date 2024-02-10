import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faClock } from "@fortawesome/free-solid-svg-icons"
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react"

import clamp from "@/functions/clamp.ts"
import formatTime from "@/functions/formatTime.ts"
import parseTimeFormat from "@/functions/parseTimeFormat.ts"

type ChatMessage = {
	className?: string
	currentTime: number | null
	filmDuration: number | null
	submitMessage: (name: string, content: string, moment?: number) => void
}

const ChatMessage = ({className, currentTime, filmDuration, submitMessage}: ChatMessage) => {
	const [collapsed, setCollapsed] = useState<boolean>(true)
	const [userName, setUserName] = useState<string>("")
	const [message, setMessage] = useState<string>("")
	const [moment, setMoment] = useState<string>("")

	const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (moment !== "") {
			submitMessage(userName, message, parseTimeFormat(moment))
		}
		else {
			submitMessage(userName, message)
		}

		// Nettoie les champs de saisie après envoi du message
		setUserName("")
		setMessage("")
		setMoment("")
		setCollapsed(true)
	}

	const updateMoment = (event: ChangeEvent<HTMLInputElement>) => {
		setMoment(event.target.value === ""
			? ""
			: formatTime(clamp(0, parseTimeFormat(event.target.value), filmDuration || 0), false, true)
		)
	}

	const setMomentCurrentTime = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setMoment(formatTime(Math.round(currentTime || 0), false, true))
	}

	return collapsed
		? <button className="button" onClick={() => setCollapsed(false)}>
			Écrire un message
		</button>
		: <form action="#" className={classNames(className, "flex flex-col gap-2 py-2 border-t border-neutral-300")} onSubmit={handleSubmission}>
			<div className="flex flex-col gap-1">
				<label htmlFor="userName">Nom</label>
				<input
					className="p-2 rounded-md border border-neutral-300"
					type="text"
					id="userName"
					required={true}
					value={userName}
					onChange={event => setUserName(event.target.value)} />
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="message">Message</label>
				<textarea
					className="p-2 rounded-md border border-neutral-300"
					id="message"
					required={true}
					value={message}
					onChange={event => setMessage(event.target.value)} />
			</div>

			<div className="flex flex-col gap-1">
				<div className="flex justify-between">
					<label htmlFor="moment">Moment (optionnel)</label>
					<span title="Associez un moment de la vidéo à votre commentaire">
						<FontAwesomeIcon icon={faCircleInfo} />
					</span>
				</div>
				<div className="flex gap-2">
					<input
						className="grow p-2 rounded-md border border-neutral-300"
						id="moment"
						step={1}
						type="time"
						value={moment}
						onChange={updateMoment} />

					<button className="anchor" title="Inclure le moment actuel" onClick={setMomentCurrentTime}>
						<FontAwesomeIcon icon={faClock} />
					</button>
				</div>
			</div>

			<button className="flex justify-center items-center gap-2 text-md button mt-2">
				Envoyer
			</button>
			<button className="anchor" onClick={() => setCollapsed(true)}>
				Annuler
			</button>
		</form>
}

export default ChatMessage
