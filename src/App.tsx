import { useState } from 'react'
import * as api from './services/api'
import { Message } from './types'
import Chat from './components/Chat';

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
    if (!fetching && value !== '') {
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
  
  const handleInputKeyDown = async (e: any) => {
    // if the key is enter, then get messages
    if (e.key === 'Enter') {
      await getMessages()
    }
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
        {!currentTitle ? <h1>CooperChat</h1> : null}
        <Chat messages={currentMessages} />
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleInputKeyDown} />
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            CooperChat April 25 Version. Free to use, but please credit me if you do. Does it sound like me? Let me know.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
