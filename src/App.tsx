import { useState } from 'react'
import * as api from './services/api'

interface Message {
  chatId: string
  content: string
  role: string
}

// create a random guid
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const uniq = (arr: Array<string>) => {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

function App() {
  const [value, setValue] = useState<string>('')
  const [chatIdOrder, setChatIdOrder] = useState<string[]>([])
  const [currentChatId, setCurrentChatId] = useState<string>(guid())
  const [messages, setMessages] = useState<Message[]>([])
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [fetching, setFetching] = useState<boolean>(false)
  const getMessages = async () => {
    if (!fetching) {
      const msg = value
      setValue('')
      const chatId = currentChatId
      const userContent = value
      const userMessage = { role: 'user', content: userContent, chatId }
      setFetching(true)
      const data = await api.getMessages(msg)
      const assistantMessage = { ...data.choices[0].message, chatId }
      setMessages((messages) => [...messages, userMessage, assistantMessage])
      setChatIdOrder((chatIdOrder) => uniq([...chatIdOrder, chatId]))
      setFetching(false)
    }
  }

  const createNewChat = () => {
    setCurrentChatId(guid())
    setValue('')
    setCurrentTitle('')
  }
  
  const handleConversationClick = (index: number) => {
    const chatId = chatIdOrder[index]
    setCurrentChatId(chatId)
  }

  const currentMessages = messages.filter(message => message.chatId ===  currentChatId)
  const historyTitles = []
  for (const chatId of chatIdOrder) {
    const message = messages.find(message => message.chatId === chatId)
    if (message) {
      historyTitles.push(message.content)
    }
  }

  console.log({ chatIdOrder, currentChatId, messages, currentMessages, historyTitles })

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
        {historyTitles.map((title, index) => <li key={index} onClick={() => handleConversationClick(index)}>{title}</li>)}
        </ul>
        <nav>
          <p>Made by Cooper</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle ? <h1>CooperGPT</h1> : null}
        <ul className="feed">
          {currentMessages.map((chat, index) => <li className={chat.role} key={index}><p>{chat.role}</p><p>{chat.content}</p></li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Cooper GPT April 21 Version. Free to use, but please credit me if you do. Does it sound like me? Let me know.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
