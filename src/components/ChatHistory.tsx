import { SocketApiResponse } from "@/signatures"

type ChatHistoryProps = {
	messages: SocketApiResponse
}

const ChatHistory = ({messages}: ChatHistoryProps) => {
	return <div className="flex flex-col">
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
