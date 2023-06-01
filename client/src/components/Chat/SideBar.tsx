import { Component, For } from "solid-js"
import { ChatInstance } from "../../services/chats"
import { Avatar } from "../Avatar"
import { A } from "@solidjs/router"
import { IconPlus } from "@tabler/icons-solidjs"
import { useChats } from "../../context/chats"

export type ContactProps = {
  name: string
  onClick: () => void
}

export const Contact: Component<ContactProps> = (props) => (
  <button
    onClick={props.onClick}
    class="flex items-center gap-3 transition-all w-full py-1.5 px-3 rounded-md border border-transparent hover:border-gray-300"
  >
    <Avatar name={props.name} />
    <span class="text-gray-900">
      {props.name}
    </span>
  </button>
)

export type SideBarProps = {
  chats: ChatInstance[]
  open: boolean
  onSelectChat: (id: number) => void
}
export const SideBar: Component<SideBarProps> = (props) => {
  return (
    <div
      style={{ left: props.open ? '0%' : '-100%' }}
      class="border-r border-r-400 max-w-[220px] w-full z-20 h-full flex flex-col bg-white absolute shadow-md sm:static sm:shadow-none pb-6 transition-all">
      <ul class="px-3 py-1.5 flex-1">
        <For each={props.chats}>
          {(chat) => (
            <li>
              <Contact
                onClick={() => props.onSelectChat(chat.id)}
                name={chat.member.name}
              />
            </li>
          )}
        </For>
      </ul>
      <A
        class="px-3 mx-6 flex justify-between items-center py-1.5 h-10 border rounded-md text-blue-600 hover:border-blue-400 transition-colors font-medium"
        href="/chats/create"
      >
        New Chat <IconPlus size={16} />
      </A>
    </div>
  )
}
