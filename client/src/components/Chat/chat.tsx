import { IconSend } from "@tabler/icons-solidjs";
import { Button } from "../Button";
import { Header } from "../Header";
import { useChats } from "../../context/chats";
import { ChatHeader } from "./ChatHeader";
import { SideBar } from "./SideBar";
import { Component, For, Show, createSignal } from "solid-js";
import { Message } from "../../services/messages";
import { useAuth } from "../../context/auth";

const MessageEntry: Component<Message> = (props) => {
  const auth = useAuth()
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    timeStyle: 'short'
  }
  return (
    <div classList={{
          "self-end text-end": auth.data().user.id === props.authorId,
          "self-start": auth.data().user.id !== props.authorId,
      }}>
      <div
        class="px-3 py-1.5 text-gray-800 rounded-md max-w-[300px] drop-shadow"
        classList={{
          "bg-blue-600 text-gray-50": auth.data().user.id === props.authorId,
          "text-gray-800 border border-gray-300": auth.data().user.id !== props.authorId,
        }}>
        <p class="font-medium">
          {props.content}
        </p>
      </div>
        <p class="text-xs pt-1 text-gray-600">
          {new Intl.DateTimeFormat('en-US', dateFormatOptions).format(props.createdAt)}
        </p>
    </div>
  )
}

export default function Chat() {
  const [message, setMessage] = createSignal('')
  const chats = useChats()
  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (message() !== '') {
      console.log({ message: message() })
      chats.sendMessage({ content: message() })
      setMessage('')
    }
  }
  chats.fetch()
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
