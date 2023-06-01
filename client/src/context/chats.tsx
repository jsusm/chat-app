import { ParentProps, createContext, createSignal, useContext, createEffect, Accessor } from "solid-js";
import { createStore, Store } from 'solid-js/store'
import { ChatInstance, CreateChatPayload, createChat, fetchChats } from "../services/chats";
import { useAuth } from "./auth";
import { CreateMessagePayload, Message, createMessage, fetchMessages } from "../services/messages";

export type ChatStore = Array<ChatInstance & { messages: Message[] }>

const chatContext = createContext<{
  data: Store<ChatStore>;
  selectedChatId: Accessor<number>;
  fetch: (token: string) => ReturnType<typeof fetchChats>;
  selectChat: (id: number) => void;
  sendMessage: (payload: CreateMessagePayload) => void;
  create: (payload: CreateChatPayload) => ReturnType<typeof createChat>;
}>()

export const useChats = () => useContext(chatContext)

export function ChatProvider(props: ParentProps) {
  const [chats, setChats] = createStore<ChatStore>([])
  const [selectedChatId, setSelectedChatId] = createSignal<null | number>(null)
  const auth = useAuth()

  const selectChat = (id: number) => setSelectedChatId(id)
  const fetch = async (token: string) => {
    const chatList = await fetchChats(token)
    if (chatList.success === true) {
      setChats(chatList.result.map(x => ({ ...x, messages: [] })))
    }
    return chatList
  }
  const create = async (payload: CreateChatPayload) => {
    const res = await createChat(auth.data().token, payload)
    return res
  }
  const sendMessage = async (payload: CreateMessagePayload) => {
    createMessage(auth.data().token, selectedChatId(), payload)
      .then(res => {
        if (res.success) {
          setChats(c => c.id === selectedChatId(), 'messages', x => [res.result, ...x])
        }
      })
  }
  createEffect(() => {
    if (selectedChatId() === null) return
    fetchMessages(auth.data().token, selectedChatId())
      .then(res => {
        if (res.success) {
          setChats(c => c.id === selectedChatId(), 'messages', res.result)
        }
      })
  })
  return (
    <chatContext.Provider
      value={{
        data: chats,
        selectedChatId,
        fetch,
        create,
        selectChat,
        sendMessage,
      }}
    >
      {props.children}
    </chatContext.Provider>
  )
}
