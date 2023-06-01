import { IconSend } from "@tabler/icons-solidjs";
import { Button } from "../Button";
import { Header } from "../Header";
import { useChats } from "../../context/chats";
import { ChatHeader } from "./ChatHeader";
import { SideBar } from "./SideBar";
import { For, Show, createEffect, createSignal } from "solid-js";
import { MessageEntry } from "./MessageEntry";
import { useAuth } from "../../context/auth";

export default function Chat() {
  const [message, setMessage] = createSignal('')
  const chats = useChats()
  const auth = useAuth()
  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (message() !== '') {
      console.log({ message: message() })
      chats.sendMessage({ content: message() })
      setMessage('')
    }
  }
  createEffect(() => {
    chats.fetch(auth.data().token)
  })
  const selectedChat = () => chats.data.find(c => c.id === chats.selectedChatId())
  return (
    <>
      <Header />
      <div class="flex flex-1 pb-6">
        <SideBar chats={chats.data} />
        <div class="flex flex-col col-span-5 flex-1 relative max-w-4xl mx-auto h-full ">
          <ChatHeader />
          <div class="flex flex-col-reverse overflow-y-scroll h-full px-6 py-6 mb-3 gap-3 flex-1">
            <Show when={chats.data}>
              <For each={selectedChat()?.messages}>
                {(m) => (
                  <MessageEntry {...m} />
                )}
              </For>
            </Show>
          </div>
          <form onSubmit={onSubmit} >
            <div class="flex gap-3">
              <input
                value={message()}
                onChange={e => setMessage(e.currentTarget.value)}
                type="text"
                class="w-full rounded-full flex-1 py-1 px-6 bg-transparent focus:bg-white border-gray-400"
              />
              <Button type="submit" class="rounded-full px-5">
                <IconSend size={18} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
