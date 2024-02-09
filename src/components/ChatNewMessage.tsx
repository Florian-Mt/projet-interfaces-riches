import classNames from "classnames"
import { useState, FormEvent } from "react"

type ChatMessage = {
	className?: string
	submitMessage: (name: string, content: string) => void
}

const ChatMessage = ({className, submitMessage}: ChatMessage) => {
	const [collapsed, setCollapsed] = useState<boolean>(true)
	const [userName, setUserName] = useState<string>("")
	const [message, setMessage] = useState<string>("")

	const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		submitMessage(userName, message)

		// Nettoie les champs de saisie après envoi du message
		setUserName("")
		setMessage("")
		setCollapsed(true)
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
					value={userName}
					onChange={event => setUserName(event.target.value)} />
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="message">Message</label>
				<textarea
					className="p-2 rounded-md border border-neutral-300"
					id="message"
					value={message}
					onChange={event => setMessage(event.target.value)} />
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
