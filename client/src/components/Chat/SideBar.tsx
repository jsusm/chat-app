import { Component, For } from "solid-js"
import { ChatInstance } from "../../services/chats"
import { Avatar } from "../Avatar"

export type ContactProps = {
  name: string
}

export const Contact: Component<ContactProps> = (props) => (
  <button class="flex items-center gap-3 transition-all w-full py-1.5 px-3 rounded-md border border-transparent hover:border-gray-300">
    <Avatar name={props.name} />
    <span class="text-gray-900">
      {props.name}
    </span>
  </button>
)

export type SideBarProps = {
  chats: ChatInstance[]
}
export const SideBar: Component<SideBarProps> = (props) => (
  <div class="border-r border-r-400 max-w-[220px] w-full">
    <p class="font-medium mx-6 py-3 border-b border-b-gray-300">Chats</p>
    <ul class="px-3 py-1.5">
      <For each={props.chats}>
        {(chat) => (
          <li>
            <Contact name={chat.member.name} />
          </li>
        )}
      </For>
    </ul>
  </div>
)
