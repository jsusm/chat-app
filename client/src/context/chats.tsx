import { ParentProps, createContext, useContext } from "solid-js";
import { createStore, Store } from 'solid-js/store'
import { ChatInstance, CreateChatPayload, createChat, fetchChats } from "../services/chats";
import { useAuth } from "./auth";

export type ChatStore = ChatInstance[]

const chatContext = createContext<{
  data: Store<ChatStore>,
  fetch: () => ReturnType<typeof fetchChats>,
  create: (payload: CreateChatPayload) => ReturnType<typeof createChat>,
}>()

export const useChats = () => useContext(chatContext)

export function ChatProvider(props: ParentProps) {
  const [chats, setChats] = createStore<ChatStore>([])
  const auth = useAuth()
  const fetch = async () => {
    const chatList = await fetchChats(auth.data().token)
    console.log(chatList)
    if(chatList.success === true) {
      setChats(chatList.result)
    }
    return chatList
  }
  const create = async (payload: CreateChatPayload) => {
    const res = await createChat(auth.data().token, payload)
    return res
  }
  return (
    <chatContext.Provider
      value={{
        data: chats,
        fetch,
        create,
      }}
    >
      {props.children}
    </chatContext.Provider>
  )
}
