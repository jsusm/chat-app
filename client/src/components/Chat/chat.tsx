import { IconSend } from "@tabler/icons-solidjs";
import { Button } from "../Button";
import { Header } from "../Header";
import { Component, For } from "solid-js";

type AvatarProps = {
  name: string
}
const Avatar: Component<AvatarProps> = (props) => (
  <div class="w-9 aspect-square rounded-full overflow-hidden" >
    <img src={`https://api.dicebear.com/6.x/micah/svg?seed=${props.name}`} />
  </div>
)

type ContactProps = {
  name: string
}

const Contact: Component<ContactProps> = (props) => (
  <button class="flex items-center gap-3 transition-all w-full py-1.5 px-3 rounded-md border border-transparent hover:border-gray-300">
    <Avatar name={props.name} />
    <span class="text-gray-900">
      {props.name}
    </span>
  </button>
)

type SideBarProps = {
  chats: { name: string }[]
}
const SideBar: Component<SideBarProps> = (props) => (
  <div class="border-r border-r-400 max-w-[220px] w-full">
    <p class="font-medium mx-6 py-3 border-b border-b-gray-300">Chats</p>
    <ul class="px-3 py-1.5">
      <For each={props.chats}>
        {(chat) => (
          <li>
            <Contact name={chat.name} />
          </li>
        )}
      </For>
    </ul>
  </div>
)

const ChatHeader = () => (
  <div class="flex items-center gap-3 py-1.5 mb-3 mx-6 border-b border-b-gray-300">
    <Avatar name="Marco" />
    <span class="text-gray-900 font-medium text-lg">
      Marco
    </span>
  </div>
)

export default function Chat() {
  const contacts = [
    { name: 'Smith' },
    { name: 'Sanches' },
  ]
  return (
    <>
      <Header />
      <div class="flex h-full">
        <SideBar chats={contacts} />
        <div class="flex flex-col col-span-5 flex-1 relative max-w-4xl mx-auto">
          <ChatHeader />
          <div class="flex flex-col justify-end px-6 gap-3 flex-1">
            <div class="px-3 py-1.5 text-gray-800 rounded-md w-4/5 max-w-[300px] self-start border border-gray-300">
              <p class="font-medium">
                Hello, how are you? I'm here with my dog.
              </p>
              <p class="text-xs text-gray-600 pt-1 text-end">
                12:30pm
              </p>
            </div>
            <div class="px-3 py-1.5 bg-blue-600 text-white rounded-md max-w-[300px] self-end">
              <p class="font-medium">
                Yea, okok lkajsdflksajdf sadlkfj sald
              </p>
              <p class="text-xs text-gray-50 pt-1 text-end">
                12:30pm
              </p>
            </div>
          </div>
          <form>
            <div class="flex gap-3 p-6">
              <input type="text" class="w-full rounded-full flex-1 py-1 px-6 bg-transparent focus:bg-white border-gray-400" />
              <Button class="rounded-full px-5">
                <IconSend size={18} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
