import { Show, createEffect } from "solid-js";
import { useAuth } from "../../context/auth";
import { useChats } from "../../context/chats";
import { Header } from "../Header";
import { SideBar } from "./SideBar";
import styles from './layout.module.css';
import { Chat } from "./Chat";

export default function ChatContainer() {
  const chats = useChats()
  const auth = useAuth()
  createEffect(() => {
    chats.fetch(auth.data().token)
  })
  const selectedChat = () => chats.data.find(c => c.id === chats.selectedChatId())
  return (
    <div class={styles.container}>
      <Header />
      <div class={`flex flex-1 pb-6 ${styles.chatContainer}`}>
        <SideBar chats={chats.data} />
        <Show when={chats.selectedChatId() !== null}>
          <Chat chat={selectedChat()} />
        </Show>
      </div>
    </div>
  )
}
