import { useChats } from "./chatsSlice"

interface ChatProps {
  chatId: string
}

const Chat = (props: ChatProps) => {
  const { chatId } = props
  const messages = useChats(chatId)
  return (
    <div className="chat">
      {messages.length > 0 ? messages.map((message, index) => {
        console.log(`chat_message chat_message-${message.role}`)
        return (
        <div key={index} className={`chat_message chat_message-${message.role}`}>
          {message.role === 'user' ? 'You: ' : 'Cooper: '}{message.content}
        </div>
      )}) : <div className="chat__empty"><h2 className="chat__empty__text">CooperChat</h2></div>}
    </div>
  )
}

export default Chat