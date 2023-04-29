import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Message } from "../types"

type State = {
  chats: Message[]
  chatOrder: string[]
}

const uniq = (arr: string[]) => [...new Set(arr)]

const createChatReducer: CaseReducer<State, PayloadAction<Message>> = (state, action) => {
  state.chats = [...state.chats, action.payload]
  state.chatOrder = uniq([...state.chatOrder, action.payload.chatId])
  return state
}

const postsSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [] as Message[],
    chatOrder: [] as string[]
  },
  reducers: {
    createChat: createChatReducer
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = postsSlice
// Extract and export each action creator by name
export const { createChat } = actions
// Export the reducer, either as a default or named export

// Export selectors
export const useChats = (chatId?: string) => useSelector((state: { chats: State }) => !chatId ? state.chats.chats : state.chats.chats.filter(chat => chat.chatId === chatId))
export const useChatOrder = () => useSelector((state: { chats: State }) => state.chats.chatOrder)

export default reducer