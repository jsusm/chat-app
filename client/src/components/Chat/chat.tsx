import { IconSend } from "@tabler/icons-solidjs";
import { Button } from "../Button";
import { Header } from "../Header";
import { useChats } from "../../context/chats";
import { ChatHeader } from "./ChatHeader";
import { SideBar } from "./SideBar";

export default function Chat() {
  const chats = useChats()
  chats.fetch()
  return (
    <>
      <Header />
      <div class="flex h-full">
        <SideBar chats={chats.data} />
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
