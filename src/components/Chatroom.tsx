import classNames from "classnames"
import { useEffect, useState } from "react"

import { WEBSOCKET_API_URL } from "@/constants.ts"
import { Message, SocketApiResponse } from "@/signatures.ts"
import ChatHistory from "@/components/ChatHistory.tsx"
import ChatNewMessage from "@/components/ChatNewMessage.tsx"
import Loader from "@/components/Loader.tsx"

type ChatroomProps = {
	className?: string
	currentTime: number | null
	changeTimePosition: (chapter: number, continuePlaying?: boolean) => void
	filmDuration: number | null
}

const Chatroom = ({className, currentTime, changeTimePosition, filmDuration}: ChatroomProps) => {
	const [socket, setSocket] = useState<WebSocket | null>(null)
	const [connected, setConnected] = useState<boolean>(false)
	const [messages, setMessages] = useState<Array<Message>>([])

	useEffect(() => {
		const socket = new WebSocket(WEBSOCKET_API_URL)

		socket.addEventListener("open", () => {
			console.info("Socket connected.")
			setConnected(true)
			setSocket(socket)
		})

		socket.addEventListener("message", event => {
			const newMessages = JSON.parse(event.data) as SocketApiResponse

			if (newMessages instanceof Array) {
				setMessages(messages => [...messages, ...newMessages])
			}
			else {
				setMessages(messages => [...messages, newMessages])
			}
		})

		socket.addEventListener("close", () => {
			setSocket(new WebSocket(WEBSOCKET_API_URL))
			console.info("Socket reconnected.")
		})

		return () => {
			socket.close()
		}
	}, [])

	const submitMessage = (name: string, content: string, moment?: number) => {
		const message = {
			name,
			message: content,
			moment,
		}

		socket!.send(JSON.stringify(message))
	}

	return <div className={classNames(className, "overflow-hidden grow flex flex-col gap-4")}>
		{
		connected
			? <>
				<ChatHistory className="overflow-auto" messages={messages} changeTimePosition={changeTimePosition} />
				<ChatNewMessage currentTime={currentTime} filmDuration={filmDuration} submitMessage={submitMessage} />
			</>
			: <div className="grow flex justify-center items-center">
				<Loader iconSize="4x" />
			</div>
		}
	</div>
}

export default Chatroom
