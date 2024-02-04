import classNames from "classnames"
import { useEffect, useState } from "react"

import { WEBSOCKET_API_URL } from "@/constants"
import { Message, SocketApiResponse } from "@/signatures"
import ChatHistory from "@/components/ChatHistory.tsx"
import ChatMessage from "@/components/ChatMessage.tsx"
import Loader from "@/components/Loader.tsx"

type ChatroomProps = {
	className?: string
}

const Chatroom = ({className}: ChatroomProps) => {
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

		socket.addEventListener("message", (event) => {
			const newMessages = JSON.parse(event.data) as SocketApiResponse
			setMessages((messages) => [...messages, ...newMessages])
		})

		socket.addEventListener("close", () => {
			setSocket(new WebSocket(WEBSOCKET_API_URL))
			console.info("Socket reconnected.")
		})

		return () => {
			socket.close()
		}
	}, [])

	const submitMessage = (name: string, content: string) => {
		const message = {
			name,
			message: content,
		}

		socket!.send(JSON.stringify(message))
	}

	return <div className={classNames(className, "overflow-hidden grow flex flex-col gap-4")}>
		{
		connected
				? <>
					<ChatHistory className="overflow-auto" messages={messages} />
					<ChatMessage submitMessage={submitMessage} />
				</>
				: <div className="grow flex justify-center items-center">
					<Loader iconSize="4x" />
				</div>
		}
	</div>
}

export default Chatroom
