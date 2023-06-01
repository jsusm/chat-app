import { IconSend } from "@tabler/icons-solidjs";
import { Component, createSignal, For } from "solid-js";
import { useChats } from "../../context/chats";
import { ChatInstance } from "../../services/chats";
import { Message } from "../../services/messages";
import { Button } from "../Button";
import { ChatHeader } from "./ChatHeader";
import { MessageEntry } from "./MessageEntry";

export type ChatProps = {
  chat: ChatInstance & { messages: Message[]; }
}

export const Chat: Component<ChatProps> = (props) => {
  const chats = useChats()
  const [message, setMessage] = createSignal('')
  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (message() !== '') {
      console.log({ message: message() })
      chats.sendMessage({ content: message() })
      setMessage('')
    }
  }
  return (
    <div class="flex flex-col flex-1 relative max-w-4xl mx-auto h-full pb-6">
      <ChatHeader />
      <div class="flex flex-col-reverse overflow-y-auto h-full px-6 py-6 mb-3 gap-3 flex-1">
        <For each={props.chat.messages}>
          {(m) => (
            <MessageEntry {...m} />
          )}
        </For>
      </div>
      <form onSubmit={onSubmit} >
        <div class="flex gap-3 px-6">
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
  )
}

