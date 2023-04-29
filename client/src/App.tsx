import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import * as api from './services/api'
import Chat from './chats/Chat';
import { createChat, useChatOrder, useChats } from './chats/chatsSlice';
import { useAppDispatch } from './store';

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

function App() {
  const scrollRef = useRef(null);
  const [value, setValue] = useState<string>('')
  const [currentChatId, setCurrentChatId] = useState<string>(guid())
  const dispatch = useAppDispatch()
  const messages = useChats()
  const chatOrder  = useChatOrder()
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [fetching, setFetching] = useState<boolean>(false)
  const getMessages = async () => {
    if (!fetching && value !== '') {
      const msg = value
      setValue('')
      const chatId = currentChatId
      const userContent = value
      const userMessage = { role: 'user', content: userContent, chatId }
      dispatch(createChat(userMessage))
      setFetching(true)
      const data = await api.getMessages(msg)
      const assistantMessage = { ...data.choices[0].message, chatId }
      dispatch(createChat(assistantMessage))
      setFetching(false)
    }
  }

  const createNewChat = () => {
    setCurrentChatId(guid())
    setValue('')
    setCurrentTitle('')
  }
  
  const handleInputKeyDown = async (e: KeyboardEvent) => {
    // if the key is enter, then get messages
    if (e.key === 'Enter') {
      await getMessages()
    }
  }

  const handleConversationClick = (index: number) => {
    const chatId = chatOrder[index]
    setCurrentChatId(chatId)
  }

  const scrollToBottom = () => {
    if (scrollRef.current) {
      // Get the maximum scroll height of the document
      const scrollHeight = document.body.scrollHeight;
      // Scroll to the bottom of the page
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const historyTitles = []
  for (const chatId of chatOrder) {
    const message = messages.find(message => message.chatId === chatId)
    if (message) {
      historyTitles.push(message.content)
    }
  }

  return (
    <div className="app" ref={scrollRef}>
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {historyTitles.map((title, index) => (
            <li key={index} onClick={() => handleConversationClick(index)}>
              {title}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Cooper</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle ? (
          <>
            <div className="app-title">
              <p className="app-title__text">CooperChat: V1</p>
            </div>
            <div className="bottom-border" />
          </>
        ) : null}
        <Chat chatId={currentChatId} />
        <div className="bottom-section">
          <div className="input-container">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <div
              id="submit"
              onClick={getMessages}
              className={`${value.length > 0 ? "active" : "inactive"}`}
            >
              ➢
            </div>
          </div>
          <p className="info">
            CooperChat April 25 Version. Free to use, but please credit me if
            you do. Does it sound like me? Let me know.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
