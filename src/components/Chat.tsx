import React from "react"
import { Message } from "../types"

interface ChatProps {
  messages: Message[]
}

 {/* <ul className="feed">
          {currentMessages.map((chat, index) => <li className={chat.role} key={index}><p>{chat.role}</p><p>{chat.content}</p></li>)}
        </ul> */}

const Chat = (props: ChatProps) => {
  const { messages } = props
  return (
    <div className="chat">
      {messages.map((message, index) => {
        console.log(`chat_message chat_message-${message.role}`)
        return (
        <div key={index} className={`chat_message chat_message-${message.role}`}>
          {message.content}
        </div>
      )})}
    </div>
  )
}

export default Chat