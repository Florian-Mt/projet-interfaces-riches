import classNames from "classnames"
import { useEffect, useRef, useState, MouseEvent } from "react"

import { Message } from "@/signatures.ts"
import useUpdateEffect from "@/hooks/useUpdateEffect.ts"

type ChatHistoryProps = {
	className?: string
	messages: Array<Message>
}

const ChatHistory = ({className, messages}: ChatHistoryProps) => {
	const history = useRef<HTMLDivElement>(null)
	const [isScrollMax, setIsScrollMax] = useState<boolean>(true)
	const [messagesCount, setMessagesCount] = useState<number>(0)
	const [newMessagesCount, setNewMessagesCount] = useState<number>(0)

	const scrollToEnd = () => {
		history.current!.scrollTop = history.current!.scrollHeight
	}

	const handleScroll = (event: MouseEvent<HTMLDivElement>) => {
		// Met à jour le nombre de messages non lus en fonction du défilement
		if (newMessagesCount > 0) {
			let cumulatedHeight = 0
			let currentChildIndex = 0
			while (true) {
				const currentChild = history.current!.children[currentChildIndex]

				if (cumulatedHeight + currentChild.clientHeight >= history.current!.scrollTop + history.current!.clientHeight) {
					break
				}

				cumulatedHeight += currentChild.clientHeight
				currentChildIndex += 1
			}
			currentChildIndex -= 1

			setNewMessagesCount(Math.min(newMessagesCount, messagesCount - currentChildIndex))
		}

		// Si l’utilisateur a défilé jusqu’en bas, marque tous les messages comme lus
		// On utilise >= car des erreurs d’arrondis peuvent faire que la somme ne correspond pas à la hauteur
		if (history.current!.scrollTop + history.current!.clientHeight >= history.current!.scrollHeight) {
			setIsScrollMax(true)
			setNewMessagesCount(0)
		}
		else {
			setIsScrollMax(false)
		}
	}

	useEffect(() => {
		setMessagesCount(messages.length)
		scrollToEnd()
	}, [])

	useUpdateEffect(() => {
		setMessagesCount(messages.length)
		setNewMessagesCount(newMessagesCount => newMessagesCount + (messages.length - messagesCount))

		// Défile automatiquement vers le dernier message ajouté si l’utilisateur n’a pas remonté le fil des messages
		if (isScrollMax) {
			scrollToEnd()
		}
	}, [messages])

	const printMessage = (message: Message, i: number) => {
		const messageTime = new Date(message.when)

		return <div className="message px-4 py-2" key={i}>
			<p className="font-bold">{message.name}</p>
			<p className="text-neutral-600 text-xs">Le {messageTime.toLocaleDateString()} à {messageTime.toLocaleTimeString()}</p>
			<p className="break-all">{message.message}</p>
		</div>
	}

	return <div className={classNames(className, "relative flex flex-col")} onScroll={handleScroll} ref={history}>
		{messages.slice(0, messages.length - newMessagesCount).map(printMessage)}

		{
			// Ajoute un marqueur au-dessus des nouveaux messages
			(newMessagesCount > 0)
				? <div className="marker relative py-1 flex justify-center items-center after:absolute after:w-full after:h-[1px] after:bg-red-500" key="marker">
					<span className="z-10 px-2 pb-0.5 bg-white border border-red-500 rounded-lg text-xs -mt-[1px] font-semibold [font-variant-caps:all-small-caps]">
						Nouveau(x) message(s)
					</span>
				</div>
				: null
		}

		{messages.slice(messages.length - newMessagesCount).map(printMessage)}
	</div>
}

export default ChatHistory
