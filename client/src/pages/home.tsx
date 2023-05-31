import { Show } from "solid-js"
import LandingSection from "../components/Landing"
import Chat from "../components/Chat/chat"
import { useAuth } from "../context/auth"
import { ChatProvider } from "../context/chats"

export default function Home() {
  const auth = useAuth()
  return (
    <div class="bg-gray-50 isolate min-h-screen flex flex-col">
      <Show when={auth.data()} fallback={<LandingSection />}>
        <ChatProvider>
          <Chat />
        </ChatProvider>
      </Show>
    </div>
  )
}
