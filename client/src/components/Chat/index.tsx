import { Show, createEffect, createSignal } from "solid-js";
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
  const onSelectChat = (id: number) => {
    setSideBarOpen(false)
    chats.selectChat(id)
  }
  const [sideBarOpen, setSideBarOpen] = createSignal(true)
  const selectedChat = () => chats.data.find(c => c.id === chats.selectedChatId())
  return (
    <div class={styles.container}>
      <Header toggleSideBar={() => setSideBarOpen(x => !x)} />
      <div class={`flex flex-1 relative ${styles.chatContainer}`}>
        <SideBar
          onSelectChat={onSelectChat}
          open={chats.selectedChatId() === null || sideBarOpen()}
          chats={chats.data}
        />
        <Show when={chats.selectedChatId() !== null}>
          <Chat chat={selectedChat()} />
        </Show>
      </div>
    </div>
  )
}
