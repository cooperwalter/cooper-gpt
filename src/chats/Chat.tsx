import { useChats } from "./chatsSlice"

interface ChatProps {
  chatId: string
}

const Chat = (props: ChatProps) => {
  const { chatId } = props
  const messages = useChats(chatId)
  return (
    <div className="chat">
      {messages.map((message, index) => {
        console.log(`chat_message chat_message-${message.role}`)
        return (
        <div key={index} className={`chat_message chat_message-${message.role}`}>
          {message.role === 'user' ? 'You: ' : 'Cooper: '}{message.content}
        </div>
      )})}
    </div>
  )
}

export default Chat