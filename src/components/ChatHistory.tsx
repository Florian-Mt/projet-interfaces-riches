import classNames from "classnames"
import { useEffect, useRef } from "react"

import { SocketApiResponse } from "@/signatures"

type ChatHistoryProps = {
	className?: string
	messages: SocketApiResponse
}

const ChatHistory = ({className, messages}: ChatHistoryProps) => {
	const history = useRef<HTMLDivElement | null>(null)

	const scrollToEnd = () => {
		history.current!.scrollTop = history.current!.scrollHeight
	}

	useEffect(() => {
		// Défile automatiquement vers le dernier message ajouté
		scrollToEnd()
	}, [messages])

	return <div className={classNames(className, "relative flex flex-col")} ref={history}>
		{messages.map((message, i) => {
			const messageTime = new Date(message.when)

			return <div className="px-4 py-2 even:bg-neutral-100" key={i}>
				<p className="font-bold">{message.name}</p>
				<p className="text-neutral-600 text-xs">Le {messageTime.toLocaleDateString()} à {messageTime.toLocaleTimeString()}</p>
				<p className="break-all">{message.message}</p>
			</div>
		})}
	</div>
}

export default ChatHistory
