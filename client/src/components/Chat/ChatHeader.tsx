import { Show } from "solid-js";
import { useChats } from "../../context/chats";
import { Avatar } from "../Avatar";

export const ChatHeader = () => {
  const chats = useChats()
  const selectedChat = () => chats.data.find(x => x.id === chats.selectedChatId())
  return (
    <div class="flex items-center gap-3 py-1.5 mb-3 mx-6 border-b border-b-gray-300 h-[49px]">
      <Show when={selectedChat()}>
        <Avatar name={selectedChat().member.name} />
        <span class="text-gray-900 font-medium text-lg">
          {selectedChat().member.name}
        </span>
      </Show>
    </div>
  )
}
